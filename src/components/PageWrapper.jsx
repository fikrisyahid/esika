import { Stack, useMantineTheme } from "@mantine/core";
import Head from "next/head";

export default function PageWrapper({ children, pageTitle, gap, style }) {
  const theme = useMantineTheme();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Stack
        style={{
          gap: gap || theme.spacing.md,
          ...style,
        }}
      >
        {children}
      </Stack>
    </>
  );
}
