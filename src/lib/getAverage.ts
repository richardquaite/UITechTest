export const getAverage = (arr: number[]) => {
  const average = arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
  if (isNaN(average)) {
    return 0;
  }
  return Number(average.toFixed(1));
};
