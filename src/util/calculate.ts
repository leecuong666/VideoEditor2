export const roundNumber = (n: number, fixed?: number) => {
  'worklet';

  return n.toFixed(fixed || 2);
};
