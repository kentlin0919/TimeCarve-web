export async function generateStaticParams() {
  return []; // No dynamic segments are pre-rendered statically for now
}

export default async function TeacherProfilePage({
  params,
}: {
  params: Promise<{ teacherId: string }>;
}) {
  const { teacherId } = await params;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">教師介紹頁: {teacherId}</h1>
    </div>
  );
}
