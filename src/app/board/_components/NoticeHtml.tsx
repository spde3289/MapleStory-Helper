const NoticeHtml = ({ html }: { html: string }) => {
  return (
    <article
      className="bg-white py-2 px-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default NoticeHtml
