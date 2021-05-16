import createElement from '../../helpers/createElement';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import button from '../../components/button';
import './home.scss';

const home = () => {
  const fragment = document.createDocumentFragment();
  const home = createElement('div', {
    classNames: ['hero', 'd-flex', 'flex-column', 'justify-content-center'],
    children: [
      createElement('div', {
        classNames: ['hero-greeting'],
        children: [
          createElement('h1', {
            classNames: ['hero-greeting-header'],
            children: ['Witamy w IT SPA!'],
          }),
          createElement('p', {
            classNames: ['hero-greeting-text'],
            children: ['Pierwszym tego typu ośrodkiem wypoczynkowym stworzonym z myślą o pracownikach branży informatycznej.'],
          })],
      }),
      createElement('div', {
        classNames: ['hero-btns', 'd-flex'],
        children: [
          button('Przeglądaj pokoje', ['btn-primary', 'm-3'], (event) => {
            event.preventDefault();
            document.dispatchEvent(createNavigationEvent('rooms'));
          }),
          button('Przeglądaj zabiegi', ['btn-primary', 'm-3'], (event) => {
            event.preventDefault();
            document.dispatchEvent(createNavigationEvent('treatments'));
          }),
        ],
      }),
    ],
  });
  fragment.append(home);
  return fragment;
};

export default home;
