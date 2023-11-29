import BaseRTE from "@/components/BaseRTE";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { TEACHER_API_URL } from "@/configs";
import { fetchPOST } from "@/utils/crud";
import isStringEmpty from "@/utils/validation/is-string-empty";
import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BuatMateri() {
  const router = useRouter();

  const { id_kelas: idKelas } = router.query;

  const [file, setFile] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const handleBack = () => {
    router.push(`/teacher/kelas/${idKelas}`);
  };

  const form = useForm({
    initialValues: {
      judul: "",
      deskripsi: "",
    },
    validate: {
      judul: (value) =>
        isStringEmpty(value) && "Judul materi tidak boleh kosong",
      deskripsi: (value) =>
        isStringEmpty(value) && "Deskripsi materi tidak boleh kosong",
    },
  });

  const handleSubmitChapter = (values) => {
    fetchPOST({
      body: {
        ...values,
        kelas_id: idKelas,
        file,
      },
      url: `${TEACHER_API_URL}/materi`,
      successMessage: "Materi berhasil ditambahkan",
      onSuccess: handleBack,
      setBtnLoading,
    });
  };

  return (
    <PageWrapper pageTitle="Buat materi">
      <MainCard>
        <form onSubmit={form.onSubmit(handleSubmitChapter)}>
          <Group position="apart">
            <Group>
              <Button
                color="dark"
                leftIcon={<IconArrowLeft />}
                onClick={handleBack}
              >
                Kembali
              </Button>
              <Title>Buat materi</Title>
            </Group>
            <Button
              color="dark"
              leftIcon={<IconPlus />}
              loading={btnLoading}
              type="submit"
            >
              Tambah materi
            </Button>
          </Group>
          <Stack mt="sm">
            <TextInput
              label="Judul"
              placeholder="Judul materi"
              {...form.getInputProps("judul")}
            />
            <TextInput
              label="Deskripsi"
              placeholder="Deskripsi materi"
              {...form.getInputProps("deskripsi")}
            />
            <Title size={25} mt="sm">
              Konten materi
            </Title>
            <BaseRTE
              content="Silahkan tulis materi di sini..."
              setContent={setFile}
            />
          </Stack>
        </form>
      </MainCard>
    </PageWrapper>
  );
}
