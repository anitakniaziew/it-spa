import img from '../../components/img';
import loader from '../../components/loader';
import pageTitle from '../../components/pageTitle';
import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import roomParameters from './roomParameters';

const roomsDetail = ({ roomId }) => {
  const fragment = document.createDocumentFragment();
  const title = pageTitle('Szczegóły');
  const section = createElement('section', {
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
          createElement('h2', { children: [name] }),
          createElement('p', { children: [description] }),
          roomParameters(beds, guests, price),
          createElement('div', { children: photos.map((photo) => img(['gallery'], photo, 400, 250)) }),
        ],
      });

      section.innerHTML = '';
      section.append(article);
    });

  return fragment;
};

export default roomsDetail;
