/**
 * Returns an object containing a boolean value indicating whether the current environment is development or not.
 * @function
 * @returns {{isDev: boolean}} An object containing a boolean value indicating whether the current environment is development or not.
 */
export default function getDevStatus() {
  const isDev = process.env.NODE_ENV === "development";
  return { isDev };
}
