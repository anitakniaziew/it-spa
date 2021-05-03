import './index.scss';

import navigation from './common/navigation';
import cartPreview from './common/cartPreview/cartPreview';
import main from './common/main';

const { body } = document;

body.append(
  cartPreview(),
  navigation(),
  main(),
);
