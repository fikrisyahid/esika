import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import TableStudent from "@/components/pages/teacher/students/TableStudent";
import { BASE_DEBOUCE, TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import getDevStatus from "@/utils/get-dev-status";
import { Button, Group, TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Students() {
  const { isDev } = getDevStatus();

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, BASE_DEBOUCE.DURATION);

  const router = useRouter();

  const {
    data: students,
    isLoading: studentsLoading,
    mutate: studentMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/user/student?search=${debouncedSearch}`,
  });

  const handleAddStudent = () => router.push(`/teacher/student/add`);
  const handleChangeSearch = (e) => setSearch(e.target.value);

  const pageState = DataLoadCheck({
    data: students,
    isLoading: studentsLoading,
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Students">
        <MainCard>
          <Group position="apart">
            <Title>List of students</Title>
            <Button
              leftIcon={<IconPlus />}
              color="dark"
              onClick={handleAddStudent}
            >
              Add new student
            </Button>
          </Group>
          <TextInput
            placeholder="Search..."
            value={search}
            onChange={handleChangeSearch}
          />
          <TableStudent
            students={students}
            loading={studentsLoading}
            mutate={studentMutate}
          />
        </MainCard>
        {isDev && (
          <MainCard>
            <PrettyJSON json={students} />
          </MainCard>
        )}
      </PageWrapper>
    )
  );
}
