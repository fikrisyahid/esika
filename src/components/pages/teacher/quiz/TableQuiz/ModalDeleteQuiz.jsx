import { TEACHER_API_URL } from "@/configs";
import { fetchDELETE } from "@/utils/crud";
import { Alert, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function ModalDeleteQuiz({
  deleteQuizOpen,
  handleCloseDeleteQuiz,
  deleteQuizData,
  mutate,
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  const onSuccessDeleteQuiz = () => {
    mutate();
    handleCloseDeleteQuiz();
  };

  const handleDeleteCourse = () => {
    fetchDELETE({
      url: `${TEACHER_API_URL}/quiz/delete?id=${deleteQuizData.id}`,
      successMessage: "Successfully deleted quiz",
      onSuccess: onSuccessDeleteQuiz,
      setBtnLoading,
    });
  };

  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (value) =>
        value !== deleteQuizData.code &&
        "Please enter the correct quiz code",
    },
  });

  const handleCloseModal = () => {
    form.reset();
    handleCloseDeleteQuiz();
  };

  return (
    <Modal
      opened={deleteQuizOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="lg"
      xOffset={0}
    >
      <form onSubmit={form.onSubmit(handleDeleteCourse)}>
        <Stack spacing="sm">
          <Alert icon={<IconAlertCircle />} title="Warning!" color="red">
            Deleting this quiz will delete all data connected to this
            quiz.
            <br />
            Quiz code:{" "}
            <i>
              <b>&quot;{deleteQuizData.code}&quot;</b>
            </i>
          </Alert>
          <TextInput
            label="Please enter the quiz code to confirm"
            {...form.getInputProps("code")}
          />
          <Button
            color="red"
            leftIcon={<IconTrash />}
            type="submit"
            loading={btnLoading}
          >
            Delete quiz
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
