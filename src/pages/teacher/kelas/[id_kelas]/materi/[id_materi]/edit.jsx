import BaseRTE from "@/components/BaseRTE";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import { fetchPUT } from "@/utils/crud";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import isStringEmpty from "@/utils/validation/is-string-empty";
import { Button, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconRotateClockwise } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditMateri() {
  const router = useRouter();

  const { isDev } = getDevStatus();

  const { id_kelas: idKelas, id_materi: idMateri } = router.query;

  const handleBack = () => {
    router.push(`/teacher/kelas/${idKelas}`);
  };

  const {
    data: materi,
    isLoading: materiLoading,
    mutate: mutateMateri,
  } = useFetchAPI({
    url: `${TEACHER_API_URL}/materi?id=${idMateri}`,
  });

  const [file, setFile] = useState("");
  const [contentUpdated, setContentUpdated] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleSuccessUpdate = () => {
    handleBack();
    mutateMateri();
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

  useEffect(() => {
    if (materi?.status === "success") {
      form.setValues({
        judul: materi?.data?.judul,
        deskripsi: materi?.data?.deskripsi,
      });
      setFile(materi?.data?.file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materi]);

  const handleEditMateri = (values) => {
    fetchPUT({
      body: {
        ...values,
        id: idMateri,
        file,
      },
      url: `${TEACHER_API_URL}/materi`,
      successMessage: "Materi berhasil diupdate",
      onSuccess: handleSuccessUpdate,
      setBtnLoading,
    });
  };

  const pageState = DataLoadCheck({
    data: materi,
    isLoading: materiLoading,
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Edit materi">
        <MainCard>
          <form onSubmit={form.onSubmit(handleEditMateri)}>
            <Group position="apart">
              <Group>
                <Button
                  color="dark"
                  leftIcon={<IconArrowLeft />}
                  onClick={handleBack}
                >
                  Kembali
                </Button>
                <Title>Edit materi</Title>
              </Group>
              <Button
                color="dark"
                leftIcon={<IconRotateClockwise />}
                loading={btnLoading}
                type="submit"
              >
                Update materi
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
                content={file}
                setContent={setFile}
                contentUpdated={contentUpdated}
                setContentUpdated={setContentUpdated}
              />
            </Stack>
          </form>
        </MainCard>
        {isDev && <PrettyJSON json={materi} />}
      </PageWrapper>
    )
  );
}
