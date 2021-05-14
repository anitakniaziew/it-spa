import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import button from '../../components/button';
import pageTitle from '../../components/pageTitle';
import loader from '../../components/loader';
import { renderRoomCartItem, renderTreatmentCartItem } from './renderCartItem';
import { renderCartSummary } from './renderCartSummary';

const cart = () => {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', {
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
      articles.forEach((article) => section.append(article));

      const reservationButton = button('Zatwierdź rezerwację', ['nav-btn'], (event) => {
        event.preventDefault();
        apiClient.post('/reservations')
          .then(document.dispatchEvent(createNavigationEvent('reservations')))
          .catch(document.dispatchEvent(createNavigationEvent('login')));
      });

      section.append(cartSummary, reservationButton);
    });

  fragment.append(pageTitle('Zawartość koszyka'), section);

  return fragment;
};

export default cart;
