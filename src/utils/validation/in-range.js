/**
 * Checks if a value is within a specified range.
 *
 * @param {Object} options - The options object.
 * @param {number} options.value - The value to be checked.
 * @param {number} options.min - The minimum value of the range.
 * @param {number} options.max - The maximum value of the range.
 * @returns {boolean} - True if the value is within the range, false otherwise.
 */
export default function isInRange({ value, min, max }) {
  if (typeof value !== "number") {
    return false;
  }
  return value >= min && value <= max;
}
