// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/table";

// const initialEmployees = [
//   // HCL Employees (1-50)
//   ...Array.from({ length: 50 }, (_, i) => ({
//     companyId: "COMP001",
//     companyName: "HCL",
//     id: `EMP${String(i + 1).padStart(3, "0")}`,
//     name: `HCL Employee ${i + 1}`,
//     checkIn: "",
//     checkOut: "",
//     status: "Present",
//     workingHours: "0",
//   })),

//   // Infosys Employees (1-50)
//   ...Array.from({ length: 50 }, (_, i) => ({
//     companyId: "COMP002",
//     companyName: "Infosys",
//     id: `EMP${String(i + 1).padStart(3, "0")}`,
//     name: `Infosys Employee ${i + 1}`,
//     checkIn: "",
//     checkOut: "",
//     status: "Present",
//     workingHours: "0",
//   })),
// ];

// export default function AttendanceManagement() {
//   const [employees, setEmployees] = useState(initialEmployees);
//   const [jsonData, setJsonData] = useState("");
//   const [selectedCompany, setSelectedCompany] = useState("NONE");

//   const calculateHours = (checkIn, checkOut) => {
//     if (!checkIn || !checkOut) return "0";

//     const start = new Date(`2026-06-05T${checkIn}`);
//     const end = new Date(`2026-06-05T${checkOut}`);

//     const diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

//     return diff > 0 ? diff.toFixed(2) : "0";
//   };

//   const updateEmployee = (id, field, value) => {
//     const updated = employees.map((emp) => {
//       if (emp.id !== id) return emp;

//       const updatedEmp = { ...emp, [field]: value };

//       updatedEmp.workingHours = calculateHours(
//         updatedEmp.checkIn,
//         updatedEmp.checkOut
//       );

//       return updatedEmp;
//     });

//     setEmployees(updated);
//   };

//   const submitJson = () => {
//     try {
//       const parsed = JSON.parse(jsonData);

//       const updatedEmployees = employees.map((employee) => {
//         const record = parsed.find((item) => item.id === employee.id);

//         if (!record) return employee;

//         return {
//           ...employee,
//           checkIn: record.checkIn || "",
//           checkOut: record.checkOut || "",
//           status: record.status || "Present",
//           workingHours: calculateHours(record.checkIn, record.checkOut),
//         };
//       });

//       setEmployees(updatedEmployees);

//       alert("Attendance Filled Successfully");
//     } catch (error) {
//       alert("Invalid JSON Format");
//     }
//   };

//   const saveAttendance = async () => {
//     try {
//       const payload = {
//         date: new Date().toISOString(),
//         attendance: employees,
//       };

//       console.log(payload);

//       alert("Attendance Saved Successfully");
//     } catch (error) {
//       alert("Failed To Save Attendance");
//     }
//   };


//  const handleDownloadReport = async ()=>{
//      try {

//      } catch (error) {

//      }
//      finally{

//      }
//  }




//   const filteredEmployees =
//     selectedCompany === "NONE"
//       ? []
//       : employees.filter((emp) => emp.companyId === selectedCompany);

//   return (
//     <div className="p-6 space-y-6">

//       {/* Header */}
//       <div className="flex justify-between items-center gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Attendance Management</h1>
//           <p className="text-muted-foreground">
//             Mark attendance manually or paste JSON data
//           </p>
//         </div>

//         <div className="flex gap-3 items-center">
//           {/* Company Filter */}
//           <select
//             className="border rounded px-3 py-2"
//             value={selectedCompany}
//             onChange={(e) => setSelectedCompany(e.target.value)}
//           >
//             <option value="NONE">Select Company</option>
//             <option value="COMP001">HCL</option>
//             <option value="COMP002">Infosys</option>
//           </select>

//           <input type="date" className="border rounded px-3 py-2" />

//           <Button onClick={saveAttendance}>Save Attendance</Button>
//           <Button onClick={handleDownloadReport}>Download Monthly record</Button>
//         </div>
//       </div>

//       {/* JSON Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Paste Attendance JSON</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <textarea
//             className="w-full min-h-[250px] border rounded-lg p-4 text-sm"
//             value={jsonData}
//             onChange={(e) => setJsonData(e.target.value)}
//             placeholder={`[
//   {
//     "id":"EMP001",
//     "checkIn":"09:30",
//     "checkOut":"17:30",
//     "status":"Present"
//   }
// ]`}
//           />

//           <Button className="mt-4" onClick={submitJson}>
//             Submit JSON
//           </Button>
//         </CardContent>
//       </Card>

//       {/* Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Attendance Sheet</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Employee ID</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Check In</TableHead>
//                 <TableHead>Check Out</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Working Hours</TableHead>
//               </TableRow>
//             </TableHeader>
//             {selectedCompany === "NONE" && (
//               <div className="text-center text-gray-500 py-10">
//                 Please select a company to view employees
//               </div>
//             )}
//             <TableBody>
//               {filteredEmployees.map((employee) => (
//                 <TableRow key={employee.id}>
//                   <TableCell>{employee.id}</TableCell>
//                   <TableCell>{employee.name}</TableCell>

//                   <TableCell>
//                     <Input
//                       type="time"
//                       value={employee.checkIn}
//                       onChange={(e) =>
//                         updateEmployee(employee.id, "checkIn", e.target.value)
//                       }
//                     />
//                   </TableCell>

//                   <TableCell>
//                     <Input
//                       type="time"
//                       value={employee.checkOut}
//                       onChange={(e) =>
//                         updateEmployee(employee.id, "checkOut", e.target.value)
//                       }
//                     />
//                   </TableCell>

//                   <TableCell>
//                     <select
//                       className="border rounded px-3 py-2 w-full"
//                       value={employee.status}
//                       onChange={(e) =>
//                         updateEmployee(employee.id, "status", e.target.value)
//                       }
//                     >
//                       <option>Present</option>
//                       <option>Absent</option>
//                       <option>Half Day</option>
//                       <option>WFH</option>
//                     </select>
//                   </TableCell>

//                   <TableCell>
//                     <span className="font-medium">
//                       {employee.workingHours} hrs
//                     </span>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <div className="mt-6 flex justify-end">
//             <Button onClick={saveAttendance}>Save Attendance</Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



import axios from "axios";
import React, { useState, useRef, forwardRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

// ==========================================
// 1. PRINTABLE COMPONENT (REGISTER MATRIX VIEW)
// ==========================================
const AttendanceRegisterPrint = forwardRef(({ reportData, meta }, ref) => {
  if (!reportData || reportData.length === 0) return null;

  const totalDays = meta?.totalDaysInMonth || 31;
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div ref={ref} className="p-8 bg-white text-black w-full" style={{ minWidth: "297mm" }}>
      {/* Header Profile Info */}
      <div className="mb-6 border-b-2 border-gray-800 pb-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight uppercase">
          Monthly Attendance Register
        </h1>
        <div className="flex justify-between items-center mt-3 text-sm font-semibold text-gray-700">
          <div>Company ID: <span className="text-black font-bold">{meta?.companyId}</span></div>
          <div>Month / Year: <span className="text-black font-bold">{meta?.month}/{meta?.year}</span></div>
          <div>Total Records: <span className="text-black font-bold">{reportData.length}</span></div>
        </div>
      </div>

      {/* Grid Register Table */}
      <table className="w-full border-collapse border border-gray-400 text-[10px]">
        <thead>
          <tr className="bg-slate-800 text-white font-bold">
            <th className="border border-gray-400 p-1 text-center" rowSpan="2">S.No</th>
            <th className="border border-gray-400 p-1 text-left min-w-[120px]" rowSpan="2">Employee Name</th>
            <th className="border border-gray-400 p-0.5 text-center" colSpan={totalDays}>Dates</th>
            <th className="border border-gray-400 p-0.5 text-center" colSpan="7">Summary</th>
          </tr>
          <tr className="bg-slate-700 text-white font-semibold">
            {daysArray.map((day) => (
              <th key={day} className="border border-gray-400 p-0.5 w-6 text-center">{day}</th>
            ))}
            <th className="border border-gray-400 p-0.5 w-6 text-center bg-green-900 text-white">P</th>
            <th className="border border-gray-400 p-0.5 w-6 text-center bg-yellow-600 text-white">L</th>
            <th className="border border-gray-400 p-0.5 w-6 text-center bg-red-900 text-white">A</th>
            <th className="border border-gray-400 p-0.5 w-7 text-center bg-indigo-900 text-white">CL</th>
            <th className="border border-gray-400 p-0.5 w-7 text-center bg-purple-900 text-white">WO</th>
            <th className="border border-gray-400 p-0.5 w-7 text-center bg-orange-900 text-white">HD</th>
            <th className="border border-gray-400 p-0.5 w-8 text-center bg-teal-900 text-white">DUTY</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((emp, idx) => (
            <tr key={emp.empId} className="hover:bg-gray-50 border-b border-gray-300">
              <td className="border border-gray-400 p-1 text-center font-medium">{idx + 1}</td>
              <td className="border border-gray-400 p-1 text-left font-bold uppercase truncate">{emp.employeeName}</td>

              {emp.attendanceGrid.map((grid) => {
                let displayStatus = "-";
                let bgClass = "";

                if (grid.status === "PRESENT") { displayStatus = "P"; }
                else if (grid.status === "ABSENT") { displayStatus = "A"; bgClass = "bg-red-100 text-red-700 font-bold"; }
                else if (grid.status === "LATE") { displayStatus = "L"; }
                else if (grid.status === "HALF DAY") { displayStatus = "HD"; }
                else if (grid.status === "WO" || grid.status === "CL") {
                  displayStatus = grid.status;
                  bgClass = "bg-yellow-100 font-bold text-amber-800"; // Exact physical register highlighter effect
                } else {
                  displayStatus = grid.status;
                }

                return (
                  <td key={grid.day} className={`border border-gray-400 p-0.5 text-center ${bgClass}`}>
                    {displayStatus}
                  </td>
                );
              })}

              <td className="border border-gray-400 p-1 text-center font-semibold bg-gray-50">{emp.summary.PRESENT || 0}</td>
              <td className="border border-gray-400 p-1 text-center font-semibold bg-gray-50">{emp.summary.LATE || 0}</td>
              <td className="border border-gray-400 p-1 text-center font-semibold text-red-600 bg-red-50">{emp.summary.ABSENT || 0}</td>
              <td className="border border-gray-400 p-1 text-center font-semibold bg-gray-50">{emp.summary.CL || 0}</td>
              <td className="border border-gray-400 p-1 text-center font-semibold bg-gray-50">{emp.summary.WO || 0}</td>
              <td className="border border-gray-400 p-1 text-center font-semibold bg-gray-50">{emp.summary.HD || 0}</td>
              <td className="border border-gray-400 p-1 text-center font-bold bg-teal-50 text-teal-900 text-xs">{emp.summary.TOTAL_DUTY || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
AttendanceRegisterPrint.displayName = "AttendanceRegisterPrint";

// ==========================================
// 2. MAIN ATTENDANCE MANAGEMENT COMPONENT
// ==========================================
const initialEmployees = [
  ...Array.from({ length: 50 }, (_, i) => ({
    companyId: "COMP001",
    companyName: "HCL",
    id: `EMP${String(i + 1).padStart(3, "0")}`,
    name: `HCL Employee ${i + 1}`,
    checkIn: "",
    checkOut: "",
    status: "Present",
    workingHours: "0",
  })),
  ...Array.from({ length: 50 }, (_, i) => ({
    companyId: "COMP002",
    companyName: "Infosys",
    id: `EMP${String(i + 1).padStart(3, "0")}`,
    name: `Infosys Employee ${i + 1}`,
    checkIn: "",
    checkOut: "",
    status: "Present",
    workingHours: "0",
  })),
];

export default function AttendanceManagement() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [jsonData, setJsonData] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("NONE");
  const [selectedDate, setSelectedDate] = useState("");
  const [reportDate, setReportDate] = useState("2026-03"); // Target Month Filter
  const [leavePolicies,setLeavePolicies] = useState([]);

  // Print & PDF hooks integration states
  const [apiReportData, setApiReportData] = useState([]);
  const [apiMeta, setApiMeta] = useState(null);
  const componentRef = useRef(null);
  const [companies, setCompanies] = useState([]);

  // react-to-print configuration hook
  const handlePrintTrigger = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Attendance_Register_${selectedCompany}_${reportDate}`,
    pageStyle: "@page { size: A3 landscape; margin: 10mm; }",
  });





  useEffect(() => {
    getCompinies()
  }, [])

  useEffect(() => {
     if(selectedCompany && selectedDate) {
      getAttendanceRecordByDate();
     } 
  }, [selectedDate,selectedCompany])

  useEffect(()=>{
      selectedCompany && getLeavePolicy();
  },[selectedCompany])


  const getLeavePolicy = async()=>{
      const selectedComp = companies.find((cmp:any)=>cmp.id === selectedCompany);
      console.log(selectedComp)
      setLeavePolicies(selectedComp?.leavePolicies || [])
  }

  const getCompinies = async () => {

    try {
      const res = await axios.get("http://localhost:4000/codeflame/payroll/api/company")
     
      setCompanies(res.data.data.map((comp: any) => {
        return {
          id: comp._id,
          companyName: comp.name,
          earnings: comp.earning,
          deductions: comp.deduction,
          leavePolicies:comp.leavePolicies
        }
      }))

    } catch (error: any) {
      alert(error.message)
      console.log(error)
    }
  }

  const getAttendanceRecordByDate = async () => {
    try {
      const backendUrl = `http://localhost:4000/codeflame/payroll/api/attendance/company/${selectedCompany}?date=${selectedDate}`
      const response = await fetch(backendUrl);
      const res = await response.json()
      console.log("attendance record of selected date:", res)
      const updatedEmployee = res.data.map((emp:any) => {
  
       return {
        companyId: emp.compId._id,
        companyName: emp.compId.name,
        id: emp.empId.empId || emp.empId,
        empErpId:emp.empId._id,
        name: emp.name,
        checkIn: emp.checkInTime?emp.checkInTime.split("T")[1].slice(0,5):"",
        checkOut: emp.checkOutTime?emp.checkOutTime.split("T")[1].slice(0,5):"",
        status: emp.status,
        workingHours:emp.workingHours,
       } 
      })
      console.log(updatedEmployee)
      setEmployees(updatedEmployee)

    } catch (error: any) {
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
    console.log(employees)
    const udpatedEmployee = employees.map((emp)=>{
        emp.status = emp.status.length === 0 ? "Present" : emp.status;
        emp.checkIn = emp.checkIn.length === 0 ? "00:00" : emp.checkIn
        emp.checkOut = emp.checkOut.length === 0 ? "00:00" : emp.checkOut
        return emp;
    })
    console.log(udpatedEmployee)
    try {
      const res = await axios.post(`http://localhost:4000/codeflame/payroll/api/attendance?date=${selectedDate}`,{attendanceInfo:udpatedEmployee})
      console.log(res.data)
      alert("Attendance Saved Successfully");
    } catch (error) {
      alert("Failed To Save Attendance");
    }
  };

  // --- DOWNLOAD MONTHLY REGISTER FUNCTION ---
  const handleDownloadReport = async () => {
    if (selectedCompany === "NONE") {
      alert("Bhai, pehle register download karne ke liye Company select karo!");
      return;
    }

    const [year, month] = reportDate.split("-");

    try {
      const backendUrl = `http://localhost:4000/codeflame/payroll/api/attendance/register-report?compId=${selectedCompany}&year=${year}&month=${parseInt(month)}`;
      const response = await fetch(backendUrl);
      const result = await response.json();
      console.log(result)

      if (!result.success || !result.data || result.data.length === 0) {
        alert("Is month ka koi attendance record nahi mila!");
        return;
      }

      setApiReportData(result.data);
      setApiMeta(result.meta);

      setTimeout(() => {
        handlePrintTrigger();
      }, 300);

    } catch (error) {
      console.error("Print layout failed:", error);
      alert("Backend connected nahi hai ya network issue hai!");
    }
  };

  const filteredEmployees =
    selectedCompany === "NONE"
      ? []
      : employees.filter((emp) => emp.companyId === selectedCompany);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
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
            type="month"
            className="border rounded-lg px-3 py-2 text-sm bg-white font-medium text-slate-700 shadow-sm"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />
          <input
            type="date"
            className="border rounded-lg px-3 py-2 text-sm bg-white font-medium text-slate-700 shadow-sm"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />


          <button onClick={saveAttendance} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition">
            Save Attendance
          </button>

          <button onClick={handleDownloadReport} className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition">
            Download Monthly Record
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
                        value={employee.status.length > 0?employee.status:"Present"}
                        onChange={(e) => updateEmployee(employee.id, "status", e.target.value)}
                      >
                      
                        <option value="Present">Present</option>
                        {leavePolicies.map((lv:any)=>{
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

      {/* RENDER FOR PRINT LAYOUT ENGINE IN BACKGROUND ONLY */}
      <div className="hidden print:block">
        <AttendanceRegisterPrint ref={componentRef} reportData={apiReportData} meta={apiMeta} />
      </div>
    </div>
  );
}