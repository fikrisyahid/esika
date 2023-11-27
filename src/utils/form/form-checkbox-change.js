/**
 * Function to handle change event on a checkbox input in a form.
 * @param {Object} options - The options object.
 * @param {Object} options.e - The event object.
 * @param {Object} options.form - The form object.
 * @param {string} options.checkField - The name of the field to check.
 * @param {string} options.toChangeField - The name of the field to change.
 */
export default function formCheckboxChange({
  e,
  form,
  checkField,
  toChangeField,
}) {
  const { checked } = e.target;

  form.setFieldValue(checkField, checked);

  if (!checked) {
    form.setFieldValue(toChangeField, "0");
  }
}
