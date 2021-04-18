import createElement from '../helpers/createElement';

const div = (classNames) => createElement('div', { classNames });
const span = (classNames) => createElement('span', { classNames });

const loader = () => createElement('div', {
  children: [
    div(['spinner-grow', 'text-info', 'mr-3'], span(['sr-only'])),
    div(['spinner-grow', 'text-info', 'mr-3'], span(['sr-only'])),
    div(['spinner-grow', 'text-info', 'mr-3'], span(['sr-only'])),
  ],
});

export default loader;
