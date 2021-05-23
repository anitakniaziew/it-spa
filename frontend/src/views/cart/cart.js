import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import pageTitle from '../../components/pageTitle';
import loader from '../../components/loader';
import { renderRoomCartItem, renderTreatmentCartItem } from './renderCartItem';
import { renderCartSummary } from './renderCartSummary';

import './cart.scss';

const cart = () => {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', {
    id: 'cart-section',
    classNames: ['cart-section'],
    children: [loader()],
  });

  apiClient.get('/cart')
    .then((response) => response.data)
    .then((cartItems) => {
      const cartSummary = renderCartSummary(cartItems);
      const articles = cartItems.map((cartItem) => {
        switch (cartItem.itemType) {
          case 'treatmentCartItem':
            return renderTreatmentCartItem(cartItem);
          case 'roomCartItem':
            return renderRoomCartItem(cartItem);
          default:
            return null;
        }
      });

      section.innerHTML = '';

      const cartItemsContainer = createElement('div', { id: 'cart-items-container', classNames: ['cart-items-container'] });
      articles.forEach((article) => cartItemsContainer.append(article));

      const emptyCart = createElement('div', {
        classNames: ['text-center'],
        children: ['Koszyk jest pusty!'],
      });

      const isCartEmpty = () => cartItems.length === 0;

      if (isCartEmpty()) {
        section.classList.add('cart-empty');
        section.append(emptyCart);
      } else {
        section.append(cartItemsContainer, cartSummary);
      }
    });

  fragment.append(pageTitle('Zawartość koszyka'), section);

  return fragment;
};

export default cart;
