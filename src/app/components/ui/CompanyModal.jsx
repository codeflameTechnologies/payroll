import { useState } from "react";
import { Loader, LoaderCircle } from "lucide-react";
import SalaryComponents from "./SalaryComponents";
import LeavePolicy from "./LeavePolicy";

export default function CompanyModal({
  company,
  onClose,
  onSave,
  processing,
}) {
  const [form, setForm] = useState(
    company || {
      companyName: "",
      email: "",
      mobile: "",
      website: "",
      address: "",
      earning: [
        
      ],
      deduction:[]
    }
  );

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const submit = () => {
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start overflow-auto p-10">
      <div className="bg-white rounded-2xl p-8 w-full max-w-6xl">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-bold">
            Company Registration
          </h2>

          <button
            onClick={onClose}
            className="text-red-500"
          >
            Close
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <input
            className="input"
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={change}
          />

          <input
            className="input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={change}
          />

          <input
            className="input"
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={change}
          />

          <input
            className="input"
            name="website"
            placeholder="Website"
            value={form.website}
            onChange={change}
          />
        </div>

        <textarea
          className="input h-24 mb-10"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={change}
        />

        <SalaryComponents
          title="Earnings"
          data={form.earning}
          setData={(value) =>
            setForm({
              ...form,
              earning: value,
            })
          }
        />

        <SalaryComponents
          title="Deductions"
          data={form.deduction}
          setData={(value) =>
            setForm({
              ...form,
              deduction: value,
            })
          }
        />

        <LeavePolicy
          data={form.leavePolicies}
          setData={(value) =>
            setForm({
              ...form,
              leavePolicies: value,
            })
          }
        />

        <div className="flex justify-end mt-10">
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl"
          >
            {processing ? (
              
             <span className="flex items-center gap-2"><LoaderCircle className="animate-spin" /> Saving... </span> 
            ) : (
              "Save Company"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}