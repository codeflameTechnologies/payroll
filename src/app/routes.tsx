import { createBrowserRouter } from 'react-router';
import { AppLayout, AuthLayout } from './components/layout/app-layout';
import Dashboard from './pages/dashboard';
import Employees from './pages/employees';
import Company from './pages/company';
import Attendance from './pages/attendance';
import LeaveManagement from './pages/leave-management';
import Payroll from './pages/payrollSample';
import SalaryStructure from './pages/salary-structure';
import Payslips from './pages/payslipSample';
import Reports from './pages/reports';
import Notifications from './pages/notifications';
import Settings from './pages/settings';
import PlaceholderPage from './pages/placeholder-page';
import Signup from './pages/SignUp';
import VerifyEmailPage from './pages/EmailVerify';
import Login from "./pages/Login"
import Access from './pages/Access';
import MemberLogin from "./pages/memberLogin"
import MemberEmailVerify from "./pages/memberEmailVerify"
import MemberPortal from "./pages/memberAttendance"

export const router = createBrowserRouter([
  {
    path: '/',
    Component:AuthLayout,
    children: [
      {
        path: '/admin',
        Component: AppLayout,
        children: [
          {
            index: true,
           Component: () => (
              <PlaceholderPage
                title="Dashboard"
                description="Welcome back! Here's what's happening with your organization today."
              />
            ),
          },
          {
            path: "company",
            Component: Company
          },
          {
            path: 'employees',
            Component: Employees,
          },
          {
            path: 'attendance',
            Component: Attendance,
          },
          {
            path: 'leave',
            Component: LeaveManagement,
          },
          {
            path: 'payroll',
            Component: Payroll,
          },
          {
            path: 'salary-structure',
            Component: SalaryStructure,
          },
          {
            path: 'payslips',
            Component: Payslips,
          },
          {
            path: 'loans',
            Component: () => (
              <PlaceholderPage
                title="Loans & Advances"
                description="Manage employee loans and advance payments"
              />
            ),
          },
          {
            path: 'reimbursements',
            Component: () => (
              <PlaceholderPage
                title="Reimbursements"
                description="Process employee expense reimbursements"
              />
            ),
          },
          {
            path: 'tax',
            Component: () => (
              <PlaceholderPage
                title="Tax Management"
                description="Manage tax calculations and compliance"
              />
            ),
          },
          {
            path: 'compliance',
            Component: () => (
              <PlaceholderPage
                title="Compliance"
                description="Track regulatory compliance and certifications"
              />
            ),
          },
          {
            path: 'access',
            Component:Access
          },
          {
            path: 'reports',
            Component: Reports,
          },
          {
            path: 'documents',
            Component: () => (
              <PlaceholderPage
                title="Documents"
                description="Manage employee and company documents"
              />
            ),
          },
          {
            path: 'notifications',
            Component: Notifications,
          },
          
        ]
      },
      {
        path:'/signup',
        Component:Signup
      },
      {
        path:'/',
        Component:Login
      },
      {
        path:'/email/verify/:email',
        Component:VerifyEmailPage
      },
      {
        path:'/member/login',
        Component:MemberLogin
      },
      {
        path:'/member/verify/:email',
        Component:MemberEmailVerify
      },
      {
        path:'/member/portal',
        Component:MemberPortal
      }

    ]
  },
 
]);
