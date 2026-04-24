# Command Rig Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the broken hero asset with a local-only cinematic workstation scene and upgrade the hero overlay to feel more premium and impressive.

**Architecture:** Keep the existing workstation model as the scene anchor, move responsive scene decisions into a dedicated hero config module, and add focused local-only accent components around the core scene. Upgrade the DOM overlay in `Hero.jsx` so the 3D spectacle and the copy feel like one system instead of separate layers.

**Tech Stack:** React, Vite, @react-three/fiber, @react-three/drei, GSAP, Tailwind CSS, Node test runner

---

### Task 1: Add a test-first hero scene config seam

**Files:**
- Create: `src/constants/heroScene.js`
- Create: `src/constants/heroScene.test.js`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';

import { getHeroSceneConfig } from './heroScene.js';

test('hero scene config uses only local asset paths', () => {
  const config = getHeroSceneConfig({ isSmall: false, isMobile: false, isTablet: false });

  assert.ok(config.localAssetPaths.length > 0);
  assert.ok(config.localAssetPaths.every((path) => path.startsWith('/')));
  assert.ok(config.localAssetPaths.every((path) => !path.startsWith('http')));
});

test('hero scene config simplifies accents on mobile', () => {
  const desktop = getHeroSceneConfig({ isSmall: false, isMobile: false, isTablet: false });
  const mobile = getHeroSceneConfig({ isSmall: true, isMobile: true, isTablet: false });

  assert.ok(desktop.commandPanels.length > mobile.commandPanels.length);
  assert.equal(mobile.showReactLogo, false);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/constants/heroScene.test.js`
Expected: FAIL because `src/constants/heroScene.js` does not exist yet

- [ ] **Step 3: Write minimal implementation**

```js
export const getHeroSceneConfig = ({ isSmall, isMobile, isTablet }) => ({
  localAssetPaths: ['/models/hacker-room.glb', '/models/cube.glb', '/models/react.glb'],
  commandPanels: isMobile
    ? [{ id: 'signal' }, { id: 'uptime' }]
    : [{ id: 'signal' }, { id: 'uptime' }, { id: 'latency' }],
  showReactLogo: !(isSmall || isMobile),
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/constants/heroScene.test.js`
Expected: PASS

### Task 2: Build the command-rig accent components

**Files:**
- Create: `src/components/CommandPanel.jsx`
- Create: `src/components/CommandOrb.jsx`
- Modify: `src/constants/heroScene.js`

- [ ] **Step 1: Extend the config with actual panel/orb layout data**
- [ ] **Step 2: Implement `CommandPanel.jsx` with local-only geometry, text, glow, and idle motion**
- [ ] **Step 3: Implement `CommandOrb.jsx` as a glowing accent anchor**
- [ ] **Step 4: Run `node --test src/constants/heroScene.test.js`**

### Task 3: Replace the broken hero scene composition

**Files:**
- Create: `src/components/CommandRigScene.jsx`
- Modify: `src/sections/Hero.jsx`
- Modify: `src/constants/index.js`

- [ ] **Step 1: Compose the workstation, panels, orbit accents, rings, sparkles, and lighting in `CommandRigScene.jsx`**
- [ ] **Step 2: Remove `Target` from the hero and switch `Hero.jsx` to the new scene composition**
- [ ] **Step 3: Adjust hero sizing data in `src/constants/index.js` for the new layout**
- [ ] **Step 4: Run `node --test src/constants/heroScene.test.js`**

### Task 4: Upgrade the hero overlay and CTA structure

**Files:**
- Modify: `src/sections/Hero.jsx`
- Modify: `src/components/Button.jsx`
- Modify: `src/index.css`

- [ ] **Step 1: Add stronger hero copy hierarchy, signal chips, and desktop HUD cards**
- [ ] **Step 2: Update `Button.jsx` so it can be used without nested anchor warnings**
- [ ] **Step 3: Add the supporting hero styles and motion polish in `src/index.css`**
- [ ] **Step 4: Run `npm run build`**

### Task 5: Verify the final hero locally

**Files:**
- Modify: `src/sections/Hero.jsx` (only if verification reveals an issue)
- Modify: `src/index.css` (only if verification reveals an issue)

- [ ] **Step 1: Run `npm run build`**
- [ ] **Step 2: Run `npm run dev`**
- [ ] **Step 3: Confirm the app no longer crashes on the hero**
- [ ] **Step 4: Check edited files with lints**
