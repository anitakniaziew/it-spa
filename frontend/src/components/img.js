import createElement from '../helpers/createElement';

const image = (classNames, src, width, height) => {
  const img = createElement('img', { classNames });
  img.src = src;
  if (width) img.width = width;
  if (height) img.height = height;
  return img;
};

export default image;
