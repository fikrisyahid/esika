import { Stack, Text } from "@mantine/core";
import { IconDatabaseOff } from "@tabler/icons-react";

export default function NoData({ text = "No data available" }) {
  return (
    <Stack spacing="sm" align="center" p="md">
      <IconDatabaseOff size={40} color="gray" />
      <Text color="gray">{text}</Text>
    </Stack>
  );
}
