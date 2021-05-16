import apiClient from '../../helpers/apiClient';
import createElement from '../../helpers/createElement';
import createNavigationEvent from '../../helpers/createNavigationEvent';
import pageTitle from '../../components/pageTitle';
import loader from '../../components/loader';
import input from '../../components/input';
import button from '../../components/button';

export const isNotEmpty = (val) => val !== undefined && val !== null && val !== '';
export const isLongEnough = (val) => {
  if (typeof val === 'string') return val.length >= 6;
  return false;
};
export const passwordsMatch = (val1, val2) => {
  if (typeof val1 === 'string' && typeof val2 === 'string') {
    return val1 === val2;
  }
  return false;
};

const validate = (isValid, errorMessage) => {
  const errMsg = errorMessage;
  errMsg.hidden = isValid;
  return isValid;
};

const registration = () => {
  const fragment = document.createDocumentFragment();
  const section = createElement('section', {
    children: [loader()],
  });

  const form = createElement('form', {
    children: [
      input('login', 'email', 'login', 'form-control',
        'required'),
      input('hasło', 'password', 'password', 'form-control',
        'required', { text: 'Hasło jest zbyt krótkie.', id: 'password-short' }),
      input('powtórz hasło', 'password', 'repeat-password', 'form-control', false, { text: 'Podane hasła się nie zgadzają.', id: 'password-mismatch' }),
      button('Rejestruj', ['btn-primary'], () => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeat-password').value;

        const loginRequired = document.getElementById('login-required');
        const passwordRequired = document.getElementById('password-required');
        const passwordShort = document.getElementById('password-short');
        const passwordMismatch = document.getElementById('password-mismatch');

        const loginIsNotEmpty = isNotEmpty(login);
        const passwordIsNotEmpty = isNotEmpty(password);
        const passwordIsLongEnough = isLongEnough(password);
        const matchingPasswords = passwordsMatch(password, repeatPassword);

        validate(loginIsNotEmpty, loginRequired);
        validate(passwordIsNotEmpty, passwordRequired);
        validate(passwordIsLongEnough, passwordShort);
        validate(matchingPasswords, passwordMismatch);

        if (loginIsNotEmpty
          && passwordIsNotEmpty
          && passwordIsLongEnough
          && matchingPasswords) {
          const data = {
            email: login,
            password,
          };

          apiClient.post('/users', data)
            .then(() => document.dispatchEvent(createNavigationEvent('login')))
            .catch(() => alert('Adres email jest zarejestrowany w naszej bazie.'));
        }
      }),
    ],
  });

  form.autofocus = 'on';
  form.autocomplete = 'off';
  form.name = 'register';

  section.innerHTML = '';
  section.append(form);

  fragment.append(pageTitle('Rejestruj'), section);

  return fragment;
};

export default registration;
