import BaseConfirmation from "@/components/BaseConfirmation";
import BaseTable from "@/components/BaseTable";
import MainCard from "@/components/MainCard";
import NoData from "@/components/NoData";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import AddStudentDialog from "@/components/kelas/AddStudentDialog";
import MateriCard from "@/components/kelas/MateriCard";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import { fetchDELETE } from "@/utils/crud";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Group,
  Text,
  Title,
} from "@mantine/core";
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
  const onDeleteMateriSuccess = () => {
    kelasMutate();
    handleDeleteMateriClose();
  };
  const handleDeleteMateri = async () => {
    fetchDELETE({
      url: `${TEACHER_API_URL}/materi?id=${deleteMateriContent.id}`,
      successMessage: "Materi berhasil dihapus",
      onSuccess: onDeleteMateriSuccess,
      setBtnLoading: setBtnLoadingMateri,
    });
  };

  const [createMahasiswaOpen, setCreateMahasiswaOpen] = useState(false);
  const handleCreateMahasiswaOpen = () => setCreateMahasiswaOpen(true);
  const handleCreateMahasiswaClose = () => setCreateMahasiswaOpen(false);
  const handleCreateTugas = () => {};

  const [btnLoadingSiswa, setBtnLoadingSiswa] = useState(false);
  const [deleteSiswaOpen, setDeleteSiswaOpen] = useState(false);
  const [deleteSiswaContent, setDeleteSiswaContent] = useState({
    id: "",
    nama: "",
  });
  const handleDeleteSiswaOpen = ({ item }) => {
    const { id, nama } = item;
    setDeleteSiswaContent({ id, nama });
    setDeleteSiswaOpen(true);
  };
  const handleDeleteSiswaClose = () => {
    setDeleteSiswaOpen(false);
    setDeleteSiswaContent({ id: "", nama: "" });
  };
  const onDeleteSiswaSuccess = () => {
    kelasMutate();
    handleDeleteSiswaClose();
  };
  const handleDeleteSiswa = async () => {
    fetchDELETE({
      url: `${TEACHER_API_URL}/nilai?id=${deleteSiswaContent.id}`,
      successMessage: "Mahasiswa berhasil dihapus",
      onSuccess: onDeleteSiswaSuccess,
      setBtnLoading: setBtnLoadingSiswa,
    });
  };

  const pageState = DataLoadCheck({
    data: kelas,
    isLoading: kelasLoading,
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Detail kelas">
        <AddStudentDialog
          open={createMahasiswaOpen}
          onClose={handleCreateMahasiswaClose}
          kelasId={idKelas}
          kelasMutate={kelasMutate}
        />
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
        <BaseConfirmation
          btnIcon={<IconTrash />}
          btnLoading={btnLoadingSiswa}
          btnText="Hapus siswa"
          color="red"
          title="Hati-hati!"
          message={[
            `Apakah kamu yakin ingin menghapus siswa ${deleteSiswaContent.nama} ?`,
            `Semua data yang berhubungan dengan siswa ini akan terhapus juga.`,
          ]}
          icon={<IconAlertCircle />}
          open={deleteSiswaOpen}
          onClose={handleDeleteSiswaClose}
          btnOnClick={handleDeleteSiswa}
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
              color="dark"
              leftIcon={<IconPlus />}
              onClick={handleCreateMahasiswaOpen}
            >
              Tambah mahasiswa
            </Button>
          </Group>
          {kelas?.data?.Nilai?.length === 0 ? (
            <NoData text="Kelas ini belum memiliki mahasiswa" />
          ) : (
            <BaseTable
              columns={[
                { accessor: "no", title: "No", textAlignment: "center" },
                { accessor: "nim", title: "NIM" },
                { accessor: "nama", title: "Nama" },
                { accessor: "nilai", title: "Nilai", textAlignment: "center" },
                {
                  accessor: "actions",
                  title: "Actions",
                  textAlignment: "end",
                  render: (values) => (
                    <Flex justify="flex-end">
                      <ActionIcon
                        variant="filled"
                        color="red"
                        onClick={() => handleDeleteSiswaOpen({ item: values })}
                      >
                        <IconTrash />
                      </ActionIcon>
                    </Flex>
                  ),
                },
              ]}
              rows={kelas?.data?.Nilai?.map((item, index) => ({
                no: index + 1,
                id: item?.id,
                nim: item?.mahasiswa?.NIM,
                nama: item?.mahasiswa?.user?.nama,
                nilai: item?.nilai,
              }))}
            />
          )}
        </MainCard>
        {isDev && <PrettyJSON json={kelas} />}
      </PageWrapper>
    )
  );
}
