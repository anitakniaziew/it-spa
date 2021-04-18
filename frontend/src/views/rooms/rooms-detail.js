import axios from 'axios';
import createElement from '../../helpers/createElement';

const roomsDetail = ({ roomId }) => {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', {
    children: ['Loading...'],
  });

  axios.get(`http://localhost:3000/rooms/${roomId}`)
    .then((response) => response.data)
    .then(({
      name, description, beds, guests, price,
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
        ],
      });

      section.innerHTML = '';
      section.append(article);
    });

  fragment.append(section);

  return fragment;
};

export default roomsDetail;
