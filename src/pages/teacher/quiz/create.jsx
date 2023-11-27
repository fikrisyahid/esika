import { profile } from "@/atoms";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import QuestionLists from "@/components/pages/teacher/quiz/create/QuestionLists";
import QuizCreateInfo from "@/components/pages/teacher/quiz/create/QuizCreateInfo";
import { TEACHER_API_URL } from "@/configs";
import { fetchPOST } from "@/utils/crud";
import isStringEmpty from "@/utils/validation/is-string-empty";
import { Button, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateQuizPage() {
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);

  const user = useAtomValue(profile);

  const [questions, setQuestions] = useState([]);

  const form = useForm({
    initialValues: {
      title: "",
      timeLimit: "0",
      timeLimitRequired: false,
      minimumScore: "0",
      minimumScoreRequired: false,
      difficulty: "EASY",
    },
    validate: {
      title: (value) => isStringEmpty(value) && "Title is required",
      timeLimit: (value, { timeLimitRequired }) =>
        timeLimitRequired && value === "0" && "Time limit is required",
      minimumScore: (value, { minimumScoreRequired }) =>
        minimumScoreRequired && value === "0" && "Minimum score is required",
    },
  });

  const handleBack = () => router.push(`/teacher/quiz`);
  const handleCreateQuiz = (values) => {
    fetchPOST({
      url: `${TEACHER_API_URL}/quiz/create`,
      body: {
        ...values,
        teacher_id: user.id,
        timeLimit: parseInt(values.timeLimit),
        minimumScore: parseInt(values.minimumScore),
        questions,
      },
      setBtnLoading,
      successMessage: "Successfully created a new quiz",
      onSuccess: handleBack,
    });
  };

  return (
    <PageWrapper pageTitle="Create a new quiz">
      <MainCard>
        <Group position="left">
          <Button
            leftIcon={<IconArrowLeft />}
            onClick={handleBack}
            color="dark"
          >
            Back
          </Button>
          <Title>Create a new quiz</Title>
        </Group>
        <form onSubmit={form.onSubmit(handleCreateQuiz)}>
          <Stack spacing="xs">
            <QuizCreateInfo form={form} />
            <QuestionLists questions={questions} setQuestions={setQuestions} />
            <Button
              type="submit"
              leftIcon={<IconPlus />}
              loading={btnLoading}
              color="orange"
              mt="sm"
              style={{ alignSelf: "start" }}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </MainCard>
    </PageWrapper>
  );
}
