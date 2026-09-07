# ZAU Universal Language Server (`zau-lsp`)

Standard Language Server Protocol (LSP 3.17) implementation providing full code intelligence for `.zau` Single File Components across all modern code editors.

## Capabilities
- **Semantic Tokens Provider:** Advanced syntax classification for spatial components and reactive directives.
- **IntelliSense Auto-completion:** Tags (`<zau-canvas>`, `<zau-model>`, `<zau-camera>`, `<zau-light>`), attributes, and event directives.
- **Diagnostics & Linting:** Detects missing required props (e.g. `src` on `<zau-model>`), unclosed tags, and invalid tiers.
- **Formatter:** 2-space structured formatting for templates, scripts, and styles.
- **Hover Documentation:** Interactive documentation tooltips.

## Multi-Editor Setup
- **VS Code / VSCodium:** Auto-installed via `vscode-zau` extension.
- **Neovim:** See `editors/neovim.lua`
- **Zed:** See `editors/zed.json`
- **Helix:** See `editors/helix.toml`
- **Emacs:** See `editors/emacs.el`
- **Sublime Text:** See `editors/sublime.json`
