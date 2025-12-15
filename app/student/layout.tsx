export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-50 p-4">
        <h2 className="mb-4 text-xl font-bold">學生專區</h2>
        <nav>
          <ul className="space-y-2">
            <li>Dashboard</li>
            <li>Booking</li>
            <li>My Courses</li>
            <li>Profile</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
