/**
 * Capitalizes the first letter of each word in a string and returns the modified string.
 *
 * @param {string} str - The string to be capitalized.
 * @returns {string} The capitalized string.
 */
export default function capitalize(str) {
  const arr = str.split(" ");
  const result = arr
    .map((e) => e[0].toUpperCase() + e.slice(1).toLowerCase())
    .join(" ");
  return result;
}
