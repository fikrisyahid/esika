import { ActionIcon, Popover, Tabs } from "@mantine/core";
import { IconBell } from "@tabler/icons-react";
import { SHARED_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import NotificationLists from "./NotificationLists";

export default function NotificationMenu({ user }) {
  const { data: notification } = useFetchAPI({
    url: `${SHARED_API_URL}/notification?user_id=${user?.data?.id}`,
  });

  return (
    <Popover
      width="30vw"
      position="bottom-end"
      arrowPosition="center"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <ActionIcon size="xl">
          <IconBell />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Tabs defaultValue="unread" color="orange">
          <Tabs.List grow>
            <Tabs.Tab value="unread">Unread</Tabs.Tab>
            <Tabs.Tab value="read">Read</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="unread" pt="xs">
            <NotificationLists data={notification?.data?.unread} unread />
          </Tabs.Panel>
          <Tabs.Panel value="read" pt="xs">
            <NotificationLists data={notification?.data?.read} />
          </Tabs.Panel>
        </Tabs>
      </Popover.Dropdown>
    </Popover>
  );
}
