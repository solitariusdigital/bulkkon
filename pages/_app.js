import RootLayout from "@/components/RootLayout";
import { StateProvider } from "@/context/stateContext";
import Head from "next/head";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <RootLayout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
      </RootLayout>
    </StateProvider>
  );
}
