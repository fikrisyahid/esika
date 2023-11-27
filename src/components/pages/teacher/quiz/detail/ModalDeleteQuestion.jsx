import { TEACHER_API_URL } from "@/configs";
import { fetchDELETE } from "@/utils/crud";
import { Alert, Button, Modal, Stack } from "@mantine/core";
import { IconAlertCircle, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function ModalDeleteQuestion({
  deleteQuestionOpen,
  handleCloseDeleteQuestion,
  deleteQuestionID,
  mutate,
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  const handleDeleteQuestion = () => {
    // delete questions with ID
    fetchDELETE({
      url: `${TEACHER_API_URL}/question/delete?id=${deleteQuestionID}`,
      onSuccess: mutate,
      onEnd: handleCloseDeleteQuestion,
      setBtnLoading,
      successMessage: "Question deleted successfully!",
    });
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
          loading={btnLoading}
        >
          Delete question
        </Button>
      </Stack>
    </Modal>
  );
}
