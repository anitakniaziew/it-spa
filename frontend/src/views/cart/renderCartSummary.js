import createElement from '../../helpers/createElement';

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
    children: [
      createElement('p', {
        children: [
          'Razem: ',
          createElement('strong', { id: 'cartTotalValue', children: [cartTotalValue] }),
          createElement('strong', { children: [' zł'] }),
        ],
      }),
    ],
  });

  const emptyCart = createElement('div', {
    children: ['Koszyk jest pusty'],
  });

  return cartTotalValue === 0 ? emptyCart : cartSummary;
};

export { renderCartSummary, calculateTotalCartValue };
