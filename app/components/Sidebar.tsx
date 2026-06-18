export default function Sidebar() {
  return (
    <div className="w-64 bg-blue-700 text-white p-5 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">
        SinghNiwas
      </h1>

      <ul className="space-y-4">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/dashboard/tenants">Tenants</a></li>
        <li><a href="/dashboard/rooms">Rooms</a></li>
        <li><a href="/dashboard/payments">Payments</a></li>
        <li><a href="/dashboard/electricity">Electricity Bills</a></li>
      </ul>
    </div>
  );
}