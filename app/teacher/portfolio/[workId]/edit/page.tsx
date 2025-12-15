export async function generateStaticParams() {
  return []; // No dynamic segments are pre-rendered statically for now
}

export default function EditPortfolioWorkPage({ params }: { params: { workId: string } }) {
  const { workId } = params;
  return (
    <div>
      <h1 className="text-3xl font-bold">編輯作品: {workId}</h1>
    </div>
  );
}
