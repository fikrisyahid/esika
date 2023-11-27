import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import { TEACHER_API_URL } from "@/configs";
import getDevStatus from "@/utils/get-dev-status";
import { useRouter } from "next/router";
import useFetchAPI from "@/hooks/useFetchAPI";
import CourseInfo from "@/components/pages/teacher/course/detail/CourseInfo";
import CourseHeader from "@/components/pages/teacher/course/CourseHeader";
import { Button, Group, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import ChapterLists from "@/components/pages/teacher/course/detail/ChapterLists";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";

export default function DetailCoursePage() {
  const router = useRouter();

  const { id_course: idCourse } = router.query;

  const { isDev } = getDevStatus();

  const {
    data: course,
    isLoading: courseLoading,
    mutate: courseMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/course/get?id=${idCourse}`,
  });

  const handleAddChapter = () =>
    router.push(`/teacher/course/${idCourse}/chapter/add`);

  const pageState = DataLoadCheck({ data: course, isLoading: courseLoading });

  const isPublished = course?.data?.published;

  return (
    pageState ?? (
      <PageWrapper pageTitle="Detail Course">
        <MainCard>
          <CourseHeader course={course} mutate={courseMutate} />
          <CourseInfo course={course} mutate={courseMutate} />
        </MainCard>
        <MainCard>
          <Group position="apart">
            <Title size={25}>Chapter Lists</Title>
            <Button
              disabled={isPublished}
              leftIcon={<IconPlus />}
              color="dark"
              onClick={handleAddChapter}
            >
              Add new chapter
            </Button>
          </Group>
          <ChapterLists course={course} mutate={courseMutate} />
        </MainCard>
        {isDev && (
          <MainCard>
            <PrettyJSON json={course} />
          </MainCard>
        )}
      </PageWrapper>
    )
  );
}
