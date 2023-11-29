import { Alert } from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

export default function WorkInProgress() {
  return (
    <Alert
      icon={<IconAlertTriangleFilled size="2rem" />}
      title="Work in progress!"
      color="yellow"
      radius="md"
      variant="filled"
    >
      Mohon maaf konten masih dalam tahap pengembangan
    </Alert>
  );
}
