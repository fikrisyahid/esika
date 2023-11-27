import { profile } from "@/atoms";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { TEACHER_API_URL } from "@/configs";
import { fetchPOST } from "@/utils/crud";
import isStringEmpty from "@/utils/validation/is-string-empty";
import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateCoursePage() {
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);

  const user = useAtomValue(profile);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: (value) => isStringEmpty(value) && "Title is required",
      description: (value) => isStringEmpty(value) && "Description is required",
    },
  });

  const handleBack = () => router.push(`/teacher/course`);
  const handleCreateCourse = (values) => {
    fetchPOST({
      url: `${TEACHER_API_URL}/course/create`,
      body: {
        ...values,
        teacher_id: user.id,
      },
      setBtnLoading,
      successMessage: "Successfully created a new course",
      onSuccess: handleBack,
    });
  };

  return (
    <PageWrapper pageTitle="Create a new course">
      <MainCard>
        <Group position="left">
          <Button
            leftIcon={<IconArrowLeft />}
            onClick={handleBack}
            color="dark"
          >
            Back
          </Button>
          <Title>Create a new course</Title>
        </Group>
        <form onSubmit={form.onSubmit(handleCreateCourse)}>
          <Stack spacing="xs">
            <TextInput
              withAsterisk
              label="Title"
              placeholder="Course title"
              {...form.getInputProps("title")}
            />
            <TextInput
              withAsterisk
              label="Description"
              placeholder="Course description"
              {...form.getInputProps("description")}
            />
            <Button
              type="submit"
              leftIcon={<IconPlus />}
              loading={btnLoading}
              color="orange"
              style={{ alignSelf: "start" }}
              mt="xs"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </MainCard>
    </PageWrapper>
  );
}
