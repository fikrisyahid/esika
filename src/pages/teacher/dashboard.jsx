import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { Text } from "@mantine/core";

export default function Dashboard() {
  return (
    <PageWrapper pageTitle="Dashboard">
      <MainCard>
        <Text>Contoh teks</Text>
      </MainCard>
    </PageWrapper>
  );
}
