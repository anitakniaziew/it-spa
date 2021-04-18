import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import img from '../../components/img';

const treatmentsDetail = ({ treatmentId }) => {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', {
    children: ['Loading...'],
  });

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

      section.innerHTML = '';
      section.append(article);
    });

  fragment.append(section);

  return fragment;
};

export default treatmentsDetail;
