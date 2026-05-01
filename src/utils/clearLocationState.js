export const clearNavigationState = (navigate, location) => {
  navigate(location.pathname, { replace: true, state: {} });
};