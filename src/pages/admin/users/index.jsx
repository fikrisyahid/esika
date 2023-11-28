import BaseConfirmation from "@/components/BaseConfirmation";
import BaseTable from "@/components/BaseTable";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { ADMIN_API_URL, ADMIN_PAGE } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import { fetchDELETE } from "@/utils/crud";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { ActionIcon, Badge, Button, Group, Title } from "@mantine/core";
import {
  IconAlertCircle,
  IconEdit,
  IconEye,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Users() {
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteContent, setDeleteContent] = useState({
    id: "",
    nama: "",
  });

  const {
    data: users,
    isLoading: usersLoading,
    mutate: usersMutate,
  } = useFetchAPI({
    url: `${ADMIN_API_URL}/user?pass=${ADMIN_PAGE.validation}`,
  });

  const handleCreateUser = () => {
    router.push("/admin/users/create");
  };

  const handleDeleteOpen = ({ item }) => {
    const { id, nama } = item;
    setDeleteContent({ id, nama });
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteContent({ id: "", nama: "", kode: "" });
  };

  const onDeleteSuccess = () => {
    usersMutate();
    handleDeleteClose();
  };

  const handleDelete = async () => {
    fetchDELETE({
      url: `${ADMIN_API_URL}/user?pass=${ADMIN_PAGE.validation}&id=${deleteContent.id}`,
      successMessage: "Berhasil menghapus pengguna",
      onSuccess: onDeleteSuccess,
      setBtnLoading,
    });
  };

  const pageState = DataLoadCheck({
    data: users,
    isLoading: usersLoading,
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Daftar pengguna">
        <BaseConfirmation
          btnIcon={<IconTrash />}
          btnLoading={btnLoading}
          btnText="Hapus kelas"
          color="red"
          title="Hati-hati!"
          message={[
            `Apakah kamu yakin ingin menghapus user ${deleteContent.nama} ?`,
            `Semua data yang berhubungan dengan user ini akan terhapus juga.`,
          ]}
          icon={<IconAlertCircle />}
          open={deleteOpen}
          onClose={handleDeleteClose}
          btnOnClick={handleDelete}
        />
        <MainCard>
          <Group position="apart">
            <Title>Daftar pengguna</Title>
            <Button
              color="dark"
              leftIcon={<IconPlus />}
              onClick={handleCreateUser}
            >
              Tambah pengguna
            </Button>
          </Group>
          <BaseTable
            columns={[
              { accessor: "no", title: "No", textAlignment: "center" },
              { accessor: "nama", title: "Nama" },
              {
                accessor: "role",
                title: "Role",
                render: (values) => {
                  const isAdmin = values.role === "Admin";
                  const isTeacher = values.role === "Dosen";
                  const isStudent = values.role === "Mahasiswa";
                  return (
                    <Badge
                      color={
                        isAdmin
                          ? "violet"
                          : isTeacher
                          ? "orange"
                          : isStudent
                          ? "green"
                          : ""
                      }
                      size="lg"
                    >
                      {isAdmin
                        ? "Admin"
                        : isTeacher
                        ? "Dosen"
                        : isStudent
                        ? "Mahasiswa"
                        : ""}
                    </Badge>
                  );
                },
              },
              {
                accessor: "actions",
                title: "Actions",
                textAlignment: "end",
                render: (values) => (
                  <Group position="right">
                    <ActionIcon variant="filled" color="green">
                      <IconEye />
                    </ActionIcon>
                    <ActionIcon variant="filled" color="yellow">
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon
                      variant="filled"
                      color="red"
                      onClick={() => handleDeleteOpen({ item: values })}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                ),
              },
            ]}
            rows={users?.data?.map((item, index) => ({
              id: item.id,
              no: index + 1,
              nama: item.nama,
              role: item?.Admin
                ? "Admin"
                : item?.Dosen
                ? "Dosen"
                : item?.Mahasiswa
                ? "Mahasiswa"
                : "Guest",
            }))}
          />
        </MainCard>
      </PageWrapper>
    )
  );
}
