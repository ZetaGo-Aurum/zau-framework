#!/usr/bin/env node

/**
 * create-zau
 * Modern fullstack project initializer for ZAU Framework.
 * (c) 2026 ZetaGo-Aurum <admin@zetagoaurum.com> | zetagoaurum.com
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES = ['fullstack-3d', 'minimal', 'dashboard', 'portfolio'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function run() {
  console.log('\x1b[33m\x1b[1m');
  console.log('  ███████╗ █████╗ ██╗   ██╗');
  console.log('  ╚══███╔╝██╔══██╗██║   ██║');
  console.log('    ███╔╝ ███████║██║   ██║');
  console.log('   ███╔╝  ██╔══██║██║   ██║');
  console.log('  ███████╗██║  ██║╚██████╔╝');
  console.log('  ╚══════╝╚═╝  ╚═╝ ╚═════╝ ');
  console.log('\x1b[0m');
  console.log('\x1b[36m  ZAU Framework - Python-first Fullstack & Native 3D Spatial Canvas\x1b[0m');
  console.log('\x1b[90m  Chief Architect: ZetaGo-Aurum | zetagoaurum.com\x1b[0m\n');

  let projectName = process.argv[2];
  if (!projectName) {
    projectName = await question('\x1b[1m? Project name:\x1b[0m (my-zau-app) ') || 'my-zau-app';
  }

  console.log('\n\x1b[1mAvailable Templates:\x1b[0m');
  console.log('  1) fullstack-3d  - Python ASGI + 3D Canvas + DB ORM + Tailwind/Bootstrap (Default)');
  console.log('  2) minimal       - Lightweight minimal starting point');
  console.log('  3) dashboard     - Administrative data dashboard with charts & metrics');
  console.log('  4) portfolio     - Atelier showcase with interactive 3D viewer\n');

  const templateChoice = await question('\x1b[1m? Select a template [1-4]:\x1b[0m (1) ') || '1';
  rl.close();

  let template = 'fullstack-3d';
  if (templateChoice === '2' || templateChoice === 'minimal') template = 'minimal';
  else if (templateChoice === '3' || templateChoice === 'dashboard') template = 'dashboard';
  else if (templateChoice === '4' || templateChoice === 'portfolio') template = 'portfolio';

  const targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    console.error(`\x1b[31mError: Target directory '${projectName}' already exists.\x1b[0m`);
    process.exit(1);
  }

  console.log(`\n\x1b[33m⚡ Scaffolding project in ${targetDir}...\x1b[0m`);

  // Locate templates
  let templateDir = path.resolve(__dirname, '../../../zau/templates', template);
  if (!fs.existsSync(templateDir)) {
    templateDir = path.resolve(__dirname, '../templates', template);
  }

  function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  try {
    if (fs.existsSync(templateDir)) {
      copyDir(templateDir, targetDir);
    } else {
      // Create minimal fallback structure
      fs.mkdirSync(path.join(targetDir, 'backend'), { recursive: true });
      fs.mkdirSync(path.join(targetDir, 'frontend/pages'), { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'backend/app.py'), 'from zau import ZAUApp\n\napp = ZAUApp(client_dir="frontend")\n');
      fs.writeFileSync(path.join(targetDir, 'README.md'), `# ${projectName}\n\nBuilt with ZAU Framework.\n`);
    }

    console.log(`\x1b[32m\x1b[1m✓ Success! Created ${projectName} at ${targetDir}\x1b[0m\n`);
    console.log('Inside that directory, you can run:\n');
    console.log('  \x1b[36mzau dev --port 8000\x1b[0m');
    console.log('    Starts the development server with live reload.\n');
    console.log('  \x1b[36mzau db studio\x1b[0m');
    console.log('    Opens the database inspector in your browser.\n');
    console.log('  \x1b[36mzau build\x1b[0m');
    console.log('    Bundles the app for production.\n');
    console.log('Get started by typing:\n');
    console.log(`  \x1b[33mcd ${projectName}\x1b[0m`);
    console.log('  \x1b[33mzau dev\x1b[0m\n');
  } catch (err) {
    console.error(`\x1b[31mFailed to create project: ${err.message}\x1b[0m`);
    process.exit(1);
  }
}

run();
