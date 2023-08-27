export default function PostDetail({
  title,
  description,
  content,
}: {
  title: string;
  description?: string;
  content: string;
}) {
  const parsed_description = { __html: description as string | TrustedHTML };
  const parsed_content = { __html: content };

  return (
    <div className="article">
      <div className="title font-bold">
        <h1>{title}</h1>
      </div>
      <div dangerouslySetInnerHTML={parsed_description}></div>
      <div dangerouslySetInnerHTML={parsed_content}></div>
    </div>
  );
}
