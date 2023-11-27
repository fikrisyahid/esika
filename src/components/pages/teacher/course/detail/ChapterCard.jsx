import { ActionIcon, Badge, Button, Group, Paper, Text } from "@mantine/core";
import {
  IconArrowDown,
  IconArrowUp,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";

export default function ChapterCard({
  chapter,
  index,
  chapterLength,
  handleDeleteOpen,
  handleClickDetail,
  handleMoveChapter,
  btnLoading,
  isPublished,
}) {
  return (
    <Paper shadow="sm" withBorder radius="md" p="md">
      <Group position="apart">
        <Group spacing={5}>
          {index !== 0 && (
            <ActionIcon
              disabled={isPublished}
              color="dark"
              loading={btnLoading}
              onClick={() =>
                handleMoveChapter({
                  direction: "up",
                  idChapter: chapter.id,
                })
              }
            >
              <IconArrowUp />
            </ActionIcon>
          )}
          {index !== chapterLength - 1 && (
            <ActionIcon
              color="dark"
              disabled={isPublished}
              loading={btnLoading}
              onClick={() =>
                handleMoveChapter({
                  direction: "down",
                  idChapter: chapter.id,
                })
              }
            >
              <IconArrowDown />
            </ActionIcon>
          )}
          <Text>{chapter.title}</Text>
          {chapter.quizId && (
            <Badge size="lg" color="violet">Quiz Available</Badge>
          )}
        </Group>
        <Group>
          <Button
            leftIcon={<IconEye />}
            color="green"
            onClick={() => handleClickDetail(chapter.id)}
          >
            View Detail
          </Button>
          <Button
            disabled={isPublished}
            leftIcon={<IconTrash />}
            color="red"
            onClick={() =>
              handleDeleteOpen({
                id: chapter.id,
                title: chapter.title,
              })
            }
          >
            Delete
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}
