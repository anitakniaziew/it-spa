import axios from 'axios';
import createElement from '../../helpers/createElement';
import loader from '../../components/loader';
import img from '../../components/img';

const treatments = () => {
  const fragment = document.createDocumentFragment();
  const h2 = createElement('h2', { children: ['Treatments'] });
  const createStrong = (text) => createElement('strong', { children: [text] });
  const section = createElement('section', {
    children: [loader()],
  });

  fragment.append(h2, section);

  axios.get('http://localhost:3000/treatments')
    .then((response) => response.data)
    .then((treatments) => {
      const articles = treatments.map(({
        id, name, area, time, price, coverPhoto,
      }) => {
        const article = createElement('article', {
          children: [
            img(['cover-img'], coverPhoto, 300, 250),
            createElement('h4', { children: [name] }),
            createElement('p', {
              children: [createStrong('Area: '), area],
            }),
            createElement('p', {
              children: [createStrong('Time: '), time],
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
              view: 'treatments-detail',
              params: {
                treatmentId: id,
              },
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

export default treatments;
