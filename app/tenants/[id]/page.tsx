export const dynamic = "force-dynamic";
import connectDB from "@/lib/mongodb";
import Tenant from "@/models/Tenant";

export default async function TenantPage({
  params,
}: {
  params: { id: string };
}) {
  await connectDB();

  const tenant = await Tenant.findById(params.id);

  if (!tenant) {
    return <div>Tenant Not Found</div>;
  }

  const unpaidBills =
    tenant.bills?.filter(
      (bill: any) => bill.status === "Unpaid"
    ) || [];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold">
        {tenant.name}
      </h1>

      <p>Room: {tenant.roomNumber}</p>

      <div className="mt-6">
        {unpaidBills.map((bill: any) => (
          <div
            key={bill._id}
            className="border p-4 rounded mb-3"
          >
            <p>Month: {bill.month}</p>
            <p>Amount: ₹{bill.totalAmount}</p>
            <p>Status: {bill.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}