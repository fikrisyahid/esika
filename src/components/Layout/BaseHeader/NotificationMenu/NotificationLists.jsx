import MainCard from "@/components/MainCard";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export default function NotificationLists({ data, unread }) {
  const theme = useMantineTheme();

  const NoNotification = (
    <Center p={theme.spacing.md}>
      <Text size="sm" color="gray">
        You do not have any notification
      </Text>
    </Center>
  );

  if (data?.length === 0) return NoNotification;

  return (
    <ScrollArea.Autosize mah="60vh" offsetScrollbars>
      <Stack spacing="sm" p="sm">
        {unread && (
          <Button size="xs" style={{ alignSelf: "flex-end" }}>
            Mark all as read
          </Button>
        )}
        {data?.map((item) => (
          <MainCard
            key={item.id}
            thinShadow
            gap={5}
            style={{ padding: theme.spacing.sm }}
          >
            <Group position="apart">
              <Text size="sm">{item.judul}</Text>
              {unread && (
                <Tooltip label="Mark as read" position="left">
                  <ActionIcon color="blue">
                    <IconCheck />
                  </ActionIcon>
                </Tooltip>
              )}
            </Group>
            <Text size="xs">{item.isi}</Text>
          </MainCard>
        ))}
      </Stack>
    </ScrollArea.Autosize>
  );
}
