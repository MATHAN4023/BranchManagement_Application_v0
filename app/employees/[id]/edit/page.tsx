import EditEmployeeForm from "@/components/employees/EditEmployeeForm"

async function getEmployee(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/employees/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch employee');
  return res.json();
}

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  const employee = await getEmployee(params.id);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Employee</h1>
      <EditEmployeeForm employee={employee} />
    </div>
  )
} 