import {
  LoaderCircle,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";

export default function EmployeeTable({
  employees,
  loading,
  companies,
  onEdit,
  onDelete,
}) {
  const getCompanyName = (
    companyId
  ) => {
    
    const company =
      companies.find(
        (c) =>
          String(c.id) ===
          String(companyId)
      );

    return (
      company?.companyName ||
      "-"
    );
  };

  const getGrossSalary = (
    employee
  ) => {
    const earnings =
      employee.earning || [];

    return Object.values(earnings).reduce((sum, value) => sum + (Number(value) || 0),0 );
  };

  const getTotalDeduction = (
    employee
  ) => {
    const deductions =
      employee.deduction || [];

    return Object.values(deductions).reduce((sum, value) => sum + (Number(value) || 0),0 )
  };

  const getNetSalary = (
    employee
  ) => {
    return (
      getGrossSalary(
        employee
      ) -
      getTotalDeduction(
        employee
      )
    );
  };

  if (
    employees.length === 0
  ) {
    return (
      <div className="bg-white rounded-2xl shadow p-16 text-center">
        <Users
          size={70}
          className="mx-auto text-slate-400 mb-4"
        />

        <h2 className="text-xl font-semibold mb-2">
          No Employees Found
        </h2>

        <p className="text-slate-500">
          Click on Add Employee
          to create your first
          employee.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">

          {/* Header */}
          <thead>
            <tr className="bg-slate-100 text-left">
              <th className="p-4">
                Employee ID
              </th>

              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Company
              </th>

              <th className="p-4">
                Department
              </th>

              <th className="p-4">
                Designation
              </th>

              <th className="p-4">
                Gross Salary
              </th>

              <th className="p-4">
                Deductions
              </th>

              <th className="p-4">
                Net Salary
              </th>

              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

             {loading && ( 
           
                    <tr>
                     <td colSpan={8}  className="p-4 ">
                         <div className="flex flex-col">
                         <LoaderCircle size={30} className="animate-spin mx-auto" />
                         <span className="ml-2 text-center">Loading...</span>
                         </div>
                     </td>
                   </tr>
                    )} 
          {/* Body */}
          <tbody>



            {employees.map(
              (employee) => (
                <tr
                  key={
                    employee.id
                  }
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4 font-medium">
                    {
                      employee.empId
                    }
                  </td>

                  <td className="p-4">
                    {
                      employee.firstName
                    }{" "}
                    {
                      employee.lastName
                    }
                  </td>

                  <td className="p-4">
                    {getCompanyName(
                      employee.company_id
                    )}
                  </td>

                  <td className="p-4">
                    {
                      employee.department_name
                    }
                  </td>

                  <td className="p-4">
                    {
                      employee.designation || "N/A"
                    }
                  </td>

                  <td className="p-4 font-medium">
                    ₹
                    {getGrossSalary(
                      employee
                    ).toLocaleString()}
                  </td>

                  <td className="p-4 text-red-600">
                    ₹
                    {getTotalDeduction(
                      employee
                    ).toLocaleString()}
                  </td>

                  <td className="p-4 text-green-600 font-semibold">
                    ₹
                    {getNetSalary(
                      employee
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          onEdit(
                            employee
                          )
                        }
                        className="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(
                            employee.id
                          )
                        }
                        className="h-10 w-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}