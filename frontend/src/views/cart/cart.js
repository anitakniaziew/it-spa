import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import pageTitle from '../../components/pageTitle';
import loader from '../../components/loader';
import img from '../../components/img';

const cart = () => {
  const fragment = document.createDocumentFragment();
  const createStrong = (text) => createElement('strong', { children: [text] });
  const section = createElement('section', {
    children: [loader()],
  });

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

  fragment.append(pageTitle('Zawartość koszyka'), section);

  return fragment;
};

export default cart;
