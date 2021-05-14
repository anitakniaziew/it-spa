import createElement from '../helpers/createElement';

const link = (label, classNames, onClick) => {
  const anchorElement = createElement('a', { classNames, children: [label] });
  anchorElement.href = '#';
  anchorElement.addEventListener('click', onClick);

  return anchorElement;
};

export default link;
