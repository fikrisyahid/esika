import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import TableCourse from "@/components/pages/teacher/course/TableCourse";
import { BASE_DEBOUCE, TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Alert, Button, Group, TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconAlertCircle, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Course() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, BASE_DEBOUCE.DURATION);

  const router = useRouter();

  const {
    data: course,
    isLoading: courseLoading,
    mutate: courseMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/course/get?search=${debouncedSearch}`,
  });

  const handleCreateCourse = () => router.push(`/teacher/course/create`);
  const handleChangeSearch = (e) => setSearch(e.target.value);

  const pageState = DataLoadCheck({ data: course, isLoading: courseLoading });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Course">
        <MainCard>
          <Group position="apart">
            <Title>My Courses</Title>
            <Button
              leftIcon={<IconPlus />}
              onClick={handleCreateCourse}
              color="dark"
            >
              Create a new course
            </Button>
          </Group>
          <TextInput
            placeholder="Search..."
            value={search}
            onChange={handleChangeSearch}
          />
          <Alert
            icon={<IconAlertCircle />}
            title="Info"
            radius="md"
            variant="filled"
          >
            The student can only see the published chapter
          </Alert>
          <TableCourse
            course={course}
            loading={courseLoading}
            mutate={courseMutate}
          />
        </MainCard>
      </PageWrapper>
    )
  );
}
