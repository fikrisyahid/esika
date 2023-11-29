import BaseStringHTML from "@/components/BaseStringHTML";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Button, Divider, Group, Text, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function DetailMateri() {
  const router = useRouter();

  const { isDev } = getDevStatus();

  const { id_kelas: idKelas, id_materi: idMateri } = router.query;

  const { data: materi, isLoading: materiLoading } = useFetchAPI({
    url: `${TEACHER_API_URL}/materi?id=${idMateri}`,
  });

  const handleBack = () => {
    router.push(`/teacher/kelas/${idKelas}`);
  };

  const pageState = DataLoadCheck({
    data: materi,
    isLoading: materiLoading,
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Detail materi">
        <MainCard>
          <Group>
            <Button
              color="dark"
              leftIcon={<IconArrowLeft />}
              onClick={handleBack}
            >
              Kembali
            </Button>
            <Title>Detail materi</Title>
          </Group>
        </MainCard>
        <MainCard>
          <Title size={28} mt="sm" align="center">
            {materi?.data?.judul}
          </Title>
          <Text align="center">{materi?.data?.deskripsi}</Text>
          <Divider />
          <BaseStringHTML htmlString={materi?.data?.file} />
        </MainCard>
        {isDev && <PrettyJSON json={materi} />}
      </PageWrapper>
    )
  );
}
