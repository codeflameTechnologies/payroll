import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'sonner';

const monthObj = {
  1: "January", 2: "February", 3: "March", 4: "April",
  5: "May", 6: "June", 7: "July", 8: "August",
  9: "September", 10: "October", 11: "November", 12: "December",
};

function Report({ emp }) {
  const totalAttendanceArr = [];

  for (const key in emp.attendance) {
    if (key !== "attendanceRecords" && key !== "totalDaysInMonth" && key !=="Present") {
      totalAttendanceArr.push({
        name: key,
        value: emp.attendance[key]
      });
    }
  }

 // Employee worked hours
  const employeeWorkingHour = emp.attendance.attendanceRecords.reduce(
    (sum, wh) => sum + Number(wh.workingHours),
    0
  );
  
  const presentDays = Number(employeeWorkingHour) / Number(emp.workingHour) || 0;



  return (
    <tr className="border-b border-black align-top hover:bg-gray-50">
      {/* Employee Details Column */}
      <td className='border text-xs border-black p-1 min-w-[150px]'>
        <div>
          <p className='text-center font-bold border-b border-black bg-gray-100 mb-1'>{emp.empCode}</p>
          <p className='px-1 font-medium text-gray-900'>{emp.name}</p>
          <p className='px-1 text-gray-600 text-[10px]'>F: {emp.fatherName}</p>
          <p className='px-1 text-gray-600 text-[10px]'>Desg: {emp.designation}</p>
        </div>
      </td>

      {/* Row Labels Column */}
      <td className='text-[10px] font-semibold flex flex-col items-center justify-between min-h-[75px] py-1 border-r border-black bg-gray-50'>
        <span>In</span>
        <span>Out</span>
        <span>W.Hr</span>
        <span>Stu</span>
      </td>

      {/* 31 Days Columns */}
      {Array.from({ length: 31 }, (_, i) => {
        // Find if record exists for this specific day day index (1-based index)
        const dayRecord = emp.attendance.attendanceRecords.find(rd => new Date(rd.date).getDate() === (i + 1));
        
        return (
          <td key={i} className='text-[9px] border-r border-black p-1 text-center min-w-[35px] max-w-[45px] font-mono whitespace-nowrap'>
            {dayRecord ? (
              <div className='flex flex-col justify-between h-full min-h-[70px]'>
                <span className="text-gray-700">{dayRecord.checkIn || '-'}</span>
                <span className="text-gray-700">{dayRecord.checkOut || '-'}</span>
                <span className="text-blue-700 font-medium">{dayRecord.workingHours || '-'}</span>
                <span className={`text-[10px] font-bold border rounded px-0.5 self-center ${
                  dayRecord.status === 'Present' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'
                }`}>
                  {dayRecord.status.split(" ").map((st)=><>{st[0]=="("?"":st[0]}</>)}
                </span>
              </div>
            ) : (
              <div className='flex flex-col justify-between h-full min-h-[70px] text-gray-300 select-none'>
                <span>-</span><span>-</span><span>-</span><span>-</span>
              </div>
            )}
          </td>
        );
      })}

      {/* Totals Summary Column */}
      <td className='text-[10px] border-r border-black p-1 min-w-[80px] bg-gray-50'>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr  className='border-b border-gray-200 last:border-none'>
                <td className='font-medium text-gray-600 pr-1 py-0.5 text-nowrap'>Present:</td>
                <td className='font-bold text-gray-900 text-right py-0.5'>{presentDays}</td>
              </tr>
            {totalAttendanceArr.map((ta, idx) => (
              <tr key={idx} className='border-b border-gray-200 last:border-none'>
                <td className='font-medium text-gray-600 pr-1 py-0.5 text-nowrap'>{ta.name}:</td>
                <td className='font-bold text-gray-900 text-right py-0.5'>{ta.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
}

export default function AttendanceReport() {
  const [employeeRecord, setEmployeeRecord] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompanyDetail, setSelectedCompanyDetail] = useState({});
  const [companies, setCompanies] = useState([]);
  const [reportDate, setReportDate] = useState("");
  const navigate = useNavigate();

  const printAreaRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printAreaRef,
    documentTitle: `Attendance_Report_${selectedCompanyDetail.companyName || 'Register'}_${reportDate || 'Form_X'}`,
  });

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany && selectedCompany !== "NONE" && reportDate) {
      getAttendanceRecord();
    }
  }, [selectedCompany, reportDate]);


   const getToken = () => {
    const token = localStorage.getItem("codeflame_payroll2003");
    if (!token) {
      toast.error("Session expired");
      navigate("/login");
      throw new Error("No token");
    }
    return token;
  };

  const getCompanies = async () => {
    const token = getToken();
    try {
      const res = await axios.get("https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/company",{
         headers:{
          Authorization:`Bearer ${token}`
         }
      });
      setCompanies(res.data.data.map((comp) => ({
        id: comp._id,
        companyName: comp.name,
        earnings: comp.earning,
        deductions: comp.deduction,
        leavePolicies: comp.leavePolicies
      })));
    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/login")
      }
      alert(error.message);
    }
  };

  const onChangeSelectCompany = (id) => {
    const company = companies.find((cmp) => cmp.id === id);
    setSelectedCompanyDetail(company || {});
    setSelectedCompany(id);
  };

  const getAttendanceRecord = async () => {
    const [year, month] = reportDate.split("-");
    const token = getToken();
    try {
      const res = await axios.get(`https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/attendance/register-report?compId=${selectedCompany}&year=${Number(year)}&month=${Number(month)}`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
      
      const groupedEmployees = Object.values(
        res.data.data.reduce((acc, record) => {
          const emp = record.empId;
          if (!emp) return acc;
          const id = emp._id;
          
          if (!acc[id]) {
            acc[id] = {
              empCode: emp.empId,
              name: `${emp.firstName} ${emp.lastName || ""}`.trim(),
              designation: emp.designation,
              dept: emp.department_name,
              fatherName: emp.fatherName,
              doj: emp.DOJ,
              workingHour: emp.workingHour,
              attendance: {
                totalDaysInMonth: res?.data?.meta?.totalDaysInMonth || 0,
                attendanceRecords: [],
              }
            };
          }
          
          acc[id].attendance.attendanceRecords.push({
            checkIn: record.checkInTime,
            checkOut: record.checkOutTime,
            date: record.date.split("T")[0],
            name: record.name,
            status: record.status,
            workingHours: record.workingHours
          });

          acc[id].attendance[record.status] = (acc[id].attendance[record.status] || 0) + 1;
          return acc;
        }, {})
      );

      setEmployeeRecord(groupedEmployees);
    } catch (error) {
       if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/login")
      }
      alert(error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Control Panel Filter Header */}
      <div className="mb-4 flex items-center bg-white p-4 rounded shadow no-print">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Download Monthly Report</h1>
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-3">
          <input
            type="month"
            className="border rounded-lg px-3 py-2 text-sm bg-white font-medium text-slate-700 shadow-sm"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />

          <select
            className="border rounded-lg px-3 py-2 text-sm bg-white font-medium text-slate-700 shadow-sm"
            value={selectedCompany}
            onChange={(e) => onChangeSelectCompany(e.target.value)}
          >
            <option value="NONE">Select Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>{company.companyName}</option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            disabled={!employeeRecord.length}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-5 py-2 rounded shadow font-medium transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Register (Form X)
          </button>
        </div>
      </div>

      {/* Printable Area Wrapper */}
      <div className="w-full overflow-x-auto bg-white p-4 shadow-lg rounded-sm">
        <div ref={printAreaRef} className="print-container w-full">
          <style>{`
            @media print {
              body {
                background: white !important;
                color: #000 !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              .no-print {
                display: none !important;
              }
              .print-container {
                box-shadow: none !important;
                padding: 0 !important;
                width: 100% !important;
                overflow: visible !important;
              }
              @page {
                size: A3 landscape;
                margin: 8mm;
              }
              table {
                page-break-inside: auto;
                width: 100% !important;
                border-collapse: collapse;
              }
              tr {
                page-break-inside: avoid !important;
                page-break-after: auto;
              }
            }
          `}</style>
          
          <table className='w-full border-collapse border border-black'>
            <thead>
              <tr className="bg-gray-100 text-xs">
                <th className='border border-black p-2 min-w-[150px]'>Employee Detail</th>
                <th className='border border-black p-1 text-[10px]'>Time</th>
                {Array.from({ length: 31 }, (_, i) => (
                  <th className='border border-black p-1 text-center font-mono w-[35px]' key={i + 1}>
                    {i + 1}
                  </th>
                ))}
                <th className='border border-black p-2 min-w-[80px]'>Total Summary</th>
              </tr>
            </thead>
            <tbody>
              {employeeRecord.map((emp) => (
                <Report key={emp.empCode} emp={emp} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}