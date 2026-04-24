export const getNextIndex = (currentIndex, total) => {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
};

export const getPreviousIndex = (currentIndex, total) => {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
};
