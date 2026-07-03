import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Users, 
  UserCheck, 
  UserX, 
  DollarSign, 
  CalendarClock, 
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  FileText,
  Upload,
  CheckCircle,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  employeeGrowthData, 
  attendanceData, 
  salaryDistribution, 
  departmentData,
  recentActivities 
} from '../../lib/mock-data';

const kpiCards = [
  {
    title: 'Total Employees',
    value: '280',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Present Today',
    value: '255',
    change: '+2.5%',
    trend: 'up',
    icon: UserCheck,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Absent Today',
    value: '5',
    change: '-15%',
    trend: 'down',
    icon: UserX,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  {
    title: 'Payroll This Month',
    value: '$2.4M',
    change: '+8%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  {
    title: 'Pending Leaves',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: CalendarClock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  {
    title: 'Next Salary Date',
    value: 'Jun 30',
    change: '25 days',
    trend: 'neutral',
    icon: Calendar,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

const quickActions = [
  { label: 'Add Employee', icon: Plus, color: 'bg-blue-600' },
  { label: 'Generate Payroll', icon: DollarSign, color: 'bg-indigo-600' },
  { label: 'Upload Attendance', icon: Upload, color: 'bg-green-600' },
  { label: 'Approve Leave', icon: CheckCircle, color: 'bg-orange-600' },
  { label: 'Generate Payslip', icon: FileText, color: 'bg-purple-600' },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your organization today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                  {kpi.trend !== 'neutral' && (
                    <div className={`flex items-center gap-1 text-xs ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {kpi.change}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-2xl font-semibold mb-1">{kpi.value}</div>
                  <div className="text-xs text-muted-foreground">{kpi.title}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Growth</CardTitle>
            <CardDescription>Monthly employee count over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={employeeGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="employees" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Daily attendance for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10b981" />
                <Bar dataKey="wfh" fill="#3b82f6" />
                <Bar dataKey="absent" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Salary Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
            <CardDescription>Employee count by salary range</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salaryDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" />
                <YAxis type="category" dataKey="range" className="text-xs" />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Employees</CardTitle>
            <CardDescription>Employee distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="employees"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className="w-full justify-start gap-3 h-12"
                >
                  <div className={`p-2 rounded ${action.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span>{action.label}</span>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates across the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'employee' ? 'bg-blue-100' :
                    activity.type === 'leave' ? 'bg-orange-100' :
                    activity.type === 'payroll' ? 'bg-green-100' :
                    'bg-gray-100'
                  }`}>
                    {activity.type === 'employee' && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'leave' && <Calendar className="w-4 h-4 text-orange-600" />}
                    {activity.type === 'payroll' && <DollarSign className="w-4 h-4 text-green-600" />}
                    {activity.type === 'attendance' && <UserCheck className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
