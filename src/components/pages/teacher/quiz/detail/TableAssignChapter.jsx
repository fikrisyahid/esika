import { Button, Stack } from "@mantine/core";
import BaseTable from "@/components/BaseTable";
import { fetchPUT } from "@/utils/crud";
import { TEACHER_API_URL } from "@/configs";
import { useState } from "react";

export default function TableAssignChapter({ quiz, chapters, onSuccess }) {
  const [btnLoadingAssign, setBtnLoadingAssign] = useState(false);
  const [btnLoadingUnassign, setBtnLoadingUnassign] = useState(false);

  const handleAssignChapter = (id) => {
    fetchPUT({
      url: `${TEACHER_API_URL}/quiz/assign`,
      body: {
        id: quiz?.id,
        chapter_id: id,
      },
      successMessage: "Successfully assigned chapter",
      onSuccess,
      setBtnLoading: setBtnLoadingAssign,
    });
  };

  const handleDeleteAssign = () => {
    fetchPUT({
      url: `${TEACHER_API_URL}/quiz/assign`,
      body: {
        id: quiz?.id,
        delete_assign: true,
      },
      successMessage: "Successfully unassigned chapter from quiz",
      onSuccess,
      setBtnLoading: setBtnLoadingUnassign,
    });
  };

  // Define rows
  const rows = chapters?.map((item, i) => ({
    no: i + 1,
    id: item?.id,
    course: item?.course?.title,
    chapter: item?.title,
  }));

  // Define columns
  const columns = [
    { accessor: "no", title: "No", textAlignment: "center" },
    { accessor: "course", title: "Course" },
    { accessor: "chapter", title: "Chapter" },
    {
      accessor: "actions",
      title: "Actions",
      textAlignment: "center",
      render: (values) => (
        <Stack spacing="sm">
          {values.id === quiz?.Chapter?.id ? (
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
              onClick={() => handleAssignChapter(values.id)}
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
