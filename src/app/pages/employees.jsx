import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import EmployeeModal from "../components/ui/EmployeeModal";
import EmployeeTable from "../components/ui/EmployeeTable";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function EmployeeManagement() {
  // Demo company data
  const [companies, setCompanies] = useState([]);

  const [employees, setEmployees] = useState([]);

  const [open, setOpen] = useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [companyFilter, setCompanyFilter] =
    useState("");
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getCompany()
   
  }, [])


  useEffect(()=>{
     companyFilter &&  getEmployees()
  },[companyFilter])
  

  const getToken = () => {
      const token = localStorage.getItem("codeflame_payroll2003");
      if (!token) {
        toast.error("Session expired");
        navitgate("/");
        throw new Error("No token");
      }
      return token;
    };

  const getEmployees = async ()=>{
    setLoading(true)
    const token = getToken();
    try {
      const res = await axios.get(`https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/employee/${companyFilter}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(res.data)
      setEmployees(res.data.data)
    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      console.log(error.message)
      alert(error.message)
    }finally{
      setLoading(false)
    }
  }


  const getCompany = async () => {
   const token = getToken();
    try {
      const res = await axios.get("https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/company",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
     
      setCompanies(res.data.data.map((comp) => {
        return {
          id: comp._id,
          companyName: comp.name,
          earnings: comp.earning,
          deductions: comp.deduction
        }
      }))

    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      console.log(error.message)
    }
  }

  // Add / Update Employee
  const saveEmployee = async (employee) => {
    setProcessing(true)
    const token = getToken();
    try {
      if (editingEmployee) {
        const res = await axios.put(`https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/employee/${employee._id}`,
           employee,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
        getEmployees()
        toast.success(res.data.message)
       
      } else {
        console.log("....")
        const res = await axios.post("https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/employee",
           employee,
            {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
          )
        getEmployees();
        toast.success(res.data.message)
       
       
      }
      setEditingEmployee(null);
      setOpen(false);
    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      console.log(error.message)
      toast.error(error.response.message)
    } finally {
      setProcessing(false)
    }



  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    const token = getToken();
    const confirmDelete =
      window.confirm(
        "Are you sure? This action delete all info related to this employee like attendance etc"
      );

    if (!confirmDelete) return;
    setProcessing(true)
    try {
       const res = await axios.delete(`https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/employee/${id}`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
        getEmployees()
    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      toast.error(error.message)
      console.log(error.message)
     
    }finally{
      setProcessing(false);
    }

   
  };

  // Edit Employee
  const editEmployee = (employee) => {
    setEditingEmployee(employee);
    setOpen(true);
  };

  // Filter Employee List
  const filteredEmployees =
    useMemo(() => {
    
      return employees.filter(
        (emp) => {
          const matchesCompany =
            companyFilter === ""
              ? true
              : String(
                emp.company_id
              ) === companyFilter;

          const matchesSearch =
            `${emp.firstName} ${emp.lastName}`
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            emp.empId
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          return (
            matchesCompany &&
            matchesSearch
          );
        }
      );
    }, [
      employees,
      search,
      companyFilter,
    ]);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Employee Management
          </h1>

          <button
            onClick={() => {
              setEditingEmployee(
                null
              );
              setOpen(true);
            }}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Add Employee
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6">
          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="input"
            />

            <select
              value={
                companyFilter
              }
              onChange={(e) =>
                setCompanyFilter(
                  e.target.value
                )
              }
              className="input"
            >
              <option value="">
                All Companies
              </option>

              {companies.map(
                (company) => (
                  <option
                    key={
                      company.id
                    }
                    value={
                      company.id
                    }
                  >
                    {
                      company.companyName
                    }
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Employee Table */}
        <EmployeeTable
          employees={
            filteredEmployees
          }
           loading = {loading}
          companies={companies}
          onEdit={
            editEmployee
          }
          onDelete={
            deleteEmployee
          }
        />

        {/* Modal */}
        {open && (
          <EmployeeModal
            companies={companies}
            employee={
              editingEmployee
            }
           
            processing = {processing}
            onClose={() => {
              setOpen(false);
              setEditingEmployee(
                null
              );
            }}
            onSave={
              saveEmployee
            }
          />
        )}
      </div>
    </div>
  );
}