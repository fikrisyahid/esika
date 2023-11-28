import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function WorkInProgress() {
  return (
    <Alert
      icon={<IconAlertCircle size="1rem" />}
      title="Masih dalam pengembangan!"
      color="yellow"
      radius="md"
      variant="filled"
    >
      Mohon maaf konten masih dalam proses pengembangan
    </Alert>
  );
}
