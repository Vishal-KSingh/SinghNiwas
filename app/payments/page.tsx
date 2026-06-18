import Sidebar from "../components/Sidebar";

export default function PaymentsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Rent Payments
        </h1>

        <div className="bg-white p-6 rounded shadow">
          <p>Payment records will appear here.</p>
        </div>
      </div>
    </div>
  );
}