import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import loader from '../../components/loader';
import img from '../../components/img';
import button from '../../components/button';
import pageTitle from '../../components/pageTitle';
import treatmentParameters from './treatmentParameters';

import './treatments.scss';

const treatments = () => {
  const fragment = document.createDocumentFragment();
  const title = pageTitle('Oferta zabiegów');
  const section = createElement('section', {
    classNames: ['treatments-section'],
    children: [loader()],
  });

  fragment.append(title, section);

  const displayTreatmentDetails = (event, id) => {
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
  };

  apiClient.get('/treatments')
    .then((response) => response.data)
    .then((treatments) => {
      const articles = treatments.map(({
        id, name, area, time, price, coverPhoto,
      }) => {
        const article = createElement('article', {
          classNames: ['treatment-item'],
          children: [
            img(['cover-img', 'w-100', 'my-3'], coverPhoto),
            createElement('h4', { classNames: ['treatment-name'], children: [name] }),
            treatmentParameters(area, time, price),
            button('Szczegóły', ['btn-primary'],
              (event) => displayTreatmentDetails(event, id)),
          ],
        });

        article.addEventListener('click', (event) => displayTreatmentDetails(event, id));

        return article;
      });

      section.innerHTML = '';
      articles.forEach((article) => section.append(article));
    });
  return fragment;
};

export default treatments;
