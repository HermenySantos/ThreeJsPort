# Command Rig Hero Design

## Goal
Replace the broken remote `Target` asset in the landing hero with a local-only cinematic workstation scene that feels more premium, more technical, and more resilient.

## Direction
The hero should feel like a high-end engineering command center:
- a dominant workstation as the visual anchor
- floating command panels and accent props around it
- deeper atmosphere, stronger lighting, and controlled motion
- clearer text hierarchy and more premium CTA presentation

## Scene Design
The 3D scene stays centered on the existing workstation model so the page keeps its current identity. The broken remote model is removed entirely. In its place, the scene gains local-only accent elements:
- floating command panels built from geometry and text
- orbiting or suspended accent props using existing local models
- glow, sparkles, and layered lighting for depth
- reduced scene density on smaller screens

## DOM Overlay
The hero copy becomes more intentional and cinematic:
- a small technical eyebrow label
- a stronger headline with clearer hierarchy
- a short supporting paragraph focused on shipping, systems, and product work
- polished CTAs and compact signal chips
- optional desktop-only status cards layered around the composition

## Motion
Motion should be premium and restrained:
- slow idle drift on the workstation scene
- subtle cursor parallax on accent layers
- staggered motion timing across floating elements
- gentle lighting pulses instead of noisy animation
- simplified motion on mobile and small screens

## Reliability
The hero must not depend on remote 3D assets. All scene elements should render from local models, local textures, or procedural geometry. If one accent element fails, the hero should still render as a complete section.

## Responsive Behavior
- desktop: full command-rig scene with layered panels and accents
- tablet: fewer floating accents, tighter spacing
- mobile: simplified composition, reduced parallax, fewer overlays

## Validation
Implementation should prove:
- no remote hero asset URLs remain in the scene configuration
- the hero builds successfully
- the local dev server renders without the current canvas crash
