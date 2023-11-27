import { TEACHER_API_URL } from "@/configs";
import { fetchDELETE } from "@/utils/crud";
import { Alert, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircle, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function ModalDeleteStudent({
  deleteStudentOpen,
  handleCloseDeleteStudent,
  deleteStudentData,
  mutate,
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  const onSuccessDeleteStudent = () => {
    mutate();
    handleCloseDeleteStudent();
  };

  const handleDeleteCourse = () => {
    fetchDELETE({
      url: `${TEACHER_API_URL}/user/delete?id=${deleteStudentData.id}`,
      successMessage: "Successfully deleted student",
      onSuccess: onSuccessDeleteStudent,
      setBtnLoading,
    });
  };

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) =>
        value !== deleteStudentData.name &&
        "Please enter the correct student name",
    },
  });

  const handleCloseModal = () => {
    form.reset();
    handleCloseDeleteStudent();
  };

  return (
    <Modal
      opened={deleteStudentOpen}
      onClose={handleCloseModal}
      withCloseButton={false}
      centered
      size="lg"
      xOffset={0}
    >
      <form onSubmit={form.onSubmit(handleDeleteCourse)}>
        <Stack spacing="sm">
          <Alert icon={<IconAlertCircle />} title="Warning!" color="red">
            Deleting this student will delete all data connected to this
            student.
            <br />
            Student name:{" "}
            <i>
              <b>&quot;{deleteStudentData.name}&quot;</b>
            </i>
          </Alert>
          <TextInput
            label="Please enter the student name to confirm"
            {...form.getInputProps("name")}
          />
          <Button
            color="red"
            leftIcon={<IconTrash />}
            type="submit"
            loading={btnLoading}
          >
            Delete student
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
