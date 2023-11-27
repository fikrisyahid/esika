import { TEACHER_API_URL } from "@/configs";
import { fetchDELETE } from "@/utils/crud";
import { Alert, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function ModalDeleteCourse({
  deleteCourseOpen,
  handleCloseDeleteCourse,
  deleteCourseData,
  mutate,
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  const onSuccessDeleteCourse = () => {
    mutate();
    handleCloseDeleteCourse();
  };

  const handleDeleteCourse = () => {
    fetchDELETE({
      url: `${TEACHER_API_URL}/course/delete?id=${deleteCourseData.id}`,
      successMessage: "Successfully deleted course",
      onSuccess: onSuccessDeleteCourse,
      setBtnLoading,
    });
  };

  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) =>
        value !== deleteCourseData.title &&
        "Please enter the correct course title",
    },
  });

  const handleCloseModal = () => {
    form.reset();
    handleCloseDeleteCourse();
  }

  return (
    <Modal
      opened={deleteCourseOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="lg"
      xOffset={0}
    >
      <form onSubmit={form.onSubmit(handleDeleteCourse)}>
        <Stack spacing="sm">
          <Alert icon={<IconAlertCircle />} title="Warning!" color="red">
            Deleting this course will delete all data connected to this course.
            <br />
            Course title: {" "}
            <i>
              <b>&quot;{deleteCourseData.title}&quot;</b>
            </i>
          </Alert>
          <TextInput
            label="Please enter the course title to confirm"
            {...form.getInputProps("title")}
          />
          <Button
            color="red"
            leftIcon={<IconTrash />}
            type="submit"
            loading={btnLoading}
          >
            Delete course
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
