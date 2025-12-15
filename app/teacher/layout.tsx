export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-gray-900 text-white p-4">
        <h2 className="mb-4 text-xl font-bold">教師管理後台</h2>
        <nav>
          <ul className="space-y-2">
            <li>Dashboard</li>
            <li>Courses</li>
            <li>Bookings</li>
            <li>Students</li>
            <li>Portfolio</li>
            <li>Reports</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
