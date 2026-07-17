import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useReactToPrint } from 'react-to-print';





// --- SINGLE PAYSLIP TEMPLATE ---
const PayslipItem = ({ emp, selectedCompanyDetail }) => {

  const monthYear = "MARCH, 2026";
  const totalDays = 31.0;
  const paidLeave = selectedCompanyDetail.leavePolicies.filter((lv) => {
    return lv.paid === true
  });
  let payDays = 0;
  const rateArr = [];
  for (const key in emp.rates) {
    rateArr.push({
      ctn: key,
      value: emp.rates[key]
    })
  }
  const deductionArr = [];
  for (const key in emp.deductions) {
    deductionArr.push({
      ctn: key,
      value: emp.deductions[key]
    })
  }
  const attendanceArr = [];
  for (const key in emp.attendance) {
    if (key !== "workingRecord" && key !== "totalDaysInMonth") {
      attendanceArr.push({ status: key, value: emp.attendance[key] });

    }
    if (paidLeave.some(obj => obj.name === key) || key === "Present") {
      console.log(payDays, emp.attendance[key])
      payDays += emp.attendance[key];
    }
  }
  const halfdays = emp.attendance["Half Day"] || 0;
  payDays = payDays - halfdays * 0.5;



  let totalHoliday = 0;

  for (const key in emp.attendance) {

    if (key.includes("holiday") ||

      key.includes("Holiday") ||

      key.includes("HOLIDAY") ||

      key.includes("WEEK OFF") ||

      key.includes("Week Off") ||

      key.includes("week off")

    ) {

      totalHoliday += Number(emp.attendance[key])

    }

  }


  const payableDays =
    emp.attendance.totalDaysInMonth - totalHoliday;

  const totalWorkingHours = payableDays * emp.workingHour;

  // Basic
  const oneHourBasicPayment =
    emp.rates["Basic Salary"] / totalWorkingHours;

  // HRA
  const oneHourHRAPayment =
    emp.rates.HRA / totalWorkingHours;

  // Employee worked hours
  const employeeWorkingHour = emp.attendance.workingRecord.reduce(
    (sum, wh) => sum + Number(wh.workingHours),
    0
  );




  const earnedRates = {};

  for (const component in emp.rates) {
    const monthlyAmount = Number(emp.rates[component]) || 0;

    const hourlyRate = monthlyAmount / totalWorkingHours;

    earnedRates[component] = hourlyRate * employeeWorkingHour;
  }


  const revisedTotalEarnings = Object.values(earnedRates).reduce(
    (sum, value) => sum + value,
    0
  );

  const totalDeductions = Object.values(emp.deductions).reduce((sum, value) => sum + (Number(value) || 0), 0);

  const netSalary = revisedTotalEarnings - totalDeductions;














  return (
    <div style={{
      width: '210mm',
      padding: '15mm',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif',
      fontSize: '11px',
      color: '#000',
      lineHeight: '1.3',
      borderBottom: '2px dashed #999',
      pageBreakAfter: 'always',
      boxSizing: 'border-box'
    }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
        <div>
          <h2 style={{ margin: '0', fontSize: '15px', fontWeight: 'bold' }}>GURUKIRPA ENTERPRISES</h2>
          <p style={{ margin: '2px 0 0 0', fontSize: '9px', textTransform: 'uppercase' }}>BHIWADI, DISTT ALWAR, RAJASTHAN</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ margin: '0', fontSize: '13px', fontWeight: 'bold' }}>PAY SLIP / वेतन रसीद</h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '10px' }}>FOR THE MONTH OF {monthYear}</p>
        </div>
        <div style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontWeight: 'bold' }}>
          FORM - XI <br /> <span style={{ fontSize: '8px', fontWeight: 'normal' }}>[See Rule 26 (2)]</span>
        </div>
      </div>

      {/* Meta Profile Grid */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '6px' }}>
        <tbody>
          <tr>
            <td style={{ width: '15%', fontWeight: 'bold' }}>EMP. CODE:</td><td style={{ width: '18%' }}>{emp.empCode}</td>
            <td style={{ width: '15%', fontWeight: 'bold' }}>पिता/पति का नाम:</td><td style={{ width: '22%' }}>{emp.fatherName}</td>
            <td style={{ width: '12%', fontWeight: 'bold' }}>Aadhaar No. :</td><td style={{ width: '18%' }}>{emp.aadhaarNo}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>NAME / नाम:</td><td style={{ textTransform: 'uppercase' }}>{emp.name}</td>
            <td style={{ fontWeight: 'bold' }}>PF No. / भविष्य निधि न.:</td><td>{emp.pfNo}</td>
            <td style={{ fontWeight: 'bold' }}>Pan Card No. :</td><td>{emp.panNo}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>DESIG. / पद:</td><td>{emp.designation}</td>
            <td style={{ fontWeight: 'bold' }}>PF UAN No.:</td><td>101234567890</td>
            <td style={{ fontWeight: 'bold' }}>Bank A/c No :</td><td style={{ fontWeight: 'bold' }}>{emp.accountNo}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>DEPT. / विभाग:</td><td>{emp.dept}</td>
            <td style={{ fontWeight: 'bold' }}>ESI No./कर्मचारी राज्य बीमा न.:</td><td>{emp.esiNo}</td>
            <td style={{ fontWeight: 'bold' }}>Bank Name :</td><td>{emp.bankName}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Trade / श्रेणी:</td><td>{emp.trade}</td>
            <td style={{ fontWeight: 'bold' }}>D.O.J. / नियुक्ति की तिथि:</td><td>{emp.doj.split("T")[0]}</td>
            <td style={{ fontWeight: 'bold' }}>IFSC Code No.:</td><td>{emp.ifscCode}</td>
          </tr>
        </tbody>
      </table>

      {/* Structured Ledger Area */}
      <div style={{ display: 'flex', marginTop: '10px', border: '1px solid #000' }}>

        {/* Column 1: Attendance matrix */}
        <div style={{ width: '24%', borderRight: '1px solid #000' }}>
          <div style={{ backgroundColor: '#f0f0f0', textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #000', padding: '3px' }}>ATTENDANCE / दिन</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {attendanceArr.map((obj) => {
                return <tr><td style={{ padding: '3px' }}>{obj.status}:</td><td style={{ textAlign: 'right', padding: '3px', fontWeight: 'bold' }}>{obj.value}</td></tr>
              })}


              <tr style={{ borderTop: '1px solid #000', fontWeight: 'bold' }}><td style={{ padding: '3px' }}>Paydays / कुल दिन:</td><td style={{ textAlign: 'right', padding: '3px' }}>{payDays}</td></tr>
            </tbody>
          </table>
        </div>

        {/* Column 2: Salary Base Structure Rates & Actual Earned Balance Sheet */}
        <div style={{ width: '43%', borderRight: '1px solid #000' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #000', fontWeight: 'bold' }}>
                <td style={{ padding: '3px', width: '40%' }}>SALARY RATE / दर</td>
                <td style={{ padding: '3px', width: '20%', textAlign: 'right' }}>EARNINGS</td>
                <td style={{ padding: '3px', width: '20%', textAlign: 'right' }}>ARREARS</td>
                <td style={{ padding: '3px', width: '20%', textAlign: 'right' }}>TOTAL</td>
              </tr>
            </thead>
            <tbody>
              {rateArr.map((e) => (
                <tr key={e.ctn}>
                  <td className="border w-[110px] border-black pl-2">
                    {e.ctn}
                  </td>

                  <td className="border border-black w-[20px] text-center px-2">
                    {Number(e.value).toFixed(2)}
                  </td>

                  <td className="border border-black w-11 text-center">
                    {0}
                  </td>

                  <td className="border border-black px-2 text-center">
                    {(earnedRates[e.ctn] || 0).toFixed(2)}
                  </td>
                </tr>
              ))}

              <tr style={{ backgroundColor: '#f0f0f0', borderTop: '1px solid #000', fontWeight: 'bold' }}>
                <td style={{ padding: '3px' }}>TOTAL / कुल योग :</td>
                <td style={{ textAlign: 'right' }}>14186.00</td>
                <td style={{ textAlign: 'right' }}>0</td>
                <td style={{ textAlign: 'right' }} className='pl-2'>{revisedTotalEarnings.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Column 3: Reductions & Net Payout calculation wrapper */}
        <div style={{ width: '33%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0', borderBottom: '1px solid #000', fontWeight: 'bold' }}>
                <td style={{ padding: '3px', width: '65%' }}>DEDUCTIONS / कटौती</td>
                <td style={{ padding: '3px', width: '35%', textAlign: 'right' }}>TOTAL</td>
              </tr>
            </thead>
            <tbody>
              {
                deductionArr.map((elem) => {
                  return (
                    <tr>
                      <td style={{ padding: '3px' }}>{elem.ctn}</td>
                      <td style={{ textAlign: 'right', padding: '3px' }}>{elem.value}</td>
                    </tr>
                  )
                })
              }

              <tr style={{ backgroundColor: '#f0f0f0', borderTop: '1px solid #000', fontWeight: 'bold' }}>
                <td style={{ padding: '3px' }}>TOTAL / कुल योग :</td>
                <td style={{ textAlign: 'right', padding: '3px' }}>{totalDeductions}.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Disclaimer & Signatures context */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '9px' }}>
        <div style={{ width: '40%' }}>
          <p style={{ margin: '0', fontStyle: 'italic', fontWeight: 'bold' }}>( This is an electronically generated Payslip, hence does not require a signature. )</p>
          <p style={{ margin: '4px 0 0 0', color: '#555' }}>If you salute your duty, You don't need to salute anybody. But if you pollute your duty, You have to salute everybody.</p>
        </div>
        <div style={{ width: '25%', textAlign: 'center' }}>
          <div style={{ height: '35px' }}></div>
          <p style={{ margin: '0', borderTop: '1px solid #000', paddingTop: '2px' }}>Mode of Payment: Bank Transfer</p>
        </div>
        <div style={{ width: '30%', border: '1px solid #000', textAlign: 'center', padding: '5px', alignSelf: 'center', backgroundColor: '#f9f9f9' }}>
          <span style={{ fontSize: '10px', fontWeight: 'bold' }}>NET SALARY PAYABLE</span>
          <h3 style={{ margin: '3px 0 0 0', fontSize: '16px', fontWeight: 'bold' }}>₹ {netSalary}</h3>
        </div>
      </div>
    </div>
  );
};

// --- MAIN WRAPPER CONTAINER ---
export default function PayslipGenerator() {
  const componentRef = useRef();
  const [employeeRecord, setEmployeeRecord] = useState([])
  const [selectedCompany, setSelectedCompany] = useState("")
  const [selectedCompanyDetail, setSelectedCompanyDetail] = useState({})
  const [reportDate, setReportDate] = useState("")
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'All_Employee_Payslips_March_2026',
  });

  useEffect(() => {
    getCompanies();
  }, [])

  useEffect(() => {
    (selectedCompany && reportDate) && getAttendanceRecord();
  }, [selectedCompany, reportDate])

  const getToken = () => {
    const token = localStorage.getItem("codeflame_payroll2003");
    if (!token) {
      toast.error("Session expired");
      navigate("/login");
      throw new Error("No token");
    }
    return token;
  };

  const onChangeSelectCompany = (id) => {
    const company = companies.find((cmp) => cmp.id === id)
    setSelectedCompanyDetail(company)
    setSelectedCompany(id)

  }
  const getCompanies = async () => {
    const token = getToken();
    try {
      const res = await axios.get("https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/company",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setCompanies(res.data.data.map((comp) => {
        return {
          id: comp._id,
          companyName: comp.name,
          earnings: comp.earning,
          deductions: comp.deduction,
          leavePolicies: comp.leavePolicies
        }
      }))

    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login")
      }
      alert(error.message)
      console.log(error)
    }
  }



  const getAttendanceRecord = async () => {
    const [year, month] = reportDate.split("-");
    const token = getToken();
    try {
      const res = await axios.get(`https://payroll-backend-pearl.vercel.app/codeflame/payroll/api/attendance/register-report?compId=${selectedCompany}&year=${year}&month=${parseInt(month)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

      const groupedEmployees = Object.values(
        res.data.data.reduce((acc, record) => {
          const emp = record.empId;
          const id = emp._id;

          if (!acc[id]) {
            acc[id] = {
              empCode: emp.empId,
              name: `${emp.firstName} ${emp.lastName || ""}`.trim(),
              designation: emp.designation,
              dept: emp.department_name,
              fatherName: emp.fatherName,
              doj: emp.DOJ,
              bankName: emp.BankName,
              accountNo: emp.BankAccountNo,
              ifscCode: emp.BankIFSC,
              panNo: emp.PanNo,
              aadhaarNo: emp.aadhaarNo,
              pfNo: emp.PFNo,
              esiNo: emp.ESINo,
              workingHour: emp.workingHour,

              attendance: {


                totalDaysInMonth: res?.data?.meta?.totalDaysInMonth || 0,
                workingRecord: []
              },

              rates: emp.earning,

              deductions: emp.deduction
            };
          }
          acc[id].attendance.workingRecord.push({
            workingHours: record.workingHours
          })


          acc[id].attendance[record.status] = (acc[id].attendance[record.status] || 0) + 1;






          return acc;
        }, {})
      );

      setEmployeeRecord(groupedEmployees)



    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login")
      }
      alert(error.message)
      console.log(error)
    }
  }








  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '20px', color: '#333' }}>Payroll Registry Portal</h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>Batch Processing for March 2026</p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">

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
        <button
          onClick={handlePrint}
          style={{
            backgroundColor: '#0056b3',
            color: '#white',
            border: 'none',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: 'bold',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Create & Print Slips
        </button>
      </div>

      {/* Print Target Viewport Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center' }}>
        <div ref={componentRef} style={{ backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          {employeeRecord.map((employee) => (
            <PayslipItem key={employee.empCode} emp={employee} selectedCompanyDetail={selectedCompanyDetail} />
          ))}
        </div>
      </div>
    </div>
  );
}