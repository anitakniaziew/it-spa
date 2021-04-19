import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import loader from '../../components/loader';
import img from '../../components/img';
import button from '../../components/button';

const treatments = () => {
  const fragment = document.createDocumentFragment();
  const h2 = createElement('h2', { children: ['Oferta zabiegów'] });
  const createStrong = (text) => createElement('strong', { children: [text] });
  const section = createElement('section', {
    children: [loader()],
  });

  fragment.append(h2, section);

  apiClient.get('/treatments')
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
              children: [createStrong('Obszar ciała: '), area],
            }),
            createElement('p', {
              children: [createStrong('Czas: '), `${time} min.`],
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
        const div = createElement('div');

        const btn = button('Dodaj do koszyka', ['cart-btn'],
          () => apiClient.post('/cart', {
            id,
            itemType: 'NewTreatmentCartItem',
            quantity: 1,
          }, { withCredentials: true }));

        div.append(article);
        div.append(btn);

        return div;
      });

      section.innerHTML = '';
      articles.forEach((article) => section.append(article));
    });
  return fragment;
};

export default treatments;
