import {
  Burger,
  Divider,
  Flex,
  MediaQuery,
  Navbar,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { APP_NAME, BASE_COLORS } from "@/configs";
import capitalize from "@/utils/capitalize";
import NavLists from "./NavLists";

export default function BaseNavbar({ opened, setOpened, listNavData }) {
  const theme = useMantineTheme();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 230 }}
      style={{ backgroundColor: BASE_COLORS.green }}
    >
      <MediaQuery
        largerThan="sm"
        styles={{
          display: "none",
        }}
      >
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size="sm"
          color={theme.colors.gray[0]}
          mr="xl"
          mb={15}
        />
      </MediaQuery>
      <Flex direction="column" mb={20}>
        <Title
          align="center"
          c="white"
          mb={10}
          style={{
            fontSize: 45,
          }}
        >
          {capitalize(APP_NAME)}
        </Title>
        <Divider mb={15} size="sm" />
      </Flex>
      <Navbar.Section grow>
        <NavLists data={listNavData} />
      </Navbar.Section>
    </Navbar>
  );
}
