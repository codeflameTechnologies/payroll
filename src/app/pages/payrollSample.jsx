import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

// Mock Data matching the provided image structure
const payrollData = [
  {
    paycode: "00024",
    name: "RAJENDERA SINGH YADAV",
    fatherName: "MAKHAN",
    designation: "SECURITY GUARD",
    dept: "ADMIN",
    category: "GENERAL",
    doj: "01-03-2025",
    leaves: { el: 0.0, cl: 1.0, sl: 0.0, lwp: 0.0, abs: 0.0 },
    paydays: { pr: 24.0, wof: 4.0, hd: 2.0, lv: 1.0, total: 31.0 },
    earnings: { basic: 9000, hra: 5186, conv: 0, medical: 0, other: 0, misc: 0, bonus: 0, incentive: 0 },
    overtime: { hrs: 0, amt: 0 },
    deductions: { pf: 1080, esi: 106, lwf: 0, adv: 10000, tds: 0, loan: 0, others: 0 },
    paymentMode: "Bank Transfer",
    bankAc: "701139497"
  },
  {
    paycode: "00036",
    name: "HARISH CHANDRA",
    fatherName: "SH",
    designation: "SECURITY GUARD",
    dept: "ADMIN",
    category: "HIGHLY SKILLED",
    doj: "27-08-2025",
    leaves: { el: 0.0, cl: 0.0, sl: 0.0, lwp: 0.0, abs: 27.0 },
    paydays: { pr: 2.0, wof: 0.0, hd: 2.0, lv: 0.0, total: 4.0 },
    earnings: { basic: 1161, hra: 669, conv: 0, medical: 0, other: 0, misc: 121, bonus: 0, incentive: 0 },
    overtime: { hrs: 0, amt: 0 },
    deductions: { pf: 139, esi: 14, lwf: 0, adv: 0, tds: 0, loan: 0, others: 0 },
    paymentMode: "Bank Transfer",
    bankAc: ""
  },
  {
    paycode: "00037",
    name: "AJAY KUMAR",
    fatherName: "PARMOD KUMAR",
    designation: "SECURITY GUARD",
    dept: "ADMIN",
    category: "HIGHLY SKILLED",
    doj: "27-08-2025",
    leaves: { el: 0.0, cl: 1.0, sl: 0.0, lwp: 0.0, abs: 0.0 },
    paydays: { pr: 23.0, wof: 5.0, hd: 2.0, lv: 1.0, total: 31.0 },
    earnings: { basic: 9000, hra: 5186, conv: 0, medical: 0, other: 0, misc: 0, bonus: 0, incentive: 0 },
    overtime: { hrs: 0, amt: 0 },
    deductions: { pf: 1080, esi: 106, lwf: 0, adv: 6500, tds: 0, loan: 0, others: 0 },
    paymentMode: "Bank Transfer",
    bankAc: "9536460624"
  }
];

export default function PayrollRegister() {
  const printAreaRef = useRef();

 const handlePrint = useReactToPrint({
     contentRef: printAreaRef,
     documentTitle: 'All_Employee_Payroll_March_2026',
   });

  // Helper calculation functions
  const calculateTotalEarnings = (e) => e.basic + e.hra + e.conv + e.medical + e.other + e.misc + e.bonus + e.incentive;
  const calculateTotalDeductions = (d) => d.pf + d.esi + d.lwf + d.adv + d.tds + d.loan + d.others;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Action Header Panel */}
      <div className="mb-4 flex justify-between items-center bg-white p-4 rounded shadow no-print">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Payroll Management</h1>
          <p className="text-sm text-gray-500">Month: March, 2026</p>
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
            <p className="text-sm font-black mt-1 bg-gray-200 px-2 py-0.5 border border-black inline-block">SALARY REGISTER FOR THE MONTH OF: MARCH, 2026</p>
          </div>
          <div className="text-right">
            <h2 className="text-base font-black">FORM X</h2>
            <p className="text-[10px] font-bold">[Rule 26(1)]</p>
            <p className="text-[10px] mt-2">Page 1 of 2</p>
          </div>
        </div>

        {/* Master Data Grid Table Structure */}
        <table className="w-full border-collapse border border-black font-mono uppercase text-[9px] text-left select-none">
          <thead>
            {/* Main Header Rows */}
            <tr className="bg-gray-100 text-center font-bold border-b border-black">
              <th className="border-r border-black p-1 w-8" rowSpan="2">S.No.</th>
              <th className="border-r border-black p-1 w-10" rowSpan="2">Paycode</th>
              <th className="border-r border-black p-1 text-left w-48" rowSpan="2">
                Employee Details
                <span className="block text-[8px] font-normal lowercase text-gray-600">Name / Father Name / Desig / Dept / Cat / DOJ</span>
              </th>
              <th className="border-r border-black p-1 w-20" rowSpan="2">Leave metrics</th>
              <th className="border-r border-black p-1 w-20" rowSpan="2">Paydays</th>
              <th className="border-r border-black p-1" colSpan="3">Rate of Salary / Earnings / Arrear / Total</th>
              <th className="border-r border-black p-1" colSpan="2">Overtime</th>
              <th className="border-r border-black p-1 w-16" rowSpan="2">Gross Amount</th>
              <th className="border-r border-black p-1" colSpan="4">Deductions</th>
              <th className="border-r border-black p-1 w-16" rowSpan="2">Total Ded.</th>
              <th className="border-r border-black p-1 w-20" rowSpan="2">Net Pay Salary</th>
              <th className="p-1 w-32" rowSpan="2">Payment Details</th>
            </tr>
            <tr className="bg-gray-50 text-center font-bold border-b border-black text-[8px]">
              <th className="border-r border-black p-1 w-14">Basic<br/>HRA</th>
              <th className="border-r border-black p-1 w-14">Conv<br/>Medical</th>
              <th className="border-r border-black p-1 w-16">Other / Misc<br/>Bonus / Inc.</th>
              <th className="border-r border-black p-1 w-10">Hrs</th>
              <th className="border-r border-black p-1 w-12">Amt</th>
              <th className="border-r border-black p-1 w-12">PF / ESI</th>
              <th className="border-r border-black p-1 w-10">LWF</th>
              <th className="border-r border-black p-1 w-12">Adv / TDS</th>
              <th className="border-r border-black p-1 w-12">Loan / Oth</th>
            </tr>
          </thead>
          
          <tbody>
            {payrollData.map((emp, index) => {
              const totalEarnings = calculateTotalEarnings(emp.earnings);
              const totalDeductions = calculateTotalDeductions(emp.deductions);
              const netPay = totalEarnings + emp.overtime.amt - totalDeductions;

              return (
                <tr key={emp.paycode} className="border-b border-black align-top hover:bg-gray-50">
                  {/* Row Metadata */}
                  <td className="border-r border-black p-1 text-center font-bold">{index + 1}</td>
                  <td className="border-r border-black p-1 text-center font-bold">{emp.paycode}</td>
                  
                  {/* Profile Stack */}
                  <td className="border-r border-black p-1 tracking-tight leading-tight">
                    <div className="font-bold text-[10px]">{emp.name}</div>
                    <div className="text-gray-700 text-[8px]">{emp.fatherName}</div>
                    <div className="text-gray-800 font-medium">{emp.designation}</div>
                    <div className="text-gray-600">{emp.dept}</div>
                    <div className="text-[8px] italic text-blue-900">{emp.category}</div>
                    <div className="text-[8px] text-gray-500 mt-0.5">DOJ: {emp.doj}</div>
                  </td>
                  
                  {/* Leaves Sub-grid */}
                  <td className="border-r border-black p-0 text-[8px]">
                    <div className="grid grid-cols-2 border-b border-gray-200 px-1"><span>EL:</span><span className="text-right">{emp.leaves.el.toFixed(1)}</span></div>
                    <div className="grid grid-cols-2 border-b border-gray-200 px-1"><span>CL:</span><span className="text-right">{emp.leaves.cl.toFixed(1)}</span></div>
                    <div className="grid grid-cols-2 border-b border-gray-200 px-1"><span>SL:</span><span className="text-right">{emp.leaves.sl.toFixed(1)}</span></div>
                    <div className="grid grid-cols-2 border-b border-gray-200 px-1"><span>LWP:</span><span className="text-right">{emp.leaves.lwp.toFixed(1)}</span></div>
                    <div className="grid grid-cols-2 px-1 font-bold bg-orange-50"><span>ABS:</span><span className="text-right text-red-600">{emp.leaves.abs.toFixed(1)}</span></div>
                  </td>

                  {/* Attendance Sub-grid */}
                  <td className="border-r border-black p-0 text-[8px] font-medium">
                    <div className="grid grid-cols-2 border-b border-gray-200 px-1"><span>PR:</span><span className="text-right">{emp.paydays.pr.toFixed(1)}</span></div>
                    <div className="grid grid-cols-2 border-b border-gray-200 px-1"><span>WOF:</span><span className="text-right">{emp.paydays.wof.toFixed(1)}</span></div>
                    <div className="grid grid-cols-2 border-b border-gray-200 px-1"><span>HD:</span><span className="text-right">{emp.paydays.hd.toFixed(1)}</span></div>
                    <div className="grid grid-cols-2 border-b border-gray-200 px-1"><span>LV:</span><span className="text-right">{emp.paydays.lv.toFixed(1)}</span></div>
                    <div className="grid grid-cols-2 px-1 font-bold bg-green-50 text-emerald-800"><span>TOT:</span><span className="text-right">{emp.paydays.total.toFixed(1)}</span></div>
                  </td>

                  {/* Earnings Blocks matching exact photo structures */}
                  <td className="border-r border-black p-1 text-right space-y-1">
                    <div>{emp.earnings.basic}</div>
                    <div className="text-gray-600 pt-1 border-t border-dashed border-gray-300">{emp.earnings.hra}</div>
                  </td>
                  <td className="border-r border-black p-1 text-right space-y-1">
                    <div>{emp.earnings.conv}</div>
                    <div className="text-gray-600 pt-1 border-t border-dashed border-gray-300">{emp.earnings.medical}</div>
                  </td>
                  <td className="border-r border-black p-1 text-right space-y-1">
                    <div>{emp.earnings.other} / {emp.earnings.misc}</div>
                    <div className="text-gray-600 pt-1 border-t border-dashed border-gray-300">{emp.earnings.bonus} / {emp.earnings.incentive}</div>
                    <div className="pt-1 border-t border-black font-bold text-black">{totalEarnings}</div>
                  </td>

                  {/* Overtime Blocks */}
                  <td className="border-r border-black p-1 text-center font-bold text-gray-500">{emp.overtime.hrs || '-'}</td>
                  <td className="border-r border-black p-1 text-right font-bold">{emp.overtime.amt || '-'}</td>

                  {/* Gross Total */}
                  <td className="border-r border-black p-1 text-right font-black bg-gray-50 text-gray-900">{totalEarnings + emp.overtime.amt}</td>

                  {/* Deductions Columns */}
                  <td className="border-r border-black p-1 text-right space-y-1">
                    <div className="text-red-700 font-medium">{emp.deductions.pf}</div>
                    <div className="text-red-600 pt-1 border-t border-dashed border-gray-300">{emp.deductions.esi}</div>
                  </td>
                  <td className="border-r border-black p-1 text-right text-red-600">{emp.deductions.lwf || '-'}</td>
                  <td className="border-r border-black p-1 text-right space-y-1">
                    <div className="text-red-600">{emp.deductions.adv || '-'}</div>
                    <div className="text-red-600 pt-1 border-t border-dashed border-gray-300">{emp.deductions.tds || '-'}</div>
                  </td>
                  <td className="border-r border-black p-1 text-right space-y-1">
                    <div className="text-red-600">{emp.deductions.loan || '-'}</div>
                    <div className="text-red-600 pt-1 border-t border-dashed border-gray-300">{emp.deductions.others || '-'}</div>
                  </td>

                  {/* Summarized Aggregates */}
                  <td className="border-r border-black p-1 text-right font-bold text-red-700 bg-red-50/40">{totalDeductions}</td>
                  <td className="border-r border-black p-1 text-right font-black text-sm bg-green-50 text-green-900 tracking-tight">
                    ₹{netPay.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </td>
                  
                  {/* Bank Details Field Layout */}
                  <td className="p-1 text-[8px] font-sans leading-tight">
                    <span className="font-bold text-gray-700 block">{emp.paymentMode}</span>
                    <span className="text-gray-500 block font-mono">{emp.bankAc || 'N/A'}</span>
                    <div className="mt-2 border-t border-gray-400 pt-4 text-center text-[7px] text-gray-400 italic">Sign / Thumb</div>
                  </td>
                </tr>
              );
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