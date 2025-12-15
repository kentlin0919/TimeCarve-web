export async function generateStaticParams() {
  return []; // No dynamic segments are pre-rendered statically for now
}

export default function ReschedulePage({
  params,
}: {
  params: { bookingId: string };
}) {
  const { bookingId } = params;
  return (
    <div>
      <h1 className="text-3xl font-bold">改期預約: {bookingId}</h1>
    </div>
  );
}
