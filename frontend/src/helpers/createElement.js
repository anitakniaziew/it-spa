const createElement = (tagName, { classNames = [], children } = {}) => {
  const el = document.createElement(tagName);

  classNames?.forEach((className) => el.classList.add(className));
  children?.forEach((child) => el.append(child));

  return el;
};

export default createElement;
