import apiClient from '../../helpers/apiClient';
import { showCartPreview, hideCartPreview } from '../cartPreview/cartPreview';
import createElement from '../../helpers/createElement';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import isUserLogged from '../../helpers/isUserLogged';
import button from '../../components/button';
import image from '../../components/img';
import link from '../../components/link';
import logo from '../../assets/img/logo.svg';
import menu from '../../assets/img/menu.svg';
import close from '../../assets/img/close-menu.svg';
import cart from '../../assets/img/cart.svg';
import login from '../../assets/img/log-in.svg';
import logout from '../../assets/img/log-out.svg';
import calendar from '../../assets/img/reservations.svg';

import './navigation.scss';

const navItemsLabels = [{ home: 'strona główna' }, { rooms: 'pokoje' }, { treatments: 'zabiegi' }];

const loginButton = link(image(['icon-img'], login, 25, 25), ['nav-icon'], (event) => {
  event.preventDefault();
  document.dispatchEvent(createNavigationEvent('login'));
});

const logoutButton = link(image(['icon-img'], logout, 25, 25), ['nav-icon'], () => {
  apiClient.get('/logout')
    .then(() => {
      localStorage.removeItem('isUserLogged');
      document.getElementById('login-wrapper').innerHTML = '';
      document.getElementById('login-wrapper').append(loginButton);
      document.dispatchEvent(createNavigationEvent('home'));
    });
});

const reservations = link(image(['icon-img'], calendar, 25, 25), ['nav-icon'], (event) => {
  event.preventDefault();
  document.dispatchEvent(createNavigationEvent('reservations'));
});

const userIcons = createElement('div', {
  classNames: ['d-flex'],
  children: [
    reservations,
    logoutButton,
  ],
});

const navigation = () => {
  let isMenuOpen = false;

  const menuButton = link(image(['icon-img'], menu, 25, 25), ['menu-btn', 'nav-icon'], (event) => {
    event.preventDefault();
    document.getElementById('nav-links-mobile').classList.toggle('nav-links-mobile-open');

    isMenuOpen = !isMenuOpen;
    const menuBtn = document.getElementById('menu-btn');
    menuBtn.innerHTML = '';
    menuBtn.append(image(['icon-img'], isMenuOpen ? close : menu, 25, 25));
  });
  menuButton.id = 'menu-btn';

  const logoWrapper = createElement('div', {
    classNames: ['d-flex', 'align-items-center'],
    children: [
      image(['logo-img'], logo, 24, 24),
      createElement('p', { classNames: ['text-decoration-none', 'text-uppercase'], children: ['it spa and wellness'] }),
    ],
  });

  const homeButton = link(logoWrapper, ['logo'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent('home'));
  });

  const navItemsDesktop = navItemsLabels.map((item) => link(Object.values(item), ['nav-link'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent(Object.keys(item)[0]));
  }));

  const navLinksDesktop = createElement('div', {
    classNames: ['nav', 'nav-links'],
    children: navItemsDesktop,
  });

  const navItemsMobile = navItemsLabels.map((item) => link(Object.values(item), ['nav-link'], (event) => {
    event.preventDefault();
    document.getElementById('nav-links-mobile').classList.remove('nav-links-mobile-open');
    document.dispatchEvent(createNavigationEvent(Object.keys(item)[0]));

    isMenuOpen = false;
    const menuBtn = document.getElementById('menu-btn');
    menuBtn.innerHTML = '';
    menuBtn.append(image(['icon-img'], menu, 25, 25));
  }));

  const navLinksMobile = createElement('div', {
    id: 'nav-links-mobile',
    classNames: ['nav-links-mobile'],
    children: navItemsMobile,
  });

  const loginWrapper = createElement('div', { id: 'login-wrapper' });
  loginWrapper.append(isUserLogged() ? userIcons : loginButton);

  const cartButton = button(image(['icon-img'], cart, 25, 25), ['nav-icon'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent('cart'));
  }, showCartPreview, hideCartPreview);

  const navIcons = createElement('div', {
    classNames: ['nav'],
    children: [
      loginWrapper, cartButton,
    ],
  });

  const navbar = createElement('navbar', {
    classNames: ['navbar', 'justify-content-between', 'align-items-center'],
    children: [
      navLinksMobile, menuButton, navLinksDesktop, homeButton, navIcons,
    ],
  });

  return navbar;
};

export default navigation;
export { userIcons };
