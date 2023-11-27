import getProfileImg from "@/utils/get-profile-img";
import {
  Group,
  Menu,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconLogout2, IconUser } from "@tabler/icons-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function ProfileMenu({ user }) {
  const theme = useMantineTheme();

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/",
      });
      notifications.show({
        title: "Log out success",
        message: "",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Log out failed",
        message: "",
        color: "red",
      });
    }
  };

  const pageData = {
    nama: user?.data?.nama,
    rank: user?.data?.user_rank,
    role: user?.data?.role,
  };

  return (
    <Menu
      shadow="md"
      width={200}
      position="bottom-end"
      withArrow
      arrowPosition="center"
    >
      <Menu.Target>
        <UnstyledButton>
          <Group spacing={theme.spacing.sm}>
            <Image
              alt="profile-pict"
              src={getProfileImg(pageData.nama)}
              width={40}
              height={40}
            />
            <Stack spacing={0}>
              <Text>{user?.data?.nama}</Text>
            </Stack>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconUser />}>My Profile</Menu.Item>
        <Menu.Item color="red" icon={<IconLogout2 />} onClick={handleSignOut}>
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
