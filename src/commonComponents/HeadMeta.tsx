import Head from 'next/head'

interface HeadMetaProps {
  title?: string
  description?: string
  Keywords?: string
}

const HeadMeta = ({ title, description, Keywords }: HeadMetaProps) => {
  return (
    <Head>
      <meta property="og:title" content={title || '메이플 헬퍼'} />
      <meta
        name="description"
        content={
          description || '메이플을 즐길 수 있게 도와주는 메이플 헬퍼 입니다.'
        }
      />
      <meta
        name="Keywords"
        content={
          Keywords ||
          '메이플스토리, 메이플스토리 헬퍼, 메이플 헬퍼, 주간 보스결정석, 주보돌이, 캐릭터 검색, 해방 퀘스트, 제네시스 무기, 해방퀘'
        }
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content={
          description || '메이플을 즐길 수 있게 도와주는 메이플 헬퍼 입니다.'
        }
      />
      <meta
        name="og:Keywords"
        content={
          Keywords ||
          '메이플스토리, 메이플스토리 헬퍼, 메이플 헬퍼, 주간 보스결정석, 주보돌이, 캐릭터 검색, 해방 퀘스트, 제네시스 무기, 해방퀘'
        }
      />
      <meta property="og:url" content="https://www.maple-helper.com/" />
      <meta name="twitter:title" content={title || '메이플 헬퍼'} />
      <meta
        name="twitter:description"
        content={
          description || '메이플을 즐길 수 있게 도와주는 메이플 헬퍼 입니다.'
        }
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title || '메이플 헬퍼'}</title>
    </Head>
  )
}

export default HeadMeta
