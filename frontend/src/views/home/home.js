import createElement from '../../helpers/createElement';

const home = () => {
  const fragment = document.createDocumentFragment();
  const home = createElement('div', {
    children: [
      createElement('h1', {
        children: ['Greetings from Mombassa!'],
      }),
    ],
  });
  fragment.append(home);
  return fragment;
};

export default home;
