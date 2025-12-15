export async function generateStaticParams() {
  return [{ bookingId: 'demo' }];
}

export default async function ReschedulePage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold">改期預約: {bookingId}</h1>
    </div>
  );
}
