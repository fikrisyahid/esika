import { Flex, useMantineTheme } from "@mantine/core";
import NavItem from "./NavItem";

export default function NavLists({ data }) {
  const theme = useMantineTheme();

  return (
    <Flex direction="column" gap={theme.spacing.md}>
      {data.map((item) => (
        <NavItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          link={item.link}
        />
      ))}
    </Flex>
  );
}
