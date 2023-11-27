import getDevStatus from "./get-dev-status";

/**
 * Logs the given content to the console if the app is in development mode.
 * @param {any} content - The content to log to the console.
 * @returns {void}
 */
export default function consoleDev(content) {
  const { isDev } = getDevStatus();
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(content);
  }
}
