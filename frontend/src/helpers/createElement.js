const createElement = (tagName, { id = '', classNames = [], children = [] } = {}) => {
  const el = document.createElement(tagName);
  if (id) el.id = id;

  classNames?.forEach((className) => el.classList.add(className));
  children?.forEach((child) => el.append(child));

  return el;
};

export default createElement;
