import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import TableCourse from "@/components/pages/student/course/TableCourse";
import { BASE_DEBOUCE, STUDENT_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { TextInput, Title } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";

export default function Course() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, BASE_DEBOUCE.DURATION);

  const { data: course, isLoading: courseLoading } = useFetchAPI({
    url: `${STUDENT_API_URL}/course/get?search=${debouncedSearch}`,
  });

  const handleChangeSearch = (e) => setSearch(e.target.value);

  const pageState = DataLoadCheck({ data: course, isLoading: courseLoading });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Course">
        <MainCard>
          <Title>List of Courses</Title>
          <TextInput
            placeholder="Search..."
            value={search}
            onChange={handleChangeSearch}
          />
          <TableCourse course={course} loading={courseLoading} />
        </MainCard>
      </PageWrapper>
    )
  );
}
