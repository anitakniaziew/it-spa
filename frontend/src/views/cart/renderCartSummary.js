import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import button from '../../components/button';

const calculateTotalCartValue = (cartItems) => {
  const sum = cartItems.reduce((total, cartItem) => {
    switch (cartItem.itemType) {
      case 'treatmentCartItem':
        return total + cartItem.quantity * cartItem.treatmentDetails.price;
      case 'roomCartItem':
        return total + cartItem.roomDetails.price;
      default:
        return null;
    }
  }, 0);

  return sum;
};

const renderCartSummary = (cartItems) => {
  const cartTotalValue = calculateTotalCartValue(cartItems);

  const cartSummary = createElement('div', {
    classNames: ['cart-summary'],
    children: [
      createElement('h1', {
        children: [
          createElement('p', { children: ['Razem:'] }),
          createElement('strong', { id: 'cartTotalValue', children: [cartTotalValue] }),
          createElement('strong', { children: [' zł'] }),
        ],
      }),
    ],
  });

  const reservationButton = button('Zatwierdź rezerwację', ['btn-primary'], (event) => {
    event.preventDefault();
    apiClient.post('/reservations')
      .then(() => document.dispatchEvent(createNavigationEvent('reservations')))
      .catch(() => document.dispatchEvent(createNavigationEvent('login', { redirectTo: 'cart' })));
  });

  const isCartEmpty = () => cartTotalValue === 0;
  if (!isCartEmpty()) cartSummary.append(reservationButton);

  return cartSummary;
};

export { renderCartSummary, calculateTotalCartValue };
