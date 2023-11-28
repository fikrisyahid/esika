import { useState } from "react";
import { Button, Group, Select, Stack, TextInput, Title } from "@mantine/core";
import { fetchPOST } from "@/utils/crud";
import isStringEmpty from "@/utils/validation/is-string-empty";
import isValidPassword from "@/utils/validation/is-valid-password";
import { ADMIN_API_URL, ADMIN_PAGE, BASE_COLORS } from "@/configs";
import { useForm } from "@mantine/form";
import isValidEmail from "@/utils/validation/is-valid-email";
import PageWrapper from "@/components/PageWrapper";
import MainCard from "@/components/MainCard";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function CreateUser() {
  const router = useRouter();

  const [btnLoading, setBtnLoading] = useState(false);

  const form = useForm({
    initialValues: {
      nama: "",
      email: "",
      password: "",
      role: "",
    },
    validate: {
      nama: (value) => isStringEmpty(value) && "Nama tidak boleh kosong",
      email: (value) =>
        isStringEmpty(value)
          ? "Email tidak boleh kosong"
          : !isValidEmail(value) && "Email tidak valid",
      role: (value) => isStringEmpty(value) && "Role is required",
      password: (value) => {
        const { valid, message } = isValidPassword(value);
        return !valid && message;
      },
    },
  });

  const handleBack = () => {
    router.push("/admin/users");
  };

  const handleRegister = (values) => {
    const { validation } = ADMIN_PAGE;
    fetchPOST({
      url: `${ADMIN_API_URL}/user?pass=${validation}`,
      body: values,
      setBtnLoading,
      successMessage: "Berhasil mendaftarkan user",
      onSuccess: handleBack,
    });
  };

  return (
    <PageWrapper>
      <MainCard>
        <Group>
          <Button
            color="dark"
            leftIcon={<IconArrowLeft />}
            onClick={handleBack}
          >
            Kembali
          </Button>
          <Title>Tambah pengguna baru</Title>
        </Group>
        <form onSubmit={form.onSubmit(handleRegister)}>
          <Stack>
            <TextInput
              spellCheck="false"
              label="Nama"
              type="text"
              placeholder="Arif Amin"
              {...form.getInputProps("nama")}
            />
            <TextInput
              spellCheck="false"
              label="Email"
              type="email"
              placeholder="student"
              {...form.getInputProps("email")}
            />
            <TextInput
              spellCheck="false"
              label="Password"
              type="password"
              placeholder="********"
              {...form.getInputProps("password")}
            />
            <Select
              label="Role"
              placeholder="Pilih salah satu"
              data={[
                { value: "admin", label: "Admin" },
                { value: "dosen", label: "Dosen" },
                { value: "mahasiswa", label: "Mahasiswa" },
              ]}
              {...form.getInputProps("role")}
            />
            <Button
              loading={btnLoading}
              type="submit"
              style={{
                backgroundColor: BASE_COLORS.orange,
                outlineColor: BASE_COLORS.orange,
              }}
            >
              Register
            </Button>
          </Stack>
        </form>
      </MainCard>
    </PageWrapper>
  );
}
