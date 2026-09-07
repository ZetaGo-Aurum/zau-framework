-- Neovim (nvim-lspconfig) configuration for ZAU Language Server
local lspconfig = require('lspconfig')
local configs = require('lspconfig.configs')

if not configs.zau_lsp then
  configs.zau_lsp = {
    default_config = {
      cmd = { 'zau-lsp', '--stdio' },
      filetypes = { 'zau' },
      root_dir = lspconfig.util.root_pattern('package.json', 'zau.config.py', '.git'),
      settings = {}
    }
  }
end

lspconfig.zau_lsp.setup({
  on_attach = function(client, bufnr)
    local opts = { noremap=true, silent=true, buffer=bufnr }
    vim.keymap.set('n', 'K', vim.lsp.buf.hover, opts)
    vim.keymap.set('n', 'gd', vim.lsp.buf.definition, opts)
    vim.keymap.set('n', '<leader>f', function() vim.lsp.buf.format({ async = true }) end, opts)
  end
})
