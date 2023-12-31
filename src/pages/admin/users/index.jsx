import { profile } from "@/atoms";
import BaseConfirmation from "@/components/BaseConfirmation";
import BaseTable from "@/components/BaseTable";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import { ADMIN_API_URL, ADMIN_PAGE } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import { fetchDELETE } from "@/utils/crud";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { ActionIcon, Badge, Button, Group, Title } from "@mantine/core";
import {
  IconAlertCircle,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Users() {
  const router = useRouter();

  const { isDev } = getDevStatus();

  const currentUser = useAtomValue(profile);

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

  const handleEditUser = ({ item }) => {
    const { id } = item;
    router.push(`/admin/users/${id}`);
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
          btnText="Hapus pengguna"
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
                    <ActionIcon
                      variant="filled"
                      color="yellow"
                      onClick={() => handleEditUser({ item: values })}
                    >
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon
                      variant="filled"
                      color="red"
                      onClick={() => handleDeleteOpen({ item: values })}
                      disabled={currentUser.id === values.id}
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
          {isDev && <PrettyJSON json={users} />}
        </MainCard>
      </PageWrapper>
    )
  );
}
