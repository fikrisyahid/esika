import { profile } from "@/atoms";
import MainCard from "@/components/MainCard";
import NoData from "@/components/NoData";
import PageWrapper from "@/components/PageWrapper";
import KelasCard from "@/components/kelas/KelasCard";
import { TEACHER_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Button, Flex, Grid } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";

export default function Kelas() {
  const router = useRouter();

  const user = useAtomValue(profile);

  const { data: kelas, isLoading: kelasLoading } = useFetchAPI({
    url: `${TEACHER_API_URL}/kelas?dosen_id=${user?.Dosen?.id}`,
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
        {kelas?.data?.length === 0 ? (
          <MainCard>
            <NoData text="Kamu tidak memiliki kelas" />
          </MainCard>
        ) : (
          <Grid gutter="lg">
            {kelas?.data?.map((kelas) => (
              <Grid.Col md={6} lg={4} key={kelas.id}>
                <KelasCard
                  dosen={kelas?.dosen?.user?.nama}
                  komposisi_quiz={kelas?.komposisi_quiz}
                  komposisi_tugas={kelas?.komposisi_tugas}
                  komposisi_uts={kelas?.komposisi_uts}
                  komposisi_uas={kelas?.komposisi_uas}
                  nama={kelas?.nama}
                  kode={kelas?.kode}
                  canView
                  canEdit
                  canDelete
                />
              </Grid.Col>
            ))}
          </Grid>
        )}
      </PageWrapper>
    )
  );
}
