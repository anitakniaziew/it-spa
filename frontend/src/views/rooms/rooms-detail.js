import apiClient from '../../helpers/apiClient';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import button from '../../components/button';
import carousel from '../../components/carousel';
import loader from '../../components/loader';
import dateInput from '../../components/dateInput';
import pageTitle from '../../components/pageTitle';
import createElement from '../../helpers/createElement';
import roomParameters from './roomParameters';

const roomsDetail = ({ roomId }) => {
  const fragment = document.createDocumentFragment();
  const title = pageTitle('');
  const section = createElement('section', {
    classNames: ['rooms-details-section'],
    children: [loader()],
  });

  fragment.append(title, section);

  apiClient.get(`/rooms/${roomId}`)
    .then((response) => response.data)
    .then(({
      name, description, beds, guests, price, photos,
    }) => {
      const article = createElement('article', {
        children: [
          createElement('p', { classNames: ['room-description'], children: [description] }),
          carousel(photos),
          roomParameters(beds, guests, price),
        ],
      });

      title.innerText = name;
      section.innerHTML = '';
      section.append(article);

      const handleBooking = () => {
        apiClient.post('/cart', {
          id: roomId,
          itemType: 'roomCartItem',
          reservationFrom: document.getElementById('reservation-start').value,
          reservationTo: document.getElementById('reservation-end').value,
        })
          .then(() => document.dispatchEvent(createNavigationEvent('cart')))
          .catch(() => alert('Pokój już jest w koszyku!'));
      };

      const reservationForm = createElement('form', {
        classNames: ['reservation-from'],
        children: [
          dateInput('Od: ', 'reservation-start'),
          dateInput('Do: ', 'reservation-end'),
          button('Rezerwuj', ['btn-primary', 'reservation-btn'], handleBooking),
        ],
      });

      section.append(reservationForm);
    });

  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('carousel').carousel({
      interval: '3000',
    });
  });

  return fragment;
};

export default roomsDetail;
