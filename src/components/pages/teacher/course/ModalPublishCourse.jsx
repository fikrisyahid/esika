import { TEACHER_API_URL } from "@/configs";
import { fetchPUT } from "@/utils/crud";
import { Alert, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconUpload } from "@tabler/icons-react";
import { useState } from "react";

export default function ModalPublishCourse({
  publishOpen,
  handlePublishClose,
  publishCourseData,
  mutate,
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  const onSuccessPublishCourse = () => {
    mutate();
    handlePublishClose();
  };

  const handlePublishCourse = () => {
    fetchPUT({
      url: `${TEACHER_API_URL}/course/publish?id=${publishCourseData.id}`,
      successMessage: "Successfully published course",
      onSuccess: onSuccessPublishCourse,
      setBtnLoading,
    });
  };

  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) =>
        value !== publishCourseData.title &&
        "Please enter the correct course title",
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
      <form onSubmit={form.onSubmit(handlePublishCourse)}>
        <Stack spacing="sm">
          <Alert icon={<IconAlertCircle />} title="Warning!" color="red">
            Once you publish this course you will not be able to add a chapter
            or change the chapter&apos;s position or delete the chapter.
            <br />
            Course title:{" "}
            <i>
              <b>&quot;{publishCourseData.title}&quot;</b>
            </i>
          </Alert>
          <TextInput
            label="Please enter the course title to confirm"
            {...form.getInputProps("title")}
          />
          <Button
            color="violet"
            leftIcon={<IconUpload />}
            type="submit"
            loading={btnLoading}
          >
            Publish course
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
