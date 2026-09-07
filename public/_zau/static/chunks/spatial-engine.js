/**
 * ZAU Native 3D Spatial Canvas Engine [spatial-engine.js]
 * Enterprise High-Poly Progressive 3D Pipeline & Smooth Surface Refiner
 * (c) 2026 ZetaGo-Aurum | zetagoaurum.com
 */
(function(global) {
  'use strict';

  // High-Poly Surface & Vertex Normal Pipeline
  class HighPolyMeshPipeline {
    static smoothGeometry(geometry, options = {}) {
      if (!geometry) return geometry;
      const computeVertexNormals = options.computeVertexNormals !== false;
      if (computeVertexNormals) {
        geometry.deleteAttribute('normal');
        geometry.computeVertexNormals();
      }
      geometry.computeBoundingBox();
      geometry.computeBoundingSphere();
      return geometry;
    }

    static upgradeModelToHighPoly(root, options = {}) {
      if (!root) return;
      const doubleSided = options.doubleSided !== false;
      const roughness = options.roughness !== undefined ? options.roughness : 0.55;
      const metalness = options.metalness !== undefined ? options.metalness : 0.15;
      const computeNormals = options.computeVertexNormals !== false;

      root.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) {
            HighPolyMeshPipeline.smoothGeometry(child.geometry, { computeVertexNormals: computeNormals });
          }

          const existingMat = child.material;
          const currentMap = existingMat ? existingMat.map : null;

          if (currentMap && global.THREE) {
            currentMap.colorSpace = global.THREE.SRGBColorSpace;
            currentMap.minFilter = global.THREE.LinearMipmapLinearFilter;
            currentMap.magFilter = global.THREE.LinearFilter;
            currentMap.generateMipmaps = true;
            currentMap.needsUpdate = true;
          }

          if (global.THREE) {
            child.material = new global.THREE.MeshStandardMaterial({
              map: currentMap,
              side: doubleSided ? global.THREE.DoubleSide : global.THREE.FrontSide,
              roughness: existingMat && existingMat.roughness !== undefined ? existingMat.roughness : roughness,
              metalness: existingMat && existingMat.metalness !== undefined ? existingMat.metalness : metalness,
              color: existingMat && existingMat.color ? existingMat.color : 0xffffff,
              shadowSide: global.THREE.DoubleSide
            });
            child.material.needsUpdate = true;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }
      });
    }

    static createMicroLODProxy(dimensions) {
      if (!global.THREE) return null;
      const dims = dimensions || new global.THREE.Vector3(12, 6, 12);
      const group = new global.THREE.Group();
      group.name = '__zau_microlod_proxy__';

      // 64x64 segment high-subdivision shell
      const shellGeom = new global.THREE.SphereGeometry(dims.x * 1.2, 64, 64);
      shellGeom.computeVertexNormals();
      const shellMat = new global.THREE.MeshStandardMaterial({
        color: 0x14161f,
        side: global.THREE.BackSide,
        roughness: 0.85,
        metalness: 0.1
      });
      group.add(new global.THREE.Mesh(shellGeom, shellMat));

      // Floor cylinder
      const floorGeom = new global.THREE.CylinderGeometry(dims.x * 0.9, dims.x * 0.9, 0.2, 48);
      floorGeom.computeVertexNormals();
      const floorMat = new global.THREE.MeshStandardMaterial({
        color: 0x1a1815,
        roughness: 0.4,
        metalness: 0.3
      });
      const floor = new global.THREE.Mesh(floorGeom, floorMat);
      floor.position.y = -dims.y * 0.5;
      group.add(floor);

      return group;
    }
  }

  class ZAUSpatialRenderer {
    constructor(containerId, options = {}) {
      this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
      if (!this.container || !global.THREE) return;
      this.options = Object.assign({
        highPoly: true,
        smoothNormals: true,
        instantProxy: true,
        autoRotate: true
      }, options);

      this._proxyObject = null;
      this._activeModel = null;
      this._dracoLoader = null;
      this._animFrameId = null;

      this.init();
    }

    init() {
      const width = this.container.clientWidth || 800;
      const height = this.container.clientHeight || 600;

      // Scene & Camera
      this.scene = new global.THREE.Scene();
      this.camera = new global.THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
      this.camera.position.set(0, 2.0, 5.0);

      // WebGL Renderer with try/catch fallback
      try {
        this.renderer = new global.THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        this.renderer.toneMapping = global.THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.30;
        this.container.appendChild(this.renderer.domElement);
      } catch (err) {
        console.warn('[ZAU SpatialEngine] WebGL context unaccelerated:', err);
        this.container.innerHTML = '<div class="w-full h-full flex items-center justify-center p-6 text-zinc-400 font-mono text-xs">WebGL Standby Mode</div>';
        return;
      }

      // OrbitControls
      if (global.THREE.OrbitControls) {
        this.controls = new global.THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 14;
        this.controls.minDistance = 1.5;
        this.controls.autoRotate = this.options.autoRotate;
        this.controls.autoRotateSpeed = 0.9;
      }

      this.buildLighting();
      this.buildHighPolyArtifact();
      this.buildParticleField();
      this.animate();

      window.addEventListener('resize', () => this.onResize());
    }

    buildLighting() {
      const ambient = new global.THREE.AmbientLight(0xffffff, 0.75);
      this.scene.add(ambient);

      this.keyLight = new global.THREE.DirectionalLight(0xf59e0b, 2.8);
      this.keyLight.position.set(6, 12, 8);
      this.scene.add(this.keyLight);

      this.fillLight = new global.THREE.PointLight(0x38bdf8, 3.2, 20);
      this.fillLight.position.set(-6, 4, -4);
      this.scene.add(this.fillLight);

      this.backLight = new global.THREE.PointLight(0xa855f7, 2.0, 15);
      this.backLight.position.set(0, -6, -4);
      this.scene.add(this.backLight);
    }

    buildHighPolyArtifact() {
      this.artifactGroup = new global.THREE.Group();
      this.scene.add(this.artifactGroup);

      // 1. Central Core: High-Subdivision Octahedron (detail=4, 512 faces) with smooth vertex normals
      const coreGeom = new global.THREE.OctahedronGeometry(1.2, 4);
      HighPolyMeshPipeline.smoothGeometry(coreGeom);
      const coreMat = new global.THREE.MeshStandardMaterial({
        color: 0x0e0f14,
        roughness: 0.12,
        metalness: 0.95,
        flatShading: false
      });
      this.coreMesh = new global.THREE.Mesh(coreGeom, coreMat);
      this.artifactGroup.add(this.coreMesh);

      // 2. Inner Aurum Lattice: High-Subdivision Icosahedron (detail=3, 640 faces)
      const innerGeom = new global.THREE.IcosahedronGeometry(0.75, 3);
      HighPolyMeshPipeline.smoothGeometry(innerGeom);
      const innerMat = new global.THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.85
      });
      this.innerLattice = new global.THREE.Mesh(innerGeom, innerMat);
      this.artifactGroup.add(this.innerLattice);

      // 3. Gyroscopic Orbital Rings (3 Independent Gold Rings, 32x200 segments = 6,400 faces each)
      this.rings = [];
      const ringRadii = [1.8, 2.1, 2.4];
      const ringColors = [0xf59e0b, 0xd97706, 0xfbbf24];

      ringRadii.forEach((radius, i) => {
        const ringGeom = new global.THREE.TorusGeometry(radius, 0.024, 32, 200);
        HighPolyMeshPipeline.smoothGeometry(ringGeom);
        const ringMat = new global.THREE.MeshStandardMaterial({
          color: ringColors[i],
          metalness: 0.9,
          roughness: 0.18
        });
        const ring = new global.THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = (Math.PI / (i + 1.8));
        ring.rotation.y = (Math.PI / (i + 2.5));

        for (let j = 0; j < 6; j++) {
          const angle = (j * Math.PI) / 3;
          const beaconGeom = new global.THREE.SphereGeometry(0.06, 24, 24);
          HighPolyMeshPipeline.smoothGeometry(beaconGeom);
          const beaconMat = new global.THREE.MeshBasicMaterial({ color: 0xfffbeb });
          const beacon = new global.THREE.Mesh(beaconGeom, beaconMat);
          beacon.position.set(radius * Math.cos(angle), radius * Math.sin(angle), 0);
          ring.add(beacon);
        }

        this.artifactGroup.add(ring);
        this.rings.push(ring);
      });
    }

    buildParticleField() {
      const count = 600;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 16;
        positions[i + 1] = (Math.random() - 0.5) * 16;
        positions[i + 2] = (Math.random() - 0.5) * 16;
      }
      const geom = new global.THREE.BufferGeometry();
      geom.setAttribute('position', new global.THREE.BufferAttribute(positions, 3));
      const mat = new global.THREE.PointsMaterial({
        color: 0xf59e0b,
        size: 0.04,
        transparent: true,
        opacity: 0.7
      });
      this.particles = new global.THREE.Points(geom, mat);
      this.scene.add(this.particles);
    }

    /**
     * Progressive 3D Model Streamer
     * Supports instant Micro-LOD proxy and smooth vertex normal upgrade.
     */
    async loadModel(url, streamOptions = {}) {
      if (!this.renderer || !global.THREE) return null;
      const opts = Object.assign({
        instantProxy: true,
        dracoPath: '/draco/gltf/',
        smoothNormals: true
      }, streamOptions);

      if (opts.instantProxy) {
        if (this._proxyObject) this.scene.remove(this._proxyObject);
        this._proxyObject = HighPolyMeshPipeline.createMicroLODProxy();
        if (this._proxyObject) this.scene.add(this._proxyObject);
      }

      if (!global.THREE.GLTFLoader) {
        console.warn('[ZAU SpatialEngine] GLTFLoader required for loading external GLB models.');
        return null;
      }

      const loader = new global.THREE.GLTFLoader();
      if (global.THREE.DRACOLoader) {
        if (!this._dracoLoader) {
          this._dracoLoader = new global.THREE.DRACOLoader();
          this._dracoLoader.setDecoderPath(opts.dracoPath);
        }
        loader.setDRACOLoader(this._dracoLoader);
      }

      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (gltf) => {
            const model = gltf.scene;
            if (opts.smoothNormals) {
              HighPolyMeshPipeline.upgradeModelToHighPoly(model, {
                computeVertexNormals: true,
                doubleSided: true
              });
            }

            const bbox = new global.THREE.Box3().setFromObject(model);
            const center = bbox.getCenter(new global.THREE.Vector3());
            model.position.x = -center.x;
            model.position.y = -center.y;
            model.position.z = -center.z;

            if (this._proxyObject) {
              this.scene.remove(this._proxyObject);
              this._proxyObject = null;
            }

            if (this._activeModel) {
              this.scene.remove(this._activeModel);
            }

            this._activeModel = model;
            this.scene.add(model);
            if (opts.onReady) opts.onReady(model);
            resolve(model);
          },
          (xhr) => {
            if (opts.onProgress && xhr.total > 0) {
              const pct = Math.round((xhr.loaded / xhr.total) * 100);
              opts.onProgress(pct, xhr.loaded, xhr.total);
            }
          },
          (err) => {
            console.error('[ZAU SpatialEngine] Model stream error:', err);
            if (opts.onError) opts.onError(err);
            reject(err);
          }
        );
      });
    }

    animate() {
      this._animFrameId = requestAnimationFrame(() => this.animate());

      const time = performance.now() * 0.001;

      if (this.coreMesh) {
        this.coreMesh.rotation.y = time * 0.4;
        this.coreMesh.rotation.x = Math.sin(time * 0.3) * 0.2;
      }

      if (this.innerLattice) {
        this.innerLattice.rotation.y = -time * 0.6;
        this.innerLattice.rotation.z = time * 0.3;
        const scale = 1.0 + Math.sin(time * 2.5) * 0.05;
        this.innerLattice.scale.set(scale, scale, scale);
      }

      if (this.rings) {
        this.rings[0].rotation.z += 0.008;
        this.rings[0].rotation.x += 0.004;

        this.rings[1].rotation.y -= 0.009;
        this.rings[1].rotation.z += 0.005;

        this.rings[2].rotation.x += 0.007;
        this.rings[2].rotation.y += 0.006;
      }

      if (this.particles) {
        this.particles.rotation.y = time * 0.03;
      }

      if (this.controls) this.controls.update();
      if (this.renderer) this.renderer.render(this.scene, this.camera);
    }

    onResize() {
      if (!this.container || !this.renderer) return;
      const w = this.container.clientWidth;
      const h = this.container.clientHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    }
  }

  // Open-Source 3D Model Viewer Engine (Google model-viewer & Three.js bridge)
  class ZAUModelViewerEngine {
    constructor(elementOrId, modelUrl, options = {}) {
      this.container = typeof elementOrId === 'string' ? document.getElementById(elementOrId) : elementOrId;
      this.modelUrl = modelUrl;
      this.options = Object.assign({
        autoRotate: true,
        cameraControls: true,
        exposure: 1.2,
        shadowIntensity: 1.0,
        rotationSpeed: '18deg'
      }, options);
      if (this.container) this.init();
    }

    init() {
      if (!customElements.get('model-viewer')) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
        document.head.appendChild(script);
      }

      const viewer = document.createElement('model-viewer');
      viewer.src = this.modelUrl;
      if (this.options.cameraControls) viewer.setAttribute('camera-controls', '');
      if (this.options.autoRotate) viewer.setAttribute('auto-rotate', '');
      viewer.setAttribute('rotation-per-second', this.options.rotationSpeed);
      viewer.setAttribute('shadow-intensity', this.options.shadowIntensity.toString());
      viewer.setAttribute('exposure', this.options.exposure.toString());
      viewer.setAttribute('touch-action', 'pan-y');
      viewer.style.width = '100%';
      viewer.style.height = '100%';
      viewer.style.backgroundColor = '#090a0f';

      this.container.appendChild(viewer);
      this.viewer = viewer;
    }
  }

  if (typeof document !== 'undefined') {
    if (document.querySelector('model-viewer') && !customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }

  global.HighPolyMeshPipeline = HighPolyMeshPipeline;
  global.__ZAUSpatialRenderer__ = ZAUSpatialRenderer;
  global.ZAUSpatialEngine = ZAUSpatialRenderer;
  global.__ZAUModelViewerEngine__ = ZAUModelViewerEngine;
  global.ZAUModelViewer = ZAUModelViewerEngine;
})(typeof window !== 'undefined' ? window : globalThis);
