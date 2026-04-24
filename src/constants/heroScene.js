export const getHeroSceneConfig = ({ isSmall, isMobile, isTablet }) => {
  const compact = isSmall || isMobile;

  return {
    localAssetPaths: ['/models/hacker-room.glb'],
    deskScale: isSmall ? 0.05 : isMobile ? 0.054 : isTablet ? 0.058 : 0.062,
    deskPosition: compact ? [0.2, -4.4, 0] : [3.6, -4.6, 0],
    ringPosition: [0, 0, 0],
    cubePosition: [0, 0, 0],
    reactLogoPosition: [0, 0, 0],
    orbPosition: [0, 0, 0],
    showReactLogo: false,
    showCube: false,
    showRings: false,
    showOrb: false,
    sparklesCount: compact ? 8 : 14,
    commandPanels: [],
    hudCards: [],
    signalChips: ['Realtime systems', 'Production-minded'],
  };
};
