export default async function TopicDetailedPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;

  return (
    <div>
      <h1>Topic: {topicId}</h1>
    </div>
  );
}
