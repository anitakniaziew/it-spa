import createElement from '../helpers/createElement';

const pageTitle = (text) => createElement('h1', { classNames: ['page-title'], children: [text] });

export default pageTitle;
