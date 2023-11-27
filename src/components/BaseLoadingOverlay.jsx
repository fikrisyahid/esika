import { BASE_COLORS } from "@/configs";
import { LoadingOverlay } from "@mantine/core";

export default function BaseLoadingOverlay() {
  return (
    <LoadingOverlay
      visible
      loaderProps={{
        color: BASE_COLORS.orange,
      }}
    />
  );
}
