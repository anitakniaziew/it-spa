import createElement from '../../helpers/createElement';
import pageTitle from '../../components/pageTitle';
import loader from '../../components/loader';

const reservations = () => {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', {
    children: [loader()],
  });

  const article = 'Tu powinny być';
  section.innerHTML = '';
  section.append(article);

  fragment.append(pageTitle('Rezerwacje'), section);

  return fragment;
};

export default reservations;
