# zau/db/models.py
from typing import Any, Optional, Dict, List, Type, get_type_hints, get_origin, get_args
import datetime
from sqlalchemy.orm import DeclarativeBase, mapped_column, relationship as sa_relationship
from sqlalchemy import (
    Column, Integer, String, Boolean, DateTime, Float, ForeignKey, Text, JSON
)

class Model(DeclarativeBase):
    """
    Base Declarative Model for ZAU ORM.
    Supports simple Pythonic syntax, automatic async mapping, and JSON serialization.
    """
    __abstract__ = True
    __allow_unmapped__ = True

    @classmethod
    def __init_subclass__(cls, table: bool = False, tablename: Optional[str] = None, **kwargs):
        if table:
            if not hasattr(cls, '__tablename__') or '__tablename__' not in cls.__dict__:
                cls.__tablename__ = tablename or (cls.__name__.lower() + 's')
            annotations = getattr(cls, '__annotations__', {})
            for attr_name, attr_type in annotations.items():
                if attr_name not in cls.__dict__ and not attr_name.startswith('_'):
                    origin = get_origin(attr_type)
                    args = get_args(attr_type)
                    actual_type = [a for a in args if a is not type(None)][0] if origin is not None and type(None) in args else attr_type

                    if actual_type in (int,):
                        setattr(cls, attr_name, mapped_column(Integer, nullable=True))
                    elif actual_type in (str,):
                        setattr(cls, attr_name, mapped_column(Text, nullable=True))
                    elif actual_type in (bool,):
                        setattr(cls, attr_name, mapped_column(Boolean, default=True))
                    elif actual_type in (float,):
                        setattr(cls, attr_name, mapped_column(Float, nullable=True))
                    elif actual_type in (datetime.datetime,):
                        setattr(cls, attr_name, mapped_column(DateTime, nullable=True))
                    elif actual_type in (dict, list):
                        setattr(cls, attr_name, mapped_column(JSON, nullable=True))
        else:
            cls.__abstract__ = True
        super().__init_subclass__(**kwargs)

    def to_dict(self) -> Dict[str, Any]:
        """Convert model instance to a JSON-serializable dictionary."""
        data = {}
        for col in self.__table__.columns:
            val = getattr(self, col.name)
            if isinstance(val, (datetime.datetime, datetime.date)):
                val = val.isoformat()
            data[col.name] = val
        return data

    def __repr__(self) -> str:
        cols = ", ".join(f"{col.name}={getattr(self, col.name)!r}" for col in self.__table__.columns)
        return f"<{self.__class__.__name__} {cols}>"

def Field(
    default: Any = ...,
    *,
    default_factory: Any = None,
    primary_key: bool = False,
    index: bool = False,
    unique: bool = False,
    max_length: Optional[int] = None,
    foreign_key: Optional[str] = None,
    nullable: Optional[bool] = None,
    description: Optional[str] = None,
) -> Any:
    """
    Define a model column with constraints, indexing, foreign keys, and defaults.
    """
    col_args = []
    if foreign_key:
        col_args.append(ForeignKey(foreign_key))
    if max_length:
        col_args.append(String(max_length))

    col_kwargs: Dict[str, Any] = {
        "primary_key": primary_key,
        "index": index,
        "unique": unique,
    }
    if nullable is not None:
        col_kwargs["nullable"] = nullable
    elif primary_key:
        col_kwargs["nullable"] = False

    if default is not ... and default is not None:
        col_kwargs["default"] = default
    elif default_factory is not None:
        col_kwargs["default"] = default_factory

    return mapped_column(*col_args, **col_kwargs)

def Relationship(
    *,
    back_populates: Optional[str] = None,
    lazy: str = "selectin",
    cascade: Optional[str] = None,
) -> Any:
    """
    Define an ORM relationship between models.
    """
    kwargs = {"lazy": lazy}
    if back_populates:
        kwargs["back_populates"] = back_populates
    if cascade:
        kwargs["cascade"] = cascade
    return sa_relationship(**kwargs)
