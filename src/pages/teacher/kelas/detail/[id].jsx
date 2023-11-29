import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Button, Group, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function DetailKelas() {
  const router = useRouter();

  const { isDev } = getDevStatus();

  const { id } = router.query;

  const handleBack = () => {
    router.push("/teacher/kelas");
  };

  const { data: kelas, isLoading: kelasLoading } = useFetchAPI({
    url: `${TEACHER_API_URL}/kelas?id=${id}`,
  });

  const pageState = DataLoadCheck({
    data: kelas,
    isLoading: kelasLoading,
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Detail kelas">
        <MainCard>
          <Group>
            <Button
              color="dark"
              leftIcon={<IconArrowLeft />}
              onClick={handleBack}
            >
              Kembali
            </Button>
            <Title>Detail kelas</Title>
          </Group>
          {isDev && <PrettyJSON json={kelas} />}
        </MainCard>
      </PageWrapper>
    )
  );
}
