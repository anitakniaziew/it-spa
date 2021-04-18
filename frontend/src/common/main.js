import { home, rooms, roomsDetail } from '../views';
import createElement from '../helpers/createElement';
import './main.scss';

const views = new Map([
  ['home', home],
  ['rooms', rooms],
  ['rooms-detail', roomsDetail],
]);

const main = () => {
  const section = createElement('section', {
    children: [home()],
  });

  document.addEventListener('navigation', (event) => {
    const { detail } = event;
    const { view, params } = detail;

    section.innerHTML = '';
    const viewFn = views.get(view);
    section.append(viewFn ? viewFn(params) : createElement('h1', { children: ['Something went wrong...'] }));
  });

  return createElement('main', { classNames: ['main', 'd-flex', 'justify-content-center'], children: [section] });
};

export default main;
