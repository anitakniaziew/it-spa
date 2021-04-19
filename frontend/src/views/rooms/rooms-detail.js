import img from '../../components/img';
import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';

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
              createElement('strong', { children: ['Łóżka: '] }),
              beds,
            ],
          }),
          createElement('p', {
            children: [
              createElement('strong', { children: ['Liczba gości: '] }), guests,
            ],
          }),
          createElement('p', {
            children: [
              createElement('strong', { children: [`${price.toFixed(2)} zł / noc`] }),
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
