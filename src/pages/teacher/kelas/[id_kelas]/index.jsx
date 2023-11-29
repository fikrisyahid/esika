import BaseConfirmation from "@/components/BaseConfirmation";
import MainCard from "@/components/MainCard";
import NoData from "@/components/NoData";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import MateriCard from "@/components/kelas/MateriCard";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import { fetchDELETE } from "@/utils/crud";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Button, Grid, Group, Text, Title } from "@mantine/core";
import {
  IconAlertCircle,
  IconAlertTriangleFilled,
  IconArrowLeft,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DetailKelas() {
  const router = useRouter();

  const { isDev } = getDevStatus();

  const { id_kelas: idKelas } = router.query;

  const handleBack = () => {
    router.push("/teacher/kelas");
  };
  const handleCreateMateri = () => {
    router.push(`/teacher/kelas/${idKelas}/materi/create`);
  };
  const handleViewMateri = ({ id }) => {
    router.push(`/teacher/kelas/${idKelas}/materi/${id}`);
  };
  const handleEditMateri = ({ id }) => {
    router.push(`/teacher/kelas/${idKelas}/materi/${id}/edit`);
  };

  const {
    data: kelas,
    isLoading: kelasLoading,
    mutate: kelasMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/kelas?id=${idKelas}&materi=true&mahasiswa=true&tugas=true`,
  });

  const [btnLoadingMateri, setBtnLoadingMateri] = useState(false);
  const [deleteMateriOpen, setDeleteMateriOpen] = useState(false);
  const [deleteMateriContent, setDeleteMateriContent] = useState({
    id: "",
    judul: "",
  });

  const handleDeleteMateriOpen = ({ item }) => {
    const { id, judul } = item;
    setDeleteMateriOpen(true);
    setDeleteMateriContent({ id, judul });
  };
  const handleDeleteMateriClose = () => {
    setDeleteMateriOpen(false);
    setDeleteMateriContent({ id: "", judul: "" });
  };
  const handleDeleteMateri = async () => {
    fetchDELETE({
      url: `${TEACHER_API_URL}/materi?id=${deleteMateriContent.id}`,
      successMessage: "Materi berhasil dihapus",
      onSuccess: () => {
        kelasMutate();
        handleDeleteMateriClose();
      },
      setBtnLoading: setBtnLoadingMateri,
    });
  };

  const handleCreateMahasiswa = () => {};
  const handleCreateTugas = () => {};

  const pageState = DataLoadCheck({
    data: kelas,
    isLoading: kelasLoading,
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Detail kelas">
        <BaseConfirmation
          btnIcon={<IconTrash />}
          btnLoading={btnLoadingMateri}
          btnText="Hapus materi"
          color="red"
          title="Hati-hati!"
          message={[
            `Apakah kamu yakin ingin menghapus materi ${deleteMateriContent.judul} ?`,
            `Semua data yang berhubungan dengan materi ini akan terhapus juga.`,
          ]}
          icon={<IconAlertCircle />}
          open={deleteMateriOpen}
          onClose={handleDeleteMateriClose}
          btnOnClick={handleDeleteMateri}
        />
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
              {kelas?.data?.Materi?.length === 0 ? (
                <NoData text="Kelas ini belum memiliki materi" />
              ) : (
                kelas?.data?.Materi?.map((item, index) => (
                  <MateriCard
                    key={item.id}
                    no={index + 1}
                    canDelete
                    canView
                    canEdit
                    onClickDelete={() => handleDeleteMateriOpen({ item })}
                    onClickEdit={() => handleEditMateri({ id: item.id })}
                    onClickView={() => handleViewMateri({ id: item.id })}
                    judul={item.judul}
                    deskripsi={item.deskripsi}
                  />
                ))
              )}
            </MainCard>
          </Grid.Col>
          <Grid.Col md={6}>
            <MainCard>
              <Group position="apart">
                <Text size={24}>Daftar Tugas</Text>
                <Button
                  color="yellow"
                  leftIcon={<IconAlertTriangleFilled />}
                  onClick={handleCreateTugas}
                >
                  Tambah tugas
                </Button>
              </Group>
              {kelas?.data?.Tugas?.length === 0 && (
                <NoData text="Kelas ini belum memiliki tugas" />
              )}
            </MainCard>
          </Grid.Col>
        </Grid>
        <MainCard>
          <Group position="apart">
            <Text size={24}>Daftar Mahasiswa</Text>
            <Button
              color="yellow"
              leftIcon={<IconAlertTriangleFilled />}
              onClick={handleCreateMahasiswa}
            >
              Tambah mahasiswa
            </Button>
          </Group>
          {kelas?.data?.Nilai?.length === 0 && (
            <NoData text="Kelas ini belum memiliki mahasiswa" />
          )}
        </MainCard>
        {isDev && <PrettyJSON json={kelas} />}
      </PageWrapper>
    )
  );
}
