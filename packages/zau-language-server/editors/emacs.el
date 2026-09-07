;; Emacs (eglot) configuration for ZAU Language
(require 'eglot)

(define-derived-mode zau-mode html-mode "ZAU"
  "Major mode for editing .zau Single File Components.")

(add-to-list 'auto-mode-alist '("\\.zau\\'" . zau-mode))

(add-to-list 'eglot-server-programs
             '(zau-mode . ("zau-lsp" "--stdio")))

(add-hook 'zau-mode-hook #'eglot-ensure)
(provide 'zau-mode)
