"use client";

import { useEffect, useState } from "react";

export default function PublicPaymentPage({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) {
  const [tenant, setTenant] = useState<any>(null);
  const [unpaidBill, setUnpaidBill] = useState<any>(null);

  useEffect(() => {
    const loadTenant = async () => {
      try {
        const { tenantId } = await params;

        const res = await fetch(
          `/api/tenants/${tenantId}`
        );

        const data = await res.json();

        setTenant(data);

        const bill = data.bills?.find(
          (b: any) => b.status === "Unpaid"
        );

        setUnpaidBill(bill);
      } catch (error) {
        console.error(error);
      }
    };

    loadTenant();
  }, [params]);

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!unpaidBill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl">
          <h1 className="text-2xl font-bold text-green-600">
            ✅ No Pending Bills
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center mb-6">
          🏠 SinghNiwas
        </h1>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Tenant</span>
            <span className="font-bold">
              {tenant.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Room</span>
            <span className="font-bold">
              {tenant.roomNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Month</span>
            <span className="font-bold">
              {unpaidBill.month}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Rent</span>
            <span className="font-bold">
              ₹{unpaidBill.rentAmount}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Electricity</span>
            <span className="font-bold">
              ₹{unpaidBill.electricityAmount}
            </span>
          </div>

          <hr />

          <div className="flex justify-between text-xl">
            <span className="font-bold">
              Total Amount
            </span>

            <span className="font-bold text-red-600">
              ₹{unpaidBill.totalAmount}
            </span>
          </div>

        </div>

        <button
          className="w-full mt-8 py-4 bg-blue-600 text-white rounded-xl font-bold"
        >
          💳 Pay Now
        </button>

      </div>

    </div>
  );
}