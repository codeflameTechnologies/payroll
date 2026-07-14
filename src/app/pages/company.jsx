import { useState, useEffect } from "react";
import CompanyModal from "../components/ui/CompanyModal";
import CompanyTable from "../components/ui/CompanyTable";
import { Loader, LoaderCircle } from "lucide-react";
import axios from "axios"

export default function Companies() {
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] =
    useState(null);

  const [processing, setProcessing] = useState(false);
  const [loading,setLoading] = useState(false)


  useEffect(() => {
    getCompinies()
  }, [])


  const getToken = () => {
      const token = localStorage.getItem("codeflame_payroll2003");
      if (!token) {
        toast.error("Session expired");
        navitgate("/login");
        throw new Error("No token");
      }
      return token;
    };

  const getCompinies = async () => {
    setLoading(true)
    const token = getToken();
    try {
      const res = await axios.get("http://localhost:4000/codeflame/payroll/api/company",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      setCompanies(res.data.data)
      console.log(res)
    } catch (error) {
      alert(error.message)
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const saveCompany = async (company) => {

   setProcessing(true)
   const token = getToken();

 
    try {
      
      if (editingCompany) {
        const res = await axios.put(
          `http://localhost:4000/codeflame/payroll/api/company/${editingCompany._id}`,
          company,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        console.log("Company updated:", res.data);
        getCompinies()
      } else {
  
        const res = await axios.post(
          "http://localhost:4000/codeflame/payroll/api/company",
          company,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        getCompinies()
      }
  
      setOpen(false);
      setEditingCompany(null);
    } catch (error) {
      alert(error.message)
      console.log(error)
    } finally {
      setProcessing(false);
    }

  };

  const deleteCompany = (id) => {
    setCompanies((prev) =>
      prev.filter((c) => c.id !== id)
    );
  };

  const editCompany = (company) => {
    setEditingCompany(company);
    setOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Companies
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          + Register Company
        </button>
      </div>

      <CompanyTable
        companies={companies}
        loading={loading}
        onDelete={deleteCompany}
        onEdit={editCompany}
      />

      {open && (
        <CompanyModal
          company={editingCompany}
          onClose={() => {
            setOpen(false);
            setEditingCompany(null);
          }}
          processing={processing}
          onSave={saveCompany}
        />
      )}
    </div>
  );
}