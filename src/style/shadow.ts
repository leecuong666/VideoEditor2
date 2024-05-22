export const createShadow = (obj: {
  color?: string | undefined;
  offset?: number | undefined;
  opacity?: number | undefined;
  radius?: number | undefined;
}) => {
  const {color, offset, opacity, radius} = obj;

  return {
    shadowColor: color || '#000',
    shadowOffset: {
      width: offset || 3,
      height: offset || 3,
    },
    shadowOpacity: opacity || 1,
    shadowRadius: radius || 0,
  };
};
