import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang="ko-kr">
      <Head>
        <meta
          name="Description"
          content="메이플을 즐길 수 있게 도와주는 메이플 헬퍼 입니다."
        />
        <meta
          name="Keywords"
          content="메이플스토리, 메이플스토리 헬퍼, 주간 보스결정석, 주보돌이, 캐릭터 검색"
        />
        <meta property="og:title" content="메이플 헬퍼" />
        <meta property="og:type" content="website" />
        <meta
          property="og:Description"
          content="메이플을 즐길 수 있게 도와주는 메이플 헬퍼 입니다."
        />
        <meta
          name="og:Keywords"
          content="메이플스토리, 메이플스토리 헬퍼, 주간 보스결정석, 주보돌이, 캐릭터 검색"
        />
        <meta property="og:url" content="https://www.maple-helper.com/" />
      </Head>
      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
export default Document
