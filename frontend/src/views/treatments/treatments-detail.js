import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import img from '../../components/img';
import pageTitle from '../../components/pageTitle';
import button from '../../components/button';
import loader from '../../components/loader';

const treatmentsDetail = ({ treatmentId }) => {
  const fragment = document.createDocumentFragment();
  const title = pageTitle('Szczegóły');
  const section = createElement('section', {
    children: [loader()],
  });

  fragment.append(title, section);

  apiClient.get(`/treatments/${treatmentId}`)
    .then((response) => response.data)
    .then(({
      name, description, area, time, price, coverPhoto,
    }) => {
      const article = createElement('article', {
        children: [
          img(['cover-img'], coverPhoto, 300, 250),
          createElement('h2', { children: [name] }),
          createElement('p', { children: [description] }),
          createElement('p', {
            children: [
              createElement('strong', { children: ['Area: '] }),
              area,
            ],
          }),
          createElement('p', {
            children: [
              createElement('strong', { children: ['Time: '] }),
              time,
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

      const btn = button('Dodaj do koszyka', ['cart-btn'],
        () => apiClient.post('/cart', {
          id: treatmentId,
          itemType: 'treatmentCartItem',
          quantity: 1,
        }));

      section.innerHTML = '';
      section.append(article, btn);
    });

  return fragment;
};

export default treatmentsDetail;
