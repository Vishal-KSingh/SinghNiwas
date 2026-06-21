"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

export default function PaymentSuccessPage() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [electricityAmount, setElectricityAmount] = useState("");

  useEffect(() => {
  console.log("tenantId:", localStorage.getItem("tenantId"));
  console.log("tenantData:", localStorage.getItem("tenantData"));
  console.log("currentBill:", localStorage.getItem("currentBill"));

  setAmount(localStorage.getItem("paymentAmount") || "");
  setMonth(localStorage.getItem("paymentMonth") || "");
  setPaymentDate(localStorage.getItem("paymentDate") || "");
  setPaymentMethod(localStorage.getItem("paymentMethod") || "");
  setElectricityAmount(
    localStorage.getItem("electricityAmount") || "0"
  );
}, []);

  const downloadReceipt = async () => {
  const doc = new jsPDF();

  const receiptNo =
    "SNPG-" +
    new Date().getFullYear() +
    Math.floor(100000 + Math.random() * 900000);

  const tenantData = JSON.parse(
    localStorage.getItem("tenantData") || "{}"
  );

  const tenantName = tenantData?.name || "Tenant";
  const roomNumber = tenantData?.roomNumber || "-";
const totalAmount =
  Number(amount || 0) +
  Number(electricityAmount || 0);
  // ===== HEADER =====

  doc.setFillColor(255, 106, 0);
doc.rect(0, 0, 210, 35, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");

  doc.text("SinghNiwas", 20, 18);

  doc.setFontSize(10);
  doc.text(
    "Smart Rental & Tenant Management System",
    20,
    25
  );

  // ===== RECEIPT TITLE =====

  doc.setTextColor(0, 0, 0);

  doc.setFontSize(22);
  doc.text("PAYMENT RECEIPT", 105, 50, {
    align: "center",
  });

  // ===== STATUS =====

  doc.setFillColor(220, 252, 231);
  doc.roundedRect(140, 60, 50, 18, 3, 3, "F");

  doc.setTextColor(22, 163, 74);
  doc.setFontSize(12);

  doc.text("PAID", 165, 71, {
    align: "center",
  });

  // ===== RECEIPT INFO =====

  doc.setTextColor(0, 0, 0);

  doc.setFontSize(11);

  doc.text(`Receipt No : ${receiptNo}`, 20, 70);

  doc.text(
    `Date : ${
      paymentDate
        ? new Date(paymentDate).toLocaleDateString("en-IN")
        : "-"
    }`,
    20,
    78
  );

  // ===== TENANT TABLE =====

  autoTable(doc, {
    startY: 90,
    head: [["Tenant Information", "Details"]],
    body: [
      ["Tenant Name", tenantName],
      ["Room Number", roomNumber],
    ],
    theme: "grid",
  });

  // ===== PAYMENT TABLE =====

  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [["Payment Information", "Details"]],
    body: [
      ["Billing Month", month],
  ["Rent Amount", `Rs ${amount}`],
  ["Electricity Bill", `Rs ${electricityAmount}`],
  ["Total Amount", `Rs ${totalAmount}`],
  ["Payment Method", paymentMethod],
      [
        "Payment Date",
        paymentDate
          ? new Date(paymentDate).toLocaleDateString(
              "en-IN"
            )
          : "-",
      ],
    ],
    theme: "grid",
  });

  // ===== QR CODE =====

  const qrText = `
Receipt No: ${receiptNo}
Amount: ₹${amount}
Month: ${month}
Method: ${paymentMethod}
`;

  const qrCodeData = await QRCode.toDataURL(qrText);

  doc.addImage(qrCodeData, "PNG", 145, 180, 40, 40);

  doc.setFontSize(10);

  doc.text(
    "Scan to verify receipt",
    165,
    225,
    {
      align: "center",
    }
  );

  // ===== FOOTER =====

  doc.setFillColor(107, 114, 128);
doc.rect(0, 270, 210, 27, "F");

  doc.setTextColor(255, 255, 255);

  doc.setFontSize(10);

  doc.text(
    "Phone : +91 7091678886",
    105,
    278,
    {
      align: "center",
    }
  );

  doc.text(
    "Isuapur Market, Near Bela Road, KYP, Isuapur, Saran, Bihar - 841411",
    105,
    285,
    {
      align: "center",
    }
  );

  doc.save(
    `SinghNiwas-Receipt-${month}.pdf`
  );
};
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

        <div className="mt-8 bg-gray-50 rounded-2xl p-5 text-left space-y-3 text-gray-800">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount</span>
            <span className="font-bold text-black">₹{amount}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Month</span>
            <span className="font-bold text-black">{month}</span>
          </div>

          <div className="flex justify-between">
           <span className="text-gray-600">Method</span>
            <span className="font-bold text-black uppercase">
  {paymentMethod}
</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Date</span>
            <span className="font-bold text-black">
  {paymentDate
    ? new Date(paymentDate).toLocaleDateString("en-IN")
    : "-"}
</span>
          </div>
        </div>

        <button
  onClick={downloadReceipt}
  className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-800"
>
  📄 Download Receipt PDF
</button>
        console.log(
  "Before Success Redirect",
  localStorage.getItem("tenantId")
);

console.log(
  "Before Success Redirect tenantData",
  localStorage.getItem("tenantData")
);
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