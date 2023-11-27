import { BASE_COLORS, UNAUTHORIZED_LOADING } from "@/configs";
import { Flex, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Unauthorized() {
  const router = useRouter();

  useEffect(() => {
    const { duration } = UNAUTHORIZED_LOADING;
    const timer = setTimeout(() => {
      router.push("/");
    }, duration);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Flex direction="column" justify="center" align="center" h="100vh" gap={20}>
      <Title color={BASE_COLORS.orange}>You cannot access this page</Title>
    </Flex>
  );
}

Unauthorized.noLayout = true;
