import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FileText, Download, Mail, FileSpreadsheet, Filter } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const reportTypes = [
  { title: 'Attendance Report', description: 'Detailed employee attendance records', icon: FileText, color: 'bg-blue-600' },
  { title: 'Payroll Report', description: 'Monthly payroll summary and breakdown', icon: FileText, color: 'bg-green-600' },
  { title: 'Leave Report', description: 'Leave requests and balances', icon: FileText, color: 'bg-orange-600' },
  { title: 'Tax Report', description: 'Tax deductions and compliance', icon: FileText, color: 'bg-purple-600' },
  { title: 'Employee Report', description: 'Employee demographics and details', icon: FileText, color: 'bg-indigo-600' },
  { title: 'Department Report', description: 'Department-wise analytics', icon: FileText, color: 'bg-pink-600' },
];

const monthlyPayrollData = [
  { month: 'Jan', amount: 2200000 },
  { month: 'Feb', amount: 2280000 },
  { month: 'Mar', amount: 2350000 },
  { month: 'Apr', amount: 2320000 },
  { month: 'May', amount: 2400000 },
  { month: 'Jun', amount: 2380000 },
];

const departmentCostData = [
  { department: 'Engineering', cost: 850000 },
  { department: 'Product', cost: 420000 },
  { department: 'Design', cost: 280000 },
  { department: 'Marketing', cost: 320000 },
  { department: 'Sales', cost: 380000 },
  { department: 'HR', cost: 180000 },
];

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Reports</h1>
          <p className="text-muted-foreground">Generate comprehensive reports and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${report.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-lg mt-4">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Download className="w-3 h-3" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <FileSpreadsheet className="w-3 h-3" />
                    Excel
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Mail className="w-3 h-3" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Payroll Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Payroll Trend</CardTitle>
            <CardDescription>Payroll expenses over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyPayrollData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  name="Payroll Amount"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department-wise Cost */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Cost</CardTitle>
            <CardDescription>Payroll distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentCostData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="department" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="cost" name="Cost" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
          <CardDescription>Key metrics from all reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-semibold">98.5%</div>
              <div className="text-sm text-muted-foreground">Avg. Attendance</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-semibold">$2.38M</div>
              <div className="text-sm text-muted-foreground">Total Payroll</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-semibold">156</div>
              <div className="text-sm text-muted-foreground">Leave Days</div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="text-2xl font-semibold">$420K</div>
              <div className="text-sm text-muted-foreground">Tax Deductions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
