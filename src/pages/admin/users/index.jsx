import BaseTable from "@/components/BaseTable";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { ADMIN_API_URL, ADMIN_PAGE } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { ActionIcon, Badge, Button, Group, Title } from "@mantine/core";
import { IconEdit, IconEye, IconPlus, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function Users() {
  const router = useRouter();

  const { data: users, isLoading: usersLoading } = useFetchAPI({
    url: `${ADMIN_API_URL}/user?pass=${ADMIN_PAGE.validation}`,
  });

  const handleCreateUser = () => {
    router.push("/admin/users/create");
  };

  const pageState = DataLoadCheck({
    data: users,
    isLoading: usersLoading,
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Daftar pengguna">
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
                render: () => (
                  <Group position="right">
                    <ActionIcon variant="filled" color="green">
                      <IconEye />
                    </ActionIcon>
                    <ActionIcon variant="filled" color="yellow">
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon variant="filled" color="red">
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                ),
              },
            ]}
            rows={users?.data?.map((item, index) => ({
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
