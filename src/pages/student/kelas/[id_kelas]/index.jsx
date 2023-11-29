import BaseTable from "@/components/BaseTable";
import MainCard from "@/components/MainCard";
import NoData from "@/components/NoData";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import MateriCard from "@/components/kelas/MateriCard";
import { SHARED_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import {
  Button,
  Code,
  Grid,
  Group,
  Progress,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function DetailKelas() {
  const router = useRouter();

  const { isDev } = getDevStatus();

  const { id_kelas: idKelas } = router.query;

  const handleBack = () => {
    router.push("/student/kelas");
  };
  const handleViewMateri = ({ id }) => {
    router.push(`/student/kelas/${idKelas}/materi/${id}`);
  };

  const { data: kelas, isLoading: kelasLoading } = useFetchAPI({
    url: `${SHARED_API_URL}/kelas?id=${idKelas}&materi=true&mahasiswa=true&tugas=true`,
  });

  const { data: siswa, isLoading: siswaLoading } = useFetchAPI({
    url: `${SHARED_API_URL}/mahasiswa?kelas_id=${idKelas}`,
  });

  const pageState = DataLoadCheck({
    data: [kelas, siswa],
    isLoading: [kelasLoading, siswaLoading],
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
          <Title size={24}>{kelas?.data?.nama}</Title>
          <Text>
            Kode: <Code fz="md">{kelas?.data?.kode}</Code>
          </Text>
          <Progress
            radius="xl"
            size={24}
            styles={{
              label: {
                fontSize: 10,
              },
            }}
            sections={[
              {
                value: kelas?.data?.komposisi_tugas,
                color: "pink",
                label: "Tugas",
                tooltip: `Komposisi tugas - ${kelas?.data?.komposisi_tugas} %`,
              },
              {
                value: kelas?.data?.komposisi_quiz,
                color: "green",
                label: "Quiz",
                tooltip: `Komposisi quiz - ${kelas?.data?.komposisi_quiz} %`,
              },
              {
                value: kelas?.data?.komposisi_uts,
                color: "violet",
                label: "UTS",
                tooltip: `Komposisi UTS - ${kelas?.data?.komposisi_uts} %`,
              },
              {
                value: kelas?.data?.komposisi_uas,
                color: "orange",
                label: "UAS",
                tooltip: `Komposisi UAS - ${kelas?.data?.komposisi_uas} %`,
              },
            ]}
          />
          <Text>Dosen pengampu:</Text>
          <Text weight="bold" mt={-10}>
            {kelas?.data?.dosen?.user?.nama}
          </Text>
        </MainCard>
        <Grid>
          <Grid.Col md={6}>
            <MainCard>
              <Text size={24}>Daftar Materi</Text>
              {kelas?.data?.Materi?.length === 0 ? (
                <NoData text="Kelas ini belum memiliki materi" />
              ) : (
                kelas?.data?.Materi?.map((item, index) => (
                  <MateriCard
                    key={item.id}
                    no={index + 1}
                    judul={item.judul}
                    deskripsi={item.deskripsi}
                    onClickView={() => handleViewMateri({ id: item.id })}
                    canView
                  />
                ))
              )}
            </MainCard>
          </Grid.Col>
          <Grid.Col md={6}>
            <MainCard>
              <Text size={24}>Daftar Tugas</Text>
              {kelas?.data?.Tugas?.length === 0 && (
                <NoData text="Kelas ini belum memiliki tugas" />
              )}
            </MainCard>
          </Grid.Col>
        </Grid>
        <MainCard>
          <Text size={24}>Daftar Mahasiswa</Text>
          {kelas?.data?.Nilai?.length === 0 ? (
            <NoData text="Kelas ini belum memiliki mahasiswa" />
          ) : (
            <BaseTable
              columns={[
                { accessor: "no", title: "No", textAlignment: "center" },
                { accessor: "nim", title: "NIM" },
                { accessor: "nama", title: "Nama" },
              ]}
              rows={kelas?.data?.Nilai?.map((item, index) => ({
                no: index + 1,
                id: item?.id,
                nim: item?.mahasiswa?.NIM,
                nama: item?.mahasiswa?.user?.nama,
              }))}
            />
          )}
        </MainCard>
        {isDev && <PrettyJSON json={kelas} />}
      </PageWrapper>
    )
  );
}
