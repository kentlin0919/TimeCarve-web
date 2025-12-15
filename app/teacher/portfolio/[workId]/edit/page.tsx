export async function generateStaticParams() {
  return [{ workId: 'demo' }];
}

export default async function EditPortfolioWorkPage({ params }: { params: Promise<{ workId: string }> }) {
  const { workId } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold">編輯作品: {workId}</h1>
    </div>
  );
}
