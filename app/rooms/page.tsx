import Sidebar from "../components/Sidebar";

export default function RoomsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Rooms Management
        </h1>

        <div className="bg-white p-6 rounded shadow max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            Add Room
          </h2>

          <input
            type="text"
            placeholder="Room Number"
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="number"
            placeholder="Monthly Rent"
            className="w-full border p-3 rounded mb-4"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            Save Room
          </button>
        </div>
      </div>
    </div>
  );
}