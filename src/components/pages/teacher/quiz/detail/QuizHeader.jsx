import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconArrowLeft, IconHelpCircleFilled } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalPublishQuiz from "./ModalPublishQuiz";
import ModalAssignChapter from "./ModalAssignChapter";

export default function QuizHeader({
  mutateQuiz,
  mutateChapter,
  quiz,
  chapters,
  fromChapter,
}) {
  const router = useRouter();

  const handleBack = () => {
    if (fromChapter) {
      return router.push(
        `/teacher/course/${quiz?.data?.Chapter?.course?.id}/chapter/${quiz?.data?.Chapter?.id}`
      );
    }
    return router.push(`/teacher/quiz`);
  };

  const [publishOpen, setPublishOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  const handlePublishOpen = () => setPublishOpen(true);
  const handlePublishClose = () => setPublishOpen(false);
  const handleAssignOpen = () => setAssignOpen(true);
  const handleAssignClose = () => setAssignOpen(false);

  const publishedQuizData = {
    id: quiz?.data?.id,
    code: quiz?.data?.code,
  };

  const isPublished = quiz?.data?.published;
  const isAssignedChapter = quiz?.data?.Chapter;
  const isChapterCoursePublished = quiz?.data?.Chapter?.Course?.published;

  return (
    <Group position="apart">
      <ModalPublishQuiz
        publishOpen={publishOpen}
        mutate={mutateQuiz}
        handlePublishClose={handlePublishClose}
        publishQuizData={publishedQuizData}
      />
      <ModalAssignChapter
        assignOpen={assignOpen}
        handleAssignClose={handleAssignClose}
        quiz={quiz?.data}
        chapters={chapters?.data}
        mutate={() => {
          mutateQuiz();
          mutateChapter();
        }}
      />
      <Group position="left">
        <Button leftIcon={<IconArrowLeft />} onClick={handleBack} color="dark">
          Back
        </Button>
        <Title>Detail Quiz</Title>
        <Badge mt={5} size="lg" color={isPublished ? "violet" : "orange"}>
          {isPublished ? "PUBLISHED" : "DRAFT"}
        </Badge>
        <Badge mt={5} size="lg" color={isAssignedChapter ? "green" : "violet"}>
          {isAssignedChapter ? "ASSIGNED TO CHAPTER" : "NO CHAPTER ASSIGNED"}
        </Badge>
      </Group>
      <Group>
        <Group spacing={5}>
          {isChapterCoursePublished && (
            <Tooltip
              position="left"
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
            disabled={isChapterCoursePublished}
          >
            {!isAssignedChapter ? "Assign to chapter" : "Re-assign chapter"}
          </Button>
        </Group>
        {!isPublished && (
          <Button color="violet" onClick={handlePublishOpen}>
            Publish Quiz
          </Button>
        )}
      </Group>
    </Group>
  );
}
