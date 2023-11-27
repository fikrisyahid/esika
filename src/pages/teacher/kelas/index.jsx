import MainCard from "@/components/MainCard";
import NoData from "@/components/NoData";
import PageWrapper from "@/components/PageWrapper";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Button, Flex, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/router";

export default function Kelas() {
  const router = useRouter();

  const { data: kelas, isLoading: kelasLoading } = useFetchAPI({
    url: `${TEACHER_API_URL}/kelas`,
  });

  const handleCreate = () => {
    router.push("/teacher/kelas/baru");
  };

  const pageState = DataLoadCheck({ data: kelas, isLoading: kelasLoading });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Kelas">
        <Flex justify="end">
          <Button leftIcon={<IconPlus />} color="dark" onClick={handleCreate}>
            Buat kelas baru
          </Button>
        </Flex>
        <MainCard>
          {kelas?.data?.length === 0 ? (
            <NoData text="Kamu tidak memiliki kelas" />
          ) : (
            <Text>Ada kelas</Text>
          )}
        </MainCard>
      </PageWrapper>
    )
  );
}
