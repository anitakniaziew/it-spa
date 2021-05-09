import createElement from '../helpers/createElement';

const input = (label, type, id, classNames = '', required = false, validationError) => {
  const inputElement = createElement('input', { classNames: [classNames], id });
  const labelElement = createElement('label', { children: [label] });
  inputElement.type = type;
  labelElement.setAttribute('for', id);

  const fieldRequired = createElement('p', {
    id: `${id}-required`,
    children: [
      `${label} jest wymagane.`,
    ],
  });
  const validationErrorElement = createElement('p', {
    id: validationError?.id,
    children: [validationError?.text || ''],
  });
  fieldRequired.hidden = true;
  validationErrorElement.hidden = true;

  const formGroup = createElement('div', {
    classNames: ['form-group'],
    children: [labelElement, inputElement],
  });

  if (required) formGroup.append(fieldRequired);
  if (validationError) formGroup.append(validationErrorElement);

  return formGroup;
};

export default input;
