'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BillType {
  _id: string;
  month: string;
  electricityUnits: number;
  electricityAmount: number;
  rentAmount: number;
  totalAmount: number;
  status: string;
  paymentDate?: string;
  paymentMethod?: string;
}

interface TenantData {
  name: string;
  phone: string;
  roomNumber: string;
  rentAmount: number;
  bills: BillType[];
}

export default function TenantPortal() {
  const router = useRouter(); 
  const [phone, setPhone] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  useEffect(() => {
  const status = localStorage.getItem("paymentStatus");

  if (status) {
    setPaymentStatus(status);
  }
}, []);
  const [tenantInfo, setTenantInfo] = useState<TenantData | null>(null);
  useEffect(() => {
  const adminLoggedIn = localStorage.getItem("adminLoggedIn");

  if (adminLoggedIn === "true") {
    localStorage.removeItem("tenantData");
    localStorage.removeItem("tenantId");
    setTenantInfo(null);
  }
}, []);
  useEffect(() => {
  const savedTenant =
    localStorage.getItem(
      "tenantData"
    );

  if (savedTenant) {
    setTenantInfo(
      JSON.parse(savedTenant)
    );
  }
}, []);

  // Complaint form state
  const [complaint, setComplaint] = useState({
  category: "General",
  issue: "",
});
  const [complaints, setComplaints] = useState<any[]>([]);
const fetchComplaints = async () => {
  try {
    const response = await fetch("/api/complaints");
    const data = await response.json();

    if (data.success) {
      const myComplaints = data.data.filter(
        (c: any) =>
          c.roomNumber === tenantInfo?.roomNumber
      );

      setComplaints(myComplaints);
    }
  } catch (error) {
    console.log("Failed to fetch complaints");
  }
};
  const handleTenantLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tenants/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, roomNumber }),
      });

      const resData = await response.json();
if (resData.success) {
  // Admin session ko hata do
  localStorage.removeItem("adminLoggedIn");

  setTenantInfo(resData.data);

  localStorage.setItem(
    "tenantId",
    resData.data._id
  );

  localStorage.setItem(
    "tenantData",
    JSON.stringify(resData.data)
  );
}else {
        setError(resData.error || 'Login failed');
      }
    } catch (err) {
      setError('Server se connect nahi ho paya.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogComplaint = async () => {
  if (!complaint.issue)
    return alert("Please enter the issue");

  try {
    const response = await fetch(
      "/api/complaints",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
  tenantName: tenantInfo?.name,
  roomNumber: tenantInfo?.roomNumber,
  issueType: complaint.category,
  description: complaint.issue,
}),
      }
    );

    const data =
      await response.json();

    if (data.success) {
      alert(
        "Complaint logged successfully!"
      );

      setComplaint({
  category: "General",
  issue: "",
});

      fetchComplaints();
    }
  } catch (error) {
    alert(
      "Failed to log complaint"
    );
  }
};

  useEffect(() => {
  if (tenantInfo) {
    fetchComplaints();
  }
}, [tenantInfo]);

useEffect(() => {
  if (!tenantInfo) return;

  const interval = setInterval(() => {
    fetchComplaints();
  }, 3000);

  return () => clearInterval(interval);
}, [tenantInfo]);

  if (!tenantInfo) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-green-100 overflow-hidden p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-200">
          <Link
  href="/"
  className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white border border-green-200 rounded-full text-green-700 font-semibold shadow-sm hover:bg-green-50 hover:shadow-md transition-all duration-300"
>
  🏠 Home
</Link>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Tenant Login</h2>
          
          {error && <div className="p-3 mb-4 rounded-xl text-sm font-medium bg-red-50 text-red-600">{error}</div>}
          <form onSubmit={handleTenantLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
  type="tel"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-black placeholder:text-gray-400"
  style={{ color: "#000000" }}
  placeholder="Enter registered phone number"
  required
/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room / Flat Number</label>
              <input
  type="text"
  value={roomNumber}
  onChange={(e) => setRoomNumber(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-black placeholder:text-gray-400"
  style={{ color: "#000000" }}
  placeholder="e.g., 101"
  required
/>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl disabled:bg-gray-400">
              {loading ? 'Verifying...' : 'Sign In as Tenant'}
            </button>
          </form>
        </div>
      </div>
    );
  }


  const latestBill = tenantInfo.bills && tenantInfo.bills.length > 0 ? tenantInfo.bills[tenantInfo.bills.length - 1] : null;

  return (
    <div className="min-h-screen bg-gray-50 p-25 space-y-3">
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl shadow-xl p-6 text-white">

  <div className="flex justify-between items-start">

    <div>
      <h2 className="text-3xl font-extrabold">
        👋 Welcome, {tenantInfo.name}
      </h2>

      <p className="text-green-100 mt-0">
        Singh Niwas PG Resident Portal
      </p>
    </div>

    <button
  onClick={() => {
    localStorage.removeItem("tenantData");
    localStorage.removeItem("tenantId");
    setTenantInfo(null);
  }}
  className="px-5 py-2 bg-green-800 rounded-xl font-bold hover:bg-red-600 transition"
>
  🚪 Logout
</button>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

    <div className="bg-white/20 rounded-2xl p-4">
      <p className="text-xs text-green-100">
        🏠 Room
      </p>

      <p className="text-2xl font-extrabold">
        {tenantInfo.roomNumber}
      </p>
    </div>

    <div className="bg-white/20 rounded-2xl p-4">
      <p className="text-xs text-green-100">
        💰 Monthly Rent
      </p>

      <p className="text-2xl font-extrabold">
        ₹{tenantInfo.rentAmount}
      </p>
    </div>

    <div className="bg-white/20 rounded-2xl p-4">
      <p className="text-xs text-green-100">
        📞 Phone
      </p>

      <p className="font-bold">
        {tenantInfo.phone}
      </p>
    </div>

    <div className="bg-white/20 rounded-2xl p-4">
      <p className="text-xs text-green-100">
        🛠 Complaints
      </p>

      <p className="text-2xl font-extrabold">
        {complaints.length}
      </p>
    </div>

  </div>

</div>
<div className="max-w-3xl mx-auto bg-blue-50 border border-blue-200 rounded-2xl p-4">

  <h3 className="font-bold text-blue-800">
    🔔 Latest Update
  </h3>

  <p className="text-blue-700 mt-2">
    Welcome to Singh Niwas PG Portal.
    Here you can check bills and complaint status.
  </p>

</div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
    <h3 className="text-2xl font-extrabold">
      💳 Current Month Bill
    </h3>

    <p className="text-blue-100 mt-0">
      Latest Billing Summary
    </p>
  </div>

  <div className="p-4">

    {latestBill ? (

      <>

        <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-3 border">

          <div>
            <p className="text-xs uppercase text-gray-500 font-bold">
              Total Payable
            </p>

            <h2 className="text-5xl font-extrabold text-gray-800 mt-2">
              ₹{latestBill.totalAmount}
            </h2>

            <p className="text-gray-500 mt-1">
              📅 {latestBill.month}
            </p>
          </div>

          <div>

            <span
              className={`px-4 py-2 rounded-full font-bold text-sm ${
                latestBill.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {latestBill.status === "Paid"
                ? "✅ Paid"
                : "🔴 Unpaid"}
            </span>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="bg-green-50 rounded-2xl p-4 border border-green-100">

            <p className="text-green-700 text-sm">
              🏠 Room Rent
            </p>

            <p className="text-2xl font-extrabold text-green-900 mt-2">
              ₹{latestBill.rentAmount}
            </p>

          </div>

          <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100">

            <p className="text-yellow-700 text-sm">
              ⚡ Electricity
            </p>

            <p className="text-2xl font-extrabold text-yellow-900 mt-2">
              ₹{latestBill.electricityAmount}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {latestBill.electricityUnits} Units
            </p>

          </div>

        </div>

        {latestBill?.status !== "Paid" && (

          <button
  onClick={() => {
    localStorage.setItem(
      "currentBill",
      JSON.stringify(latestBill)
    );

    router.push("/tenants/payment");
  }}
  className="w-full mt-4 py-4 bg-blue-600 text-white rounded-2xl font-extrabold text-lg hover:bg-blue-700 transition"
>
  💳 Pay Bill Online
</button>

        )}

      </>

    ) : (

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">

        <p className="text-yellow-800 font-bold">
          ⚠ Bill Not Generated
        </p>

        <p className="text-yellow-700 mt-2">
          Admin has not generated this month's bill yet.
        </p>

        <p className="mt-4 font-bold text-xl text-yellow-900">
          Base Rent : ₹{tenantInfo.rentAmount}
        </p>

      </div>

    )}

  </div>

</div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">All Previous Bills & Payment History</h3>
        {!tenantInfo.bills || tenantInfo.bills.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No past bills found.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
  <table className="w-full">

    <thead className="bg-gray-100">
      <tr className="text-gray-700 text-sm">
        <th className="p-4 text-left font-bold">Month</th>
        <th className="p-4 text-center font-bold">Units</th>
        <th className="p-4 text-center font-bold">Electric Bill</th>
        <th className="p-4 text-center font-bold">Rent</th>
        <th className="p-4 text-center font-bold">Total Amount</th>
        <th className="p-4 text-center font-bold">Status</th>
        <th className="p-4 text-center font-bold">
          Payment Details
        </th>
        <th className="p-4 text-center font-bold">
          Invoice
        </th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
      {tenantInfo.bills.map((b) => (
        <tr
          key={b._id}
          className="hover:bg-gray-50 transition duration-200"
        >
          <td className="p-4 font-semibold text-gray-800">
            {b.month}
          </td>

          <td className="p-4 text-center font-medium">
            {b.electricityUnits}
          </td>

          <td className="p-4 text-center font-semibold text-orange-600">
            ₹{b.electricityAmount}
          </td>

          <td className="p-4 text-center font-semibold text-blue-600">
            ₹{b.rentAmount}
          </td>

          <td className="p-4 text-center font-bold text-green-700">
            ₹{b.totalAmount}
          </td>

          <td className="p-4 text-center">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                b.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {b.status}
            </span>
          </td>

          <td className="p-4 text-center">
            {b.paymentDate ? (
              <div className="space-y-1">
                <p className="font-semibold text-gray-800">
                  📅{" "}
                  {new Date(
                    b.paymentDate
                  ).toLocaleDateString("en-IN")}
                </p>

                <p className="text-xs text-gray-500">
                  💳 {b.paymentMethod || "Online"}
                </p>
              </div>
            ) : (
              <span className="text-gray-400">
                -
              </span>
            )}
          </td>

          <td className="p-4 text-center">
            {b.status === "Paid" ? (
              <button
                onClick={() => {
                  localStorage.setItem(
                    "invoiceData",
                    JSON.stringify({
                      tenantName:
                        tenantInfo.name,
                      roomNumber:
                        tenantInfo.roomNumber,
                      month: b.month,
                      rentAmount:
                        b.rentAmount,
                      electricityAmount:
                        b.electricityAmount,
                      totalAmount:
                        b.totalAmount,
                      paymentMethod:
                        b.paymentMethod ||
                        "Online",
                      paymentDate:
                        b.paymentDate,
                    })
                  );

                  window.location.href =
                    "/tenants/invoice";
                }}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition"
              >
                👁️ View Bill
              </button>
            ) : (
              <span className="text-gray-400">
                -
              </span>
            )}
          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>
       )}
      </div>
      {/* Naya Section: File Complaint */}

<div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-100">

  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
    🛠️ File Complaint
  </h3>

  <div className="grid grid-cols-3 gap-4 mb-6">

  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
    <p className="text-blue-600 text-sm">
      Total
    </p>

    <p className="text-3xl font-extrabold text-blue-800">
      {complaints.length}
    </p>
  </div>

  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
    <p className="text-yellow-600 text-sm">
      Pending
    </p>

    <p className="text-3xl font-extrabold text-yellow-800">
      {
        complaints.filter(
          (c) => c.status !== "Resolved"
        ).length
      }
    </p>
  </div>

  <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
    <p className="text-green-600 text-sm">
      Fixed
    </p>

    <p className="text-3xl font-extrabold text-green-800">
      {
        complaints.filter(
          (c) => c.status === "Resolved"
        ).length
      }
    </p>
  </div>

</div>

  <div className="space-y-4">

    <select
      value={complaint.category}
      onChange={(e) =>
        setComplaint({
          ...complaint,
          category: e.target.value,
        })
      }
      className="w-full p-4 bg-white text-black rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="General">🛠 General</option>
      <option value="Electricity">⚡ Electricity</option>
      <option value="Water">🚿 Water</option>
      <option value="Cleaning">🧹 Cleaning</option>
      <option value="Internet">🌐 Internet</option>
      <option value="Furniture">🪑 Furniture</option>
      <option value="Security">🔒 Security</option>
    </select>

    <textarea
      value={complaint.issue}
      onChange={(e) =>
        setComplaint({
          ...complaint,
          issue: e.target.value,
        })
      }
      placeholder="What is the issue?"
      rows={3}
      className="w-full p-4 bg-white text-black placeholder:text-gray-400 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
    />

    <button
      onClick={handleLogComplaint}
      className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition"
    >
      Log Issue
    </button>

  </div>

  {complaints.length > 0 && (

    <div className="mt-6 space-y-3">

      <h4 className="text-lg font-bold text-gray-800">
        📋 My Complaints
      </h4>

      {complaints.map((c: any) => (

        <div
          key={c._id}
          className="border rounded-xl p-4 bg-gray-50"
        >

          <div className="flex justify-between items-center">

            <span className="font-bold text-gray-800">
              🔧 {c.issueType}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                c.status === "Resolved"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {c.status === "Resolved"
                ? "✅ Fixed"
                : "⏳ Pending"}
            </span>

          </div>

          <p className="text-gray-600 mt-2">
            {c.description}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            📅 {new Date(c.createdAt).toLocaleString("en-IN")}
          </p>

          {c.adminReply && (

            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">

              <p className="text-sm font-bold text-blue-800">
                💬 Admin Reply
              </p>

              <p className="text-sm text-blue-700 mt-1">
                {c.adminReply}
              </p>

            </div>

          )}

        </div>

      ))}

    </div>

   )}

</div>

</div>
);
}