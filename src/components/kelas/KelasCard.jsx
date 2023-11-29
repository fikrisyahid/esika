import {
  ActionIcon,
  Badge,
  Code,
  Flex,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { IconEdit, IconEye, IconTrash, IconUsers } from "@tabler/icons-react";
import MainCard from "../MainCard";

export default function KelasCard({
  nama,
  dosen,
  kode,
  mahasiswaCount,
  komposisi_tugas: komposisiTugas,
  komposisi_quiz: komposisiQuiz,
  komposisi_uts: komposisiUTS,
  komposisi_uas: komposisiUAS,
  canView,
  canEdit,
  canDelete,
  onClickView,
  onClickEdit,
  onClickDelete,
}) {
  return (
    <MainCard>
      <Flex justify="space-between">
        <Title size={24}>{nama}</Title>
        <Flex>
          <IconUsers />
          <Text ml={5}>{mahasiswaCount}</Text>
        </Flex>
      </Flex>

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
