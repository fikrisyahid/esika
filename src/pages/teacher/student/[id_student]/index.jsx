import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import LoginInfo from "@/components/pages/teacher/students/detail/LoginInfo";
import TableStudentInfo from "@/components/pages/teacher/students/detail/TableStudentInfo";
import { TEACHER_API_URL } from "@/configs";
import getDevStatus from "@/utils/get-dev-status";
import { Button, Group, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";

export default function DetailStudentPage() {
  const { isDev } = getDevStatus();

  const router = useRouter();

  const { id_student: idStudent } = router.query;

  const handleBack = () => router.push(`/teacher/student`);

  const { data: student, isLoading: studentLoading } = useFetchAPI({
    url: `${TEACHER_API_URL}/user/student?id=${idStudent}`,
  });

  const pageState = DataLoadCheck({ data: student, isLoading: studentLoading });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Detail Student">
        <MainCard fullWidth>
          <Group mb="sm">
            <Button
              leftIcon={<IconArrowLeft />}
              color="dark"
              onClick={handleBack}
            >
              Back
            </Button>
            <Title size={25}>Detail Student</Title>
          </Group>
          <MainCard row noPadding transparent>
            <MainCard noPadding transparent width="30%">
              <LoginInfo idStudent={idStudent} student={student} />
            </MainCard>
            <MainCard noPadding transparent width="70%">
              <TableStudentInfo student={student} />
            </MainCard>
          </MainCard>
        </MainCard>
        {isDev && (
          <MainCard>
            <PrettyJSON json={student} />
          </MainCard>
        )}
      </PageWrapper>
    )
  );
}
