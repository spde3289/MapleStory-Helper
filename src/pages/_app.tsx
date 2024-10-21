import "@/styles/globals.css";
import Layout from "@/components/layout";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

// 폰트 파일 경로를 /public/fonts 에서 가져옴
const myFont = localFont({
  src: [
    {
      path: "./fonts/Maplestory-light.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Maplestory-bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-Maplestory",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={`${myFont.className} flex`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </>
  );
}
