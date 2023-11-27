import { AppShell } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Unauthorized from "@/components/Unauthorized";
import { studentNavLists, teacherNavLists } from "@/data/layout";
import { BASE_COLORS, SHARED_API_URL } from "@/configs";
import { useSetAtom } from "jotai";
import { profile } from "@/atoms";
import useFetchAPI from "@/hooks/useFetchAPI";
import BaseLoadingOverlay from "../BaseLoadingOverlay";
import BaseNavbar from "./BaseNavbar";
import BaseHeader from "./BaseHeader";

export default function Layout({ children }) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const { data: user, isLoading: userLoading } = useFetchAPI({
    url: `${SHARED_API_URL}/user/profile`,
  });

  const setUserData = useSetAtom(profile);

  useEffect(() => {
    if (user?.statusCode === 200) {
      setUserData(user.data);
    }
  }, [user, setUserData]);

  const teacherRoute = router.pathname.startsWith("/teacher");
  const studentRoute = router.pathname.startsWith("/student");
  const pathRole = teacherRoute ? "TEACHER" : studentRoute ? "STUDENT" : null;

  if (userLoading) {
    return <BaseLoadingOverlay />;
  }

  if (pathRole && user?.data?.role !== pathRole) {
    return <Unauthorized />;
  }

  return (
    <AppShell
      layout="alt"
      style={{
        backgroundColor: BASE_COLORS.gray_page,
      }}
      header={<BaseHeader opened={opened} setOpened={setOpened} user={user} />}
      navbar={
        <BaseNavbar
          opened={opened}
          setOpened={setOpened}
          listNavData={
            teacherRoute ? teacherNavLists : studentRoute ? studentNavLists : []
          }
        />
      }
    >
      {children}
    </AppShell>
  );
}
