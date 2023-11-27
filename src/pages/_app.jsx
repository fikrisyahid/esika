import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Poppins } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { RouterTransition } from "@/components/RouterTransition";
import { Provider } from "jotai";
import Layout from "@/components/Layout";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider>
        <MantineProvider theme={{ fontFamily: poppins.style.fontFamily }}>
          <RouterTransition />
          <Notifications position="top-center" />
          {Component.noLayout ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </MantineProvider>
      </Provider>
    </SessionProvider>
  );
}
