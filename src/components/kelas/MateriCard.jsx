import { ActionIcon, Group, Popover, Text } from "@mantine/core";
import {
  IconEdit,
  IconEye,
  IconInfoCircle,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import MainCard from "../MainCard";

export default function MateriCard({
  no,
  judul,
  deskripsi,
  canView,
  canEdit,
  canDelete,
  onClickView,
  onClickEdit,
  onClickDelete,
}) {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <MainCard>
      <Group position="apart" align="center">
        <Group>
          {no && (
            <Text size={18} style={{ fontWeight: "bold" }}>
              {no}.
            </Text>
          )}
          <Text size={18}>{judul}</Text>
        </Group>
        <Group>
          <Popover
            width={400}
            position="bottom"
            withArrow
            shadow="md"
            opened={opened}
          >
            <Popover.Target>
              <ActionIcon
                onMouseEnter={open}
                onMouseLeave={close}
                variant="filled"
                color="blue"
              >
                <IconInfoCircle />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown sx={{ pointerEvents: "none" }}>
              <Text size="sm">{deskripsi}</Text>
            </Popover.Dropdown>
          </Popover>
          {canView && (
            <ActionIcon variant="filled" color="green" onClick={onClickView}>
              <IconEye />
            </ActionIcon>
          )}
          {canEdit && (
            <ActionIcon variant="filled" color="yellow" onClick={onClickEdit}>
              <IconEdit />
            </ActionIcon>
          )}
          {canDelete && (
            <ActionIcon variant="filled" color="red" onClick={onClickDelete}>
              <IconTrash />
            </ActionIcon>
          )}
        </Group>
      </Group>
    </MainCard>
  );
}
