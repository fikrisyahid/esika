import { ActionIcon, Group, Text } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import MainCard from "../MainCard";

export default function MateriCard({
  no,
  judul,
  canView,
  canEdit,
  canDelete,
  onClickView,
  onClickEdit,
  onClickDelete,
}) {
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
