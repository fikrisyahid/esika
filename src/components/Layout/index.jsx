import { AppShell } from "@mantine/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Unauthorized from "@/components/Unauthorized";
import { adminNavLists, studentNavLists, teacherNavLists } from "@/data/layout";
import { BASE_COLORS, SHARED_API_URL } from "@/configs";
import { useSetAtom } from "jotai";
import { profile, profileMutate } from "@/atoms";
import useFetchAPI from "@/hooks/useFetchAPI";
import isPathAuthorized from "@/utils/validation/path-authorized";
import BaseLoadingOverlay from "../BaseLoadingOverlay";
import BaseNavbar from "./BaseNavbar";
import BaseHeader from "./BaseHeader";

export default function Layout({ children }) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  const {
    data: user,
    isLoading: userLoading,
    mutate: userMutate,
  } = useFetchAPI({
    url: `${SHARED_API_URL}/user`,
  });

  const setUserData = useSetAtom(profile);
  const setUserProfile = useSetAtom(profileMutate);

  useEffect(() => {
    if (user?.statusCode === 200) {
      setUserData(user.data);
      setUserProfile({ fn: userMutate });
    }
  }, [user, userMutate, setUserData, setUserProfile]);

  const isAdmin = user?.data?.Admin;
  const isTeacher = user?.data?.Dosen;
  const isStudent = user?.data?.Mahasiswa;

  const teacherRoute = router.pathname.startsWith("/teacher");
  const studentRoute = router.pathname.startsWith("/student");
  const adminRoute = router.pathname.startsWith("/admin");
  const profileRoute = router.pathname.startsWith("/profile");
  const pathRole = teacherRoute
    ? "dosen"
    : studentRoute
    ? "mahasiswa"
    : adminRoute
    ? "admin"
    : profileRoute
    ? "profile"
    : "";

  if (userLoading) {
    return <BaseLoadingOverlay />;
  }

  if (!isPathAuthorized({ user: user?.data, path_role: pathRole })) {
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
            teacherRoute || (isTeacher && profileRoute)
              ? teacherNavLists
              : studentRoute || (isStudent && profileRoute)
              ? studentNavLists
              : adminRoute || (isAdmin && profileRoute)
              ? adminNavLists
              : []
          }
        />
      }
    >
      {children}
    </AppShell>
  );
}
