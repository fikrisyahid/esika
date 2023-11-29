import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { Title } from "@mantine/core";

export default function Kelas() {
  return (
    <PageWrapper pageTitle="Kelas">
      <MainCard>
        <Title>Daftar kelas yang kamu ikuti</Title>
      </MainCard>
    </PageWrapper>
  );
}
