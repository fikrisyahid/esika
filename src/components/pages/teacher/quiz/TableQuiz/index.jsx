import DataLoadError from "@/components/DataLoadError";
import { Badge, Button, Skeleton, Stack, Text } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import BaseTable from "@/components/BaseTable";
import { useState } from "react";
import getDifficultyColor from "@/utils/get-difficulty-color";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

export default function TableQuiz({ quiz, loading, mutate }) {
  const router = useRouter();

  const [deleteQuizOpen, setDeleteQuizOpen] = useState(false);
  const [deleteQuizData, setDeleteQuizData] = useState({
    id: "",
    code: "",
  });

  const handleCloseDeleteQuiz = () => setDeleteQuizOpen(false);
  const handleOpenDeleteQuiz = ({ id, code }) => {
    setDeleteQuizData({
      id,
      code,
    });
    setDeleteQuizOpen(true);
  };

  const handleViewChapter = ({ courseId, chapterId }) => {
    router.push(
      `/teacher/course/${courseId}/chapter/${chapterId}?from_quiz=true`
    );
  };

  if (loading) return <Skeleton height={200} />;
  if (quiz?.statusCode !== 200) return <DataLoadError data={quiz} />;

  // Define rows
  const rows = quiz?.data?.map((item, i) => ({
    no: i + 1,
    ...item,
    question_count: item?._count?.Question,
    student_count: item?._count?.Students,
  }));

  // Define columns
  const columns = [
    { accessor: "no", title: "No", textAlignment: "center" },
    { accessor: "title", title: "Title" },
    {
      accessor: "quiz_difficulty",
      title: "Difficulty",
      textAlignment: "center",
      render: (value) => {
        const { quiz_difficulty: difficulty } = value;
        const color = getDifficultyColor(difficulty);
        return <Badge color={color}>{difficulty}</Badge>;
      },
    },
    {
      accessor: "code",
      title: "Code",
      textAlignment: "center",
      render: (value) => <Text>{value.code}</Text>,
    },
    {
      accessor: "time_limit",
      title: "Time Limit",
      render: (value) => {
        const { time_limit: timeLimit } = value;
        if (timeLimit) {
          return <Text>{value.time_limit} minutes</Text>;
        }
        return <Text>-</Text>;
      },
    },
    {
      accessor: "minimum_score",
      title: "Minimum Score",
      textAlignment: "center",
      render: (value) => {
        const { minimum_score: minimumScore } = value;
        if (minimumScore) {
          return <Text>{value.minimum_score}</Text>;
        }
        return <Text>-</Text>;
      },
    },
    {
      accessor: "chapter",
      title: "Chapter",
      textAlignment: "center",
      render: (value) => {
        if (value.Chapter) {
          return (
            <Button
              color="dark"
              size="xs"
              onClick={() =>
                handleViewChapter({
                  courseId: value.Chapter?.course?.id,
                  chapterId: value.Chapter.id,
                })
              }
            >
              View
            </Button>
          );
        }
        return <Text>-</Text>;
      },
    },
    {
      accessor: "question_count",
      title: "Questions",
      textAlignment: "center",
      render: (value) => <Badge color="cyan">{value.question_count}</Badge>,
    },
    {
      accessor: "student_count",
      title: "Students",
      textAlignment: "center",
      render: (value) => <Badge color="indigo">{value.student_count}</Badge>,
    },
    {
      accessor: "published",
      textAlignment: "center",
      title: "Status",
      render: (value) => {
        const label = value.published ? "Published" : "Draft";
        const color = value.published ? "violet" : "orange";
        return <Badge color={color}>{label}</Badge>;
      },
    },
    {
      accessor: "actions",
      title: "Actions",
      textAlignment: "right",
      render: (values) => (
        <Stack spacing="sm">
          <Button
            size="xs"
            color="green"
            leftIcon={<IconEye />}
            onClick={() => router.push(`/teacher/quiz/${values.id}`)}
          >
            Detail
          </Button>
          <Button
            size="xs"
            color="red"
            disabled={values.published}
            leftIcon={<IconTrash />}
            onClick={() =>
              handleOpenDeleteQuiz({ id: values.id, code: values.code })
            }
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <ModalDeleteQuiz
        deleteQuizData={deleteQuizData}
        deleteQuizOpen={deleteQuizOpen}
        handleCloseDeleteQuiz={handleCloseDeleteQuiz}
        mutate={mutate}
      />
      <BaseTable rows={rows} columns={columns} />
    </>
  );
}
