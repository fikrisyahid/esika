import BaseRTE from "@/components/BaseRTE";
import BaseStringHTML from "@/components/BaseStringHTML";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { TEACHER_API_URL } from "@/configs";
import { fetchPOST } from "@/utils/crud";
import getDevStatus from "@/utils/get-dev-status";
import isStringEmpty from "@/utils/validation/is-string-empty";
import isValidURL from "@/utils/validation/is-valid-url";
import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddChapterPage() {
  const router = useRouter();
  const { isDev } = getDevStatus();
  const { id_course: idCourse } = router.query;

  const handleBack = () => router.push(`/teacher/course/${idCourse}`);

  const [content, setContent] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      video_link: "",
    },
    validate: {
      title: (value) => isStringEmpty(value) && "Title is required",
      video_link: (value) =>
        !isStringEmpty(value) &&
        !isValidURL(value) &&
        "Video link is not valid",
    },
  });

  const handleSubmitChapter = (values) => {
    fetchPOST({
      body: {
        ...values,
        course_id: idCourse,
        content,
      },
      url: `${TEACHER_API_URL}/chapter/add`,
      successMessage: "Chapter added successfully",
      onSuccess: handleBack,
      setBtnLoading,
    });
  };

  return (
    <PageWrapper pageTitle="Create Chapter">
      <MainCard>
        <form onSubmit={form.onSubmit(handleSubmitChapter)}>
          <Stack spacing="sm">
            <Group position="apart">
              <Group position="left">
                <Button
                  leftIcon={<IconArrowLeft />}
                  onClick={handleBack}
                  color="dark"
                >
                  Back
                </Button>
                <Title>Add a new chapter</Title>
              </Group>
              <Button
                leftIcon={<IconPlus />}
                color="violet"
                type="submit"
                loading={btnLoading}
              >
                Submit Chapter
              </Button>
            </Group>
            <TextInput
              label="Title"
              placeholder="Title of the chapter"
              {...form.getInputProps("title")}
            />
            <TextInput
              label="Video link (optional) - Video will be placed on top of chapter"
              placeholder="Link for the video"
              {...form.getInputProps("video_link")}
            />
            <Title size={25} mt="sm">
              Chapter Content
            </Title>
            <BaseRTE setContent={setContent} />
          </Stack>
        </form>
      </MainCard>
      {isDev && (
        <MainCard>
          <Title size={25}>Preview</Title>
          <BaseStringHTML htmlString={content} />
        </MainCard>
      )}
    </PageWrapper>
  );
}
