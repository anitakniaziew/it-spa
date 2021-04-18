import './index.scss';

import navigation from './common/navigation';
import main from './common/main';

const { body } = document;

body.append(
  navigation(),
  main(),
);
