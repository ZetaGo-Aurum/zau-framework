from zau.db import Model, Field, Relationship
from typing import Optional
from datetime import datetime

class Project(Model, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=100)
    model_3d_url: str = Field(description="Path asset GLTF 3D")
    owner_id: Optional[int] = Field(default=None, foreign_key="users.id")
    owner: Optional["User"] = Relationship(back_populates="projects")
