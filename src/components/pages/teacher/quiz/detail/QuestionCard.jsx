import BaseStringHTML from "@/components/BaseStringHTML";
import { Badge, Button, Flex, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";

export default function QuestionCard({
  id,
  number,
  title,
  type,
  handleOpenEditQuestion,
  handleOpenDeleteQuestion,
  published,
}) {
  return (
    <Paper shadow="sm" withBorder radius="md" p="md">
      <Flex direction="row" gap="sm" justify="space-between">
        <Group>
          <Text>{number}.</Text>
          <Stack spacing={5} align="start">
            <ScrollArea mah={50}>
              <BaseStringHTML htmlString={title} />
            </ScrollArea>
            <Badge size="lg">{type?.replaceAll("_", " ")}</Badge>
          </Stack>
        </Group>
        <Stack justify="center">
          <Button
            leftIcon={<IconEye />}
            color="green"
            onClick={() => handleOpenEditQuestion(id)}
          >
            View Detail
          </Button>
          <Button
            disabled={published}
            leftIcon={<IconTrash />}
            color="red"
            onClick={() => handleOpenDeleteQuestion(id)}
          >
            Delete
          </Button>
        </Stack>
      </Flex>
    </Paper>
  );
}
