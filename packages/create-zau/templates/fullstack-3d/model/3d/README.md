# ZAU 3D Spatial Asset Directory

Place your 3D assets in this directory.
Supported formats:
- `.gltf` / `.glb` (glTF 2.0 with embedded or separate buffers)
- `.bin` (Binary vertex and normal buffers)
- `.obj` / `.mtl` (Wavefront 3D geometries)
- `.hdr` / `.exr` (High dynamic range environment maps)

ZAU compiler will automatically expose models at `/model/3d/<model-name>/...` and optimize texture buffers for WebGL rendering across mobile and desktop.
