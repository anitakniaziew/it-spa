import createElement from '../helpers/createElement';

const button = (text, classNames, onClick, onMouseEnter, onMouseLeave) => {
  const btn = createElement('button', { classNames, children: [text] });
  btn.type = 'button';
  btn.addEventListener('click', onClick);
  btn.addEventListener('mouseenter', onMouseEnter);
  btn.addEventListener('mouseleave', onMouseLeave);
  return btn;
};

export default button;
