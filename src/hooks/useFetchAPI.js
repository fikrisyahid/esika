import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

/**
 * A custom hook that fetches data from an API endpoint using SWR library.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.url - The API endpoint URL.
 * @param {Object} params.options - The options object to pass to SWR.
 */
export default function useFetchAPI({ url, options }) {
  return useSWR(url, fetcher, {
    revalidateOnFocus: false,
    ...options,
  });
}
