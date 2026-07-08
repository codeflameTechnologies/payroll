import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

// Production-grade helper for an empty form state that mirrors your exact Mongoose Schema
const getInitialFormState = (employee) => {
  console.log("starting")
  if (employee) return { ...employee };

  return {
    empId: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    email: "",
    mobile: "",
    gender: "",
    aadhaarNo: "",
    PFNo: "",
    ESINo: "",
    PanNo: "",
    BankAccountNo: "",
    BankName: "",
    BankIFSC: "",
    company_id: "",
    company_name: "",
    department_name: "",
    designation:"",
    DOJ: "",
    workingHour:0,
    earning: {},    // Dynamic key-value pairs matching backend schema
    deduction: {},  // Dynamic key-value pairs matching backend schema
  };
};

export default function EmployeeModal({ companies = [], employee, onClose, onSave, processing }) {
  const [form, setForm] = useState(() => getInitialFormState(employee));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(getInitialFormState(employee));
    setErrors({});
  }, [employee]);

  // Handle standard structural input strings
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handles Company selection and extracts both `_id` and `company_name` for the backend schema
  const handleCompanyChange = (e) => {
    const selectedId = e.target.value;
    const targetCompany = companies.find((c) => String(c._id || c.id) === String(selectedId));

    setForm((prev) => {
      // Structure your earnings/deductions objects based on company configurations
      const initialEarnings = {};
      const initialDeductions = {};

      targetCompany?.earnings?.forEach((item) => {
        initialEarnings[item.name || item.id] = "";
      });
      targetCompany?.deductions?.forEach((item) => {
        initialDeductions[item.name || item.id] = "";
      });

      return {
        ...prev,
        company_id: selectedId,
        company_name: targetCompany ? targetCompany.companyName || targetCompany.name : "",
        earning: initialEarnings,
        deduction: initialDeductions,
      };
    });
  };

  // Handle nested updates for financial payloads
  const handleFinancialChange = (type, key, value) => {
    setForm((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  // Quick UI validation to ensure mandatory Mongoose fields aren't blank
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "empId", "firstName", "fatherName", "aadhaarNo", 
      "PFNo", "ESINo", "PanNo", "BankAccountNo", "BankName", 
      "BankIFSC", "company_id","designation", "department_name", "DOJ","workingHour"
    ];

    requiredFields.forEach((field) => {
      if (!form[field]?.toString().trim()) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start p-8 overflow-auto z-50">
      <div className="bg-white w-full max-w-6xl rounded-2xl p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {employee ? "Edit Employee Profile" : "Register New Employee"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 font-medium transition">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Identity & Personal Info */}
          <div>
            <h3 className="font-semibold text-lg text-blue-600 mb-4">Personal Details</h3>
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <input className="input" placeholder="Employee ID *" name="empId" value={form.empId} onChange={handleChange} />
                {errors.empId && <span className="text-xs text-red-500">{errors.empId}</span>}
              </div>
              <div>
                <input className="input" placeholder="First Name *" name="firstName" value={form.firstName} onChange={handleChange} />
                {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
              </div>
              <input className="input" placeholder="Last Name" name="lastName" value={form.lastName || ""} onChange={handleChange} />
              <div>
                <input className="input" placeholder="Father's Name *" name="fatherName" value={form.fatherName} onChange={handleChange} />
                {errors.fatherName && <span className="text-xs text-red-500">{errors.fatherName}</span>}
              </div>
              <input className="input" type="email" placeholder="Email Address" name="email" value={form.email || ""} onChange={handleChange} />
              <div>
                <input className="input" placeholder="Mobile Number *" name="mobile" value={form.mobile} onChange={handleChange} />
                {errors.mobile && <span className="text-xs text-red-500">{errors.mobile}</span>}
              </div>
              <select className="input" name="gender" value={form.gender || ""} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Statutory Details */}
          <div>
            <h3 className="font-semibold text-lg text-blue-600 mb-4">Statutory & Compliance Identification</h3>
            <div className="grid md:grid-cols-4 gap-5">
              <div>
                <input className="input" placeholder="Aadhaar Number *" name="aadhaarNo" value={form.aadhaarNo} onChange={handleChange} />
                {errors.aadhaarNo && <span className="text-xs text-red-500">{errors.aadhaarNo}</span>}
              </div>
              <div>
                <input className="input" placeholder="PAN Number *" name="PanNo" value={form.PanNo} onChange={handleChange} />
                {errors.PanNo && <span className="text-xs text-red-500">{errors.PanNo}</span>}
              </div>
              <div>
                <input className="input" placeholder="PF Number *" name="PFNo" value={form.PFNo} onChange={handleChange} />
                {errors.PFNo && <span className="text-xs text-red-500">{errors.PFNo}</span>}
              </div>
              <div>
                <input className="input" placeholder="ESI Number *" name="ESINo" value={form.ESINo} onChange={handleChange} />
                {errors.ESINo && <span className="text-xs text-red-500">{errors.ESINo}</span>}
              </div>
            </div>
          </div>

          {/* Banking Details */}
          <div>
            <h3 className="font-semibold text-lg text-blue-600 mb-4">Banking Information</h3>
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <input className="input" placeholder="Bank Name *" name="BankName" value={form.BankName} onChange={handleChange} />
                {errors.BankName && <span className="text-xs text-red-500">{errors.BankName}</span>}
              </div>
              <div>
                <input className="input" placeholder="Account Number *" name="BankAccountNo" value={form.BankAccountNo} onChange={handleChange} />
                {errors.BankAccountNo && <span className="text-xs text-red-500">{errors.BankAccountNo}</span>}
              </div>
              <div>
                <input className="input" placeholder="IFSC Code *" name="BankIFSC" value={form.BankIFSC} onChange={handleChange} />
                {errors.BankIFSC && <span className="text-xs text-red-500">{errors.BankIFSC}</span>}
              </div>
            </div>
          </div>

          {/* Employment Assignment */}
          <div>
            <h3 className="font-semibold text-lg text-blue-600 mb-4">Organizational Setup</h3>
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <select className="input" value={form.company_id} onChange={handleCompanyChange}>
                  <option value="">Select Company *</option>
                  {companies.map((comp) => (
                    <option key={comp._id || comp.id} value={comp._id || comp.id}>
                      {comp.companyName || comp.name}
                    </option>
                  ))}
                </select>
                {errors.company_id && <span className="text-xs text-red-500">{errors.company_id}</span>}
              </div>
              <div>
                <input className="input" placeholder="Designation *" name="designation" value={form.designation} onChange={handleChange} />
                {errors.designation && <span className="text-xs text-red-500">{errors.designation}</span>}
              </div>
              <div>
                <input className="input" placeholder="Department Name *" name="department_name" value={form.department_name} onChange={handleChange} />
                {errors.department_name && <span className="text-xs text-red-500">{errors.department_name}</span>}
              </div>
              <div>
                <input type="date" className="input" placeholder="Date of Joining *" name="DOJ" value={form.DOJ ? form.DOJ.substring(0, 10) : ""} onChange={handleChange} />
                {errors.DOJ && <span className="text-xs text-red-500">{errors.DOJ}</span>}
              </div>
              <div>
                <input type="number" className="input" placeholder="Working Hour *" name="workingHour" value={form.workingHour || ""} onChange={handleChange} />
                {errors.workingHour && <span className="text-xs text-red-500">{errors.workingHour}</span>}
              </div>
            </div>
          </div>

          {/* Dynamic Financial Configuration Blocks */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Earnings Structural Loop */}
            {Object.keys(form.earning).length > 0 && (
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-semibold text-md text-gray-700 mb-3">Earnings ($)</h3>
                <div className="space-y-3">
                  {Object.keys(form.earning).map((key) => (
                    <div key={key} className="flex items-center justify-between gap-4">
                      <label className="text-sm font-medium text-gray-600 capitalize">{key}</label>
                      <input type="number" className="input max-w-[200px]" placeholder="Amount" value={form.earning[key]} onChange={(e) => handleFinancialChange("earning", key, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deductions Structural Loop */}
            {Object.keys(form.deduction).length > 0 && (
              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-semibold text-md text-gray-700 mb-3">Deductions ($)</h3>
                <div className="space-y-3">
                  {Object.keys(form.deduction).map((key) => (
                    <div key={key} className="flex items-center justify-between gap-4">
                      <label className="text-sm font-medium text-gray-600 capitalize">{key}</label>
                      <input type="number" className="input max-w-[200px]" placeholder="Amount" value={form.deduction[key]} onChange={(e) => handleFinancialChange("deduction", key, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex justify-end gap-4 border-t pt-6">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl border text-gray-700 hover:bg-gray-50 transition">
              Cancel
            </button>
            {/* apply loading feature */}
            <button disabled={processing} type="submit" className={`${processing?"bg-blue-300 cursor-progress":"bg-blue-600 cursor-pointer"}  hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-medium transition shadow-sm`}>
              {processing ? (
              
             <span className="flex items-center gap-2"><LoaderCircle className="animate-spin" /> Saving... </span> 
            ) : (
              "Save Employee Records"
            )}
           
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}