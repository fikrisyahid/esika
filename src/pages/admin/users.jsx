import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { Text } from "@mantine/core";

export default function users() {
  return (
    <PageWrapper pageTitle="Users">
      <MainCard>
        <Text>Ini halaman users buat admin</Text>
      </MainCard>
    </PageWrapper>
  );
}
