import { profile } from "@/atoms";
import BaseConfirmation from "@/components/BaseConfirmation";
import MainCard from "@/components/MainCard";
import NoData from "@/components/NoData";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import KelasCard from "@/components/kelas/KelasCard";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import { fetchDELETE } from "@/utils/crud";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Button, Grid, Group, Title } from "@mantine/core";
import { IconAlertCircle, IconPlus, IconTrash } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Kelas() {
  const router = useRouter();

  const { isDev } = getDevStatus();

  const user = useAtomValue(profile);

  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteContent, setDeleteContent] = useState({
    id: "",
    nama: "",
    kode: "",
  });

  const {
    data: kelas,
    isLoading: kelasLoading,
    mutate: kelasMutate,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/kelas?dosen_id=${user?.Dosen?.id}`,
  });

  const handleCreate = () => {
    router.push("/teacher/kelas/create");
  };

  const handleEdit = ({ item }) => {
    const { id } = item;
    router.push(`/teacher/kelas/${id}/edit`);
  };

  const handleView = ({ item }) => {
    const { id } = item;
    router.push(`/teacher/kelas/${id}`);
  };

  const handleDeleteOpen = ({ item }) => {
    const { id, nama, kode } = item;
    setDeleteContent({ id, nama, kode });
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteContent({ id: "", nama: "", kode: "" });
  };

  const onDeleteSuccess = () => {
    kelasMutate();
    handleDeleteClose();
  };

  const handleDelete = async () => {
    fetchDELETE({
      url: `${TEACHER_API_URL}/kelas?id=${deleteContent.id}`,
      successMessage: "Berhasil menghapus kelas",
      onSuccess: onDeleteSuccess,
      setBtnLoading,
    });
  };

  const pageState = DataLoadCheck({ data: kelas, isLoading: kelasLoading });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Kelas">
        <BaseConfirmation
          btnIcon={<IconTrash />}
          btnLoading={btnLoading}
          btnText="Hapus kelas"
          color="red"
          title="Hati-hati!"
          message={[
            `Apakah kamu yakin ingin menghapus kelas ${deleteContent.kode} - ${deleteContent.nama} ?`,
            `Semua data yang berhubungan dengan kelas ini akan terhapus juga.`,
          ]}
          icon={<IconAlertCircle />}
          open={deleteOpen}
          onClose={handleDeleteClose}
          btnOnClick={handleDelete}
        />
        <MainCard>
          <Group position="apart">
            <Title>Daftar kelas milik anda</Title>
            <Button leftIcon={<IconPlus />} color="dark" onClick={handleCreate}>
              Buat kelas baru
            </Button>
          </Group>
        </MainCard>
        {kelas?.data?.length === 0 ? (
          <MainCard>
            <NoData text="Anda tidak memiliki kelas" />
          </MainCard>
        ) : (
          <Grid gutter="lg">
            {kelas?.data?.map((item) => (
              <Grid.Col md={6} lg={4} key={item.id}>
                <KelasCard
                  dosen={item?.dosen?.user?.nama}
                  komposisi_quiz={item?.komposisi_quiz}
                  komposisi_tugas={item?.komposisi_tugas}
                  komposisi_uts={item?.komposisi_uts}
                  komposisi_uas={item?.komposisi_uas}
                  nama={item?.nama}
                  kode={item?.kode}
                  canView
                  canEdit
                  canDelete
                  onClickView={() => handleView({ item })}
                  onClickEdit={() => handleEdit({ item })}
                  onClickDelete={() => handleDeleteOpen({ item })}
                  mahasiswaCount={item?._count?.Nilai}
                />
              </Grid.Col>
            ))}
          </Grid>
        )}
        {isDev && <PrettyJSON json={kelas} />}
      </PageWrapper>
    )
  );
}
