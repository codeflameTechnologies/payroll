# PayrollPro - Enterprise Payroll Management System

A modern, enterprise-grade payroll management software frontend built with React, TypeScript, and Tailwind CSS. Designed for HR teams, accountants, payroll managers, and business owners.

## ✨ Features

### Core Modules

- **Dashboard** - Executive dashboard with KPIs, charts, and real-time analytics
- **Employee Management** - Complete employee directory with profiles and documents
- **Attendance Tracking** - Daily attendance, biometric integration, and calendar views
- **Leave Management** - Leave requests, approvals, and balance tracking
- **Payroll Processing** - Step-by-step payroll wizard with calculations
- **Salary Structure** - Configurable salary components and deductions
- **Payslips** - Professional payslip generation with PDF/email export
- **Reports** - Comprehensive analytics and export capabilities
- **Notifications** - Real-time alerts and system notifications
- **Settings** - Company configuration, tax settings, and user permissions

### Design Features

- ✅ Modern SaaS UI/UX
- ✅ Light & Dark Mode
- ✅ Fully Responsive (Desktop, Tablet, Mobile)
- ✅ Collapsible Sidebar Navigation
- ✅ Smooth Animations & Transitions
- ✅ Professional Color Palette (Blue/Indigo)
- ✅ Enterprise-grade Components
- ✅ Accessible (WCAG compliant)

## 🛠️ Tech Stack

- **React 18.3.1** - UI framework
- **React Router 7** - Routing and navigation
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Shadcn/ui** - Component library
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **Motion (Framer Motion)** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date utilities

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── app-layout.tsx
│   │   │   ├── header.tsx
│   │   │   └── sidebar.tsx
│   │   └── ui/           # Shadcn/ui components
│   ├── pages/
│   │   ├── dashboard.tsx
│   │   ├── employees.tsx
│   │   ├── attendance.tsx
│   │   ├── leave-management.tsx
│   │   ├── payroll.tsx
│   │   ├── salary-structure.tsx
│   │   ├── payslips.tsx
│   │   ├── reports.tsx
│   │   ├── notifications.tsx
│   │   ├── settings.tsx
│   │   └── placeholder-page.tsx
│   ├── routes.tsx
│   └── App.tsx
├── lib/
│   ├── theme-provider.tsx
│   └── mock-data.ts
└── styles/
    ├── fonts.css
    ├── theme.css
    ├── tailwind.css
    └── index.css
```

## 🎨 Key Components

### Layout Components
- **AppLayout** - Main application wrapper with sidebar and header
- **Sidebar** - Collapsible navigation with 15 menu items
- **Header** - Top bar with search, notifications, theme toggle, and user menu

### Page Components
- **Dashboard** - 6 KPI cards, 4 charts, quick actions, recent activities
- **Employees** - Employee table with search/filters, profile modal with tabs
- **Attendance** - Calendar view, summary cards, attendance records table
- **Leave Management** - Leave balance overview, request management
- **Payroll** - 5-step wizard for payroll processing
- **Salary Structure** - Earnings/deductions breakdown with visualizations
- **Payslips** - Professional payslip cards with export options
- **Reports** - Multiple report types with charts and analytics
- **Notifications** - Notification center with filters and tabs
- **Settings** - Multi-tab configuration (company, payroll, attendance, tax, permissions)

## 🚀 Quick Start

The application is ready to run with mock data. Key features include:

1. **Navigation** - Use the sidebar to navigate between modules
2. **Theme Toggle** - Click the sun/moon icon in the header to switch themes
3. **Search** - Global search in the header bar
4. **Responsive** - Resize the window to see responsive layouts
5. **Interactive** - All charts, tables, and forms are fully interactive

## 🎯 Mock Data

The application includes comprehensive mock data:
- 8+ employees with complete profiles
- Attendance records with various statuses
- Leave requests in different states
- Payroll calculations
- Notifications and activity logs
- Department and salary distribution data

## 🌟 Production Features

### Security & Compliance
- Role-based permissions (Admin, HR Manager, Accountant, Employee)
- Tax compliance settings
- Audit trails via activity logs

### Scalability
- Designed to handle 10,000+ employees
- Efficient data tables with pagination
- Optimized rendering with React best practices

### User Experience
- Intuitive wizard-based workflows
- Context-aware notifications
- Quick actions for common tasks
- Comprehensive search and filtering

## 🎨 Design Inspiration

UI/UX inspired by leading HRMS platforms:
- Rippling
- Deel
- BambooHR
- Workday

## 📝 License

This is a demonstration project showcasing modern frontend development practices for enterprise HR software.
