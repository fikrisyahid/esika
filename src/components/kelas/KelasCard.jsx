import {
  ActionIcon,
  Code,
  Flex,
  Group,
  Progress,
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
      <Progress
        radius="xl"
        size={24}
        styles={{
          label: {
            fontSize: 10,
          },
        }}
        sections={[
          {
            value: komposisiTugas,
            color: "pink",
            label: "Tugas",
            tooltip: `Komposisi tugas - ${komposisiTugas} %`,
          },
          {
            value: komposisiQuiz,
            color: "green",
            label: "Quiz",
            tooltip: `Komposisi quiz - ${komposisiQuiz} %`,
          },
          {
            value: komposisiUTS,
            color: "violet",
            label: "UTS",
            tooltip: `Komposisi UTS - ${komposisiUTS} %`,
          },
          {
            value: komposisiUAS,
            color: "orange",
            label: "UAS",
            tooltip: `Komposisi UAS - ${komposisiUAS} %`,
          },
        ]}
      />
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
