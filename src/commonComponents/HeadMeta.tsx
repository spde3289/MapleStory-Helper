import Head from 'next/head'

interface HeadMetaProps {
  title?: string
  description?: string
  Keywords?: string
}

const Meta = {
  title: '메이플 헬퍼',
  description:
    '메이플을 즐길 수 있게 도와주는 메이플 헬퍼 입니다. 주간보스 결정석, 해방 일정 계산등 여러 기능들을 편리하게 이용할 수 있습니다.',
  Keywords:
    '메이플스토리, 메이플스토리 헬퍼, 메이플 헬퍼, 주간 보스결정석, 주보돌이, 캐릭터 검색, 해방 퀘스트, 제네시스 무기, 해방퀘스트, 메이플계산기',
}

const HeadMeta = ({ title, description, Keywords }: HeadMetaProps) => {
  return (
    <Head>
      <meta property="title" content={title || Meta.title} />
      <meta name="description" content={description || Meta.description} />
      <meta name="Keywords" content={Meta.Keywords + (Keywords || '')} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || Meta.title} />
      <meta
        property="og:description"
        content={description || Meta.description}
      />
      <meta name="og:Keywords" content={Meta.Keywords + (Keywords || '')} />
      <meta property="og:url" content="https://www.maple-helper.com/" />
      <meta name="twitter:title" content={title || Meta.title} />
      <meta
        name="twitter:description"
        content={description || Meta.description}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title || Meta.title}</title>
    </Head>
  )
}

export default HeadMeta
