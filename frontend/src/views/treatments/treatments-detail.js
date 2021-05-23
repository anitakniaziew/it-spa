import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import img from '../../components/img';
import pageTitle from '../../components/pageTitle';
import button from '../../components/button';
import loader from '../../components/loader';
import treatmentParameters from './treatmentParameters';

const treatmentsDetail = ({ treatmentId }) => {
  const fragment = document.createDocumentFragment();
  const title = pageTitle('');
  const section = createElement('section', {
    classNames: ['treatments-details-section'],
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
          img(['cover-img'], coverPhoto),
          createElement('p', { children: [description] }),
          treatmentParameters(area, time, price),
        ],
      });

      title.innerText = name;

      const btn = button('Dodaj do koszyka', ['btn-primary'],
        () => {
          apiClient.post('/cart', {
            id: treatmentId,
            itemType: 'treatmentCartItem',
            quantity: 1,
          }).then(() => document.dispatchEvent(createNavigationEvent('cart')));
        });

      section.innerHTML = '';
      section.append(article, btn);
    });

  return fragment;
};

export default treatmentsDetail;
