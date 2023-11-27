import DataLoadError from "@/components/DataLoadError";
import getRankColor from "@/utils/get-rank-color";
import { Badge, Button, Group, Skeleton } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import BaseTable from "@/components/BaseTable";
import { useState } from "react";
import ModalDeleteStudent from "./ModalDeleteStudent";

export default function TableStudent({ students, loading, mutate }) {
  const router = useRouter();

  const [deleteStudentOpen, setDeleteStudentOpen] = useState(false);
  const [deleteStudentData, setDeleteStudentData] = useState({
    id: "",
    name: "",
  });

  const handleCloseDeleteStudent = () => setDeleteStudentOpen(false);
  const handleOpenDeleteStudent = ({ id, name }) => {
    setDeleteStudentData({
      id,
      name,
    });
    setDeleteStudentOpen(true);
  };

  if (loading) return <Skeleton height={200} />;
  if (students?.statusCode !== 200) return <DataLoadError data={students} />;

  // Define rows
  const rows = students?.data?.map((item, i) => ({
    no: i + 1,
    ...item,
  }));

  // Define columns
  const columns = [
    { accessor: "no", title: "No", textAlignment: "center" },
    { accessor: "name", title: "Name" },
    {
      accessor: "user_rank",
      title: "Rank",
      textAlignment: "center",
      render: (value) => {
        const { user_rank: rank } = value;
        const color = getRankColor(rank);
        return <Badge color={color}>{rank}</Badge>;
      },
    },
    { accessor: "username", title: "Username" },
    {
      accessor: "actions",
      title: "Actions",
      textAlignment: "right",
      render: (values) => (
        <Group position="right" spacing="xs" noWrap>
          <Button
            size="xs"
            color="green"
            leftIcon={<IconEye />}
            onClick={() => router.push(`/teacher/student/${values.id}`)}
          >
            Detail
          </Button>
          <Button
            size="xs"
            color="red"
            leftIcon={<IconTrash />}
            onClick={() =>
              handleOpenDeleteStudent({ id: values.id, name: values.name })
            }
          >
            Delete
          </Button>
        </Group>
      ),
    },
  ];

  return (
    <>
      <ModalDeleteStudent
        deleteStudentData={deleteStudentData}
        deleteStudentOpen={deleteStudentOpen}
        handleCloseDeleteStudent={handleCloseDeleteStudent}
        mutate={mutate}
      />
      <BaseTable rows={rows} columns={columns} />
    </>
  );
}
