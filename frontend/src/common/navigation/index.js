import apiClient from '../../helpers/apiClient';
import { showCartPreview, hideCartPreview } from '../cartPreview/cartPreview';
import createElement from '../../helpers/createElement';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import button from '../../components/button';
import image from '../../components/img';
import logo from '../../assets/img/logo.png';
import cart from '../../assets/img/cart.svg';
import './navigation.scss';

const navItems = [{ rooms: 'pokoje' }, { treatments: 'zabiegi' }];

const loginButton = button('Zaloguj', ['nav-btn'], (event) => {
  event.preventDefault();
  document.dispatchEvent(createNavigationEvent('login'));
});

const logoutButton = button('Wyloguj', ['nav-btn'], () => {
  apiClient.get('/logout')
    .then(() => {
      localStorage.removeItem('isUserLogged');
      document.getElementById('login-wrapper').innerHTML = '';
      document.getElementById('login-wrapper').append(loginButton);
      alert('Wylogowano');
    });
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

  const loginWrapper = createElement('div', { id: 'login-wrapper' });

  const nav = createElement('nav', {
    classNames: ['nav', 'justify-content-between', 'align-items-center'],
    children: [
      homeButton, buttonsContainer, loginWrapper, cartButton,
    ],
  });

  loginWrapper.append(localStorage.getItem('isUserLogged') ? logoutButton : loginButton);

  return nav;
};

export default navigation;
export { logoutButton };
