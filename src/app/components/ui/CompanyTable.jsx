import {
  Pencil,
  Trash2,
  LoaderCircle,
} from "lucide-react";

export default function CompanyTable({
  companies,
  onEdit,
  onDelete,
  loading,
}) {
  return (
    <table className="w-full bg-white rounded-xl overflow-hidden">
      <thead>
        <tr className="bg-slate-100">
          <th className="p-4">
            Company
          </th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>


        {loading && (

         <tr>
          <td colSpan={4}  className="border-4  w-full  p-4 ">
              <div className="flex flex-col">
              <LoaderCircle size={30} className="animate-spin mx-auto" />
              <span className="ml-2 text-center">Loading...</span>
              </div>
          </td>
        </tr>
        )}

        {companies.map(
          (company) => (
            
            <tr
              key={company.id}
              className="border-t"
            >
              <td className="p-4">
                {
                  company.name
                }
              </td>

              <td>
                {company.email}
              </td>

              <td>
                {company.mobile}
              </td>

              <td className="space-x-3">
                <button
                  onClick={() =>
                    onEdit(company)
                  }
                >
                  <Pencil />
                </button>

                <button
                  onClick={() =>
                    onDelete(
                      company.id
                    )
                  }
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}