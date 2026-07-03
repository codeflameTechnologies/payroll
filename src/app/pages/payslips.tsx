import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Download, Send, Printer, Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { employees } from '../../lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';

const payslipData = employees.map((emp) => ({
  ...emp,
  month: 'June 2026',
  basicSalary: Math.floor(emp.salary * 0.5),
  hra: Math.floor(emp.salary * 0.2),
  conveyance: Math.floor(emp.salary * 0.08),
  medical: Math.floor(emp.salary * 0.07),
  special: Math.floor(emp.salary * 0.15),
  pf: Math.floor(emp.salary * 0.12),
  esi: Math.floor(emp.salary * 0.0075),
  pt: Math.floor(emp.salary * 0.02),
  incomeTax: Math.floor(emp.salary * 0.15),
  netSalary: emp.salary - Math.floor(emp.salary * 0.2975),
}));

export default function Payslips() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Payslips</h1>
          <p className="text-muted-foreground">Generate and manage employee payslips</p>
        </div>
        <Button className="gap-2">
          <Send className="w-4 h-4" />
          Send All Payslips
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search employee..." className="pl-10" />
            </div>
            <Select defaultValue="june">
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="june">June 2026</SelectItem>
                <SelectItem value="may">May 2026</SelectItem>
                <SelectItem value="april">April 2026</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payslip Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {payslipData.slice(0, 6).map((payslip) => {
          const totalEarnings = payslip.basicSalary + payslip.hra + payslip.conveyance + payslip.medical + payslip.special;
          const totalDeductions = payslip.pf + payslip.esi + payslip.pt + payslip.incomeTax;
          
          return (
            <Card key={payslip.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{payslip.name}</CardTitle>
                    <CardDescription>{payslip.id} • {payslip.department}</CardDescription>
                  </div>
                  <Badge>{payslip.month}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Company Info */}
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold">PayrollPro Inc.</div>
                  <div className="text-xs text-muted-foreground">
                    123 Business Park, San Francisco, CA 94105
                  </div>
                </div>

                {/* Earnings */}
                <div>
                  <div className="font-medium mb-2 text-sm">Earnings</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Basic Salary</span>
                      <span>${payslip.basicSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">HRA</span>
                      <span>${payslip.hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conveyance</span>
                      <span>${payslip.conveyance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medical</span>
                      <span>${payslip.medical.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Special Allowance</span>
                      <span>${payslip.special.toLocaleString()}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total Earnings</span>
                      <span>${totalEarnings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <div className="font-medium mb-2 text-sm">Deductions</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PF</span>
                      <span>${payslip.pf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ESI</span>
                      <span>${payslip.esi.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Professional Tax</span>
                      <span>${payslip.pt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Income Tax</span>
                      <span>${payslip.incomeTax.toLocaleString()}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium text-red-600">
                      <span>Total Deductions</span>
                      <span>-${totalDeductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Net Pay */}
                <div className="p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Net Pay</span>
                    <span className="text-xl font-bold text-green-600">
                      ${payslip.netSalary.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Download className="w-3 h-3" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Send className="w-3 h-3" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1">
                    <Printer className="w-3 h-3" />
                    Print
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
