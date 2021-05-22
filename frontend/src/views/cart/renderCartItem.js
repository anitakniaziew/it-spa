import apiClient from '../../helpers/apiClient';
import img from '../../components/img';
import createElement from '../../helpers/createElement';
import button from '../../components/button';

const createStrong = (text) => createElement('strong', { classNames: ['mr-1'], children: [text] });

const removeCartItem = (id, price, quantity = 1) => {
  apiClient.delete(`/cart/${id}`, {
    id,
  });
  document.getElementById('cartTotalValue').innerText -= price * quantity;
  document.getElementById(id).remove();
};

const renderTreatmentCartItem = (cartItem) => {
  const { id } = cartItem;
  let { quantity } = cartItem;
  const {
    name, price, coverPhoto,
  } = cartItem.treatmentDetails;

  const quantityContainer = createElement('p', {
    classNames: ['quantity', 'd-flex', 'my-1'],
    children: [createStrong('Ilość: '), quantity],
  });
  const sumContainer = createElement('p', {
    children: [
      createStrong('Razem: '),
      `${(price * quantity).toFixed(2)} zł`,
    ],
  });

  const updateQuantity = (operation = 'subtract') => {
    apiClient.put(`/cart/${id}`, {
      id,
      itemType: 'treatmentCartItem',
      quantity,
    });
    quantityContainer.innerHTML = '';
    quantityContainer.append(createStrong('Ilość: '), quantity);
    sumContainer.innerHTML = '';
    sumContainer.append(createStrong('Razem: '),
      `${(price * quantity).toFixed(2)} zł`);
    const currentCartSum = parseInt(document.getElementById('cartTotalValue').innerHTML, 10);
    const newCartSum = operation === 'add' ? currentCartSum + price : currentCartSum - price;

    document.getElementById('cartTotalValue').innerHTML = newCartSum;
  };

  const increaseQuantity = () => {
    quantity += 1;
    updateQuantity('add');
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;
    quantity -= 1;
    updateQuantity();
  };

  const article = createElement('article', {
    classNames: ['cart-article', 'mb-3'],
    children: [
      createElement('div', {
        classNames: ['cart-article-header', 'd-flex', 'justify-content-between', 'align-items-center'],
        children: [
          createElement('h4', { children: [name] }),
          button('x', ['btn-remove-cart-item'], () => removeCartItem(id, price, quantity)),
        ],
      }),
      createElement('div', {
        children: [
          img(['cover-img'], coverPhoto),
          createElement('div', {
            classNames: ['buttons', 'd-flex'],
            children: [
              quantityContainer,
              button('+', ['change-quantity-btn', 'align-items-center'], increaseQuantity),
              button('-', ['change-quantity-btn', 'align-items-center'], decreaseQuantity),
            ],
          }),
          createElement('p', {
            children: [
              createStrong('Cena: '),
              `${price.toFixed(2)} zł`,
            ],
          }),
        ],
      }),

      sumContainer,
    ],
  });

  article.id = id;
  return article;
};

const renderRoomCartItem = (cartItem) => {
  const { id, reservationFrom, reservationTo } = cartItem;
  const {
    name, price, coverPhoto,
  } = cartItem.roomDetails;

  const article = createElement('article', {
    classNames: ['cart-article', 'mb-3'],
    children: [
      createElement('div', {
        classNames: ['cart-article-header', 'd-flex', 'justify-content-between', 'align-items-center'],
        children: [
          createElement('h4', { children: [name] }),
          button('x', ['btn-remove-cart-item'], () => removeCartItem(id, price)),
        ],
      }),
      img(['cover-img'], coverPhoto),
      createElement('p', {
        children: [createStrong('Rezerwacja od: '), reservationFrom],
      }),
      createElement('p', {
        children: [createStrong('Rezerwacja do: '), reservationTo],
      }),
      createElement('p', {
        children: [
          createStrong('Cena: '),
          `${price.toFixed(2)} zł`,
        ],
      }),
    ],
  });

  article.id = id;
  return article;
};

export { renderTreatmentCartItem, renderRoomCartItem };
