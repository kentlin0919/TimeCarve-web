export async function generateStaticParams() {
  return [{ courseId: 'demo' }];
}

export default async function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold">編輯課程: {courseId}</h1>
    </div>
  );
}
