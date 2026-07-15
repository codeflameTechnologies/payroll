


import axios from "axios";
import { ShieldCheck, UserRound } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";


export default function Home() {
  const navigate = useNavigate();

 useEffect(() => {
    checkLoggedIn()
  }, [])

 const getToken = () => {
    const token = localStorage.getItem("codeflame_payroll2003");
    if (!token) {
      toast.error("Session expired");
      navigate("/login");
      throw new Error("No token");
    }
    return token;
  };

    const checkLoggedIn = async () => {
    const token = getToken();

    try {
      const res = await axios.get("https://payroll-backend-pearl.vercel.app/codeflame/payroll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
     if(res.data.role === "MEMBER"){
        navigate('/member/portal')
     }
     else if(res.data.role === "ADMIN"){
      navigate('/admin')
     }

      

    } catch (error: any) {
      if(error.response?.status === 401 || error.response?.status === 403){
        navigate("/")
      }
      alert(error.message)
      console.log(error)
    }
  }






  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl">

        {/* Heading */}

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800">
            Payroll Management System
          </h1>

          <p className="mt-4 text-slate-600 text-lg">
            Manage Employees, Attendance, Salary, Payroll & Payslips
          </p>
        </div>

        {/* Login Panels */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* Admin */}

          <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition">

            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
              <ShieldCheck className="w-10 h-10 text-blue-600" />
            </div>

            <h2 className="text-3xl font-bold">
              Admin Login
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Login as Company Administrator to manage
              employees, attendance, leave requests,
              payroll processing, salary structure,
              reports and company settings.
            </p>
            <Link to="/login">
            <button
              onClick={() => navigate("/admin/login")}
              className="mt-8 cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Login as Admin
            </button>
            </Link>

          </div>

          {/* Employee */}

          <div className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition">

            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <UserRound className="w-10 h-10 text-green-600" />
            </div>

            <h2 className="text-3xl font-bold">
              Employee Login
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Login using your credentials assigned by
              the administrator to view attendance,
              leave balance, salary details and
              monthly payslips.
            </p>
             
            <Link to="/member/login">
            <button
              onClick={() => navigate("/employee/login")}
              className="mt-8 cursor-pointer w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Login as Employee
            </button>
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}