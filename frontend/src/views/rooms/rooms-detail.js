import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import img from '../../components/img';

const roomsDetail = ({ roomId }) => {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', {
    children: ['Loading...'],
  });

  apiClient.get(`/rooms/${roomId}`)
    .then((response) => response.data)
    .then(({
      name, description, beds, guests, price, photos,
    }) => {
      const article = createElement('article', {
        children: [
          createElement('h2', { children: [name] }),
          createElement('p', { children: [description] }),
          createElement('p', {
            children: [
              createElement('strong', { children: ['Beds: '] }),
              beds,
            ],
          }),
          createElement('p', {
            children: [
              createElement('strong', { children: ['Guests: '] }),
              guests,
            ],
          }),
          createElement('p', {
            children: [
              createElement('strong', { children: ['Price: '] }),
              `${price.toFixed(2)} zł`,
            ],
          }),
          createElement('div', { children: photos.map((photo) => img(['abc'], photo, 400, 250)) }),
        ],
      });

      section.innerHTML = '';
      section.append(article);
    });

  fragment.append(section);

  return fragment;
};

export default roomsDetail;
