import createElement from '../helpers/createElement';
import formatDate from '../helpers/dateFormatter';

const dateInput = (labelText, inputId) => {
  const fragment = document.createDocumentFragment();

  const label = createElement('label', { children: [labelText] });
  label.for = inputId;

  const today = new Date();
  const yearFromNow = new Date();
  yearFromNow.setFullYear(today.getFullYear() + 1);

  const input = createElement('input', { classNames: ['form-control'] });
  input.type = 'date';
  input.id = inputId;
  input.name = inputId;
  input.value = formatDate(today);
  input.min = formatDate(today);
  input.max = formatDate(yearFromNow);

  fragment.append(label, input);

  return fragment;
};

export default dateInput;
