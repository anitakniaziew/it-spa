import './index.scss';

import navigation from './navigation/navigation';
import main from './common/main';

const { body } = document;

body.append(
  navigation(),
  main(),
);
