export async function generateStaticParams() {
  return []; // No dynamic segments are pre-rendered statically for now
}

export default function EditCoursePage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  return (
    <div>
      <h1 className="text-3xl font-bold">編輯課程: {courseId}</h1>
    </div>
  );
}
