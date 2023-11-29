import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { Button, Group, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function BuatMateri() {
  const router = useRouter();

  const { id_kelas: idKelas } = router.query;

  const handleBack = () => {
    router.push(`/teacher/kelas/${idKelas}`);
  };

  return (
    <PageWrapper pageTitle="Buat materi">
      <MainCard>
        <Group>
          <Button color="dark" leftIcon={<IconArrowLeft />} onClick={handleBack}>
            Kembali
          </Button>
          <Title>Buat materi</Title>
        </Group>
      </MainCard>
    </PageWrapper>
  );
}
