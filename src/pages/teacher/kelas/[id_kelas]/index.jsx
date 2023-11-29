import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import MateriCard from "@/components/kelas/MateriCard";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Button, Grid, Group, Text, Title } from "@mantine/core";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function DetailKelas() {
  const router = useRouter();

  const { isDev } = getDevStatus();

  const { id_kelas: idKelas } = router.query;

  const handleBack = () => {
    router.push("/teacher/kelas");
  };

  const handleCreateMateri = () => {
    router.push(`/teacher/kelas/detail/${idKelas}/materi/create`);
  };

  const { data: kelas, isLoading: kelasLoading } = useFetchAPI({
    url: `${TEACHER_API_URL}/kelas?id=${idKelas}&materi=true&mahasiswa=true`,
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
        </MainCard>
        <Grid>
          <Grid.Col md={6}>
            <MainCard>
              <Group position="apart">
                <Text size={24}>Daftar Materi</Text>
                <Button
                  color="dark"
                  leftIcon={<IconPlus />}
                  onClick={handleCreateMateri}
                >
                  Tambah materi
                </Button>
              </Group>
              {kelas?.data?.Materi?.map((item) => (
                <MateriCard
                  key={item.id}
                  canDelete
                  canView
                  canEdit
                  onClickDelete={() => {}}
                  onClickEdit={() => {}}
                  onClickView={() => {}}
                  judul={item.judul}
                />
              ))}
            </MainCard>
          </Grid.Col>
          <Grid.Col md={6}>
            <MainCard>
              <Text size={24}>Daftar Mahasiswa</Text>
            </MainCard>
          </Grid.Col>
        </Grid>
        {isDev && <PrettyJSON json={kelas} />}
      </PageWrapper>
    )
  );
}
