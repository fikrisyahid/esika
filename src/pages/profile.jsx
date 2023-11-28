import MainCard from "@/components/MainCard";
import PageWrapper from "@/components/PageWrapper";
import { SHARED_API_URL } from "@/configs";
import useFetchAPI from "@/hooks/useFetchAPI";
import getProfileImg from "@/utils/get-profile-img";
import {
  Badge,
  Button,
  Grid,
  Group,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import Image from "next/image";

export default function Profile() {
  const { data: user } = useFetchAPI({ url: `${SHARED_API_URL}/user` });

  return (
    <PageWrapper title="Profil dosen">
      <MainCard>
        <Title>Profil</Title>
        <Grid>
          <Grid.Col md={3} lg={3}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: 300,
              }}
            >
              <Image
                alt="profile-pict"
                src={getProfileImg(user?.data?.nama)}
                fill
              />
            </div>
          </Grid.Col>
          <Grid.Col md={9} lg={9}>
            <Stack>
              <TextInput label="Email" value={user?.data?.email} disabled />
              <TextInput label="Nama" value={user?.data?.nama} />
              <Badge
                color={
                  user?.data?.Admin
                    ? "violet"
                    : user?.data?.Dosen
                    ? "orange"
                    : user?.data?.Mahasiswa
                    ? "green"
                    : ""
                }
                size="lg"
              >
                {user?.data?.Admin
                  ? "Admin"
                  : user?.data?.Dosen
                  ? "Dosen"
                  : user?.data?.Mahasiswa
                  ? "Mahasiswa"
                  : ""}
              </Badge>
              <Group>
                <Button color="violet" mt="sm">
                  Simpan
                </Button>
                <Button color="orange" mt="sm">
                  Ganti password
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </MainCard>
    </PageWrapper>
  );
}
