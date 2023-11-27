import { Alert, Button, Modal, Stack } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useState } from "react";
import getDevStatus from "@/utils/get-dev-status";
import PrettyJSON from "./PrettyJSON";

export default function DataLoadError({ data }) {
  const [open, setOpen] = useState(false);

  const { isDev } = getDevStatus();

  return (
    <Alert icon={<IconAlertCircle />} title="Bummer!" color="red">
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        centered
        size="xl"
      >
        <PrettyJSON json={data} />
      </Modal>
      <Stack spacing="sm" align="flex-start">
        Something terrible happened! The data you are requesting cannot be
        loaded for some reason!
        {isDev && (
          <Button size="xs" color="orange" onClick={() => setOpen(true)}>
            View error
          </Button>
        )}
      </Stack>
    </Alert>
  );
}
