" Vim syntax file for ZAU Single File Components
if exists("b:current_syntax")
  finish
endif

syn case match

syn keyword zauBlockTag template script style contained
syn match zauSpatialTag /<\/\?\(zau-[a-zA-Z0-9-]*\|Viewer3D\|SceneControls\)/
syn match zauDirective /[@:][a-zA-Z0-9_.-]\+/
syn keyword zauControl z-if z-else-if z-else z-for z-model z-show z-slot
syn keyword zauProperty src progressiveLOD tier position rotation scale fov target intensity color castShadow receiveShadow wireframe pbr

syn region zauComment start="<!--" end="-->"
syn region zauString start='"' end='"' containedin=ALL
syn region zauString start="'" end="'" containedin=ALL

syn region zauInterpolation start="{{" end="}}" contains=@zauJs

hi def link zauSpatialTag Function
hi def link zauBlockTag Structure
hi def link zauDirective Identifier
hi def link zauControl Statement
hi def link zauProperty Type
hi def link zauComment Comment
hi def link zauString String
hi def link zauInterpolation Special

let b:current_syntax = "zau"
