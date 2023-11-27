import { TEACHER_API_URL } from "@/configs";
import { fetchDELETE } from "@/utils/crud";
import { Alert, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function ModalDeleteChapter({
  deleteOpen,
  handleDeleteClose,
  deleteChapterData,
  mutate,
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  const onSuccessDeleteChapter = () => {
    mutate();
    handleDeleteClose();
  };

  const handleDeleteChapter = () => {
    fetchDELETE({
      url: `${TEACHER_API_URL}/chapter/delete?id=${deleteChapterData.id}`,
      successMessage: "Successfully deleted chapter",
      onSuccess: onSuccessDeleteChapter,
      setBtnLoading,
    });
  };

  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) =>
        value !== deleteChapterData.title &&
        "Please enter the correct chapter title",
    },
  });

  const handleCloseModal = () => {
    form.reset();
    handleDeleteClose();
  };

  return (
    <Modal
      opened={deleteOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="lg"
      xOffset={0}
    >
      <form onSubmit={form.onSubmit(handleDeleteChapter)}>
        <Stack spacing="sm">
          <Alert icon={<IconAlertCircle />} title="Warning!" color="red">
            Deleting this chapter will delete all data connected to this
            chapter.
            <br />
            Chapter title:{" "}
            <i>
              <b>&quot;{deleteChapterData.title}&quot;</b>
            </i>
          </Alert>
          <TextInput
            label="Please enter the chapter title to confirm"
            {...form.getInputProps("title")}
          />
          <Button
            color="red"
            leftIcon={<IconTrash />}
            type="submit"
            loading={btnLoading}
          >
            Delete chapter
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
