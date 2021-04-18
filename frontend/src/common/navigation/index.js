import createElement from '../../helpers/createElement';
import button from '../../components/button';
import image from '../../components/img';
import logo from '../../assets/img/logo.png';
import cart from '../../assets/img/cart.svg';
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

  const cartImg = image(['cart'], cart, 25, 25);

  const cartButton = button(cartImg, ['nav-btn'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent('cart'));
  });

  const nav = createElement('nav', {
    classNames: ['nav', 'justify-content-between', 'align-items-center'],
    children: [
      spaLogo, buttonsContainer, cartButton,
    ],
  });

  return nav;
};

export default navigation;
