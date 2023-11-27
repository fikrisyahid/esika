/**
 * Checks if a given string is a valid email address.
 *
 * @param {string} str - The string to be checked.
 * @returns {boolean} - Returns true if the string is a valid email address, false otherwise.
 */
export default function isValidEmail(str) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(str);
}
