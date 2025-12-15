export async function generateStaticParams() {
  return []; // No dynamic segments are pre-rendered statically for now
}

export default async function EditLessonPlanPage({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const { planId } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold">編輯教案: {planId}</h1>
    </div>
  );
}
