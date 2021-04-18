import axios from 'axios';
import createElement from '../../helpers/createElement';
import loader from '../../components/loader';

const rooms = () => {
  const fragment = document.createDocumentFragment();
  const h2 = createElement('h2', { children: ['Rooms'] });
  const createStrong = (text) => createElement('strong', { children: [text] });
  const section = createElement('section', {
    children: [loader()],
  });

  fragment.append(h2, section);

  axios.get('http://localhost:3000/rooms')
    .then((response) => response.data)
    .then((rooms) => {
      const articles = rooms.map(({
        id, name, beds, guests, price,
      }) => {
        const article = createElement('article', {
          children: [
            createElement('h4', { children: [name] }),
            createElement('p', {
              children: [createStrong('Beds: '), beds],
            }),
            createElement('p', {
              children: [createStrong('Guests: '), guests],
            }),
            createElement('p', {
              children: [
                createStrong('Price: '),
                `${price.toFixed(2)} zł`,
              ],
            }),
          ],
        });

        article.addEventListener('click', (event) => {
          event.preventDefault();
          const navigationEvent = new CustomEvent('navigation', {
            detail: {
              view: 'rooms-detail',
              roomId: id,
            },
          });

          document.dispatchEvent(navigationEvent);
        });

        return article;
      });

      section.innerHTML = '';
      articles.forEach((article) => section.append(article));
    });
  return fragment;
};

export default rooms;
