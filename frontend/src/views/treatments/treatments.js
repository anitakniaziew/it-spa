import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import loader from '../../components/loader';
import img from '../../components/img';
import button from '../../components/button';
import pageTitle from '../../components/pageTitle';

const treatments = () => {
  const fragment = document.createDocumentFragment();
  const title = pageTitle('Oferta zabiegów');
  const createStrong = (text) => createElement('strong', { children: [text] });
  const section = createElement('section', {
    children: [loader()],
  });

  fragment.append(title, section);

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
            itemType: 'treatmentCartItem',
            quantity: 1,
          }));

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
