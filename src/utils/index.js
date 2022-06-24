const breakPoints = {
  mobileWidth: 1024,
  tabletWidth: 700,
};

export const isMobile = (size) => {
  return {
    tablet: size < breakPoints.tabletWidth,
    mobile: size < breakPoints.mobileWidth,
  };
};
