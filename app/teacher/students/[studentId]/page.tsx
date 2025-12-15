export async function generateStaticParams() {
  return []; // No dynamic segments are pre-rendered statically for now
}

export default function StudentDetailPage({
  params,
}: {
  params: { studentId: string };
}) {
  const { studentId } = params;
  return (
    <div>
      <h1 className="text-3xl font-bold">學生詳細資料: {studentId}</h1>
    </div>
  );
}
