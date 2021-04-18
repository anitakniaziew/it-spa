import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import loader from '../../components/loader';
import img from '../../components/img';

const cart = () => {
  const fragment = document.createDocumentFragment();
  const h2 = createElement('h2', { children: ['Cart'] });
  const createStrong = (text) => createElement('strong', { children: [text] });
  const section = createElement('section', {
    children: [loader()],
  });

  fragment.append(h2, section);

  apiClient.get('/cart')
    .then((response) => response.data)
    .then((cartItems) => {
      const articles = cartItems.map((cartItem) => {
        const { quantity } = cartItem;
        const {
          name, price, coverPhoto,
        } = cartItem.treatmentDetails;

        const article = createElement('article', {
          children: [
            img(['cover-img'], coverPhoto, 400, 250),
            createElement('h2', { children: [name] }),
            createElement('p', {
              children: [createStrong('Quantity: '), quantity],
            }),
            createElement('p', {
              children: [
                createStrong('Price: '),
                `${price.toFixed(2)} zł`,
              ],
            }),
          ],
        });

        return article;
      });

      section.innerHTML = '';
      articles.forEach((article) => section.append(article));
    });

  fragment.append(section);

  return fragment;
};

export default cart;
