import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { TEACHER_API_URL } from "@/configs";
import { fetchPOST } from "@/utils/crud";
import isStringEmpty from "@/utils/validation/is-string-empty";
import isValidPassword from "@/utils/validation/is-valid-password";
import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddStudentPage() {
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      username: "",
      password: "",
    },
    validate: {
      name: (value) => isStringEmpty(value) && "Name is required",
      username: (value) => isStringEmpty(value) && "Username is required",
      password: (value) => {
        const { valid, message } = isValidPassword(value);
        return !valid && message;
      },
    },
  });

  const handleBack = () => router.push(`/teacher/student`);
  const handleAddStudent = (values) => {
    fetchPOST({
      url: `${TEACHER_API_URL}/user/register`,
      body: values,
      setBtnLoading,
      successMessage: "Successfully added a new student",
      onSuccess: handleBack,
    });
  };

  return (
    <PageWrapper pageTitle="Add a new student">
      <MainCard>
        <Group position="left">
          <Button
            leftIcon={<IconArrowLeft />}
            onClick={handleBack}
            color="dark"
          >
            Back
          </Button>
          <Title>Add a new student</Title>
        </Group>
        <form onSubmit={form.onSubmit(handleAddStudent)}>
          <Stack spacing="xs">
            <TextInput
              spellCheck="false"
              label="Name"
              type="text"
              placeholder="Arif Amin"
              {...form.getInputProps("name")}
            />
            <TextInput
              spellCheck="false"
              label="Username"
              type="username"
              placeholder="arif213"
              {...form.getInputProps("username")}
            />
            <TextInput
              spellCheck="false"
              label="Password"
              type="password"
              placeholder="********"
              {...form.getInputProps("password")}
            />
            <Group position="left" mt="md">
              <Button
                type="submit"
                leftIcon={<IconPlus />}
                loading={btnLoading}
                color="orange"
              >
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </MainCard>
    </PageWrapper>
  );
}
