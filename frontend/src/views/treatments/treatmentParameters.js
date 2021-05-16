import createElement from '../../helpers/createElement';

const p = (textBold, textRegular = '') => createElement('p', {
  classNames: ['treatment-parameter'],
  children: [
    createElement('strong', { children: [textBold] }),
    textRegular,
  ],
});

const treatmentParameters = (
  area, time, price,
) => createElement('div', {
  classNames: ['treatment-parameters-container'],
  children: [
    p('Obszar ciała: ', area),
    p('Czas: ', time),
    p('Cena: ', `${price.toFixed(2)} zł`),
  ],
});

export default treatmentParameters;
