export default function NewsItem({
  title,
  description,
  thumbnail_url,
}: {
  title: string;
  description: string;
  thumbnail_url: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <img src={thumbnail_url} alt={title} />
      </div>
      <div className="flex flex-col">
        <div className="text-lg">
          <h1>{title}</h1>
        </div>
        <div className="text-base">{description}</div>
      </div>
    </div>
  );
}
