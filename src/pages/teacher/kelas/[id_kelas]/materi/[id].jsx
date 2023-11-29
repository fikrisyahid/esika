import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { Button, Group, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function DetailMateri() {
  const router = useRouter();

  const { id_kelas: idKelas } = router.query;

  const handleBack = () => {
    router.push(`/teacher/kelas/detail/${idKelas}`);
  };

  return (
    <PageWrapper pageTitle="Detail materi">
      <MainCard>
        <Group>
          <Button color="dark" leftIcon={<IconArrowLeft />} onClick={handleBack}>
            Kembali
          </Button>
          <Title>Detail materi</Title>
        </Group>
      </MainCard>
    </PageWrapper>
  );
}
