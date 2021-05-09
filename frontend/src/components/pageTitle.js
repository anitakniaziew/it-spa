import createElement from '../helpers/createElement';

const pageTitle = (text) => createElement('h1', { id: 'page-title', classNames: ['page-title'], children: [text] });

export default pageTitle;
