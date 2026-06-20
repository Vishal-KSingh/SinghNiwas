export default function TenantPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Tenant Route Working</h1>
      <p>ID: {params.id}</p>
    </div>
  );
}