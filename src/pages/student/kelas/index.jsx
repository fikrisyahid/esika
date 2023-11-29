import { profile } from "@/atoms";
import MainCard from "@/components/MainCard";
import NoData from "@/components/NoData";
import PageWrapper from "@/components/PageWrapper";
import PrettyJSON from "@/components/PrettyJSON";
import KelasCard from "@/components/kelas/KelasCard";
import { SHARED_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import getDevStatus from "@/utils/get-dev-status";
import DataLoadCheck from "@/utils/react-component/DataLoadCheck";
import { Grid, Title } from "@mantine/core";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";

export default function Kelas() {
  const router = useRouter();

  const user = useAtomValue(profile);

  const { isDev } = getDevStatus();

  const { data: myKelas, isLoading: myKelasLoading } = useFetchAPI({
    url: `${SHARED_API_URL}/kelas?mahasiswa_id=${user?.Mahasiswa?.id}`,
  });

  const { data: otherKelas, isLoading: otherKelasLoading } = useFetchAPI({
    url: `${SHARED_API_URL}/kelas?mahasiswa_id=${user?.Mahasiswa?.id}&exclude_my_kelas=true`,
  });

  const handleViewKelas = ({ id }) => {
    router.push(`/student/kelas/${id}`);
  };

  const pageState = DataLoadCheck({
    data: [myKelas, otherKelas],
    isLoading: [myKelasLoading, otherKelasLoading],
  });

  return (
    pageState ?? (
      <PageWrapper pageTitle="Kelas">
        <MainCard>
          <Title mb="md">Daftar kelas yang kamu ikuti</Title>
          {myKelas?.data?.length === 0 ? (
            <NoData text="Anda tidak memiliki kelas" />
          ) : (
            <Grid gutter="lg">
              {myKelas?.data?.map((item) => (
                <Grid.Col md={6} lg={4} key={item.id}>
                  <KelasCard
                    dosen={item?.dosen?.user?.nama}
                    komposisi_quiz={item?.komposisi_quiz}
                    komposisi_tugas={item?.komposisi_tugas}
                    komposisi_uts={item?.komposisi_uts}
                    komposisi_uas={item?.komposisi_uas}
                    nama={item?.nama}
                    kode={item?.kode}
                    canView
                    onClickView={() => handleViewKelas({ id: item?.id })}
                    mahasiswaCount={item?._count?.Nilai}
                  />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </MainCard>
        <MainCard>
          <Title>Daftar kelas lainnya</Title>
          {otherKelas?.data?.length === 0 ? (
            <NoData text="Tidak ada kelas lain yang tersedia" />
          ) : (
            <Grid gutter="lg">
              {otherKelas?.data?.map((item) => (
                <Grid.Col md={6} lg={4} key={item.id}>
                  <KelasCard
                    dosen={item?.dosen?.user?.nama}
                    komposisi_quiz={item?.komposisi_quiz}
                    komposisi_tugas={item?.komposisi_tugas}
                    komposisi_uts={item?.komposisi_uts}
                    komposisi_uas={item?.komposisi_uas}
                    nama={item?.nama}
                    kode={item?.kode}
                    canView
                    onClickView={() => handleViewKelas({ id: item?.id })}
                    mahasiswaCount={item?._count?.Nilai}
                  />
                </Grid.Col>
              ))}
            </Grid>
          )}
        </MainCard>
        {isDev && (
          <>
            <PrettyJSON json={myKelas} />
            <PrettyJSON json={otherKelas} />
          </>
        )}
      </PageWrapper>
    )
  );
}
