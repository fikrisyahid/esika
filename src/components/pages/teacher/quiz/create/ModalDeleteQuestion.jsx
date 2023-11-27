import { Alert, Button, Modal, Stack } from "@mantine/core";
import { IconAlertCircle, IconTrash } from "@tabler/icons-react";

export default function ModalDeleteQuestion({
  deleteQuestionOpen,
  handleCloseDeleteQuestion,
  deleteQuestionID,
  setQuestions,
}) {
  const handleDeleteQuestion = () => {
    // delete questions with ID
    setQuestions((old) =>
      old.filter((question) => question.id !== deleteQuestionID)
    );
    handleCloseDeleteQuestion();
  };

  return (
    <Modal
      opened={deleteQuestionOpen}
      onClose={handleCloseDeleteQuestion}
      withCloseButton={false}
      centered
      size="lg"
      xOffset={0}
    >
      <Stack spacing="sm">
        <Alert icon={<IconAlertCircle />} title="Warning!" color="red">
          Are you sure you want to delete this question?
        </Alert>
        <Button
          color="red"
          leftIcon={<IconTrash />}
          onClick={handleDeleteQuestion}
        >
          Delete question
        </Button>
      </Stack>
    </Modal>
  );
}
