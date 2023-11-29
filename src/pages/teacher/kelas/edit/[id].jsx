import { profile } from "@/atoms";
import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import { fetchPUT } from "@/utils/crud";
import formNumberChange from "@/utils/form/form-number-change";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import isInRange from "@/utils/validation/in-range";
import isStringEmpty from "@/utils/validation/is-string-empty";
import { Button, Flex, Group, Stack, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateKelas() {
  const router = useRouter();

  const { id } = router.query;

  const [btnLoading, setBtnLoading] = useState(false);

  const user = useAtomValue(profile);

  const { data: kelas, isLoading: kelasLoading } = useFetchAPI({
    url: `${TEACHER_API_URL}/kelas?id=${id}`,
  });

  const handleBack = () => {
    router.push("/teacher/kelas");
  };

  const form = useForm({
    initialValues: {
      nama: "",
      komposisi_tugas: "0",
      komposisi_quiz: "0",
      komposisi_uts: "0",
      komposisi_uas: "0",
    },
    validate: {
      nama: (value) => isStringEmpty(value) && "Nama wajib di isi",
      komposisi_tugas: (value) =>
        !isInRange({ value: parseInt(value), min: 1, max: 100 }) &&
        "Komposisi tugas harus di dalam range 1 - 100",
      komposisi_quiz: (value) =>
        !isInRange({ value: parseInt(value), min: 1, max: 100 }) &&
        "Komposisi quiz harus di dalam range 1 - 100",
      komposisi_uts: (value) =>
        !isInRange({ value: parseInt(value), min: 1, max: 100 }) &&
        "Komposisi UTS harus di dalam range 1 - 100",
      komposisi_uas: (value) =>
        !isInRange({ value: parseInt(value), min: 1, max: 100 }) &&
        "Komposisi UAS harus di dalam range 1 - 100",
    },
  });

  useEffect(() => {
    if (kelas?.status === "success") {
      form.setValues({
        nama: kelas?.data?.nama,
        komposisi_tugas: kelas?.data?.komposisi_tugas,
        komposisi_quiz: kelas?.data?.komposisi_quiz,
        komposisi_uts: kelas?.data?.komposisi_uts,
        komposisi_uas: kelas?.data?.komposisi_uas,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kelas]);

  const handleCreateCourse = (values) => {
    fetchPUT({
      url: `${TEACHER_API_URL}/kelas?id=${id}`,
      body: {
        ...values,
        id: kelas?.data?.id,
        komposisi_quiz: parseInt(values.komposisi_quiz),
        komposisi_tugas: parseInt(values.komposisi_tugas),
        komposisi_uts: parseInt(values.komposisi_uts),
        komposisi_uas: parseInt(values.komposisi_uas),
      },
      setBtnLoading,
      successMessage: "Berhasil membuat kelas baru",
      onSuccess: handleBack,
    });
  };

  const pageState = DataLoadCheck({
    data: kelas,
    isLoading: kelasLoading,
  });

  if (kelas?.status === "success" && kelas?.data?.dosenId !== user?.Dosen?.id) {
    return (
      <MainCard>
        <Group>
          <Button
            color="dark"
            leftIcon={<IconArrowLeft />}
            onClick={handleBack}
          >
            Kembali
          </Button>
          <Title>Kamu tidak memiliki akses terhadap kelas ini</Title>
        </Group>
      </MainCard>
    );
  }

  return (
    pageState ?? (
      <PageWrapper pageTitle="Edit kelas">
        <MainCard>
          <Flex justify="start" gap="md" align="center">
            <Button
              leftIcon={<IconArrowLeft />}
              color="dark"
              onClick={handleBack}
            >
              Kembali
            </Button>
            <Title>Edit kelas</Title>
          </Flex>
          <form onSubmit={form.onSubmit(handleCreateCourse)}>
            <Stack spacing="xs">
              <TextInput
                withAsterisk
                label="Nama"
                placeholder="Nama kelas"
                {...form.getInputProps("nama")}
              />
              <TextInput
                withAsterisk
                label="Komposisi tugas (%)"
                placeholder="15"
                type="number"
                {...form.getInputProps("komposisi_tugas")}
                value={form.values.komposisi_tugas}
                onChange={(e) =>
                  formNumberChange({
                    e,
                    form,
                    field: "komposisi_tugas",
                  })
                }
              />
              <TextInput
                withAsterisk
                label="Komposisi quiz (%)"
                placeholder="10"
                {...form.getInputProps("komposisi_quiz")}
                value={form.values.komposisi_quiz}
                onChange={(e) =>
                  formNumberChange({
                    e,
                    form,
                    field: "komposisi_quiz",
                  })
                }
              />
              <TextInput
                withAsterisk
                label="Komposisi UTS (%)"
                placeholder="30"
                {...form.getInputProps("komposisi_uts")}
                value={form.values.komposisi_uts}
                onChange={(e) =>
                  formNumberChange({
                    e,
                    form,
                    field: "komposisi_uts",
                  })
                }
              />
              <TextInput
                withAsterisk
                label="Komposisi UAS (%)"
                placeholder="35"
                {...form.getInputProps("komposisi_uas")}
                value={form.values.komposisi_uas}
                onChange={(e) =>
                  formNumberChange({
                    e,
                    form,
                    field: "komposisi_uas",
                  })
                }
              />
              <Button
                type="submit"
                leftIcon={<IconPlus />}
                loading={btnLoading}
                color="orange"
                style={{ alignSelf: "start" }}
                mt="xs"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </MainCard>
      </PageWrapper>
    )
  );
}
