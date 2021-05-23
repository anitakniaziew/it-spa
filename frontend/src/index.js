import './index.scss';

import apiClient from './helpers/apiClient';

import navigation from './common/navigation';
import cartPreview from './common/cartPreview/cartPreview';
import main from './common/main';

const { body } = document;

apiClient.get('/user')
  .then(() => localStorage.setItem('isUserLogged', true))
  .catch(() => localStorage.removeItem('isUserLogged'))
  .finally(() => body.append(
    cartPreview(),
    navigation(),
    main(),
  ));
