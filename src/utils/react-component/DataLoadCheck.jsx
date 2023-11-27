/* eslint-disable react/no-array-index-key */
import BaseLoadingOverlay from "@/components/BaseLoadingOverlay";
import DataLoadError from "@/components/DataLoadError";
import { Flex } from "@mantine/core";

/**
 * A component that checks if data is loaded successfully or not.
 * If data is still loading, it displays a loading overlay.
 * If data is loaded but has an error status code, it displays an error message.
 *
 * @param {Object} props - The component props.
 * @param {Object|Array} props.data - The data object or array of data objects to check.
 * @param {boolean|Array} props.isLoading - A flag or array of flags indicating if data is still loading or not.
 * @returns {JSX.Element} - The JSX element to render.
 */
export default function DataLoadCheck({ data, isLoading }) {
  // Mengecek apakah data adalah array atau bukan
  const dataArray = Array.isArray(data) ? data : [data];

  // Mengecek apakah isLoading adalah array atau bukan
  const isLoadingArray = Array.isArray(isLoading) ? isLoading : [isLoading];

  // Mengecek apakah ada yang sedang loading (true)
  const isLoadingTrue = isLoadingArray.some((loadingFlag) => loadingFlag);

  // Mengecek apakah ada yang error (statusCode !== 200)
  const isError = dataArray.some((dataItem) => dataItem?.statusCode !== 200);

  // Jika ada yang sedang loading, return loading component
  if (isLoadingTrue) {
    return <BaseLoadingOverlay />;
  }

  // Jika ada yang error, return error component
  if (isError) {
    return (
      <Flex direction="column" gap="xs">
        {dataArray.map(
          (dataItem, index) =>
            dataItem?.statusCode !== 200 && (
              <DataLoadError key={index} data={dataItem} />
            )
        )}
      </Flex>
    );
  }

  // Jika tidak ada loading dan tidak ada error, return null
  return null;
}
