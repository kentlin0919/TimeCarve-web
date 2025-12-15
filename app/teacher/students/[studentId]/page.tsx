export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold">學生詳細資料: {studentId}</h1>
    </div>
  );
}
