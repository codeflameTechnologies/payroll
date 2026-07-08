import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

// --- SAMPLE EMPLOYEE DATA MATRIX ---
const SAMPLE_EMPLOYEES = [
  {
    empCode: "00024",
    name: "RAJBENDRA SINGH YADAV",
    designation: "SECURITY GUARD",
    dept: "ADMIN",
    trade: "GENERAL",
    fatherName: "MAKHIKHAN",
    doj: "01/03/2025",
    bankName: "State Bank of India",
    accountNo: "7011399497",
    ifscCode: "SBIN0001234",
    panNo: "ABCDE1234F",
    aadhaarNo: "1234-5678-9012",
    pfNo: "DL/CPM/12345/00024",
    esiNo: "2012345678",
    attendance: { present: 24, voff: 4, holiday: 2, leave: 1, absent: 0 },
    rates: { basic: 9000, hra: 5186 },
    advance: 10000,
    loan: 0
  },
  {
    empCode: "00036",
    name: "HARISH CHANDRA",
    designation: "SECURITY GUARD",
    dept: "ADMIN",
    trade: "HIGHLY SKILLED",
    fatherName: "SH. RAM",
    doj: "27/08/2025",
    bankName: "Punjab National Bank",
    accountNo: "123456789012",
    ifscCode: "PUNB0123456",
    panNo: "XYZW9876G",
    aadhaarNo: "9876-5432-1098",
    pfNo: "DL/CPM/12345/00036",
    esiNo: "2098765432",
    attendance: { present: 2, voff: 0, holiday: 2, leave: 0, absent: 27 },
    rates: { basic: 9000, hra: 5186 },
    advance: 0,
    loan: 0
  },
  {
    empCode: "00037",
    name: "AJAY KUMAR",
    designation: "SECURITY GUARD",
    dept: "ADMIN",
    trade: "HIGHLY SKILLED",
    fatherName: "PARMOD KUMAR",
    doj: "27/08/2025",
    bankName: "HDFC Bank",
    accountNo: "9536460624",
    ifscCode: "HDFC0000123",
    panNo: "QWER7654M",
    aadhaarNo: "5555-6666-7777",
    pfNo: "DL/CPM/12345/00037",
    esiNo: "2055555555",
    attendance: { present: 23, voff: 5, holiday: 2, leave: 1, absent: 0 },
    rates: { basic: 9000, hra: 5186 },
    advance: 6500,
    loan: 0
  }
];












// --- SINGLE PAYSLIP TEMPLATE ---
const PayslipItem = ({ emp }) => {
  console.log("employee data:", emp)
  const monthYear = "MARCH, 2026";
  const totalDays = 31.0;
  const payDays = emp.attendance.present + emp.attendance.voff + emp.attendance.holiday + emp.attendance.leave;
  const oneDayBasicSalary = emp.rates.basic/emp.attendance.totalDaysInMonth;
  const oneHourBasicPayment = oneDayBasicSalary / emp.workingHour;
  const oneDayBasicHRA = emp.rates.hra/emp.attendance.totalDaysInMonth
  const oneHourHRAPayment = oneDayBasicHRA/emp.workingHour


  const totalEarnings = Object.values(emp.rates).reduce((sum, value) => sum + (Number(value) || 0), 0);

  
  const totalDeductions = Object.values(emp.deductions).reduce((sum, value) => sum + (Number(value) || 0), 0);
  const netSalary = totalEarnings - totalDeductions;








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
          <h2 style={{ margin: '0', fontSize: '15px', fontWeight: 'bold' }}>GURUKRIPA ENTERPRISES</h2>
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
            <td style={{ fontWeight: 'bold' }}>D.O.J. / नियुक्ति की तिथि:</td><td>{emp.doj}</td>
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
              <tr><td style={{ padding: '3px' }}>PRESENT / उपस्थित:</td><td style={{ textAlign: 'right', padding: '3px', fontWeight: 'bold' }}>{emp.attendance.present.toFixed(2)}</td></tr>
              <tr><td style={{ padding: '3px' }}>W.OFF / सा. अवकाश:</td><td style={{ textAlign: 'right', padding: '3px', fontWeight: 'bold' }}>{emp.attendance.voff.toFixed(2)}</td></tr>
              <tr><td style={{ padding: '3px' }}>HOLIDAY / अवकाश:</td><td style={{ textAlign: 'right', padding: '3px', fontWeight: 'bold' }}>{emp.attendance.holiday.toFixed(2)}</td></tr>
              <tr><td style={{ padding: '3px' }}>LEAVE / छुट्टियाँ:</td><td style={{ textAlign: 'right', padding: '3px', fontWeight: 'bold' }}>{emp.attendance.leave.toFixed(2)}</td></tr>
              <tr><td style={{ padding: '3px' }}>ABSENT / अनुपस्थित:</td><td style={{ textAlign: 'right', padding: '3px', fontWeight: 'bold' }}>{emp.attendance.absent.toFixed(2)}</td></tr>
              <tr style={{ borderTop: '1px solid #000', fontWeight: 'bold' }}><td style={{ padding: '3px' }}>Paydays / कुल दिन:</td><td style={{ textAlign: 'right', padding: '3px' }}>{payDays.toFixed(1)}</td></tr>
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
              <tr><td style={{ padding: '3px' }}>BASIC / मूल वेतन</td><td style={{ textAlign: 'right' }}>{emp.rates.basic}</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{oneDayBasicSalary*payDays}</td></tr>
              <tr><td style={{ padding: '3px' }}>HRA / मकान भत्ता</td><td style={{ textAlign: 'right' }}>{emp.rates.hra}</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{(oneDayBasicHRA*payDays).toFixed(2)}</td></tr>
              <tr><td style={{ padding: '3px' }}>CONV / यातायात भत्ता</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>0</td></tr>
              <tr><td style={{ padding: '3px' }}>MEDICAL</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>0</td></tr>
              <tr><td style={{ padding: '3px' }}>EL_Encash</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>0</td></tr>
              <tr><td style={{ padding: '3px' }}>Misc</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{emp.rates.misc}</td></tr>
              <tr><td style={{ padding: '3px' }}>Statutory Bonus</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>0</td></tr>
              <tr><td style={{ padding: '3px' }}>Attendance Incentive</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>0</td></tr>
              <tr><td style={{ padding: '3px' }}>OT AMT / अतिरिक्त कार्य</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right' }}>0</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>0</td></tr>
              <tr style={{ backgroundColor: '#f0f0f0', borderTop: '1px solid #000', fontWeight: 'bold' }}>
                <td style={{ padding: '3px' }}>TOTAL / कुल योग :</td>
                <td style={{ textAlign: 'right' }}>14186.00</td>
                <td style={{ textAlign: 'right' }}>0</td>
                <td style={{ textAlign: 'right' }}>{totalEarnings}.00</td>
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
              <tr><td style={{ padding: '3px' }}>E.P.F. / भविष्य निधि</td><td style={{ textAlign: 'right', padding: '3px' }}>{emp.deductions.pf}.00</td></tr>
              <tr><td style={{ padding: '3px' }}>VPF / स्वैच्छिक भविष्य निधि</td><td style={{ textAlign: 'right', padding: '3px' }}>0.00</td></tr>
              <tr><td style={{ padding: '3px' }}>E.S.I. / कर्मचारी राज्य बीमा</td><td style={{ textAlign: 'right', padding: '3px' }}>{emp.deductions.esi}.00</td></tr>
              <tr><td style={{ padding: '3px' }}>LWF / कल्याणकारी फण्ड</td><td style={{ textAlign: 'right', padding: '3px' }}>0.00</td></tr>
              <tr><td style={{ padding: '3px' }}>ADVANCE / अग्रिम</td><td style={{ textAlign: 'right', padding: '3px', fontWeight: emp.advance > 0 ? 'bold' : 'normal' }}>{emp.advance}.00</td></tr>
              <tr><td style={{ padding: '3px' }}>LOAN / लोन</td><td style={{ textAlign: 'right', padding: '3px' }}>{emp.loan}.00</td></tr>
              <tr><td style={{ padding: '3px' }}>FINE</td><td style={{ textAlign: 'right', padding: '3px' }}>0.00</td></tr>
              <tr><td style={{ padding: '3px' }}>OTHERS</td><td style={{ textAlign: 'right', padding: '3px' }}>0.00</td></tr>
              <tr><td style={{ padding: '3px' }}>T.D.S. / टी.डी.एस.</td><td style={{ textAlign: 'right', padding: '3px' }}>0.00</td></tr>
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
          <h3 style={{ margin: '3px 0 0 0', fontSize: '16px', fontWeight: 'bold' }}>₹ {netSalary.toLocaleString('en-IN')}.00</h3>
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

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'All_Employee_Payslips_March_2026',
  });

  useEffect(() => {
    selectedCompany && getAttendanceRecord();
  }, [selectedCompany])



  const getAttendanceRecord = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/codeflame/payroll/api/attendance/register-report?compId=${selectedCompany}&year=${2026}&month=${parseInt(6)}`);
      
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
                present: 0,
                voff: 0,
                holiday: 0,
                leave: 0,
                absent: 0,
                halfDay: 0,
                totalDaysInMonth: res?.data?.meta?.totalDaysInMonth || 0,
                workingRecord:[]
              },

              rates: {
                basic: Number(emp.earning["Basic Salary"] || 0),
                hra: Number(emp.earning["HRA"] || 0),
                conv: Number(emp.earning["CONV"] || 0),
                medical: Number(emp.earning["MEDICAL"] || 0),
                misc: Number(emp.earning["Misc"] || 0),
                bonus: Number(emp.earning["Statutory Bonus"] || 0),
                incentive: Number(emp.earning["Attendance Incentive"] || 0),
                ot: Number(emp.earning["OT AMT"] || 0),
              },

              deductions: {
                pf: Number(emp.deduction["E.P.F"] || 0),
                vpf: Number(emp.deduction["VPF"] || 0),
                esi: Number(emp.deduction["E.S.I"] || 0),
                advance: Number(emp.deduction["ADVANCE"] || 0),
                loan: Number(emp.deduction["LOAN"] || 0),
                fine: Number(emp.deduction["FINE"] || 0),
                others: Number(emp.deduction["OTHERS"] || 0),
                tds: Number(emp.deduction["T.D.S"] || 0),
              },
            };
          }
          acc[id].attendance.workingRecord.push({
            workingHours:record.workingHours
          })
          switch (record.status) {
            case "Present":
              acc[id].attendance.present += 1;
              break;

            case "Half Day":
              acc[id].attendance.halfDay += 1;
              acc[id].attendance.present += 0.5;
              acc[id].attendance.absent += 0.5;
              break;

            case "Weekly Off":
              acc[id].attendance.voff += 1;
              break;

            case "Holiday":
              acc[id].attendance.holiday += 1;
              break;

            case "Casual Leave":
              acc[id].attendance.leave += 1;
              break;

            case "Absent":
              acc[id].attendance.absent += 1;
              break;

            default:
              break;
          }

          return acc;
        }, {})
      );
      console.log("groupedEmployees:,", groupedEmployees)
      setEmployeeRecord(groupedEmployees)



    } catch (error) {
      alert(error.message)
      console.log(error.message)
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
          <select
            className="border rounded-lg px-3 py-2 text-sm bg-white font-medium text-slate-700 shadow-sm"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            <option value="NONE">Select Company</option>
            <option value="65b2d1a3e4b0a12345678900">HCL</option>
            <option value="COMP002">Infosys</option>
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
          Create & Print Slips ({SAMPLE_EMPLOYEES.length})
        </button>
      </div>

      {/* Print Target Viewport Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center' }}>
        <div ref={componentRef} style={{ backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          {employeeRecord.map((employee) => (
            <PayslipItem key={employee.empCode} emp={employee} />
          ))}
        </div>
      </div>
    </div>
  );
}