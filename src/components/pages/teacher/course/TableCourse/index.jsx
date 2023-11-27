import DataLoadError from "@/components/DataLoadError";
import { Badge, Button, Group, Skeleton } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import BaseTable from "@/components/BaseTable";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalDeleteCourse from "./ModalDeleteCourse";

export default function TableCourse({ course, loading, mutate }) {
  const router = useRouter();

  const [deleteCourseOpen, setDeleteCourseOpen] = useState(false);
  const [deleteCourseData, setDeleteCourseData] = useState({
    id: "",
    title: "",
  });

  const handleCloseDeleteCourse = () => setDeleteCourseOpen(false);
  const handleOpenDeleteCourse = ({ id, title }) => {
    setDeleteCourseData({
      id,
      title,
    });
    setDeleteCourseOpen(true);
  };

  if (loading) return <Skeleton height={200} />;
  if (course?.statusCode !== 200) return <DataLoadError data={course} />;

  // Define rows
  const rows = course?.data?.map((item, i) => ({
    no: i + 1,
    ...item,
  }));

  // Define columns
  const columns = [
    { accessor: "no", title: "No", textAlignment: "center" },
    { accessor: "title", title: "Title" },
    { accessor: "description", title: "Description" },
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
        <Group position="right" spacing="xs" noWrap>
          <Button
            size="xs"
            color="green"
            leftIcon={<IconEye />}
            onClick={() => router.push(`/teacher/course/${values.id}`)}
          >
            Detail
          </Button>
          <Button
            disabled={values.published}
            size="xs"
            color="red"
            leftIcon={<IconTrash />}
            onClick={() =>
              handleOpenDeleteCourse({ id: values.id, title: values.title })
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
      <ModalDeleteCourse
        deleteCourseData={deleteCourseData}
        deleteCourseOpen={deleteCourseOpen}
        handleCloseDeleteCourse={handleCloseDeleteCourse}
        mutate={mutate}
      />
      <BaseTable rows={rows} columns={columns} />
    </>
  );
}
