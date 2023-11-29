import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import { ADMIN_API_URL, ADMIN_PAGE } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import { fetchPUT } from "@/utils/crud";
import getDevStatus from "@/utils/get-dev-status";
import getProfileImg from "@/utils/get-profile-img";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import isStringEmpty from "@/utils/validation/is-string-empty";
import {
  Badge,
  Button,
  Grid,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailUser() {
  const router = useRouter();

  const { isDev } = getDevStatus();

  const { id } = router.query;

  const {
    data: user,
    isLoading: userLoading,
    mutate: userMutate,
  } = useFetchAPI({
    url: `${ADMIN_API_URL}/user?pass=${ADMIN_PAGE.validation}&id=${id}`,
  });

  const [btnLoading, setBtnLoading] = useState(false);

  const isAdmin = user?.data?.Admin;
  const isTeacher = user?.data?.Dosen;
  const isStudent = user?.data?.Mahasiswa;

  const form = useForm({
    initialValues: {
      nama: user?.data?.nama,
    },
    validate: {
      nama: (value) => isStringEmpty(value) && "Nama tidak boleh kosong",
    },
  });

  useEffect(() => {
    if (user?.status === "success") {
      form.setValues({
        nama: user?.data?.nama,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChangeInfo = (values) => {
    fetchPUT({
      body: values,
      successMessage: "Informasi berhasil diubah",
      url: `${ADMIN_API_URL}/user?pass=${ADMIN_PAGE.validation}&id=${id}`,
      onSuccess: userMutate,
      setBtnLoading,
    });
  };

  const pageState = DataLoadCheck({
    data: user,
    isLoading: userLoading,
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Detail pengguna">
        <MainCard>
          <Group>
            <Button
              color="dark"
              leftIcon={<IconArrowLeft />}
              onClick={() => router.push("/admin/users")}
            >
              Kembali
            </Button>
            <Title>Detail pengguna</Title>
          </Group>
          <Grid>
            <Grid.Col md={3} lg={3}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  minHeight: 300,
                }}
              >
                <Image
                  alt="profile-pict"
                  src={getProfileImg(user?.data?.nama)}
                  fill
                />
              </div>
            </Grid.Col>
            <Grid.Col md={9} lg={9}>
              <form onSubmit={form.onSubmit(handleChangeInfo)}>
                <Stack>
                  <TextInput label="Email" value={user?.data?.email} disabled />
                  <TextInput
                    label="Nama"
                    placeholder="Masukkan nama"
                    {...form.getInputProps("nama")}
                  />
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
                  <Group>
                    <Button
                      color="violet"
                      mt="sm"
                      loading={btnLoading}
                      type="submit"
                    >
                      Simpan
                    </Button>
                    <Button color="orange" mt="sm">
                      Ganti password
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Grid.Col>
          </Grid>
          {isDev && <PrettyJSON json={user} />}
        </MainCard>
      </PageWrapper>
    )
  );
}
