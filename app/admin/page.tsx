'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as XLSX from "xlsx";

// ========================================================
// CLEAR & CORRECT INTERFACES FOR TYPESCRIPT
// ========================================================
interface BillType {
  _id: string;
  month: string;
  rentStartDate?: string;
  rentDueDate?: string;
  electricityAmount: number;
  rentAmount: number;
  totalAmount: number;
  status: string;
}

interface TenantType {
  _id: string;
  name: string;
  phone: string;
  roomNumber: string;
  rentAmount: number;
  advancePayment?: number;
  rentStartDate: string;

  status?: string;
  vacateDate?: string;

  aadhaarCard?: string;

  initialMeterReading?: number;

  meterPhoto?: string;

  bills?: BillType[];
  
}

interface ComplaintType {
  id: string;
  roomNumber: string;
  issue: string;
  status: 'Pending' | 'Resolved';
  date: string;
}

// ========================================================
// 📊 COMPONENT: STATS CARDS
// ========================================================
function StatsCardsInside({
  tenantsData,
  complaints,
}: {
  tenantsData: TenantType[];
  complaints: any[];
}) {
  // ... baaki ka StatsCards ka code waise hi rahega
  const [overviewStats, setOverviewStats] = useState({
    totalTenants: 0,
    vacantRooms: 0,
    totalRooms: 16, 
    unpaidBillsCount: 0,
    currentMonthCollection: 0,
    activeComplaints: 2, 
    totalUnitsConsumed: 0,
    totalRevenueAllTime: 0,
  });

  useEffect(() => {
    if (!tenantsData || tenantsData.length === 0) return;

    let totalTenants = tenantsData.length;
    let occupiedRooms = new Set(tenantsData.map((t) => t.roomNumber)).size;
    let totalRooms = 16; 
    let vacantRooms = totalRooms - occupiedRooms;

    let unpaidCount = 0;
    let currentMonthCash = 0;
    let totalUnits = 0;
    let allTimeRevenue = 0;

    const currentMonthLabel = 'June 2026'; 

    tenantsData.forEach((tenant) => {
      if (tenant.bills) {
        tenant.bills.forEach((bill) => {
          if (bill.status === 'Paid') {
            allTimeRevenue += bill.totalAmount || 0;
          }
          if (bill.month === currentMonthLabel) {
            if (bill.electricityAmount) {
              totalUnits += Math.round(bill.electricityAmount / 7); 
            }
            if (bill.status === 'Paid') {
              currentMonthCash += bill.totalAmount || 0;
            }
          }
          if (bill.status === 'Unpaid') {
            unpaidCount++;
          }
        });
      }
    });

    setOverviewStats({
  totalTenants,
  vacantRooms: vacantRooms < 0 ? 0 : vacantRooms,
  totalRooms,
  unpaidBillsCount: unpaidCount,
  currentMonthCollection: currentMonthCash,
  activeComplaints: complaints.filter(
    (c) => c.status === "Pending"
  ).length,
  totalUnitsConsumed: totalUnits,
  totalRevenueAllTime:
    allTimeRevenue > 0
      ? allTimeRevenue
      : 125000,
});
  }, [tenantsData, complaints]);

  const handleSendWhatsAppReminders = async () => {
    let alertCount = 0;
    tenantsData.forEach((tenant) => {
      let hasUnpaidBill = false;
      let pendingAmount = 0;
      let pendingMonth = '';

      if (tenant.bills) {
        tenant.bills.forEach((bill) => {
          if (bill.status === 'Unpaid') {
            hasUnpaidBill = true;
            pendingAmount += bill.totalAmount || 0;
            pendingMonth = bill.month;
          }
        });
      }

      if (hasUnpaidBill && tenant.phone) {
        alertCount++;
        const customMessage = `Namaste ${tenant.name}, Singh Niwas PG ki taraf se aapka ${pendingMonth} mahine ka rent ₹${pendingAmount} abhi pending (Unpaid) show ho raha hai. Kripya iska bhugtan jald se jald karein. Dhanyawad!`;
        const formattedPhone = tenant.phone.startsWith('91') ? tenant.phone : `91${tenant.phone}`;
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(customMessage)}`;
       setTimeout(async () => {
  window.open(whatsappUrl, "_blank");

  await fetch("/api/tenants/reminder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tenantId: tenant._id,
    }),
  });

}, alertCount * 1000);
      }
    });

    if (alertCount === 0) {
      alert('🎉 Sabhi tenants ka bill already paid hai!');
    }
  };

  const stats = [
    { title: 'Total Revenue (All Time)', value: `₹ ${overviewStats.totalRevenueAllTime.toLocaleString('en-IN')}`, change: 'Gross Lifetime Income', icon: '💰', bg: 'bg-emerald-50 border-emerald-200' },
    { title: 'Current Month Collection', value: `₹ ${overviewStats.currentMonthCollection.toLocaleString('en-IN')}`, change: 'Collected in June 2026', icon: '📈', bg: 'bg-green-50 border-green-200' },
    { title: 'Unpaid Bills (Pending)', value: overviewStats.unpaidBillsCount.toString(), change: 'Action required / Dues', icon: '⏳', bg: 'bg-rose-50 border-rose-200' },
    { title: 'Total Tenants', value: overviewStats.totalTenants.toString(), change: 'Active Live Residents', icon: '👤', bg: 'bg-sky-50 border-sky-200' },
    { title: 'Available Rooms', value: `${overviewStats.vacantRooms} / ${overviewStats.totalRooms}`, change: 'Vacant Rooms Left', icon: '🔑', bg: 'bg-amber-50 border-amber-200' },
    { title: 'Electricity Units Consumed', value: `${overviewStats.totalUnitsConsumed} kWh`, change: 'This Month Total Consumption', icon: '⚡', bg: 'bg-yellow-50 border-yellow-200' },
    { title: 'Active Complaints', value: overviewStats.activeComplaints.toString(), change: 'Maintenance Pending', icon: '🛠️', bg: 'bg-purple-50 border-purple-200' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
        {stats.map((stat, index) => (
          <div key={index} className={`rounded-2xl border bg-white text-gray-800 shadow-sm p-6 hover:shadow-md transition ${stat.bg}`}>
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-bold tracking-tight text-gray-600">{stat.title}</h3>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="mt-2">
              <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1 font-medium">{stat.change}</p>
            </div>
          </div>
        ))}

        <div className="rounded-2xl border bg-gradient-to-br from-green-600 to-emerald-700 text-white shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
          <div>
            <div className="flex flex-row items-center justify-between space-y-0 pb-1">
              <h3 className="text-sm font-bold tracking-tight text-green-100">WhatsApp Launcher</h3>
              <span className="text-2xl">📢</span>
            </div>
            <p className="text-xs text-green-200 mt-1 font-medium">Auto-ping pending defaulters</p>
          </div>
          <div className="mt-4">
            <button onClick={handleSendWhatsAppReminders} className="w-full bg-white text-emerald-800 font-extrabold text-xs px-3 py-2.5 rounded-xl shadow active:scale-95 transition hover:bg-green-50 uppercase tracking-wider">
              💬 Send Reminders ({overviewStats.unpaidBillsCount})
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4 border-b pb-2">
          <span className="text-xl">🔔</span>
          <h4 className="font-extrabold text-gray-800 text-lg">Recent Activity & Critical Alerts</h4>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 text-red-800 rounded-xl text-sm border border-red-100">
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span><strong>Overdue Alert:</strong> Total <strong>{overviewStats.unpaidBillsCount} tenants</strong> have pending bills.</span>
            </div>
            <span className="text-xs bg-red-200 px-2 py-0.5 rounded font-bold">Critical</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 text-blue-800 rounded-xl text-sm border border-blue-100">
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span><strong>Occupancy Rate:</strong> Total {overviewStats.totalTenants} Rooms occupied out of {overviewStats.totalRooms}.</span>
            </div>
            <span className="text-xs bg-blue-200 px-2 py-0.5 rounded font-bold">Stable</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 text-purple-800 rounded-xl text-sm border border-purple-100">
            <div className="flex items-center space-x-2">
              <span>🛠️</span>
              <span><strong>Maintenance:</strong> {overviewStats.activeComplaints} complaints need verification.</span>
            </div>
            <span className="text-xs bg-purple-200 px-2 py-0.5 rounded font-bold">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// 🛠️ MAIN COMPONENT: ADMIN DASHBOARD
// ========================================================
export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] =
  useState(false);

const [currentPassword, setCurrentPassword] =
  useState("");

const [newPassword, setNewPassword] =
  useState("");

const [confirmPassword, setConfirmPassword] =
  useState("");

const [adminPassword, setAdminPassword] =
  useState("singhniwas123");

const [loginError, setLoginError] =
  useState("");

const [activeTab, setActiveTab] =
  useState<'overview' | 'manage'>('overview');

useEffect(() => {
  const savedPassword =
    localStorage.getItem("adminPassword");

  if (savedPassword) {
    setAdminPassword(savedPassword);
  }
}, []);

  // Forms states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [advancePayment, setAdvancePayment] = useState("");
  const [rentStartDate, setRentStartDate] = useState('');
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [initialMeterReading, setInitialMeterReading] = useState('');
  const [meterPhoto, setMeterPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const [selectedTenantId, setSelectedTenantId] = useState('');
  const [billingMonth, setBillingMonth] = useState('June 2026');
  const [units, setUnits] = useState('');
  const [unitRate, setUnitRate] = useState('7');
  const [billMessage, setBillMessage] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [exportYear, setExportYear] = useState("");
  const [exportMonth, setExportMonth] =
  useState("");
  const [complaints, setComplaints] = useState<any[]>([]);
  const [newCompRoom, setNewCompRoom] = useState('');
  const [newCompIssue, setNewCompIssue] = useState('');
  const [tenants, setTenants] = useState<TenantType[]>([]);

  const [editingTenant, setEditingTenant] = useState<any>(null);
  const [editingBill, setEditingBill] = useState<any>(null);
  const [editAadhaarFile, setEditAadhaarFile] = useState<File | null>(null);
  const [editMeterPhoto, setEditMeterPhoto] = useState<File | null>(null);

  const fetchTenants = async () => {
  try {
    const response = await fetch('/api/tenants');
    const resData = await response.json();

    console.log("API Data:", resData.data);

    if (resData.success) {
      setTenants(
        resData.data.filter(
          (tenant: TenantType) => tenant.status === "active"
        )
      );
    }
  } catch (error) {
    console.error('Failed to fetch tenants:', error);
  }
};

  const fetchComplaints = async () => {
  try {
    const response = await fetch("/api/complaints");
    const data = await response.json();

    if (data.success) {
      setComplaints(data.data);
    }
  } catch (error) {
    console.log("Failed to fetch complaints");
  }
};

  useEffect(() => {
  if (isLoggedIn) {
    fetchTenants();
    fetchComplaints();

    const interval = setInterval(() => {
      fetchComplaints();
    }, 3000);

    return () => clearInterval(interval);
  }
}, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  if (
    username === "admin" &&
    password === adminPassword
  ) {
    // Admin Login
    localStorage.setItem(
      "adminLoggedIn",
      "true"
    );

    // Tenant session clear
    localStorage.removeItem(
      "tenantData"
    );
    localStorage.removeItem(
      "tenantId"
    );

    setIsLoggedIn(true);
    setLoginError("");
  } else {
    setLoginError(
      "❌ Galat Username ya Password!"
    );
  }
};
const handleChangePassword = () => {
  if (currentPassword !== adminPassword) {
    alert("❌ Current password incorrect");
    return;
  }

  if (newPassword.length < 6) {
    alert("❌ Password minimum 6 characters hona chahiye");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("❌ Password match nahi kar raha");
    return;
  }

  localStorage.setItem("adminPassword", newPassword);
  setAdminPassword(newPassword);

  alert("✅ Password Changed Successfully");

  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");
  setShowPasswordModal(false);
};
<button onClick={handleChangePassword}>
  Save Password
</button>

  const handleAddTenant = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("Adding tenant...");

  try {
    let aadhaarPath = "";

    // Step 1: Aadhaar upload
    if (aadhaarFile) {
      const formData = new FormData();
      formData.append("file", aadhaarFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        aadhaarPath = uploadData.filePath;
      }
    }
    let meterPhotoPath = "";

if (meterPhoto) {
  const formData = new FormData();
  formData.append("file", meterPhoto);

  const uploadResponse = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const uploadData = await uploadResponse.json();

  if (uploadData.success) {
    meterPhotoPath = uploadData.filePath;
  }
}

    // Step 2: Tenant save
    const response = await fetch("/api/tenants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        roomNumber,
        rentAmount: Number(rentAmount),
        advancePayment: Number(advancePayment) || 0,
        rentStartDate,
        initialMeterReading: Number(initialMeterReading),
        meterPhoto: meterPhotoPath,
        aadhaarCard: aadhaarPath,
      }),
    });

    const resData = await response.json();

    if (resData.success) {
      setMessage("🎉 Tenant Added Successfully!");
      setTimeout(() => {
  setMessage("");
}, 3000);

      setName("");
      setPhone("");
      setRoomNumber("");
      setRentAmount("");
      setRentStartDate('');
      setAadhaarFile(null);
      setInitialMeterReading('');
      setMeterPhoto(null);

      fetchTenants();
    } else {
      if (!resData.success) {

  if (
    resData.error &&
    resData.error.includes("E11000")
  ) {
    setMessage(
      "⚠️ This mobile number is already registered."
    );
  } else {
    setMessage(
      "❌ Something went wrong. Please try again."
    );
  }

}
    }
  } catch (error) {
    setMessage("❌ Failed to add tenant.");
  }
};
  const handleGenerateBill = async (e: React.FormEvent) => {
    e.preventDefault();
    setBillMessage('Generating bill...');
    try {
      const response = await fetch('/api/tenants/bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId: selectedTenantId, month: billingMonth, electricityUnits: Number(units), perUnitRate: Number(unitRate) }),
      });
      const resData = await response.json();
      if (resData.success) {
        setBillMessage('🎉 Bill Generated Successfully!');
        setUnits('');
        fetchTenants();
        setTimeout(() => {
  setBillMessage("");
}, 3000);
      } else { setBillMessage(`❌ Error: ${resData.error}`); }
    } catch (error) { setBillMessage('❌ Failed to generate bill.'); }
  };

  const handleExportExcel = () => {
  const rows: any[] = [];

  tenants.forEach((tenant) => {
    tenant.bills?.forEach((bill) => {
      const billYear =
  bill.month.split(" ")[1];

if (
  bill.month ===
  `${exportMonth} ${exportYear}`
) {
        rows.push({
          Tenant: tenant.name,
          Room: tenant.roomNumber,
          Phone: tenant.phone,
          Rent: bill.rentAmount,
          Power: bill.electricityAmount,
          Total: bill.totalAmount,
          Status: bill.status,
          Month: bill.month,
        });
      }
    });
  });

  const worksheet =
    XLSX.utils.json_to_sheet(rows);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Monthly Report"
  );

  XLSX.writeFile(
    workbook,
    `Monthly-Report-${exportMonth}.xlsx`
  );
};


  const handleUpdateStatus = async (tenantId: string, billId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Unpaid' ? 'Paid' : 'Unpaid';
    try {
      const response = await fetch('/api/tenants/bill/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId, billId, newStatus: nextStatus }),
      });
      const resData = await response.json();
      if (resData.success) {
        fetchTenants(); 
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };
  const handleEditTenant = async () => {
  try {

    let aadhaarPath =
      editingTenant.aadhaarCard;

    let meterPhotoPath =
      editingTenant.meterPhoto;

    if (editAadhaarFile) {

      const formData =
        new FormData();

      formData.append(
        "file",
        editAadhaarFile
      );

      const upload =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await upload.json();

      if (data.success) {
        aadhaarPath =
          data.filePath;
      }
    }

    if (editMeterPhoto) {

      const formData =
        new FormData();

      formData.append(
        "file",
        editMeterPhoto
      );

      const upload =
        await fetch(
          "/api/upload",
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await upload.json();

      if (data.success) {
        meterPhotoPath =
          data.filePath;
      }
    }

    const response =
      await fetch(
        "/api/tenants/edit",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...editingTenant,
            aadhaarCard:
              aadhaarPath,
            meterPhoto:
              meterPhotoPath,
          }),
        }
      );

    const result =
      await response.json();

    if (result.success) {
      alert(
        "Tenant Updated"
      );
      setEditingTenant(
        null
      );
      fetchTenants();
    }

  } catch (error) {
    alert(
      "Update Failed"
    );
  }
};
const handleEditBill = async () => {
  try {
    const response = await fetch(
      "/api/tenants/bill/edit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingBill),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Bill Updated Successfully");
      setEditingBill(null);
      fetchTenants();
    }
  } catch (error) {
    alert("Bill Update Failed");
  }
};
  const handleVacateTenant = async (tenantId: string) => {
    if (confirm('Kya aap sach me is tenant ko kamra khaali karwana (Delete) chahte hain?')) {
      try {
        await fetch(`/api/tenants?id=${tenantId}`, { method: 'DELETE' });
        fetchTenants();
      } catch (error) {
        console.error('Failed to delete tenant');
      }
    }
  };

  const handleAddComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompRoom || !newCompIssue) return;
    const newComplaint: ComplaintType = {
      id: Date.now().toString(),
      roomNumber: newCompRoom,
      issue: newCompIssue,
      status: 'Pending',
      date: 'Today',
    };
    setComplaints([newComplaint, ...complaints]);
    setNewCompRoom('');
    setNewCompIssue('');
  };

  const toggleComplaintStatus = async (
  id: string,
  currentStatus: string
) => {
  try {
    const response = await fetch(
      "/api/complaints",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status:
            currentStatus === "Pending"
              ? "Resolved"
              : "Pending",
          adminReply:
            currentStatus === "Pending"
              ? "Your complaint has been fixed."
              : "",
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      fetchComplaints();
    }
  } catch (error) {
    console.log("Failed to update complaint");
  }
};
const deleteComplaint = async (
  id: string
) => {
  const ok = confirm(
    "Delete this complaint?"
  );

  if (!ok) return;

  try {
    const response = await fetch(
      `/api/complaints?id=${id}`,
      {
        method: "DELETE",
      }
    );

    const data =
      await response.json();

    if (data.success) {
      fetchComplaints();
    }
  } catch (error) {
    console.log(
      "Delete failed"
    );
  }
};

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.roomNumber.includes(searchQuery)
  );

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 via-green-100 to-emerald-200 overflow-hidden p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200 w-full max-w-md">
          <Link
  href="/"
  className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white border border-green-200 rounded-full text-green-700 font-semibold shadow-sm hover:bg-green-50 hover:shadow-md transition-all duration-300"
>
  🏠 Home
</Link>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h2>
          {loginError && <div className="p-3 mb-4 rounded-xl text-sm font-medium bg-red-50 text-red-600">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-black placeholder:text-gray-600" placeholder="admin" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white text-black placeholder:text-gray-600" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl">Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-gray-50 p-3 md:p-25 space-y-4">
      <div className="max-w-5xl mx-auto mt-18 md:mt-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl shadow-lg p-6 border border-slate-600">

 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

    <div> 
      <h1 className="
text-xl
sm:text-2xl
md:text-3xl
font-extrabold
text-white
tracking-wide
leading-tight
">
  🏢 Singh Niwas Admin Panel
</h1>

<p className="text-slate-300 text-xs sm:text-sm mt-1">
  Smart PG Management System
</p>
    </div>
    <button
  onClick={() =>
    setShowPasswordModal(true)
  }
  className="
  px-5
  py-2.5
  bg-blue-600
  text-white
  rounded-xl
  font-bold
  hover:bg-blue-700
  transition
"
>
  🔒 Change Password
</button>
    <button
      onClick={() => setIsLoggedIn(false)}
      className="px-5 py-2.5 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition shadow-md"
    > 
      🚪 Logout
    </button>

  </div>

</div>

      <div className="max-w-5xl mx-auto flex space-x-2 border-b border-gray-200 pb-2">
        <button onClick={() => setActiveTab('overview')} className={`px-5 py-2.5 text-sm font-bold rounded-xl transition ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}>
          📊 Dashboard Overview
        </button>
        <button onClick={() => setActiveTab('manage')} className={`px-5 py-2.5 text-sm font-bold rounded-xl transition ${activeTab === 'manage' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border'}`}>
          ⚙️ Manage Operations
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* 👇 Saare 8 cards bina kisi external import ke chalenge */}
          <StatsCardsInside
  tenantsData={tenants}
  complaints={complaints}
/> 
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-5 flex items-center gap-2">
  <span className="text-blue-600">➕</span>
  Add New Tenant
</h3>
              {message && <div className="p-2 mb-3 bg-blue-50 text-blue-700 rounded-lg text-xs">{message}</div>}
              <form onSubmit={handleAddTenant} className="space-y-3">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tenant Name" className="
w-full
px-4
py-3
bg-white
text-gray-900
placeholder:text-gray-800
border border-gray-300
rounded-xl
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
transition
" required />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="
w-full
px-4
py-3
bg-white
text-gray-900
placeholder:text-gray-800
border border-gray-300
rounded-xl
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
transition
" required />
                <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} placeholder="Room Number" className="
w-full
px-4
py-3
bg-white
text-gray-900
placeholder:text-gray-800
border border-gray-300
rounded-xl
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
transition
" required />
                <input type="number" value={rentAmount} onChange={(e) => setRentAmount(e.target.value)} placeholder="Monthly Rent (₹)" className="
w-full
px-4
py-3
bg-white
text-gray-900
placeholder:text-gray-800
border border-gray-300
rounded-xl
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
transition
" required />
<input
  type="number"
  value={advancePayment}
  onChange={(e) =>
    setAdvancePayment(e.target.value)
  }
  placeholder="Advance Payment (Optional)"
  className="
w-full
px-4
py-3
bg-white
text-gray-900
placeholder:text-gray-800
border border-gray-300
rounded-xl
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
transition
"
/>
                <input
  type="date"
  value={rentStartDate}
  onChange={(e) => setRentStartDate(e.target.value)}
  className="
w-full
px-4
py-3
bg-white
text-gray-900
placeholder:text-gray-800
border border-gray-300
rounded-xl
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
transition
"
  required
/>
<input
  type="number"
  value={initialMeterReading}
  onChange={(e) => setInitialMeterReading(e.target.value)}
  placeholder="Initial Sub Meter Reading"
  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-black bg-white placeholder:text-gray-800"
  required
/>

<p className="font-bold text-sm text-gray-700">
  ⚡ Meter Photo
</p>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setMeterPhoto(e.target.files[0]);
    }
  }}
  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
/>

<p className="font-bold text-sm text-gray-700">
  🪪 Aadhaar Card
</p>
                <input
  type="file"
  accept="image/*,.pdf"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setAadhaarFile(e.target.files[0]);
    }
  }}
  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
/>
                <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl text-sm hover:bg-green-700 transition">+ Add Tenant</button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-extrabold text-slate-800 mb-5 flex items-center gap-2">
  <span className="text-yellow-500">⚡</span>
  Generate Monthly Bill
</h3>
              {billMessage && <div className="p-2 mb-3 bg-green-50 text-green-700 rounded-lg text-xs">{billMessage}</div>}
              <form onSubmit={handleGenerateBill} className="space-y-3">
                <select value={selectedTenantId} onChange={(e) => setSelectedTenantId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-black bg-white" required>
                  <option value="">Select Tenant</option>
                  {tenants.map(t => <option key={t._id} value={t._id}>{t.name} (Room {t.roomNumber})</option>)}
                </select>
                <input type="text" value={billingMonth} onChange={(e) => setBillingMonth(e.target.value)} placeholder="Month (e.g. June 2026)" className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm text-black bg-white placeholder:text-gray-800" required />

                {selectedTenantId && (
  <>
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        📅 Tenant Joined On
      </label>

      <input
        type="text"
        value={
          tenants.find(t => t._id === selectedTenantId)?.rentStartDate
            ? new Date(
                tenants.find(t => t._id === selectedTenantId)!.rentStartDate
              ).toLocaleDateString("en-IN")
            : ""
        }
        readOnly
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-black bg-white font-medium"
      />
    </div>

    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">
        💰 Rent Due Date
      </label>

      <input
        type="text"
        value={
          tenants.find(t => t._id === selectedTenantId)?.rentStartDate
            ? (() => {
                const tenant = tenants.find(
                  t => t._id === selectedTenantId
                );

                const start = new Date(tenant!.rentStartDate);
                const [m, y] = billingMonth.split(" ");
                const monthIndex = new Date(
                  Date.parse(m + " 1, " + y)
                ).getMonth();

                return new Date(
                  Number(y),
                  monthIndex,
                  start.getDate()
                ).toLocaleDateString("en-IN");
              })()
            : ""
        }
        readOnly
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-black bg-white font-medium"
      />
    </div>
  </>
)}

<input
  type="number"
  value={units}
  onChange={(e) => setUnits(e.target.value)}
  placeholder="Electricity Units Consumed"
  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-black bg-white placeholder:text-gray-800"
  required
/>

<input
  type="number"
  value={unitRate}
  onChange={(e) => setUnitRate(e.target.value)}
  placeholder="Rate Per Unit (₹)"
  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm text-black bg-white placeholder:text-gray-500"
  required
/>



<button
  type="submit"
  className="w-full py-3 bg-green-600 text-white font-bold rounded-xl text-lg hover:bg-green-700 transition"
>
  ⚡ Generate Bill
</button>
              </form>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">

  <div className="md:col-span-3 space-y-2">

    <h3 className="text-lg font-bold text-gray-800 mb-2">
      Active Maintenance Logs
    </h3>

    <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
      {complaints.map((c) => (
        <div
          key={c._id}
          className="flex justify-between items-center text-xs p-3 border rounded-xl bg-gray-50"
        >
          <div>
            <span className="font-bold bg-purple-100 text-purple-800 px-2 py-1 rounded mr-2">
              🏠 Room {c.roomNumber}
            </span>

            <div className="mt-2 font-semibold text-gray-800">
              🔧 {c.issueType}
            </div>

            <div className="text-gray-600 mt-1">
              {c.description}
            </div>
            <div className="text-xs text-gray-500 mt-2">
  📅 {new Date(c.createdAt).toLocaleString("en-IN")}
</div>
          </div>

          <div className="flex flex-col gap-2">

  <button
    onClick={() =>
      toggleComplaintStatus(
        c._id,
        c.status
      )
    }
    className={`px-3 py-1 rounded font-bold ${
      c.status === "Resolved"
        ? "bg-green-100 text-green-700"
        : "bg-amber-100 text-amber-700"
    }`}
  >
    {c.status === "Resolved"
      ? "✅ Fixed"
      : "⏳ Pending"}
  </button>

  <button
    onClick={() =>
      deleteComplaint(c._id)
    }
    className="px-3 py-1 rounded font-bold bg-red-100 text-red-700 hover:bg-red-200"
  >
    🗑 Delete
  </button>

</div>
        </div>
      ))}
    </div>

  </div>

</div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <div className="space-y-4 mb-4">

  <h3
  className="
  text-lg
  sm:text-xl
  md:text-2xl
  font-bold
  text-gray-800
  whitespace-nowrap
  "
>
  📋 Tenant Directory & Records
</h3>

  <div className="
flex
flex-col
md:flex-row
gap-2
w-full
lg:w-auto
items-stretch
md:items-center
">
<select
  value={exportYear}
  onChange={(e) =>
    setExportYear(e.target.value)
  }
  className="
w-full
md:w-40
px-4
py-2
border
border-gray-300
rounded-xl
bg-white
text-black
"
>
  <option value="">
    📅 Choose Year
  </option>

  {[
    ...new Set(
      tenants.flatMap(
        (tenant) =>
          tenant.bills?.map((bill) =>
            bill.month.split(" ")[1]
          ) || []
      )
    ),
  ].map((year) => (
    <option
      key={year}
      value={year}
    >
      {year}
    </option>
  ))}
</select>

    <select
      value={exportMonth}
      onChange={(e) =>
        setExportMonth(e.target.value)
      }
      className="
w-full
md:w-52
px-4
py-2
border
border-gray-300
rounded-xl
bg-white
text-black
focus:outline-none
focus:ring-2
focus:ring-green-500
"
    >
      <option value="">
  📅 Choose Month
</option>

{
  [
    ...new Set(
      tenants.flatMap(
        (tenant) =>
          tenant.bills
            ?.filter((bill) =>
              exportYear
                ? bill.month.endsWith(exportYear)
                : true
            )
            .map((bill) =>
              bill.month.split(" ")[0]
            ) || []
      )
    ),
  ].map((month) => (
    <option
      key={month}
      value={`${month} ${exportYear}`}
    >
      {month}
    </option>
  ))
}
    </select>

    <button
      onClick={handleExportExcel}
      className="
w-full
md:w-auto
px-4
py-2
bg-green-600
text-white
rounded-xl
font-bold
hover:bg-green-700
transition
whitespace-nowrap
"
    >
      📊 Export Payments
    </button>

    <input
      type="text"
      value={searchQuery}
      onChange={(e) =>
        setSearchQuery(e.target.value)
      }
      placeholder="🔍 Search Tenant..."
      className="
w-full
lg:w-72
lg:ml-auto
px-4
py-2
border
border-gray-300
rounded-xl
bg-white
text-black
"
    />
  </div>

</div>

            {filteredTenants.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No tenants found matching criteria.</p>
            ) : (
              <div
  className="
  space-y-4
  max-h-[70vh]
  overflow-y-auto
  pr-2
  scroll-smooth
"
>
                {filteredTenants.map((tenant) => (
                  
                  <div
key={tenant._id}
className="
p-4
border
rounded-xl
bg-gray-50
flex
flex-col
justify-between
overflow-hidden
"
>
                    <div className="flex flex-col md:flex-row justify-between items-start mb-2 border-b pb-2 gap-3">
                      <div>
                        <h4 className="text-2xl font-extrabold text-slate-800">
  👤 {tenant.name}
</h4>
                        <p className="text-xs text-gray-500">
  🪪 Aadhaar Document Uploaded
</p>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">

  <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
    <span className="block text-gray-500 text-xs">🏠 Room</span>
    <span className="font-bold text-gray-800">
      {tenant.roomNumber}
    </span>
  </div>

  <div className="bg-green-50 border border-green-100 rounded-lg px-3 py-2">
    <span className="block text-gray-500 text-xs">📞 Phone</span>
    <span className="font-bold text-gray-800">
      {tenant.phone}
    </span>
  </div>
  {
  editingTenant && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="
bg-white
p-6
rounded-2xl
w-full
max-w-md
space-y-3
max-h-[90vh]
overflow-y-auto
">

        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
  ✏️ Edit Tenant
</h2>

        <input
          value={editingTenant.name}
          onChange={(e) =>
            setEditingTenant({
              ...editingTenant,
              name: e.target.value,
            })
          }
          className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
        />

        <input
          value={editingTenant.phone}
          onChange={(e) =>
            setEditingTenant({
              ...editingTenant,
              phone: e.target.value,
            })
          }
          className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
        />

        <input
          value={editingTenant.roomNumber}
          onChange={(e) =>
            setEditingTenant({
              ...editingTenant,
              roomNumber: e.target.value,
            })
          }
          className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
        />

        <input
          value={editingTenant.rentAmount}
          onChange={(e) =>
            setEditingTenant({
              ...editingTenant,
              rentAmount: e.target.value,
            })
          }
          className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
        />
        <input
  type="number"
  value={editingTenant.advancePayment || ""}
  onChange={(e) =>
    setEditingTenant({
      ...editingTenant,
      advancePayment: e.target.value,
    })
  }
  className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
  placeholder="Advance Payment"
/>
        <input
  type="date"
  value={
    editingTenant.rentStartDate
      ? editingTenant.rentStartDate.slice(0,10)
      : ""
  }
  onChange={(e)=>
    setEditingTenant({
      ...editingTenant,
      rentStartDate:e.target.value
    })
  }
  className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
/>
<input
  type="number"
  value={
    editingTenant.initialMeterReading
  }
  onChange={(e)=>
    setEditingTenant({
      ...editingTenant,
      initialMeterReading:
      e.target.value
    })
  }
  className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
  placeholder="Initial Meter Reading"
/>
<p className="font-bold text-sm text-gray-800">
  🪪 Aadhaar Card
</p>

<input
  type="file"
  accept="image/*,.pdf"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setEditAadhaarFile(
        e.target.files[0]
      );
    }
  }}
  className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
/>

<p className="font-bold text-sm text-black">
  ⚡ Meter Photo
</p>

<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setEditMeterPhoto(
        e.target.files[0]
      );
    }
  }}
 className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
/>


        <div className="flex gap-2">

          <button
            onClick={handleEditTenant}
            className="flex-1 bg-green-600 text-white p-2 rounded"
          >
            Save
          </button>

          <button
            onClick={() =>
              setEditingTenant(null)
            }
            className="flex-1 bg-red-600 text-white p-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  )
}

{
  editingBill && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="
bg-white
p-6
rounded-2xl
w-full
max-w-md
space-y-3
max-h-[90vh]
overflow-y-auto
">

        <h2 className="text-2xl font-extrabold text-black mb-4">
  ✏️ Edit Bill
</h2>

        <input
          value={editingBill.rentAmount}
          onChange={(e) =>
            setEditingBill({
              ...editingBill,
              rentAmount: e.target.value,
            })
          }
          className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
        />

        <input
          value={editingBill.electricityAmount}
          onChange={(e) =>
            setEditingBill({
              ...editingBill,
              electricityAmount:
                e.target.value,
            })
          }
          className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
        />

        <input
          value={editingBill.totalAmount}
          onChange={(e) =>
            setEditingBill({
              ...editingBill,
              totalAmount:
                e.target.value,
            })
          }
          className="
w-full
p-3
rounded-xl
border
border-gray-300
bg-white
text-gray-900
placeholder:text-gray-600
shadow-sm
focus:outline-none
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
"
        />

        <div className="flex gap-2">

          <button
            onClick={handleEditBill}
            className="flex-1 bg-green-600 text-white p-2 rounded"
          >
            Save
          </button>

          <button
            onClick={() =>
              setEditingBill(null)
            }
            className="flex-1 bg-red-600 text-white p-2 rounded"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  )
}

  <div className="bg-yellow-50 border border-yellow-100 rounded-lg px-3 py-2">
    <span className="block text-gray-500 text-xs">
      💰 Monthly Rent
    </span>
    <span className="font-bold text-gray-800">
      ₹{tenant.rentAmount}
    </span>
  </div>

  <div className="bg-orange-50 border border-orange-100 rounded-lg px-3 py-2">
  <span className="block text-gray-500 text-xs">
    💰 Advance Payment
  </span>

  <span className="font-bold text-gray-800">
    ₹{tenant.advancePayment || 0}
  </span>
</div>

  <div className="bg-purple-50 border border-purple-100 rounded-lg px-3 py-2">
    <span className="block text-gray-500 text-xs">
      📅 Rent Start
    </span>
    <span className="font-bold text-gray-800">
      {tenant.rentStartDate
        ? new Date(
            tenant.rentStartDate
          ).toLocaleDateString("en-IN")
        : "Not Set"}
    </span>
  </div>

</div>

<div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
  <p className="text-sm font-bold text-yellow-800">
    ⚡ Initial Meter Reading
  </p>

  <p className="text-2xl font-extrabold text-yellow-900">
    {tenant.initialMeterReading}
  </p>
</div>

                        <div className="flex gap-3 mt-4 flex-wrap">

  {tenant.aadhaarCard && (
    <a
      href={tenant.aadhaarCard}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-2 min-w-[170px] bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition"
    >
      👁 View Aadhaar
    </a>
  )}

  {tenant.meterPhoto && (
    <a
      href={tenant.meterPhoto}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-2 min-w-[170px] bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition"
    >
      ⚡ View Meter Photo
    </a>
  )}

</div>
                      </div>
                      <button
  onClick={() =>
    setEditingTenant({
      ...tenant,
    })
  }
  className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl font-bold hover:bg-blue-100 transition mb-2"
>
  ✏ Edit Tenant
</button> 

  <button
  onClick={() => handleVacateTenant(tenant._id)}
  className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-100 transition"
>
  🚪 Vacate Room
</button>
                    </div>

                    {tenant.bills && tenant.bills.length > 0 ? (
                      <div className="mt-2 pl-2 border-l-2 border-blue-200 space-y-2">
                        {tenant.bills.map(b => (
                          <div key={b._id} className="flex flex-wrap gap-2 justify-between items-center text-xs text-gray-700 bg-white p-2 rounded border">
                            <span>🗓️ {b.month}</span>
                            {b.rentStartDate && (
  <span>
    Rent Start:
    {new Date(b.rentStartDate).toLocaleDateString("en-IN")}
  </span>
)}

{b.rentDueDate && (
  <span>
    Due:
    {new Date(b.rentDueDate).toLocaleDateString("en-IN")}
  </span>
)}
                            <span>Rent: ₹{b.rentAmount} | Power: ₹{b.electricityAmount}</span>
                            <span className="font-bold text-gray-900">Total: ₹{b.totalAmount}</span>
                            <button
  onClick={() =>
    setEditingBill({
      tenantId: tenant._id,
      ...b,
    })
  }
  className="px-3 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
>
  ✏ Edit Bill
</button>
                            <button onClick={() => handleUpdateStatus(tenant._id, b._id, b.status)} className={`px-3 py-1 rounded text-xs font-bold transition active:scale-95 cursor-pointer ${b.status === 'Paid' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}>
                              {b.status === 'Paid' ? '✅ Paid' : '⏳ Mark as Paid'}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic mt-1">No bills generated yet for this tenant.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
            )}

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4 text-black">
              🔒 Change Password
            </h2>

            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              className="w-full border p-3 rounded-xl mb-3 text-black"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className="w-full border p-3 rounded-xl mb-3 text-black"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border p-3 rounded-xl mb-4 text-black"
            />

            <div className="flex gap-2">

              <button
                onClick={handleChangePassword}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl"
              >
                Save Password
              </button>

              <button
                onClick={() =>
                  setShowPasswordModal(false)
                }
                className="flex-1 bg-red-600 text-white py-3 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}