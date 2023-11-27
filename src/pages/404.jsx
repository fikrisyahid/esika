import BaseLoadingOverlay from "@/components/BaseLoadingOverlay";
import PageWrapper from "@/components/PageWrapper";
import { BASE_COLORS, BASE_LOADING } from "@/configs";
import { Text, Button, Title, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const router = useRouter();
  const theme = useMantineTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { duration } = BASE_LOADING;
    const loadCSSTimeout = setTimeout(() => {
      setLoading(false);
    }, duration);
    return () => clearTimeout(loadCSSTimeout);
  }, []);

  if (loading) {
    return <BaseLoadingOverlay />;
  }

  return (
    <PageWrapper
      pageTitle="Not Found :("
      style={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title ta="center" color={BASE_COLORS.gray_text}>
        Error 404 not found :(
      </Title>
      <Text ta="center" color={BASE_COLORS.gray_text} style={{ fontSize: 30 }}>
        The page you are looking for does not exist
      </Text>
      <Button
        size="lg"
        style={{
          outlineColor: BASE_COLORS.orange,
          backgroundColor: BASE_COLORS.orange,
          borderRadius: theme.radius.md,
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        Back to login page
      </Button>
    </PageWrapper>
  );
}

NotFoundPage.noLayout = true;
