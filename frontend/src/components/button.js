import createElement from '../helpers/createElement';

const button = (text, classNames, onClick) => {
  const btn = createElement('button', { classNames, children: [text] });
  btn.type = 'button';
  btn.addEventListener('click', onClick);
  return btn;
};

export default button;
