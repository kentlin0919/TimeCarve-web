export async function generateStaticParams() {
  return []; // No dynamic segments are pre-rendered statically for now
}

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold">編輯課程: {courseId}</h1>
    </div>
  );
}
