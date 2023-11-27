/**
 * A function that handles number input changes in a form field.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.e - The event object.
 * @param {Object} options.form - The form object.
 * @param {string} options.field - The name of the form field.
 */
export default function formNumberChange({ e, form, field }) {
  const { value } = e.target;
  const isNumber = !Number.isNaN(value);

  if (isNumber) {
    const startsWithZero = value[0] === "0";
    const newValue = startsWithZero ? value.slice(1) : value;
    form.setFieldValue(field, newValue);
  }

  if (value === "") {
    form.setFieldValue(field, "0");
  }
}
