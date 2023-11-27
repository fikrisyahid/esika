import { Button, Stack } from "@mantine/core";
import BaseTable from "@/components/BaseTable";
import { fetchPUT } from "@/utils/crud";
import { TEACHER_API_URL } from "@/configs";
import { useState } from "react";

export default function TableAssignQuiz({ quizzes, chapter, onSuccess }) {
  const [btnLoadingAssign, setBtnLoadingAssign] = useState(false);
  const [btnLoadingUnassign, setBtnLoadingUnassign] = useState(false);

  const handleAssignQuiz = (id) => {
    fetchPUT({
      url: `${TEACHER_API_URL}/chapter/assign`,
      body: {
        id: chapter?.id,
        quiz_id: id,
      },
      successMessage: "Successfully assigned quiz",
      onSuccess,
      setBtnLoading: setBtnLoadingAssign,
    });
  };

  const handleDeleteAssign = () => {
    fetchPUT({
      url: `${TEACHER_API_URL}/quiz/assign`,
      body: {
        id: chapter?.id,
        delete_assign: true,
      },
      successMessage: "Successfully unassigned quiz from chapter",
      onSuccess,
      setBtnLoading: setBtnLoadingUnassign,
    });
  };

  // Define rows
  const rows = quizzes?.map((item, i) => ({
    no: i + 1,
    id: item?.id,
    title: item?.title,
  }));

  // Define columns
  const columns = [
    { accessor: "no", title: "No", textAlignment: "center" },
    { accessor: "title", title: "Title" },
    {
      accessor: "actions",
      title: "Actions",
      textAlignment: "center",
      render: (values) => (
        <Stack spacing="sm">
          {values.id === chapter?.Quiz?.id ? (
            <Button
              size="xs"
              color="red"
              loading={btnLoadingUnassign}
              onClick={handleDeleteAssign}
            >
              Unassign
            </Button>
          ) : (
            <Button
              size="xs"
              color="dark"
              loading={btnLoadingAssign}
              onClick={() => handleAssignQuiz(values.id)}
            >
              Assign
            </Button>
          )}
        </Stack>
      ),
    },
  ];

  return <BaseTable rows={rows} columns={columns} />;
}
