import createElement from '../helpers/createElement';
import formatDate from '../helpers/dateFormatter';

const dateInput = (lableText, inputId) => {
  const fragment = document.createDocumentFragment();
  const label = createElement('label', { children: [lableText] });
  label.for = inputId;

  const today = new Date();

  const input = createElement('input');
  input.type = 'date';
  input.id = inputId;
  input.name = inputId;
  input.value = formatDate(today);
  input.min = formatDate(today);

  fragment.append(label, input);

  return fragment;
};

export default dateInput;
