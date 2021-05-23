import createElement from '../../helpers/createElement';

import './footer.scss';

const footer = () => {
  const year = (new Date()).getFullYear();

  const footer = createElement('footer', {
    classNames: ['footer', 'd-flex', 'justify-content-around'],
    children: [
      createElement('div', {
        classNames: ['contact-container'],
        children: [
          createElement('h6', { children: ['IT SPA and Wellness'] }),
          createElement('p', { children: ['ul. Świętego Spokoju 1'] }),
          createElement('p', { children: ['12-345 Harmonia'] }),
          createElement('p', { children: ['telefon: +48 345-67-89'] }),
          createElement('p', { children: ['e-mail: it-spa@example.com'] }),
        ],
      }),
      createElement('small', { children: [`All rights reserved © Anita Kowalska ${year}`] }),
    ],
  });
  return footer;
};

export default footer;
