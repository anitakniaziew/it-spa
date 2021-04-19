import createElement from '../../helpers/createElement';

const p = (textBold, textRegular = '') => createElement('p', {
  children: [
    createElement('strong', { children: [textBold] }),
    textRegular,
  ],
});

const roomParameters = (
  beds, guests, price,
) => createElement('div', {
  classNames: ['room-parameters-container'],
  children: [
    p('Łóżka: ', beds),
    p('Liczba gości: ', guests),
    p(`${price.toFixed(2)} zł / noc`),
  ],
});

export default roomParameters;
