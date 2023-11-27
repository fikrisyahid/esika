import { TEACHER_API_URL } from "@/configs";
import { fetchPUT } from "@/utils/crud";
import isStringEmpty from "@/utils/validation/is-string-empty";
import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function CourseInfo({ course, mutate }) {
  const form = useForm({
    initialValues: {
      title: course?.data?.title || "",
      description: course?.data?.description || "",
    },
    validate: {
      title: (value) => isStringEmpty(value) && "Title must not be empty",
      description: (value) =>
        isStringEmpty(value) && "Description must not be empty",
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleEdit = () => setEditMode(true);

  const handleResetForm = () => {
    form.setValues({
      title: course?.data?.title || "",
      description: course?.data?.description || "",
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    handleResetForm();
  };

  useEffect(() => {
    handleResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  const handleEditCourse = (values) => {
    fetchPUT({
      body: {
        ...values,
        id: course?.data?.id,
      },
      url: `${TEACHER_API_URL}/course/update`,
      successMessage: "Course updated successfully",
      onSuccess: () => {
        setEditMode(false);
        mutate();
      },
      setBtnLoading,
    });
  };
  return (
    <form onSubmit={form.onSubmit(handleEditCourse)}>
      <Stack spacing="sm">
        <TextInput
          withAsterisk={editMode}
          disabled={!editMode}
          label="Title"
          {...form.getInputProps("title")}
        />
        <Textarea
          withAsterisk={editMode}
          disabled={!editMode}
          label="Description"
          {...form.getInputProps("description")}
        />
        {!editMode && (
          <Button
            mt={10}
            style={{ alignSelf: "flex-end" }}
            color="orange"
            leftIcon={<IconEdit />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}
        {editMode && (
          <Group position="right">
            <Button color="green" loading={btnLoading} type="submit">
              Apply
            </Button>
            <Button color="orange" onClick={handleCancel}>
              Cancel
            </Button>
          </Group>
        )}
      </Stack>
    </form>
  );
}
