'use client';

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function InvoicePage() {
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("invoiceData");
    if (data) setInvoice(JSON.parse(data));
  }, []);

  const downloadPDF = () => {
    
    if (!invoice) return;

    const pdf = new jsPDF();

    pdf.setFillColor(255, 140, 0);
pdf.rect(0, 0, 210, 42, "F");

pdf.setTextColor(255, 255, 255);

pdf.setFontSize(24);
pdf.setFont("helvetica", "bold");
pdf.text("SINGH NIWAS", 105, 14, { align: "center" });

pdf.setFontSize(10);
pdf.setFont("helvetica", "normal");
pdf.text(
  "Smart Rental & Tenant Management System",
  105,
  22,
  { align: "center" }
);

pdf.text(
  "Phone : +91 7091678886",
  105,
  28,
  { align: "center" }
);

pdf.text(
  "Isuapur Market, Near Bela Road,",
  105,
  34,
  { align: "center" }
);

pdf.text(
  "KYP, Isuapur, Saran, Bihar - 841411",
  105,
  39,
  { align: "center" }
);

pdf.setTextColor(0,0,0);

    pdf.setTextColor(0, 102, 204);
pdf.setFontSize(24);
pdf.setFont("helvetica", "bold");

pdf.setFontSize(22);
pdf.setFont("helvetica", "bold");
pdf.setTextColor(0,102,204);

pdf.text(
  "PAYMENT INVOICE",
  105,
  55,
  { align: "center" }
);

pdf.setTextColor(0,0,0);

pdf.setTextColor(0, 0, 0);

    pdf.setFontSize(12);
pdf.setFont("helvetica","bold");

pdf.text(
  `Invoice No: INV-${Date.now()}`,
  20,
  70
);

const invoiceDate = new Date().toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

pdf.text(
  `Invoice Date: ${invoiceDate}`,
  20,
  85
);

pdf.line(20,90,190,90);
pdf.setDrawColor(180);
pdf.roundedRect(15,95,180,58,3,3);

pdf.setFontSize(12);
pdf.setFont("helvetica","bold");

pdf.text("Tenant Name",20,108);
pdf.text(`${invoice.tenantName}`,95,108);

pdf.text("Room Number",20,120);
pdf.text(`${invoice.roomNumber}`,95,120);

pdf.text("Bill Month",20,132);
pdf.text(`${invoice.month}`,95,132);

pdf.text("Payment Method",20,144);
pdf.text(`${invoice.paymentMethod || "Online"}`,95,144);

pdf.roundedRect(15,162,180,42,3,3);
pdf.text(
  `Room Rent : ${invoice.rentAmount || 0}`,
  20,
  174
);

pdf.text(
  `Electricity Usage : ${invoice.electricityAmount || 0}`,
  20,
  186
);

pdf.setFontSize(16);
pdf.text(
  `TOTAL AMOUNT : ${invoice.totalAmount || 0}`,
  20,
  200
);
    pdf.setFontSize(12);

pdf.setTextColor(
  255,
  255,
  255
);

pdf.setTextColor(
  0,
  0,
  0
);
pdf.roundedRect(15,210,180,24,3,3);

pdf.setFontSize(12);

pdf.text(
  `Receipt No : SNPG-${Date.now()}`,
  20,
  218
);

pdf.text(
  "Transaction ID : TXN-7845123698",
  20,
  227
);
pdf.setFillColor(30,41,59);
pdf.rect(0,255,210,42,"F");

pdf.setTextColor(255,255,255);

pdf.setFontSize(12);
pdf.text(
  "Thank you for staying with Singh Niwas",
  105,
  268,
  { align:"center" }
);

pdf.setFontSize(9);

pdf.text(
  "This is a computer generated invoice.",
  105,
  277,
  { align:"center" }
);

pdf.text(
  "No signature required.",
  105,
  285,
  { align:"center" }
);
pdf.setTextColor(0,0,0);

pdf.setFillColor(30, 41, 59);
pdf.rect(0, 255, 210, 42, "F");

pdf.setTextColor(255, 255, 255);

pdf.setFont("helvetica", "bold");
pdf.setFontSize(12);
pdf.text(
  "Thank you for staying with Singh Niwas",
  105,
  270,
  { align: "center" }
);

pdf.setFontSize(10);
pdf.text(
  "This is a computer generated invoice.",
  105,
  280,
  { align: "center" }
);

pdf.text(
  "No signature required.",
  105,
  289,
  { align: "center" }
);

pdf.setTextColor(0, 0, 0);
    pdf.save(`Singh-Niwas-Invoice-${invoice.month || "Invoice"}.pdf`);
  };

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Invoice...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div
  id="invoice-area"
  className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8"
>
       <div className="bg-orange-500 text-white rounded-2xl p-4 text-center">
  <h1 className="text-4xl font-extrabold">
    🏠 SINGH NIWAS
  </h1>

  <p className="mt-2">
    Premium PG Management System
  </p>

  <p className="mt-2 text-sm">
    📞 +91 7091678886
  </p>

  <p className="text-sm">
    📍 Isuapur Market, Near Bela Road,
    KYP, Isuapur, Saran, Bihar - 841411
  </p>
</div>
  <h2 className="text-3xl font-bold text-center mt-8 mb-8 text-blue-700">
  PAYMENT INVOICE
</h2>
<div className="mt-8 bg-white border border-gray-200 rounded-3xl shadow-lg p-8">

  <div className="flex justify-between items-center py-5 border-b border-gray-200">
    <div className="flex items-center gap-3 text-gray-600 font-semibold text-xl">
      <span>👤</span>
      <span>Tenant</span>
    </div>

    <div className="text-2xl font-bold text-gray-900">
      {invoice.tenantName}
    </div>
  </div>

  <div className="flex justify-between items-center py-5 border-b border-gray-200">
    <div className="flex items-center gap-3 text-gray-600 font-semibold text-xl">
      <span>🏠</span>
      <span>Room</span>
    </div>

    <div className="text-2xl font-bold text-gray-900">
      {invoice.roomNumber}
    </div>
  </div>

  <div className="flex justify-between items-center py-5 border-b border-gray-200">
    <div className="flex items-center gap-3 text-gray-600 font-semibold text-xl">
      <span>📅</span>
      <span>Month</span>
    </div>

    <div className="text-2xl font-bold text-gray-900">
      {invoice.month}
    </div>
  </div>

  <div className="flex justify-between items-center py-5 border-b border-gray-200">
    <div className="flex items-center gap-3 text-gray-600 font-semibold text-xl">
      <span>💳</span>
      <span>Payment</span>
    </div>

    <div className="text-2xl font-bold text-green-600">
      {invoice.paymentMethod || "Online"}
    </div>
  </div>

  <div className="flex justify-between items-center py-5">
    <div className="flex items-center gap-3 text-red-600 font-bold text-2xl">
      <span>💰</span>
      <span>Total</span>
    </div>

    <div className="text-4xl font-extrabold text-red-600">
      ₹{invoice.totalAmount}
    </div>
  </div>

</div>
       <hr className="my-8 border-gray-300" />
        <div className="flex gap-4 justify-center mt-10">
          <button
            onClick={downloadPDF}
            className="px-8 py-4 bg-green-600 text-white rounded-2xl font-bold">
            📄 Download PDF
          </button>
          
        </div>
      </div>
    </div>
  );
}
