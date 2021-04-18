import createElement from '../helpers/createElement';
import button from '../common/atoms/button';
import image from '../common/atoms/img';
import logo from '../assets/img/logo.png';
import './navigation.scss';

const navItems = ['home', 'rooms', 'treatments'];

const createNavigationEvent = (view, params = {}) => new CustomEvent('navigation', {
  detail: {
    view,
    params,
  },
});

const navigation = () => {
  const img = image(['logo-img'], logo, 120, 90);

  const name = createElement('h1', { classNames: ['name'], children: ['IT-SPA'] });

  const spaLogo = createElement('div', { classNames: ['d-flex', 'flex-row', 'justify-content-center', 'align-items-center'], children: [img, name] });

  const buttons = navItems.map((item) => button(item, ['nav-btn'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent(item));
  }));

  const buttonsContainer = createElement('div', {
    classNames: [],
    children: buttons,
  });

  const nav = createElement('nav', {
    classNames: ['nav', 'justify-content-between', 'align-items-center'],
    children: [
      spaLogo, buttonsContainer,
    ],
  });

  return nav;
};

export default navigation;
