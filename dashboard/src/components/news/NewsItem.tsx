export default function NewsItem({
  title,
  description,
  thumbnail_url,
  slug,
}: {
  title: string;
  description: string;
  thumbnail_url: string;
  slug: string;
}) {
  const parsed_description = { __html: description };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
      <div className="thumbnail">
        <img src={thumbnail_url} alt={title} />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold">
          <h1>
            <a href={slug}>{title}</a>
          </h1>
        </div>
        <div
          className="text-base"
          dangerouslySetInnerHTML={parsed_description}
        ></div>
      </div>
    </div>
  );
}
