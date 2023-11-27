import isStringEmpty from "@/utils/validation/is-string-empty";
import { Modal, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import NoData from "@/components/NoData";
import TableAssignQuiz from "./TableAssignQuiz";

export default function ModalAssignQuiz({
  assignOpen,
  handleAssignClose,
  quizzes,
  chapter,
  mutate,
}) {
  const form = useForm({
    initialValues: {
      chapter: "",
    },
    validate: {
      chapter: (value) =>
        isStringEmpty(value) && "Please enter the correct quiz code",
    },
  });

  const handleCloseModal = () => {
    form.reset();
    handleAssignClose();
  };

  const onSuccess = () => {
    mutate();
    handleCloseModal();
  };

  const givenQuizzes = chapter?.Quiz
    ? [
        {
          id: chapter?.Quiz?.id,
          title: chapter?.Quiz?.title,
        },
        ...quizzes,
      ]
    : quizzes;

  return (
    <Modal
      opened={assignOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="xl"
      xOffset={0}
    >
      <Stack spacing="sm">
        <Title size={20}>Assign quiz to chapter</Title>
        {givenQuizzes?.length === 0 ? (
          <NoData text="No available quizzes" />
        ) : (
          <TableAssignQuiz
            onSuccess={onSuccess}
            quizzes={givenQuizzes}
            chapter={chapter}
            mutate={mutate}
          />
        )}
      </Stack>
    </Modal>
  );
}
