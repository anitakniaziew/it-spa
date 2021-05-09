import {
  home, rooms, roomsDetail, treatments, treatmentsDetail, cart, reservations,
} from '../../views';
import createElement from '../../helpers/createElement';
import './main.scss';

const views = new Map([
  ['home', home],
  ['rooms', rooms],
  ['rooms-detail', roomsDetail],
  ['treatments', treatments],
  ['treatments-detail', treatmentsDetail],
  ['cart', cart],
  ['reservations', reservations],
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
