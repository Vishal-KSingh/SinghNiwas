'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

export default function PaymentPage() {
  const router = useRouter();

  const [bill, setBill] = useState<any>(null);

  useEffect(() => {
    const savedBill = localStorage.getItem('currentBill');

    if (savedBill) {
      setBill(JSON.parse(savedBill));
    }
  }, []);

  const totalAmount = bill?.totalAmount || 0;
  const rentAmount = bill?.rentAmount || 0;
  const electricityAmount = bill?.electricityAmount || 0;

  const handleRazorpayPayment = async () => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert('Razorpay SDK failed to load');
      return;
    }

    try {
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      });

      const order = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: 'SinghNiwas',
        description: 'Rent Payment',

        handler: async function (response: any) {
          localStorage.setItem('paymentStatus', 'paid');

          const currentBill = JSON.parse(
            localStorage.getItem('currentBill') || '{}'
          );

          const tenantId =
            localStorage.getItem('tenantId');

          if (tenantId && currentBill._id) {
  const updateRes = await fetch('/api/tenants/bill/update-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        tenantId,
        billId: currentBill._id,
        newStatus: 'Paid',
        paymentId:
          response.razorpay_payment_id,
      }),
    }
  );
  currentBill.status = "Paid";

localStorage.setItem(
  "currentBill",
  JSON.stringify(currentBill)
);

console.log("tenantId:", tenantId);
console.log("billId:", currentBill._id);
  const updateData = await updateRes.json();

console.log("UPDATE RESPONSE:", updateData);

if (updateData.success) {
  console.log("UPDATE SUCCESS");
}
}
          localStorage.setItem(
            'paymentAmount',
            currentBill.totalAmount || ''
          );

          localStorage.setItem(
            'paymentMonth',
            currentBill.month || ''
          );

          localStorage.setItem(
            'paymentDate',
            new Date().toISOString()
          );

          localStorage.setItem(
            'paymentMethod',
            'Razorpay'
          );
          
          console.log(
  "Before Success Redirect",
  localStorage.getItem("tenantId")
);

console.log(
  "Before Success Redirect tenantData",
  localStorage.getItem("tenantData")
);

router.push('/tenants/payment/success');
        },

        theme: {
          color: '#2563eb',
        },
      };

      const paymentObject =
        new window.Razorpay(options);

      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-gray-100">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Select Payment
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Choose your preferred method to pay ₹{totalAmount}
        </p>

        <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-5 mb-6">

          <p className="text-green-100 text-sm">
            Current Bill
          </p>

          <h3 className="text-3xl font-extrabold mt-1">
            ₹{totalAmount}
          </h3>

          <div className="grid grid-cols-2 gap-4 mt-4">

            <div>
              <p className="text-green-100 text-xs">
                🏠 Rent
              </p>

              <p className="font-bold">
                ₹{rentAmount}
              </p>
            </div>

            <div>
              <p className="text-green-100 text-xs">
                ⚡ Electricity
              </p>

              <p className="font-bold">
                ₹{electricityAmount}
              </p>
            </div>

          </div>
        </div>

        <button
          onClick={handleRazorpayPayment}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
        >
          💳 Pay with Razorpay
        </button>

        <button
  onClick={() => {
  console.log(
    "tenantId:",
    localStorage.getItem("tenantId")
  );

  console.log(
    "tenantData:",
    localStorage.getItem("tenantData")
  );

  router.push("/tenants");
}}
  className="mt-4 w-full flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition"
>
  <span>🏠</span>
  Back to Dashboard
</button>

      </div>
    </div>
  );
}