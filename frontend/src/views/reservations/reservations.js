import createElement from '../../helpers/createElement';
import apiClient from '../../helpers/apiClient';
import pageTitle from '../../components/pageTitle';
import loader from '../../components/loader';
import img from '../../components/img';
import chevron from '../../assets/img/chevron.svg';

import './reservations.scss';

const p = (textBold, textRegular = '') => createElement('p', {
  classNames: ['mb-2'],
  children: [
    createElement('strong', { children: [textBold] }),
    textRegular,
  ],
});

const generateReservationItem = (reservationItem) => {
  const { id, createdAt, items } = reservationItem;

  const reservationContainer = createElement('div', {
    classNames: ['my-3', 'reservation-item'],
    children: [
      createElement('div', {
        classNames: ['reservation-header', 'p-2'],
        children: [
          p('Rezerwacja: ', id),
          p('Data utworzenia: ', createdAt),
        ],
      }),
    ],
  });

  const reservationDetailsList = items.map((item) => {
    const { itemType } = item;
    const { name, price, coverPhoto } = item.treatmentDetails || item.roomDetails;

    const details = createElement('div', {
      classNames: ['my-2', 'p-2', 'd-flex'],
      children: [
        img(['mr-2', 'cover-img'], coverPhoto),
        createElement('div', {
          classNames: ['details'],
          children: [
            createElement('h6', { children: [name] }),
            p('Cena: ', `${price.toFixed(2)} zł`),
            itemType === 'treatmentCartItem' ? p('Ilość: ', `${item.quantity} szt.`) : '',
            itemType === 'roomCartItem' ? p('Data pobytu: ', `${item.reservationFrom} - ${item.reservationTo}`) : '',
          ],
        }),
      ],
    });

    return details;
  });

  const reservationDetails = createElement('div', { classNames: ['reservation-details'] });

  reservationDetailsList.map((item) => reservationDetails.append(item));
  reservationContainer.append(reservationDetails);

  const toggleButtonIcon = img(['toggle-btn-icon', 'd-block', 'm-auto'], chevron);

  const hideReservationDetails = () => {
    reservationDetails.classList.toggle('hidden');
    toggleButtonIcon.classList.toggle('active');
  };

  const toggleButton = createElement('div', {
    classNames: ['toggle-btn-wrapper'],
    children: [
      toggleButtonIcon,
    ],
  });

  toggleButton.addEventListener('click', () => hideReservationDetails());

  reservationContainer.append(toggleButton);
  return reservationContainer;
};

const reservations = () => {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', {
    classNames: ['reservations-section'],
    children: [loader()],
  });

  apiClient.get('/reservations')
    .then((response) => response.data)
    .then((reservations) => {
      if (reservations.length === 0) {
        section.innerHTML = "Nie masz jeszcze żadnych rezerwacji"
        return;
      }

      const lastReservation = reservations.pop();
      const lastReservationItem = createElement('article', {
        classNames: ['my-3', 'reservation-article'],
        children: [
          generateReservationItem(lastReservation),
        ],
      });

      const historicalReservations = createElement('article', {
        classNames: ['my-3', 'reservation-article'],
      });

      const articles = reservations.reverse().map(generateReservationItem);
      articles.map((article) => historicalReservations.append(article));

      const reservationsColumns = createElement('div', {
        classNames: ['reservations-columns'],
        children: [
          lastReservationItem,
          historicalReservations,
        ],
      });

      section.innerHTML = '';
      section.append(reservationsColumns);
    });

  fragment.append(pageTitle('Twoje rezerwacje'), section);

  return fragment;
};

export default reservations;
