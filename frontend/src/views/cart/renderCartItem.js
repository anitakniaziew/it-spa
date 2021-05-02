import apiClient from '../../helpers/apiClient';
import img from '../../components/img';
import createElement from '../../helpers/createElement';
import button from '../../components/button';

const createStrong = (text) => createElement('strong', { children: [text] });

const renderTreatmentCartItem = (cartItem) => {
  const { id, quantity } = cartItem;
  const {
    name, price, coverPhoto,
  } = cartItem.treatmentDetails;

  const increaseQuantity = () => {
    apiClient.put(`/cart/${id}`, {
      id,
      itemType: 'treatmentCartItem',
      quantity: quantity + 1,
    });
  };

  const decreaseQuantity = () => {
    apiClient.put(`/cart/${id}`, {
      id,
      itemType: 'treatmentCartItem',
      quantity: quantity - 1,
    });
  };

  const removeCartItem = () => {
    apiClient.delete(`/cart/${id}`, {
      id,
    });
    document.getElementById(id).remove();
  };

  const article = createElement('article', {
    classNames: [id],
    children: [
      img(['cover-img'], coverPhoto, 400, 250),
      createElement('h2', { children: [name] }),
      createElement('p', {
        classNames: ['quantity'],
        children: [createStrong('Ilość: '), quantity],
      }),
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
      createElement('p', {
        children: [
          createStrong('Razem: '),
          `${(price * quantity).toFixed(2)} zł`,
        ],
      }),
      button('x', ['btn-remove-cart-item'], removeCartItem),
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

  const removeCartItem = () => {
    apiClient.delete(`/cart/${id}`, {
      id,
    });
    document.getElementById(id).remove();
  };

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
      button('x', ['btn-remove-cart-item'], removeCartItem),
    ],
  });

  article.id = id;
  return article;
};

export { renderTreatmentCartItem, renderRoomCartItem };
