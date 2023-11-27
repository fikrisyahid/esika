import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import TableQuiz from "@/components/pages/teacher/quiz/TableQuiz";
import { BASE_DEBOUCE, TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Button, Group, TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Quiz() {
  const { isDev } = getDevStatus();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, BASE_DEBOUCE.DURATION);

  const router = useRouter();

  const {
    data: quiz,
    isLoading: quizLoading,
    mutate: quizMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/quiz/get?search=${debouncedSearch}`,
  });

  const handleCreateQuiz = () => router.push(`/teacher/quiz/create`);
  const handleChangeSearch = (e) => setSearch(e.target.value);

  const pageState = DataLoadCheck({ data: quiz, isLoading: quizLoading });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Quiz">
        <MainCard>
          <Group position="apart">
            <Title>My Quizzes</Title>
            <Button
              leftIcon={<IconPlus />}
              onClick={handleCreateQuiz}
              color="dark"
            >
              Create a new quiz
            </Button>
          </Group>
          <TextInput
            placeholder="Search..."
            value={search}
            onChange={handleChangeSearch}
          />
          <TableQuiz loading={quizLoading} mutate={quizMutate} quiz={quiz} />
        </MainCard>
        {isDev && (
          <MainCard>
            <PrettyJSON json={quiz} />
          </MainCard>
        )}
      </PageWrapper>
    )
  );
}
