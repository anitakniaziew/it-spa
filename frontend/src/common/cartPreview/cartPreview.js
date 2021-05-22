import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import img from '../../components/img';
import button from '../../components/button';
import './cartPreview.scss';

const removeCartItem = (id) => {
  apiClient.delete(`/cart/${id}`, {
    id,
  });
  document.getElementById(`previewItem-${id}`).remove();
};

const renderPreviewCartItem = (cartItem, onRemove) => {
  const { id, itemType } = cartItem;
  const {
    name, price, coverPhoto,
  } = cartItem.treatmentDetails || cartItem.roomDetails;

  const article = createElement('article', {
    id: `previewItem-${id}`,
    classNames: ['my-2'],
    children: [
      createElement('div', {
        classNames: ['d-flex', 'justify-content-between'],
        children: [
          createElement('h6', { children: [name] }),
          button('x', ['btn-remove-cart-item'], () => {
            onRemove(id);
          }),
        ],
      }),
      createElement('div', {
        classNames: ['cart-preview-item-details', 'pb-2', 'd-flex', 'justify-content-between', 'align-items-center', 'border-bottom', 'border-secondary'],
        children: [
          img(['cover-img'], coverPhoto, 120, 80),
          itemType === 'treatmentCartItem'
            ? createElement('p', {
              children: [`${cartItem.quantity} szt.`],
            }) : '',
          createElement('p', {
            children: [`${price.toFixed(2)} zł`],
          }),
        ],
      }),
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
      const articles = cartItems.map((cartItem) => renderPreviewCartItem(cartItem, (id) => {
        removeCartItem(id);
        refreshCartContent();
      }));
      articles.forEach((article) => cartItemsContainer.append(article));
    });
};

const addClassActive = () => {
  document.getElementById('cart-preview-container').classList.add('cart-preview-container-active');
};

const showCartPreview = () => {
  const isCartOpen = document.getElementById('page-title')?.innerText === 'Zawartość koszyka';
  if (isCartOpen) return;
  refreshCartContent();
  addClassActive();
};
const hideCartPreview = () => {
  document.getElementById('cart-preview-container').classList.remove('cart-preview-container-active');
};

const cartPreview = () => {
  const cartPreviewContainer = createElement('div', {
    classNames: ['cart-preview-container'],
    children: [
      createElement('h6', {
        classNames: ['text-center'],
        children: ['Twój koszyk'],
      })],
  });
  const cartItems = createElement('div', { classNames: ['cart-items'], id: 'cart-items' });

  cartPreviewContainer.id = 'cart-preview-container';
  cartPreviewContainer.addEventListener('mouseenter', () => addClassActive());
  cartPreviewContainer.addEventListener('mouseleave', () => hideCartPreview());

  const cartButton = button('Zobacz koszyk', ['btn-secondary', 'w-100'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent('cart'));
    hideCartPreview();
  });
  cartPreviewContainer.append(cartItems, cartButton);
  return cartPreviewContainer;
};

export default cartPreview;
export { showCartPreview, hideCartPreview };
