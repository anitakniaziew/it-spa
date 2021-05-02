import img from '../../components/img';
import createElement from '../../helpers/createElement';

const createStrong = (text) => createElement('strong', { children: [text] });

const renderTreatmentCartItem = (cartItem) => {
  const { quantity } = cartItem;
  const {
    name, price, coverPhoto,
  } = cartItem.treatmentDetails;

  const article = createElement('article', {
    children: [
      img(['cover-img'], coverPhoto, 400, 250),
      createElement('h2', { children: [name] }),
      createElement('p', {
        children: [createStrong('Quantity: '), quantity],
      }),
      createElement('p', {
        children: [
          createStrong('Price: '),
          `${price.toFixed(2)} zł`,
        ],
      }),
    ],
  });

  return article;
};

const renderRoomCartItem = (cartItem) => {
  const { reservationFrom, reservationTo } = cartItem;
  const {
    name, price, coverPhoto,
  } = cartItem.roomDetails;

  const article = createElement('article', {
    children: [
      img(['cover-img'], coverPhoto, 400, 250),
      createElement('h2', { children: [name] }),
      createElement('p', {
        children: [createStrong('Reservation from: '), reservationFrom],
      }),
      createElement('p', {
        children: [createStrong('Reservation to: '), reservationTo],
      }),
      createElement('p', {
        children: [
          createStrong('Price: '),
          `${price.toFixed(2)} zł`,
        ],
      }),
    ],
  });

  return article;
};

export { renderTreatmentCartItem, renderRoomCartItem };
