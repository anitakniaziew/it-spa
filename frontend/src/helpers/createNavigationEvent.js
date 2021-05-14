const createNavigationEvent = (view, params = {}) => new CustomEvent('navigation', {
  detail: {
    view,
    params,
  },
});

export default createNavigationEvent;
