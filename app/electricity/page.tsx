import Sidebar from "../components/Sidebar";

export default function ElectricityPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Electricity Bills
        </h1>

        <div className="bg-white p-6 rounded shadow max-w-2xl">
          <input
            type="number"
            placeholder="Previous Reading"
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            placeholder="Current Reading"
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            placeholder="Rate Per Unit"
            className="w-full border p-3 rounded mb-4"
          />

          <button className="bg-green-600 text-white px-6 py-3 rounded">
            Calculate Bill
          </button>
        </div>
      </div>
    </div>
  );
}