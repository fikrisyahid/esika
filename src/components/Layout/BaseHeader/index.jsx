import { Burger, Divider, Group, useMantineTheme } from "@mantine/core";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";

export default function BaseHeader({ opened, setOpened, user }) {
  const theme = useMantineTheme();

  return (
    <Group p={5} position="apart" style={{ backgroundColor: "white" }}>
      <Burger
        opened={opened}
        onClick={() => setOpened((prev) => !prev)}
        size="sm"
        color={theme.colors.gray[6]}
        m={10}
      />
      <Group spacing={theme.spacing.sm} mr={theme.spacing.xl}>
        <NotificationMenu user={user} />
        <Divider orientation="vertical" />
        <ProfileMenu user={user} />
      </Group>
    </Group>
  );
}
