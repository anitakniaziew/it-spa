import { home, rooms, roomsDetail } from '../views';
import createElement from '../helpers/createElement';
import './main.scss';

const main = () => {
  const section = createElement('section', {
    children: [home()],
  });

  document.addEventListener('navigation', (event) => {
    const { detail } = event;
    const { view, roomId } = detail;

    const views = new Map([
      ['home', home()],
      ['rooms', rooms()],
      ['rooms-detail', roomsDetail(roomId)],
    ]);

    const viewFn = () => views.get(view);
    section.innerHTML = '';
    section.append(view ? viewFn() : 'Something went wrong...');
  });

  return createElement('main', { classNames: ['main', 'd-flex', 'justify-content-center'], children: [section] });
};

export default main;
