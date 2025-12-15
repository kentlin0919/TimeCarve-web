export async function generateStaticParams() {
  return [];
}

export default function TeacherProfilePage({ params }: { params: { teacherId: string } }) {
  const { teacherId } = params;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">教師介紹頁: {teacherId}</h1>
    </div>
  );
}
