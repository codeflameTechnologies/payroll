import axios from 'axios';

import React, { useEffect, useRef, useState } from 'react';

import { useReactToPrint } from 'react-to-print';

import { pl, tr } from 'zod/v4/locales';


const monthObj = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};





function Payroll({ emp, index, cmp }) {


  const paidLeave = cmp.leavePolicies.filter((lv) => {

    return lv.paid === true;

  })

  const unpaidLeave = cmp.leavePolicies.filter((lv) => {

    return lv.paid == false;

  })
  const paydayArr = [];

  const leaveMatrics = [];

  paidLeave.map((pl) => {

    paydayArr.push({

      name: pl.name,

      value: emp.attendance[pl.name] || 0

    })

  })

  paydayArr.push({

    name: "Present",

    value: emp.attendance["Present"] || 0

  })


  unpaidLeave.map((ul) => {

    leaveMatrics.push({

      name: ul.name,

      value: emp.attendance[ul.name] || 0

    })

  })
  const halfdays = emp.attendance["Half Day"] || 0;
  const paydays = paydayArr.reduce((sum, d) => sum + Number(d.value), 0) - halfdays * 0.5;








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

  const oneDayBasicSalary = emp.rates["Basic Salary"] / emp.attendance.totalDaysInMonth;

  const oneHourBasicPayment = oneDayBasicSalary / emp.workingHour;

  const oneDayBasicHRA = emp.rates.HRA / emp.attendance.totalDaysInMonth

  const oneHourHRAPayment = oneDayBasicHRA / emp.workingHour



  const totalWorkingHour = emp.attendance.totalDaysInMonth * emp.workingHour - (totalHoliday * emp.workingHour);

  const employeeWorkingHour = emp.attendance.workingRecord.reduce((sum, wh) => sum + Number(wh.workingHours), 0)

  const overTime = (totalWorkingHour - employeeWorkingHour) < 0 ? (totalWorkingHour - employeeWorkingHour) * -1 : 0;



  const totalEarnings = Object.values(emp.rates).reduce((sum, value) => sum + (Number(value) || 0), 0);

  const totalDeductions = Object.values(emp.deductions).reduce((sum, value) => sum + (Number(value) || 0), 0);

  const netSalary = totalEarnings - totalDeductions;

  const basicSalary = emp.rates["Basic Salary"];
  const hra = emp.rates.HRA


  return (

    <tr key={emp.empCode} className="border-b   border-black align-top hover:bg-gray-50">

      {/* Row Metadata */}

      <td className="border-r border-black p-1 text-center font-bold">{index + 1}</td>

      <td className="border-r border-black p-1 text-center font-bold">{emp.empCode}</td>



      {/* Profile Stack */}
      <td className="border-r   border-black p-1 tracking-tight leading-tight">

        <div className="font-bold text-[10px] text-nowrap">{emp.name}</div>

        <div className="text-gray-700 text-[8px]">{emp.fatherName}</div>

        <div className="text-gray-800 font-medium">{emp.designation}</div>

        <div className="text-gray-600">{emp.dept}</div>

        {/* <div className="text-[8px] italic text-blue-900">{emp.category}</div> */}

        <div className="text-[8px] text-gray-500 mt-0.5">DOJ: {emp.doj.split("T")[0]}</div>

      </td>

      {/* Leaves Sub-grid */}

      <table className="w-full text-[9px]">
        <tbody>
          {leaveMatrics.map((item) => (
            <tr key={item.name}>
              <td className='text-nowrap px-2'>{item.name}</td>
              <td className="text-right px-2 font-semibold">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Attendance Sub-grid */}
      <td className="border border-black p-1 align-top">
        <table className="w-full text-[9px]">
          <tbody>
            {paydayArr.map((item, i) => (
              <tr key={item.name}>
                <td className={`${i === 0 ? '' : 'text-nowrap'}`}>{item.name}</td>
                <td className="text-right">
                  {item.value}
                </td>
              </tr>
            ))}

            <tr className="border-t font-bold bg-green-50">
              <td>Paydays</td>
              <td className="text-right">
                {paydays}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
      {/* Show all rates */}







      {rateArr.map((e, i) => (

        <tr key={e.ctn}>

          <td className="border w-[110px] border-black pl-2">
            {e.ctn}
          </td>

          <td className="border border-black w-[20px] text-center px-2">
            {e.value || 0}
          </td>

          <td className="border border-black w-11  text-center">
            0
          </td>

          <td className="border border-black px-2 text-center">

            {e.ctn === "Basic Salary"
              ? (oneDayBasicSalary * paydays).toFixed(2)
              : e.ctn === "HRA"
                ? (oneDayBasicHRA * paydays).toFixed(2)
                : Number(e.value || 0).toFixed(2)}

          </td>



        </tr>

      ))}


      <td

        className="border border-black text-center px-2 align-top font-semibold"
      >
        {overTime}/{(overTime * oneHourBasicPayment).toFixed(2)}
      </td>









      <td className='border-r text-center text-xs pt-[2%] px-2 border-black'>
        {((totalEarnings + (oneDayBasicSalary * paydays) + (oneDayBasicHRA * paydays) + (overTime * oneHourBasicPayment)) - basicSalary - hra).toFixed(2)}
      </td>
      <td className='border-r border-black w-44'>
        {deductionArr.map((d) => {
          return (
            <tr className="   space-y-1">

              <td className='border-b border-black px-2 w-24'>{d.ctn}</td>
              <td className='border-b border-black  px-2'>:{d.value || 0}</td>

            </tr>
          )
        })}
      </td>
      <td className='border-r border-black text-center text-xs px-1 pt-[2%] '>{totalDeductions}</td>
      <td className='border-r border-black text-center text-xs px-1 pt-[2%] '>{(((totalEarnings + (oneDayBasicSalary * paydays) + (oneDayBasicHRA * paydays) + (overTime * oneHourBasicPayment)) - basicSalary - hra) - totalDeductions).toFixed(2)}</td>

      {/* Bank Details Field Layout */}
      <td className="p-1 text-[8px] font-sans leading-tight">
        <span className="font-bold text-gray-700 block">{emp.bankName}</span>
        <span className="text-gray-500 block font-mono">{emp.accountNo || 'N/A'}</span>
        <div className="mt-2 border-t border-gray-400 pt-4 text-center text-[7px] text-gray-400 italic">Sign / Thumb</div>
      </td>

    </tr>

  );

}















export default function PayrollRegister() {

  const [employeeRecord, setEmployeeRecord] = useState([])

  const [selectedCompany, setSelectedCompany] = useState("")

  const [selectedCompanyDetail, setSelectedCompanyDetail] = useState({})

  const [companies, setCompanies] = useState([]);
  const [reportDate, setReportDate] = useState("");

  const printAreaRef = useRef();



  const handlePrint = useReactToPrint({

    contentRef: printAreaRef,

    documentTitle: 'All_Employee_Payroll_March_2026',



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
      navitgate("/login");
      throw new Error("No token");
    }
    return token;
  };

  const getCompanies = async () => {
   const token = getToken();
    try {

      const res = await axios.get("http://localhost:4000/codeflame/payroll/api/company",
        {
          headers:{
            Authorization:`Bearer ${token}`
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

      alert(error.message)

      console.log(error)

    }

  }



  const onChangeSelectCompany = (id) => {

    const company = companies.find((cmp) => cmp.id === id)
    setSelectedCompanyDetail(company)
    setSelectedCompany(id)

  }

  const getAttendanceRecord = async () => {
    console.log("Selected Date:", reportDate)
    const [year, month] = reportDate.split("-");
    const token = getToken();

    try {

      const res = await axios.get(`http://localhost:4000/codeflame/payroll/api/attendance/register-report?compId=${selectedCompany}&year=${Number(year)}&month=${Number(month)}`,
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

      console.log("groupedEmployees:,", groupedEmployees)

      setEmployeeRecord(groupedEmployees)



    } catch (error) {

      alert(error.message)

      console.log(error)

    }

  }






  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Action Header Panel */}

      <div className="mb-4 flex justify-between items-center bg-white p-4 rounded shadow no-print">

        <div>

          <h1 className="text-xl font-bold text-gray-800">Payroll Management</h1>


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

          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow font-medium transition-colors flex items-center gap-2"

        >

          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">

            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />

          </svg>

          Print Register (Form X)

        </button>

      </div>



      {/* Printable Payroll Canvas */}

      <div ref={printAreaRef} className="bg-white p-4 shadow-lg overflow-x-auto print-container">

        {/* Print specific CSS modifications */}

        <style>{`

          @media print {

            body { background: none; color: #000; margin: 0; padding: 0; }

            .no-print { display: none !important; }

            .print-container { box-shadow: none !important; padding: 0 !important; width: 100% !important; }

            @page { size: A4 landscape; margin: 4mm; }

            table { page-break-inside: auto; }

            tr { page-break-inside: avoid; page-break-after: auto; }

          }

        `}</style>



        {/* Top Header Information Elements */}

        <div className="border border-black p-2 mb-1 flex justify-between items-start font-mono text-xs uppercase">

          <div>

            <h2 className="text-base font-black tracking-wide">GURUKRIPA ENTERPRISES</h2>

            <p className="text-[10px]">BHIWADI, DISTT ALWAR, RAJASTHAN</p>

          </div>

          <div className="text-center">

            <h2 className="text-base font-black tracking-wider">REGISTER OF PAYMENT OF WAGES</h2>

            <p className="font-bold text-[11px] mt-0.5">(WITH EMPLOYEES INSURANCE COLUMN)</p>

            <p className="text-sm font-black mt-1 bg-gray-200 px-2 py-0.5 border border-black inline-block">SALARY REGISTER FOR THE MONTH OF: {monthObj[Number(reportDate.split("-")[1])]}, {reportDate.split("-")[0]}</p>

          </div>

          <div className="text-right">

            <h2 className="text-base font-black">FORM X</h2>

            <p className="text-[10px] font-bold">[Rule 26(1)]</p>

            <p className="text-[10px] mt-2">Page 1 of 2</p>

          </div>

        </div>



        {/* Master Data Grid Table Structure */}

        <table className="w-full border-collapse border border-black font-mono uppercase text-[9px] overflow-auto text-left select-none">

          <thead>

            {/* Main Header Rows */}

            <tr className="bg-gray-100 text-center font-bold border-b border-black">

              <th className="border-r border-black p-1 w-8" rowSpan="2">S.No.</th>

              <th className="border-r border-black p-1 w-10" rowSpan="2">Paycode</th>

              <th className="border-r border-black p-1 text-left w-32" rowSpan="2">

                Employee Details



              </th>

              <th className="border-r border-black p-1 w-44" rowSpan="2">Leave metrics</th>

              <th className="border-r border-black p-1 w-36" rowSpan="2">Paydays</th>

              <th className="border-r border-black p-1" >Rate of Salary / Earnings / Arrear / Total</th>
              <th className="border-r border-black p-1" rowSpan={2} >Hrs/AMT</th>
              <th className="border-r border-black p-1" rowSpan={2} >Gross</th>





              <th className="border-r border-black p-1" rowSpan="2">Deductions</th>

              <th className="border-r border-black p-1 w-16" rowSpan="2">Total Ded.</th>

              <th className="border-r border-black p-1 w-20" rowSpan="2">Net Pay Salary</th>

              <th className="p-1 w-32" rowSpan="2">Payment Details</th>

            </tr>




            <tr className="bg-gray-100 font-bold">

              <thead  >

                <th className="border-r border-black w-64 px-2 pr-5 text-nowrap">
                  Salary Component
                </th>


                <th className="border-r border-black px-2">
                  Rate
                </th>

                <th className="border-r border-black px-2">
                  Arrear
                </th>

                <th className="border-r border-black px-2">
                  Earned
                </th>


              </thead>



            </tr>

          </thead>



          <tbody>

            {employeeRecord.map((emp, index) => {

              return <Payroll emp={emp} index={index} cmp={selectedCompanyDetail} />

            })}

          </tbody>

        </table>



        {/* Footer Authorization Block */}

        <div className="mt-4 flex justify-between items-center font-mono text-[10px] p-2 border border-black">

          <div>Prepared By: _________________</div>

          <div>Checked By: _________________</div>

          <div className="text-right font-bold">Authorized Signatory / Stamp: ______________________</div>

        </div>

      </div>

    </div>

  );

}

