import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";

function AIURUS(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>AI Urus</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/alphabet-a.ico" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          fontFamily: "Poppins, sans-serif",
          headings: { fontFamily: "Poppins, sans-serif" },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default AIURUS;