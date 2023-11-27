import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { Text } from "@mantine/core";

export default function Dashboard() {
  return (
    <PageWrapper pageTitle="Dashboard">
      <MainCard>
        <Text>Ini halaman dashboard buat admin</Text>
      </MainCard>
    </PageWrapper>
  );
}
