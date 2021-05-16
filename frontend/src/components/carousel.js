import createElement from '../helpers/createElement';
import img from './img';

const carousel = (photos) => {
  const prevBtn = createElement('a', {
    classNames: ['carousel-control-prev'],
    children: [
      createElement('span', {
        classNames: ['carousel-control-prev-icon'],
      }),
      createElement('span', {
        classNames: ['sr-only'],
        children: ['Previous'],
      }),
    ],
  });
  prevBtn.href = '#carousel';
  prevBtn.role = 'button';
  prevBtn.setAttribute('data-slide', 'prev');
  prevBtn.setAttribute('aria-hidden', 'true');

  const nextBtn = createElement('a', {
    classNames: ['carousel-control-next'],
    children: [
      createElement('span', {
        classNames: ['carousel-control-next-icon'],
      }),
      createElement('span', {
        classNames: ['sr-only'],
        children: ['Next'],
      }),
    ],
  });
  nextBtn.href = '#carousel';
  nextBtn.role = 'button';
  nextBtn.setAttribute('data-slide', 'next');
  nextBtn.setAttribute('aria-hidden', 'true');

  const carouselElement = createElement('div', {
    id: 'carousel',
    classNames: ['carousel', 'slide'],
    children: [
      createElement('div', {
        classNames: ['carousel-inner'],
        children: photos.map((photo, index) => createElement('div', {
          classNames: ['carousel-item', index === 0 && 'active'],
          children: [
            img(['gallery', 'd-block', 'w-100'], photo),
          ],
        })),
      }),
      prevBtn,
      nextBtn,
    ],
  });
  carouselElement.setAttribute('data-ride', 'carousel');

  return carouselElement;
};

export default carousel;
