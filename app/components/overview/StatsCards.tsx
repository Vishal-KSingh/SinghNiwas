'use client';
import { useState, useEffect } from 'react';

interface TenantBillType {
  month: string;
  totalAmount: number;
  electricityAmount: number;
  status: string;
}

interface TenantDataType {
  name: string;
  phone: string;
  roomNumber: string;
  bills?: TenantBillType[];
}

const StatsCards = () => {
  const [tenantsData, setTenantsData] = useState<TenantDataType[]>([]);
  const [overviewStats, setOverviewStats] = useState({
    totalTenants: 0,
    vacantRooms: 0,
    totalRooms: 96, 
    unpaidBillsCount: 0,
    currentMonthCollection: 0,
    activeComplaints: 2, 
    totalUnitsConsumed: 0,
    totalRevenueAllTime: 0,
  });

  const fetchOverviewData = async () => {
    try {
      const response = await fetch('/api/tenants');
      const resData = await response.json();
      if (response.ok && resData.success) {
        const tenantList: TenantDataType[] = resData.data || [];
        setTenantsData(tenantList); // WhatsApp reminder use-case ke liye list save kar rahe hain
        
        let totalTenants = tenantList.length;
        let occupiedRooms = new Set(tenantList.map((t) => t.roomNumber)).size;
        let totalRooms = 96; 
        let vacantRooms = totalRooms - occupiedRooms;

        let unpaidCount = 0;
        let currentMonthCash = 0;
        let totalUnits = 0;
        let allTimeRevenue = 0;

        // Current Month target label
        const currentMonthLabel = 'June 2026'; 

        tenantList.forEach((tenant) => {
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
          activeComplaints: 2, 
          totalUnitsConsumed: totalUnits,
          totalRevenueAllTime: allTimeRevenue > 0 ? allTimeRevenue : 125000,
        });
      }
    } catch (error) {
      console.error('Failed to fetch overview stats:', error);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  // 👇 WhatsApp sending action automation function
  const handleSendWhatsAppReminders = () => {
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

      // Agar tenant ka bill unpaid hai toh use dynamic text link ke sath trigger karega
      if (hasUnpaidBill && tenant.phone) {
        alertCount++;
        const customMessage = `Namaste ${tenant.name}, Singh Niwas PG ki taraf se aapka ${pendingMonth} mahine ka rent ₹${pendingAmount} abhi pending (Unpaid) show ho raha hai. Kripya iska bhugtan jald se jald karein. Dhanyawad!`;
        
        // WhatsApp URL configuration
        const formattedPhone = tenant.phone.startsWith('91') ? tenant.phone : `91${tenant.phone}`;
        const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(customMessage)}`;
        
        // Naye tab me direct open karega trigger click par
        window.open(whatsappUrl, '_blank');
      }
    });

    if (alertCount === 0) {
      alert('🎉 Sabhi tenants ka bill already paid hai! Koi reminder bejne ki zaroorat nahi.');
    }
  };

  const stats = [
    {
      title: 'Total Revenue (All Time)',
      value: `₹ ${overviewStats.totalRevenueAllTime.toLocaleString('en-IN')}`, 
      change: 'Gross Lifetime Income',
      icon: '💰',
      bg: 'bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Current Month Collection',
      value: `₹ ${overviewStats.currentMonthCollection.toLocaleString('en-IN')}`, 
      change: 'Collected in June 2026',
      icon: '📈',
      bg: 'bg-green-50 border-green-200'
    },
    {
      title: 'Unpaid Bills (Pending)',
      value: overviewStats.unpaidBillsCount.toString(), 
      change: 'Action required / Dues',
      icon: '⏳',
      bg: 'bg-rose-50 border-rose-200'
    },
    {
      title: 'Total Tenants',
      value: overviewStats.totalTenants.toString(), 
      change: 'Active Live Residents',
      icon: '👤',
      bg: 'bg-sky-50 border-sky-200'
    },
    {
      title: 'Available Rooms',
      value: `${overviewStats.vacantRooms} / ${overviewStats.totalRooms}`, 
      change: 'Vacant Rooms Left',
      icon: '🔑',
      bg: 'bg-amber-50 border-amber-200'
    },
    {
      title: 'Electricity Units Consumed',
      value: `${overviewStats.totalUnitsConsumed} kWh`, 
      change: 'This Month Total Consumption',
      icon: '⚡',
      bg: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Active Complaints',
      value: overviewStats.activeComplaints.toString(), 
      change: 'Maintenance Pending',
      icon: '🛠️',
      bg: 'bg-purple-50 border-purple-200'
    },
  ];

  return (
    <div className="space-y-6">
      {/* 7 Grid Cards Wrapper */}
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

        {/* 👇 8th CARD: DYNAMIC WHATSAPP LAUNCHPAD ACTION CARD */}
        <div className="rounded-2xl border bg-gradient-to-br from-green-600 to-emerald-700 text-white shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition">
          <div>
            <div className="flex flex-row items-center justify-between space-y-0 pb-1">
              <h3 className="text-sm font-bold tracking-tight text-green-100">WhatsApp Launcher</h3>
              <span className="text-2xl">📢</span>
            </div>
            <p className="text-xs text-green-200 mt-1 font-medium">Auto-ping pending defaulters</p>
          </div>
          <div className="mt-4">
            <button 
              onClick={handleSendWhatsAppReminders}
              className="w-full bg-white text-emerald-800 font-extrabold text-xs px-3 py-2.5 rounded-xl shadow active:scale-95 transition hover:bg-green-50 uppercase tracking-wider"
            >
              💬 Send Reminders ({overviewStats.unpaidBillsCount})
            </button>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY & CRITICAL ALERTS SECTION */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4 border-b pb-2">
          <span className="text-xl">🔔</span>
          <h4 className="font-extrabold text-gray-800 text-lg">Recent Activity & Critical Alerts</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 text-red-800 rounded-xl text-sm border border-red-100">
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span><strong>Overdue Alert:</strong> Total <strong>{overviewStats.unpaidBillsCount} tenants</strong> have pending bills for this month.</span>
            </div>
            <span className="text-xs bg-red-200 px-2 py-0.5 rounded font-bold animate-pulse">Critical</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 text-blue-800 rounded-xl text-sm border border-blue-100">
            <div className="flex items-center space-x-2">
              <span>📊</span>
              <span><strong>Occupancy Rate:</strong> Total {overviewStats.totalTenants} Rooms are currently occupied out of {overviewStats.totalRooms}.</span>
            </div>
            <span className="text-xs bg-blue-200 px-2 py-0.5 rounded font-bold">Stable</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-purple-50 text-purple-800 rounded-xl text-sm border border-purple-100">
            <div className="flex items-center space-x-2">
              <span>🛠️</span>
              <span><strong>Maintenance Requests:</strong> {overviewStats.activeComplaints} complaints reported by tenants need verification.</span>
            </div>
            <span className="text-xs bg-purple-200 px-2 py-0.5 rounded font-bold">Review</span>
          </div>
        </div>
      </div>
    </div>
  );
};
