import apiClient from '../../helpers/apiClient';
import img from '../../components/img';
import createElement from '../../helpers/createElement';
import button from '../../components/button';

const createStrong = (text) => createElement('strong', { children: [text] });

const removeCartItem = (id) => {
  apiClient.delete(`/cart/${id}`, {
    id,
  });
  document.getElementById(id).remove();
};

const renderTreatmentCartItem = (cartItem) => {
  const { id } = cartItem;
  let { quantity } = cartItem;
  const {
    name, price, coverPhoto,
  } = cartItem.treatmentDetails;

  const quantityContainer = createElement('p', {
    classNames: ['quantity'],
    children: [createStrong('Ilość: '), quantity],
  });
  const sumContainer = createElement('p', {
    children: [
      createStrong('Razem: '),
      `${(price * quantity).toFixed(2)} zł`,
    ],
  });

  const updateQuantity = () => {
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
  };

  const increaseQuantity = () => {
    quantity += 1;
    updateQuantity();
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;
    quantity -= 1;
    updateQuantity();
  };

  const article = createElement('article', {
    classNames: [id],
    children: [
      img(['cover-img'], coverPhoto, 400, 250),
      createElement('h2', { children: [name] }),
      quantityContainer,
      createElement('div', {
        classNames: ['buttons'],
        children: [
          button('+', ['btn-plus'], increaseQuantity),
          button('-', ['btn-minus'], decreaseQuantity),
        ],
      }),
      createElement('p', {
        children: [
          createStrong('Cena: '),
          `${price.toFixed(2)} zł`,
        ],
      }),
      sumContainer,
      button('x', ['btn-remove-cart-item'], () => removeCartItem(id)),
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
    children: [
      img(['cover-img'], coverPhoto, 400, 250),
      createElement('h2', { children: [name] }),
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
      button('x', ['btn-remove-cart-item'], () => removeCartItem(id)),
    ],
  });

  article.id = id;
  return article;
};

export { renderTreatmentCartItem, renderRoomCartItem };
