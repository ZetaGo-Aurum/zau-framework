/**
 * ZAU TypeScript Type Definitions
 */

export interface SpatialTransform {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

export interface Canvas3DProps {
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  shadows?: boolean;
  className?: string;
  autoRotate?: boolean;
}

export interface Model3DProps extends SpatialTransform {
  src: string;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onClick?: () => void;
  fallback?: any;
}

export interface LightProps {
  position?: [number, number, number];
  intensity?: number;
  color?: string | number;
  castShadow?: boolean;
}

export interface OrbitControlsProps {
  enableZoom?: boolean;
  enablePan?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}
