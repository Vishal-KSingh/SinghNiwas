"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    setAmount(localStorage.getItem("paymentAmount") || "");
    setMonth(localStorage.getItem("paymentMonth") || "");
    setPaymentDate(localStorage.getItem("paymentDate") || "");
    setPaymentMethod(localStorage.getItem("paymentMethod") || "");
  }, []);

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl font-extrabold text-green-700">
          Payment Successful
        </h1>

        <p className="text-gray-500 mt-2">
          Your payment has been received.
        </p>

        <div className="mt-8 bg-gray-50 rounded-2xl p-5 text-left space-y-3">
          <div className="flex justify-between">
            <span>Amount</span>
            <span className="font-bold">₹{amount}</span>
          </div>

          <div className="flex justify-between">
            <span>Month</span>
            <span className="font-bold">{month}</span>
          </div>

          <div className="flex justify-between">
            <span>Method</span>
            <span className="font-bold uppercase">{paymentMethod}</span>
          </div>

          <div className="flex justify-between">
            <span>Date</span>
            <span className="font-bold">
              {paymentDate
                ? new Date(paymentDate).toLocaleDateString("en-IN")
                : "-"}
            </span>
          </div>
        </div>

        <button
          onClick={() => router.push("/tenants")}
          className="w-full mt-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}