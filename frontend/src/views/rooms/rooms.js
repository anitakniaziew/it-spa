import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import loader from '../../components/loader';
import img from '../../components/img';
import pageTitle from '../../components/pageTitle';
import button from '../../components/button';
import roomParameters from './roomParameters';

import './rooms.scss';

const rooms = () => {
  const fragment = document.createDocumentFragment();
  const title = pageTitle('Pokoje');
  const section = createElement('section', {
    classNames: ['rooms-section'],
    children: [loader()],
  });

  fragment.append(title, section);

  const displayRoomDetails = (event, id) => {
    event.preventDefault();
    const navigationEvent = new CustomEvent('navigation', {
      detail: {
        view: 'rooms-detail',
        params: {
          roomId: id,
        },
      },
    });

    document.dispatchEvent(navigationEvent);
  };

  apiClient.get('/rooms')
    .then((response) => response.data)
    .then((rooms) => {
      const articles = rooms.map(({
        id, name, beds, guests, price, coverPhoto,
      }) => {
        const article = createElement('article', {
          classNames: ['room-item'],
          children: [
            img(['cover-img'], coverPhoto),
            createElement('h4', { classNames: ['room-name'], children: [name] }),
            roomParameters(beds, guests, price),
            button('Zobacz więcej', ['btn-primary'], (event) => displayRoomDetails(event, id)),
          ],
        });

        article.addEventListener('click', (event) => displayRoomDetails(event, id));

        return article;
      });

      section.innerHTML = '';
      articles.forEach((article) => section.append(article));
    });
  return fragment;
};

export default rooms;
