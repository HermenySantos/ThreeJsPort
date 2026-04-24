import test from 'node:test';
import assert from 'node:assert/strict';

import { getHeroSceneConfig } from './heroScene.js';

test('hero scene config uses only local asset paths', () => {
  const config = getHeroSceneConfig({ isSmall: false, isMobile: false, isTablet: false });

  assert.ok(config.localAssetPaths.length > 0);
  assert.ok(config.localAssetPaths.every((path) => path.startsWith('/')));
  assert.ok(config.localAssetPaths.every((path) => !path.startsWith('http')));
});

test('hero scene config uses fewer sparkles on mobile', () => {
  const desktop = getHeroSceneConfig({ isSmall: false, isMobile: false, isTablet: false });
  const mobile = getHeroSceneConfig({ isSmall: true, isMobile: true, isTablet: false });

  assert.ok(desktop.sparklesCount > mobile.sparklesCount);
  assert.equal(mobile.showReactLogo, false);
});
