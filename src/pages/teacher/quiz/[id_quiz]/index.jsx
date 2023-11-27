import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import { TEACHER_API_URL } from "@/configs";
import getDevStatus from "@/utils/get-dev-status";
import { useRouter } from "next/router";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import QuizHeader from "@/components/pages/teacher/quiz/detail/QuizHeader";
import QuizInfo from "@/components/pages/teacher/quiz/detail/QuizInfo";
import QuestionLists from "@/components/pages/teacher/quiz/detail/QuestionLists";
import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function DetailQuizPage() {
  const router = useRouter();

  const {from_chapter: fromChapter} = router.query;

  const { id_quiz: idQuiz } = router.query;

  const { isDev } = getDevStatus();

  const {
    data: quiz,
    isLoading: quizLoading,
    mutate: quizMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/quiz/get?id=${idQuiz}`,
  });

  const {
    data: chapters,
    isLoading: chapterLoading,
    mutate: chapterMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/chapter/get?draft_only=true&without_quiz=true`,
  });

  const pageState = DataLoadCheck({
    data: [quiz, chapters],
    isLoading: [quizLoading, chapterLoading],
  });

  const isPublished = quiz?.data?.published;

  return (
    pageState ?? (
      <PageWrapper pageTitle="Detail Quiz">
        <MainCard>
          <QuizHeader
            quiz={quiz}
            chapters={chapters}
            mutateQuiz={quizMutate}
            mutateChapter={chapterMutate}
            fromChapter={fromChapter === "true"}
          />
          {!isPublished && (
            <Alert
              icon={<IconAlertCircle />}
              title="Info"
              radius="md"
              variant="filled"
            >
              Once you publish your course, you will not be able to edit any
              data on this quiz.
            </Alert>
          )}
          {isPublished && (
            <Alert
              icon={<IconAlertCircle />}
              title="Info"
              radius="md"
              variant="filled"
              color="yellow"
            >
              You have published your course, you will not be able to edit any
              data on this quiz.
            </Alert>
          )}
          <QuizInfo quiz={quiz} mutate={quizMutate} />
        </MainCard>
        <MainCard>
          <QuestionLists
            published={isPublished}
            questions={quiz.data.Question}
            mutate={quizMutate}
          />
        </MainCard>
        {isDev && (
          <>
            <MainCard>
              <PrettyJSON json={quiz} />
            </MainCard>
            <MainCard>
              <PrettyJSON json={chapters} />
            </MainCard>
          </>
        )}
      </PageWrapper>
    )
  );
}
