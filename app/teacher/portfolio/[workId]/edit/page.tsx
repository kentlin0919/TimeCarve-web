export async function generateStaticParams() {
  return []; // No dynamic segments are pre-rendered statically for now
}

export default async function EditWorkPage({
  params,
}: {
  params: Promise<{ workId: string }>;
}) {
  const { workId } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold">編輯作品: {workId}</h1>
    </div>
  );
}
