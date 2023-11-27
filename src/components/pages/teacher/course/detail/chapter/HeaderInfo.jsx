import { ActionIcon, Button, Group, Title, Tooltip } from "@mantine/core";
import {
  IconArrowLeft,
  IconHelpCircleFilled,
  IconPencil,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ModalAssignQuiz from "./ModalAssignQuiz";

export default function HeaderInfo({
  chapter,
  quizzes,
  editMode,
  btnLoading,
  handleEditMode,
  handleCancelEdit,
  fromQuiz,
  idCourse,
  mutate,
}) {
  const router = useRouter();

  const [assignOpen, setAssignOpen] = useState(false);

  const handleAssignOpen = () => setAssignOpen(true);
  const handleAssignClose = () => setAssignOpen(false);

  const handleBack = () => {
    if (fromQuiz === "true") {
      return router.push(`/teacher/quiz`);
    }
    return router.push(`/teacher/course/${idCourse}`);
  };

  const handleViewQuiz = () => {
    router.push(`/teacher/quiz/${chapter?.data?.quizId}?from_chapter=true`);
  };

  const chapterHasQuiz = chapter?.data?.quizId;
  const chapterPublished = chapter?.data?.course?.published;

  return (
    <Group position="apart">
      <ModalAssignQuiz
        assignOpen={assignOpen}
        chapter={chapter?.data}
        quizzes={quizzes?.data}
        mutate={mutate}
        handleAssignClose={handleAssignClose}
      />
      <Group position="left">
        <Button leftIcon={<IconArrowLeft />} onClick={handleBack} color="dark">
          Back
        </Button>
        <Title>Detail Chapter</Title>
      </Group>
      <Group>
        {chapterHasQuiz && (
          <Button color="violet" onClick={handleViewQuiz}>
            View Quiz
          </Button>
        )}
        <Group spacing={5}>
          {chapterPublished && (
            <Tooltip
              position="top"
              label="Chapter's course is published, cannot re-assign quiz"
            >
              <ActionIcon color="dark">
                <IconHelpCircleFilled />
              </ActionIcon>
            </Tooltip>
          )}
          <Button
            color="dark"
            onClick={handleAssignOpen}
            disabled={chapterPublished}
          >
            {chapterHasQuiz ? "Re-assign Quiz" : "Assign Quiz"}
          </Button>
        </Group>
        {!editMode && (
          <Button
            leftIcon={<IconPencil />}
            color="orange"
            onClick={handleEditMode}
          >
            Edit Chapter
          </Button>
        )}
        {editMode && (
          <Group>
            <Button color="dark" loading={btnLoading} type="submit">
              Apply Changes
            </Button>
            <Button color="green" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </Group>
        )}
      </Group>
    </Group>
  );
}
