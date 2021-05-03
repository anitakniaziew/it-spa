import { showCartPreview, hideCartPreview } from '../cartPreview/cartPreview';
import createElement from '../../helpers/createElement';
import button from '../../components/button';
import image from '../../components/img';
import logo from '../../assets/img/logo.png';
import cart from '../../assets/img/cart.svg';
import './navigation.scss';

const navItems = [{ rooms: 'pokoje' }, { treatments: 'zabiegi' }];

const createNavigationEvent = (view, params = {}) => new CustomEvent('navigation', {
  detail: {
    view,
    params,
  },
});

const navigation = () => {
  const spaLogo = image(['logo-img'], logo, 60, 45);

  const homeButton = button(spaLogo, ['btn'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent('home'));
  });

  const buttons = navItems.map((item) => button(Object.values(item), ['nav-btn'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent(Object.keys(item)[0]));
  }));

  const buttonsContainer = createElement('div', {
    classNames: [],
    children: buttons,
  });

  const cartImg = image(['cart'], cart, 25, 25);

  const cartButton = button(cartImg, ['nav-btn'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent('cart'));
  }, showCartPreview, hideCartPreview);

  const nav = createElement('nav', {
    classNames: ['nav', 'justify-content-between', 'align-items-center'],
    children: [
      homeButton, buttonsContainer, cartButton,
    ],
  });

  return nav;
};

export default navigation;
