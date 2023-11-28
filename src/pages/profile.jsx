import { profile, profileMutate } from "@/atoms";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { SHARED_API_URL } from "@/configs";
import { fetchPUT } from "@/utils/crud";
import getProfileImg from "@/utils/get-profile-img";
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
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile() {
  const user = useAtomValue(profile);
  const userMutate = useAtomValue(profileMutate);

  const [btnLoading, setBtnLoading] = useState(false);

  const isAdmin = user?.Admin;
  const isTeacher = user?.Dosen;
  const isStudent = user?.Mahasiswa;

  const form = useForm({
    initialValues: {
      nama: user?.nama,
    },
    validate: {
      nama: (value) => isStringEmpty(value) && "Nama tidak boleh kosong",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValues({
        nama: user?.nama,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChangeInfo = (values) => {
    fetchPUT({
      body: values,
      successMessage: "Informasi berhasil diubah",
      url: `${SHARED_API_URL}/user`,
      onSuccess: userMutate.fn,
      setBtnLoading,
    });
  };

  return (
    <PageWrapper title="Profil dosen">
      <MainCard>
        <Title>Profil</Title>
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
              <Image alt="profile-pict" src={getProfileImg(user?.nama)} fill />
            </div>
          </Grid.Col>
          <Grid.Col md={9} lg={9}>
            <form onSubmit={form.onSubmit(handleChangeInfo)}>
              <Stack>
                <TextInput label="Email" value={user?.email} disabled />
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
      </MainCard>
    </PageWrapper>
  );
}
