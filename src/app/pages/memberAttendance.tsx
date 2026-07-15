import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function AttendanceManagement() {
  const [employees, setEmployees] = useState([]);
  const [jsonData, setJsonData] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("NONE");
  const [selectedDate, setSelectedDate] = useState("");
  const [leavePolicies, setLeavePolicies] = useState([]);
  const navigate = useNavigate();





  const [companies, setCompanies] = useState([]);







  useEffect(() => {
    getCompinies()
  }, [])

  useEffect(() => {
    if (selectedCompany !== "NONE" && selectedDate) {
      getAttendanceRecordByDate();
    }
  }, [selectedDate, selectedCompany])

  useEffect(() => {
    selectedCompany && getLeavePolicy();
  }, [selectedCompany])



  const getToken = () => {
    const token = localStorage.getItem("codeflame_payroll2003");
    if (!token) {
      toast.error("Session expired");
      navigate("/");
      throw new Error("No token");
    }
    return token;
  };


  const getLeavePolicy = async () => {
    const selectedComp = companies.find((cmp: any) => cmp.id === selectedCompany);

    setLeavePolicies(selectedComp?.leavePolicies || [])
  }

  const getCompinies = async () => {
    const token = getToken();

    try {
      const res = await axios.get("https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/company", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setCompanies(res.data.data.map((comp: any) => {
        return {
          id: comp._id,
          companyName: comp.name,
          earnings: comp.earning,
          deductions: comp.deduction,
          leavePolicies: comp.leavePolicies
        }
      }))

    } catch (error: any) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      alert(error.message)
      console.log(error)
    }
  }

  const getAttendanceRecordByDate = async () => {
    const token = getToken();
    try {
      const backendUrl = `https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/attendance/company/${selectedCompany}?date=${selectedDate}`
      const response = await fetch(backendUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json()
      console.log("attendance record of selected date:", res)
      const updatedEmployee = res.data.map((emp: any) => {

        return {
          companyId: emp.compId._id,
          companyName: emp.compId.name,
          id: emp.empId.empId || emp.empId,
          empErpId: emp.empId._id,
          name: emp.name,
          checkIn: emp.checkInTime !== "00:00" && emp.checkInTime !== null ? emp.checkInTime : "",
          checkOut: emp.checkOutTime !== "00:00" && emp.checkInTime !== null ? emp.checkOutTime : "",
          status: emp.status,
          workingHours: emp.workingHours,
        }
      })
      console.log(updatedEmployee)
      setEmployees(updatedEmployee)

    } catch (error: any) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      alert(error.message)
      console.log(error)
    }
  }





  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "0";
    const start = new Date(`2026-06-05T${checkIn}`);
    const end = new Date(`2026-06-05T${checkOut}`);
    const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return diff > 0 ? diff.toFixed(2) : "0";
  };

  const updateEmployee = (id, field, value) => {
    const updated = employees.map((emp) => {
      console.log(emp.id, id)
      if (emp.id !== id) return emp;
      const updatedEmp = { ...emp, [field]: value };
      updatedEmp.workingHours = calculateHours(updatedEmp.checkIn, updatedEmp.checkOut);
      return updatedEmp;
    });
    setEmployees(updated);
  };

  const submitJson = () => {
    try {
      const parsed = JSON.parse(jsonData);
      const updatedEmployees = employees.map((employee) => {
        const record = parsed.find((item) => item.id === employee.id);
        if (!record) return employee;
        return {
          ...employee,
          checkIn: record.checkIn || "",
          checkOut: record.checkOut || "",
          status: record.status || "Present",
          workingHours: calculateHours(record.checkIn, record.checkOut),
        };
      });
      setEmployees(updatedEmployees);
      alert("Attendance Filled Successfully");
    } catch (error) {
      alert("Invalid JSON Format");
    }
  };

  const saveAttendance = async () => {
   
    const udpatedEmployee = employees.map((emp) => {
      emp.status = emp.status.length === 0 ? "Present" : emp.status;
      emp.checkIn = emp.checkIn.length === 0 ? "00:00" : emp.checkIn
      emp.checkOut = emp.checkOut.length === 0 ? "00:00" : emp.checkOut
      return emp;
    })
    const token = getToken();
    try {
      const res = await axios.post(`https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/attendance?date=${selectedDate}`,
        { attendanceInfo: udpatedEmployee },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )
      console.log(res.data)
      alert("Attendance Saved Successfully");
    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      alert("Failed To Save Attendance");
    }
  };


 const handleLogout = ()=>{
    localStorage.removeItem("codeflame_payroll2003");
    window.location.reload();
 }



  const filteredEmployees =
    selectedCompany === "NONE"
      ? []
      : employees.filter((emp) => emp.companyId === selectedCompany);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-end">
        <button onClick={handleLogout} className="text-xl flex border border-black px-2 py-1 cursor-pointer rounded-xs  items-center gap-2">
          <span>Logout</span>
          
          <FaLongArrowAltRight /> 
          </button>
      </div>
      {/* UI Header Options Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 p-4 rounded-xl border">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Attendance Management</h1>
          <p className="text-sm text-slate-500">Mark attendance manually or paste register JSON arrays</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            className="border rounded-lg px-3 py-2 text-sm bg-white font-medium text-slate-700 shadow-sm"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="NONE">Select Company</option>

            {companies.map(
              (company: any) => (
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



          <input
            type="date"
            className="border rounded-lg px-3 py-2 text-sm bg-white font-medium text-slate-700 shadow-sm"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />


          <button onClick={saveAttendance} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition">
            Save Attendance
          </button>


        </div>
      </div>

      {/* JSON Array Parser Interface card */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="border-b p-4 bg-slate-50">
          <h3 className="font-bold text-slate-800">Paste Attendance JSON</h3>
        </div>
        <div className="p-4">
          <textarea
            className="w-full min-h-[140px] border rounded-lg p-4 font-mono text-xs bg-slate-900 text-emerald-400 shadow-inner focus:outline-none"
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder={`[\n  { "id":"EMP001", "checkIn":"09:30", "checkOut":"17:30", "status":"Present" }\n]`}
          />
          <button className="mt-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition" onClick={submitJson}>
            Submit JSON Array
          </button>
        </div>
      </div>

      {/* Attendance Grid Entry Sheet Card */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="border-b p-4 bg-slate-50">
          <h3 className="font-bold text-slate-800">Active Live Attendance Sheet</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100 border-b">
              <tr>
                <th className="px-6 py-3">Employee ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Check In</th>
                <th className="px-6 py-3">Check Out</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Working Hours</th>
              </tr>
            </thead>
            <tbody>
              {selectedCompany === "NONE" ? (
                <tr>
                  <td colSpan={6} className="text-center text-slate-400 py-12 font-medium bg-slate-50/50">
                    Please select a specific company group from the top filter row to populate workers sheet.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">{employee.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{employee.name}</td>
                    <td className="px-6 py-4">
                      <input
                        type="time"
                        className="border rounded-md px-2 py-1 bg-white text-slate-800 focus:ring-1 focus:ring-blue-500"
                        value={employee.checkIn}
                        onChange={(e) => updateEmployee(employee.id, "checkIn", e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="time"
                        className="border rounded-md px-2 py-1 bg-white text-slate-800 focus:ring-1 focus:ring-blue-500"
                        value={employee.checkOut}
                        onChange={(e) => updateEmployee(employee.id, "checkOut", e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        className="border rounded-md px-2 py-1 bg-white font-medium text-slate-700 focus:ring-1 focus:ring-blue-500"
                        value={employee.status.length > 0 ? employee.status : "Present"}
                        onChange={(e) => updateEmployee(employee.id, "status", e.target.value)}
                      >

                        <option value="Present">Present</option>
                        {leavePolicies.map((lv: any) => {
                          return <option key={lv.id} value={lv.name}>{lv.name}</option>
                        })}

                      </select>
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600">{employee.workingHours} hrs</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}