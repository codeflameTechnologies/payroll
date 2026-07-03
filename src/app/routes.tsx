import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/app-layout';
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

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path:"company",
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
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
]);
