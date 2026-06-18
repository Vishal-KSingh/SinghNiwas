'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'none' | 'upi' | 'card' | 'netbanking'>('none');
  const [timeLeft, setTimeLeft] = useState(120); // 2 min timer
  const [isProcessing, setIsProcessing] = useState(false);

  const upiId = "7091678886@pthdfc";
  const [bill, setBill] = useState<any>(null);

useEffect(() => {
  const savedBill = localStorage.getItem("currentBill");

  if (savedBill) {
    setBill(JSON.parse(savedBill));
  }
}, []);

const totalAmount = bill?.totalAmount || 0;
const rentAmount = bill?.rentAmount || 0;
const electricityAmount = bill?.electricityAmount || 0; 


  // Countdown Timer Logic
  useEffect(() => {
    if (paymentMethod === 'none' || isProcessing) return;

    if (timeLeft === 0) {
      alert("Payment session expired! Kripya dobara koshish karein.");
      router.push('/tenants');
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, paymentMethod, isProcessing, router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Dummy Payment Processor Handler
  const handleDummyPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // 3 seconds ka fake banking processing load time
    setTimeout(async () => {
  setIsProcessing(false);

  localStorage.setItem("paymentStatus", "paid");

  const bill = JSON.parse(
    localStorage.getItem("currentBill") || "{}"
  );

  const tenantId = localStorage.getItem("tenantId");

  if (tenantId && bill._id) {
    await fetch("/api/bills/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenantId: tenantId,
        billId: bill._id,
        newStatus: "Paid",
      }),
    });
  }

  localStorage.setItem(
  "paymentAmount",
  bill.totalAmount || ""
);

localStorage.setItem(
  "paymentMonth",
  bill.month || ""
);

localStorage.setItem(
  "paymentDate",
  new Date().toISOString()
);

localStorage.setItem(
  "paymentMethod",
  paymentMethod
);

router.push("/tenants/payment/success");
}, 3000);
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-gray-100 text-center relative overflow-hidden">
        
        {/* PROCESSING / LOADING OVERLAY */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center p-6 animate-fadeIn">
            <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-100 rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-bold text-gray-800">Processing Payment...</h3>
            <p className="text-xs text-gray-400 mt-1">Please do not refresh or close this window.</p>
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-5 mb-6 text-left">

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
          </div>
        )}

        {paymentMethod === 'none' && (
          /* ================= SECTION 1: MAIN OPTIONS LIST ================= */
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Payment</h2>
            <p className="text-gray-500 text-sm mb-8">Choose your preferred method to pay ₹{totalAmount}</p>
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-5 mb-6 text-left">

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
            
            <div className="space-y-4">
              {/* UPI */}
              <button 
                onClick={() => { setPaymentMethod('upi'); setTimeLeft(120); }}
                className="w-full py-4 border-2 border-blue-100 bg-blue-50 rounded-2xl flex items-center justify-center gap-3 hover:border-blue-500 transition font-bold text-blue-800"
              >
                📱 Pay via UPI
              </button>

              {/* CARD */}
              <button 
                onClick={() => { setPaymentMethod('card'); setTimeLeft(120); }}
                className="w-full py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition text-gray-700 font-medium"
              >
                💳 Credit / Debit Card
              </button>

              {/* NET BANKING */}
              <button 
                onClick={() => { setPaymentMethod('netbanking'); setTimeLeft(120); }}
                className="w-full py-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition text-gray-700 font-medium"
              >
                🏦 Net Banking
              </button>
            </div>

            <button 
              onClick={() => router.back()} 
              className="mt-8 w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition"
            >
              ← Go Back to Dashboard
            </button>
          </>
        )}

        {paymentMethod === 'upi' && (
          /* ================= SECTION 2: UPI QR CODE DISPLAY ================= */
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Scan & Pay</h2>
            <p className="text-xl font-extrabold text-green-600 mb-2">₹{totalAmount}</p>

            <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-red-100">
              ⏱️ Session expires in: <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 mb-4 flex flex-col items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=${upiId}&pn=VISHAL%20KUMAR%20SINGH&am=${totalAmount}&cu=INR`)}`}
                alt="UPI QR Code" 
                className="w-48 h-48 object-contain rounded-lg shadow-sm"
              />
              <p className="text-[11px] text-gray-400 mt-2">Scan using GPay, PhonePe, Paytm or any UPI App</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl border border-dashed text-left mb-6">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">UPI ID</p>
              <p className="text-sm font-mono font-bold text-gray-700 select-all mt-0.5">{upiId}</p>
            </div>

            <div className="space-y-2">
              <button
  onClick={() => {
    const bill = JSON.parse(
      localStorage.getItem("currentBill") || "{}"
    );

    localStorage.setItem(
      "paymentStatus",
      "paid"
    );

    localStorage.setItem(
      "paymentAmount",
      bill.totalAmount || ""
    );

    localStorage.setItem(
      "paymentMonth",
      bill.month || ""
    );

    localStorage.setItem(
      "paymentDate",
      new Date().toISOString()
    );

    localStorage.setItem(
      "paymentMethod",
      "UPI"
    );

    router.push(
      "/tenants/payment/success"
    );
  }}
  className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
>
  ✅ Paid Successfully
</button>
              <button onClick={() => setPaymentMethod('none')} className="w-full py-2 text-sm text-gray-500 hover:underline">
                ← Change Payment Method
              </button>
            </div>
          </>
        )}

        {paymentMethod === 'card' && (
          /* ================= SECTION 3: CREDIT / DEBIT CARD FORM ================= */
          <form onSubmit={handleDummyPayment} className="text-left">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Card Details</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Pay securely ₹{totalAmount} using card</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Card Number</label>
                <input type="text" placeholder="1234 5678 9101 1121" maxLength={19} className="w-full p-3 border rounded-xl font-mono text-sm focus:outline-blue-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" maxLength={5} className="w-full p-3 border rounded-xl font-mono text-sm focus:outline-blue-500 text-center" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">CVV</label>
                  <input type="password" placeholder="***" maxLength={3} className="w-full p-3 border rounded-xl font-mono text-sm focus:outline-blue-500 text-center" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Card Holder Name</label>
                <input type="text" placeholder="Name on Card" className="w-full p-3 border rounded-xl text-sm focus:outline-blue-500" required />
              </div>
            </div>

            <button type="submit" className="w-full mt-6 py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition text-center">
              🔒 Pay ₹{totalAmount} Now
            </button>
            <button type="button" onClick={() => setPaymentMethod('none')} className="w-full mt-3 text-center text-sm text-gray-500 hover:underline">
              ← Back
            </button>
          </form>
        )}

        {paymentMethod === 'netbanking' && (
          /* ================= SECTION 4: NET BANKING LIST ================= */
          <form onSubmit={handleDummyPayment}>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Net Banking</h2>
            <p className="text-sm text-gray-500 mb-6">Select your bank to pay ₹{totalAmount}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {['SBI', 'HDFC', 'ICICI', 'AXIS', 'KOTAK', 'PNB'].map((bank) => (
                <label key={bank} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 font-semibold text-sm text-gray-700">
                  <input type="radio" name="bank" required className="accent-blue-600" />
                  {bank}
                </label>
              ))}
            </div>

            <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition">
              🏦 Proceed to Bank Login
            </button>
            <button type="button" onClick={() => setPaymentMethod('none')} className="w-full mt-3 text-sm text-gray-500 hover:underline">
              ← Back
            </button>
          </form>
        )}

      </div>
      <p className="mt-8 text-xs text-gray-400">Secured by SinghNiwas Payments</p>
    </div>
  );
}