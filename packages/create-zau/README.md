# create-zau

<div align="center">

```
  ███████╗ █████╗ ██╗   ██╗
  ╚══███╔╝██╔══██╗██║   ██║
    ███╔╝ ███████║██║   ██║
   ███╔╝  ██╔══██║██║   ██║
  ███████╗██║  ██║╚██████╔╝
  ╚══════╝╚═╝  ╚═╝ ╚═════╝ 
```

### Official Project Scaffolding CLI for ZAU Framework
**Python ASGI Backend &middot; Native 3D Spatial Canvas &middot; Async ORM &middot; Dual-Asset Engine**

<p align="center">
  <a href="https://www.npmjs.com/package/create-zau"><img src="https://img.shields.io/npm/v/create-zau.svg?color=38bdf8&label=create-zau&logo=npm" alt="NPM Version" /></a>
  <a href="https://github.com/ZetaGo-Aurum/zau-framework/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-emerald.svg" alt="License" /></a>
  <a href="https://zetagoaurum.com"><img src="https://img.shields.io/badge/architect-ZetaGo--Aurum-black.svg" alt="Architect" /></a>
</p>

<p align="center">
  <a href="https://zetagoaurum.com">Web Atelier: zetagoaurum.com</a> &middot;
  <a href="https://zau-framework.vercel.app">Dokumentasi Live: zau-framework.vercel.app</a> &middot;
  <a href="mailto:admin@zetagoaurum.com">Kontak: admin@zetagoaurum.com</a>
</p>

</div>

---

## ⚡ Mulai Kilat (Quickstart)

Inisialisasi project ZAU baru langsung dari terminal menggunakan package manager favorit Anda:

```bash
# Menggunakan npm
npm create zau@latest my-app

# Menggunakan npx
npx create-zau my-app

# Menggunakan pnpm
pnpm create zau my-app

# Menggunakan yarn
yarn create zau my-app

# Menggunakan bun
bun create zau my-app
```

---

## 📋 Pilihan Template Resmi

CLI `create-zau` menyediakan 4 arsitektur template produksi:

| Template | Deskripsi & Komponen |
| :--- | :--- |
| **`fullstack-3d`** *(Default)* | Python ASGI Core (Starlette/uvloop) + Three.js 3D Spatial Canvas + Async Database ORM + Dual Engine (Tailwind CSS + Bootstrap 5.3). |
| **`minimal`** | Setup ultra-ringan untuk API mikro, prototipe kilat, atau antarmuka tunggal tanpa dependensi 3D. |
| **`dashboard`** | Panel administrasi enterprise dengan tabel data grid, grafik metrik analitik, dan integrasi ZAU DB Studio. |
| **`portfolio`** | Showcase atelier mewah dengan model 3D ruangan interaktif, kontrol kamera sinematik, dan seated POV mode. |

---

## 📂 Struktur Hasil Scaffolding

Setelah scaffolding selesai, project Anda akan memiliki struktur lengkap berikut:

```
my-app/
├── api/
│   └── index.py             # Serverless ASGI bridge (Vercel / Cloud Functions)
├── backend/
│   ├── app.py               # Rute aplikasi & Server Actions Python
│   └── database/            # Model data & riwayat migrasi SQL
├── frontend/
│   ├── components/          # Komponen UI dan 3D (.zau / .tsx)
│   ├── pages/               # Halaman web dan navigasi
│   └── styles/              # Integrasi Tailwind CSS & Bootstrap
├── model/
│   └── 3d/                  # File 3D (GLTF/GLB Draco & textures)
├── public/                  # Aset statis publik
├── Dockerfile               # Multi-stage production container
├── docker-compose.yml       # Orkestrasi container lokal
├── package.json             # Dependensi Node.js
├── pyproject.toml           # Dependensi Python & konfigurasi package
├── render.yaml              # Cetak biru deploy Render
├── requirements.txt         # Pustaka Python (Starlette, uvicorn, pydantic, sqlalchemy)
├── tsconfig.json            # Konfigurasi TypeScript
├── vercel.json              # Konfigurasi routing serverless Vercel
└── zau.config.py            # Konfigurasi master ZAU
```

---

## 🚀 Langkah Berikutnya Setelah Scaffolding

```bash
# 1. Masuk ke direktori project
cd my-app

# 2. Buat virtual environment Python & aktifkan
python3 -m venv .venv
source .venv/bin/activate   # Linux/macOS
# .venv\Scriptsctivate    # Windows

# 3. Pasang dependensi
pip install -r requirements.txt
npm install

# 4. Jalankan server development
zau dev --port 8000
```

Buka `http://localhost:8000` di browser Anda.

---

## 🌐 Panduan Deploy Cepat

- **Deploy ke Vercel**: `npx vercel --prod --yes`
- **Deploy dengan Docker**: `docker compose up -d --build`
- **Deploy ke Render**: Hubungkan repositori GitHub Anda (otomatis mendeteksi `render.yaml`).

---

## ⚖️ Lisensi & Arsitek

- **Arsitek Utama**: **ZetaGo-Aurum**
- **Atelier**: [zetagoaurum.com](https://zetagoaurum.com)
- **Kontak**: `admin@zetagoaurum.com`
- **Lisensi**: MIT License
