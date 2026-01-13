import clsx from 'clsx'

interface Props {
  contents: string
}

const NoticeHtml = ({ contents }: Props) => {
  return (
    <article
      className={clsx(
        'prose dark:prose-invert bg-white',
        'max-w-none py-2 px-4 min-w-full overflow-x-auto',
      )}
      dangerouslySetInnerHTML={{ __html: contents }}
    />
  )
}

export default NoticeHtml
