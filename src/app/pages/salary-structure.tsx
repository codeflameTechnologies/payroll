import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const salaryComponents = [
  { name: 'Basic Salary', percentage: 50, color: '#3b82f6', amount: 50000 },
  { name: 'HRA', percentage: 20, color: '#8b5cf6', amount: 20000 },
  { name: 'Conveyance', percentage: 8, color: '#10b981', amount: 8000 },
  { name: 'Medical Allowance', percentage: 7, color: '#f59e0b', amount: 7000 },
  { name: 'Special Allowance', percentage: 15, color: '#ec4899', amount: 15000 },
];

const deductions = [
  { name: 'Provident Fund (PF)', percentage: 12, amount: 12000, mandatory: true },
  { name: 'ESI', percentage: 0.75, amount: 750, mandatory: true },
  { name: 'Professional Tax', percentage: 2, amount: 2000, mandatory: true },
  { name: 'Income Tax', percentage: 15, amount: 15000, mandatory: true },
];

export default function SalaryStructure() {
  const totalEarnings = salaryComponents.reduce((acc, curr) => acc + curr.amount, 0);
  const totalDeductions = deductions.reduce((acc, curr) => acc + curr.amount, 0);
  const netSalary = totalEarnings - totalDeductions;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Salary Structure</h1>
          <p className="text-muted-foreground">Configure and manage salary components</p>
        </div>
        <Button className="gap-2">
          <DollarSign className="w-4 h-4" />
          Create New Structure
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold">${totalEarnings.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Earnings</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-100">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold">${totalDeductions.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Deductions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold">${netSalary.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Net Salary</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings Components</CardTitle>
            <CardDescription>Breakdown of salary components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salaryComponents.map((component) => (
                <div key={component.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{component.name}</span>
                    <span className="text-muted-foreground">
                      ${component.amount.toLocaleString()} ({component.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full"
                      style={{ 
                        width: `${component.percentage}%`,
                        backgroundColor: component.color 
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total Earnings</span>
                  <span>${totalEarnings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
            <CardDescription>Visual representation of salary components</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salaryComponents}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {salaryComponents.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Deductions */}
        <Card>
          <CardHeader>
            <CardTitle>Deductions</CardTitle>
            <CardDescription>Statutory and other deductions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deductions.map((deduction) => (
                <div key={deduction.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{deduction.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {deduction.percentage}% {deduction.mandatory && '• Mandatory'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${deduction.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total Deductions</span>
                  <span className="text-red-600">-${totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Salary Calculation */}
        <Card>
          <CardHeader>
            <CardTitle>Net Salary Calculation</CardTitle>
            <CardDescription>Final take-home amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Gross Salary</span>
                  <span className="font-semibold text-lg">${totalEarnings.toLocaleString()}</span>
                </div>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Total Deductions</span>
                  <span className="font-semibold text-lg text-red-600">-${totalDeductions.toLocaleString()}</span>
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-500">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Net Take-Home Salary</span>
                  <span className="font-bold text-2xl text-green-600">${netSalary.toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Per month after all deductions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
