/**
 * Checks if a given string is empty or not.
 * @param {string} str - The string to be checked.
 * @returns {boolean} - Returns true if the string is empty, otherwise false.
 */
export default function isStringEmpty(str) {
  // check if str is a string
  if (typeof str !== "string") {
    return true;
  }
  return str.replaceAll(" ", "").length === 0;
}
