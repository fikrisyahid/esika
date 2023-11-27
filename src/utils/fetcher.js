/**
 * Fetches data from the specified URL and returns the response as a JSON object.
 * @param {string} args - The URL to fetch data from.
 * @returns {Promise<object>} - A Promise that resolves to a JSON object containing the response data.
 */
const fetcher = (args) => fetch(args).then((res) => res.json());

export { fetcher };
