import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import pageTitle from '../../components/pageTitle';
import loader from '../../components/loader';
import input from '../../components/input';
import button from '../../components/button';
import { userIcons } from '../../common/navigation/index';

const reservations = () => {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', {
    children: [loader()],
  });

  const form = createElement('form', {
    children: [
      input('login', 'email', 'login', 'form-control'),
      input('hasło', 'password', 'password', 'form-control', false, { text: 'Błędny email lub hasło.', id: 'invalid-login-credentials' }),
      button('Zaloguj', ['nav-btn'], () => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const invalidLoginCredentials = document.getElementById('invalid-login-credentials');

        const data = {
          email: login,
          password,
        };

        apiClient.post('/login', data)
          .then(() => {
            document.dispatchEvent(createNavigationEvent('reservations'));
            localStorage.setItem('isUserLogged', true);
            document.getElementById('login-wrapper').innerHTML = '';
            document.getElementById('login-wrapper').append(userIcons);
          })
          .catch(() => {
            invalidLoginCredentials.hidden = false;
          });
      })],
  });

  const registrationButton = button('Zarejestruj konto', ['secondary-btn'], (event) => {
    event.preventDefault();
    document.dispatchEvent(createNavigationEvent('registration'));
  });

  const register = createElement('div', {
    children: [
      createElement('p', {
        children: ['lub'],
      }),
      registrationButton,
    ],
  });

  section.innerHTML = '';
  section.append(form, register);

  fragment.append(pageTitle('Zaloguj'), section);

  return fragment;
};

export default reservations;
