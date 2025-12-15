export async function generateStaticParams() {
  return []; // No dynamic segments are pre-rendered statically for now
}

export default function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params; // Changed from await params to params
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">課程詳細頁: {courseId}</h1>
    </div>
  );
}
