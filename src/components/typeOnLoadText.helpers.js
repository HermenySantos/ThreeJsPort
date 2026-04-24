export const getTypedLength = ({ textLength, elapsedMs, stepMs = 40 }) => {
  if (textLength <= 0) return 0;
  return Math.min(textLength, Math.floor(elapsedMs / stepMs));
};
