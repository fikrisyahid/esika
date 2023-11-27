import { TEACHER_API_URL } from "@/configs";
import { fetchPUT } from "@/utils/crud";
import { Alert, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconUpload } from "@tabler/icons-react";
import { useState } from "react";

export default function ModalPublishQuiz({
  publishOpen,
  handlePublishClose,
  publishQuizData,
  mutate,
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  const onSuccessPublishQuiz = () => {
    mutate();
    handlePublishClose();
  };

  const handlePublishQuiz = () => {
    fetchPUT({
      url: `${TEACHER_API_URL}/quiz/publish?id=${publishQuizData.id}`,
      successMessage: "Successfully published quiz",
      onSuccess: onSuccessPublishQuiz,
      setBtnLoading,
    });
  };

  const form = useForm({
    initialValues: {
      code: "",
    },
    validate: {
      code: (value) =>
        value !== publishQuizData.code && "Please enter the correct quiz code",
    },
  });

  const handleCloseModal = () => {
    form.reset();
    handlePublishClose();
  };

  return (
    <Modal
      opened={publishOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="lg"
      xOffset={0}
    >
      <form onSubmit={form.onSubmit(handlePublishQuiz)}>
        <Stack spacing="sm">
          <Alert icon={<IconAlertCircle />} title="Warning!" color="red">
            Once you publish this quiz you will not be able to edit any data on
            this quiz.
            <br />
            Quiz code:{" "}
            <i>
              <b>&quot;{publishQuizData.code}&quot;</b>
            </i>
          </Alert>
          <TextInput
            label="Please enter the quiz code to confirm"
            {...form.getInputProps("code")}
          />
          <Button
            color="violet"
            leftIcon={<IconUpload />}
            type="submit"
            loading={btnLoading}
          >
            Publish quiz
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
