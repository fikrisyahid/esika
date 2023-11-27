import { notifications } from "@mantine/notifications";
import consoleDev from "../console-dev";

const fetchPOST = async ({
  url,
  setBtnLoading,
  body,
  withoutNotification,
  successMessage,
  onSuccess,
  onEnd,
}) => {
  setBtnLoading?.(true);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (result.status === "success" && !withoutNotification) {
      notifications.show({
        color: "green",
        message: successMessage,
      });
      onSuccess?.();
    }
    if (result.status !== "success") {
      throw new Error(result.message);
    }
  } catch (error) {
    consoleDev(error);
    notifications.show({
      message: error?.message,
      color: "red",
    });
  }
  onEnd?.();
  setBtnLoading?.(false);
};

export { fetchPOST };
