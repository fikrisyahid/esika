/**
 * Checks if a given string is a valid URL.
 *
 * @param {string} string - The string to be checked.
 * @returns {boolean} - Returns true if the string is a valid URL, false otherwise.
 */
export default function isValidURL(string) {
  try {
    const url = new URL(string);
    return !!url;
  } catch (_) {
    return false;
  }
}
