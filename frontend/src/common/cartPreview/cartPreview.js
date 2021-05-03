import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import img from '../../components/img';
import button from '../../components/button';
import './cartPreview.scss';

const createNavigationEvent = (view, params = {}) => new CustomEvent('navigation', {
  detail: {
    view,
    params,
  },
});

const renderPreviewCartItem = (cartItem) => {
  const { id, itemType } = cartItem;
  const {
    name, price, coverPhoto,
  } = cartItem.treatmentDetails || cartItem.roomDetails;

  const article = createElement('article', {
    classNames: [id],
    children: [
      img(['cover-img'], coverPhoto, 100, 70),
      createElement('h6', { children: [name] }),
      createElement('p', {
        children: [`${price.toFixed(2)} zł`],
      }),
      itemType === 'treatmentCartItem'
        ? createElement('p', {
          children: [cartItem.quantity],
        }) : '',
    ],
  });

  return article;
};

const refreshCartContent = () => {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  apiClient.get('/cart')
    .then((response) => response.data)
    .then((cartItems) => {
      const articles = cartItems.map((cartItem) => renderPreviewCartItem(cartItem));
      articles.forEach((article) => cartItemsContainer.append(article));
    });
};

const addClassActive = () => {
  document.getElementById('cart-preview-container').classList.add('cart-preview-container-active');
};

const showCartPreview = () => {
  refreshCartContent();
  addClassActive();
};
const hideCartPreview = () => {
  document.getElementById('cart-preview-container').classList.remove('cart-preview-container-active');
};

const cartPreview = () => {
  const cartPreviewContainer = createElement('div', { classNames: ['cart-preview-container'], children: ['Twój koszyk'] });
  const cartItems = createElement('div', { id: 'cart-items' });

  cartPreviewContainer.id = 'cart-preview-container';
  cartPreviewContainer.addEventListener('mouseenter', () => addClassActive());
  cartPreviewContainer.addEventListener('mouseleave', () => hideCartPreview());

  const cartButton = button('Zobacz koszyk', ['nav-btn', 'cart-btn'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent('cart'));
    hideCartPreview();
  });
  cartPreviewContainer.append(cartItems, cartButton);
  return cartPreviewContainer;
};

export default cartPreview;
export { showCartPreview, hideCartPreview };
