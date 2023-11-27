import { ActionIcon, Badge, Code, Group, Text, Title } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import MainCard from "../MainCard";

export default function KelasCard({
  nama,
  dosen,
  kode,
  komposisi_tugas: komposisiTugas,
  komposisi_quiz: komposisiQuiz,
  komposisi_uts: komposisiUTS,
  komposisi_uas: komposisiUAS,
  canView,
  canEdit,
  canDelete,
  onClickEye,
  onClickEdit,
  onClickDelete,
}) {
  return (
    <MainCard>
      <Title size={24}>{nama}</Title>
      <Text>
        Kode: <Code fz="md">{kode}</Code>
      </Text>
      <Badge size="lg" color="blue">
        Tugas: {komposisiTugas} %
      </Badge>
      <Badge size="lg" color="cyan">
        Quiz: {komposisiQuiz} %
      </Badge>
      <Badge size="lg" color="grape">
        UTS: {komposisiUTS} %
      </Badge>
      <Badge size="lg" color="green">
        UAS: {komposisiUAS} %
      </Badge>
      <Text>Dosen pengampu:</Text>
      <Group mt={-10} position="apart" align="center">
        <Text weight="bold">{dosen}</Text>
        <Group>
          {canView && (
            <ActionIcon variant="filled" color="green" onClick={onClickEye}>
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
