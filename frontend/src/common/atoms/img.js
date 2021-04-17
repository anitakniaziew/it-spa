import createElement from '../../helpers/createElement';

const image = (classNames, src, width, height) => {
  const img = createElement('img', { classNames });
  img.src = src;
  img.width = width;
  img.height = height;
  return img;
};

export default image;
