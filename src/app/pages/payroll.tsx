import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { DollarSign, CheckCircle, Clock, Users, ChevronRight, Calendar } from 'lucide-react';
import { employees } from '../../lib/mock-data';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Progress } from '../components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const payrollSummary = [
  { label: 'Total Payroll', value: '$2.4M', icon: DollarSign, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: 'Processed', value: '245', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: 'Pending', value: '35', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { label: 'Total Employees', value: '280', icon: Users, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
];

const payrollData = employees.map((emp) => ({
  id: emp.id,
  name: emp.name,
  department: emp.department,
  basicSalary: Math.floor(emp.salary * 0.5),
  hra: Math.floor(emp.salary * 0.2),
  allowances: Math.floor(emp.salary * 0.15),
  deductions: Math.floor(emp.salary * 0.12),
  netSalary: emp.salary - Math.floor(emp.salary * 0.12),
  status: Math.random() > 0.2 ? 'Processed' : 'Pending',
}));

const wizardSteps = [
  { step: 1, title: 'Select Period', description: 'Choose payroll month' },
  { step: 2, title: 'Select Employees', description: 'Choose employees to process' },
  { step: 3, title: 'Calculate', description: 'Review calculations' },
  { step: 4, title: 'Review', description: 'Final review' },
  { step: 5, title: 'Generate', description: 'Generate payslips' },
];

export default function Payroll() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Payroll</h1>
          <p className="text-muted-foreground">Process and manage employee payroll</p>
        </div>
        <Dialog open={wizardOpen} onOpenChange={setWizardOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => setCurrentStep(1)}>
              <DollarSign className="w-4 h-4" />
              Process Payroll
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Payroll Processing Wizard</DialogTitle>
              <DialogDescription>
                Follow the steps to process monthly payroll
              </DialogDescription>
            </DialogHeader>
            
            {/* Wizard Steps */}
            <div className="py-4">
              <div className="flex items-center justify-between mb-6">
                {wizardSteps.map((step, index) => (
                  <div key={step.step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentStep >= step.step
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {currentStep > step.step ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          step.step
                        )}
                      </div>
                      <div className="text-xs mt-2 text-center">
                        <div className="font-medium">{step.title}</div>
                        <div className="text-muted-foreground">{step.description}</div>
                      </div>
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 ${
                          currentStep > step.step ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="min-h-[300px] p-6 border rounded-lg">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Select Payroll Period</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Month</label>
                        <Select defaultValue="june">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="june">June 2026</SelectItem>
                            <SelectItem value="may">May 2026</SelectItem>
                            <SelectItem value="april">April 2026</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Year</label>
                        <Select defaultValue="2026">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Select Employees</h3>
                    <p className="text-sm text-muted-foreground">
                      All active employees are selected by default
                    </p>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">280 employees selected</span>
                        <Button variant="outline" size="sm">Customize Selection</Button>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Calculate Salaries</h3>
                    <div className="space-y-3">
                      <Progress value={100} />
                      <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">Total Gross</div>
                          <div className="text-xl font-semibold">$2,800,000</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Total Deductions</div>
                          <div className="text-xl font-semibold">$420,000</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Total Net</div>
                          <div className="text-xl font-semibold">$2,380,000</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Employees</div>
                          <div className="text-xl font-semibold">280</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Review Payroll</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between p-3 bg-muted rounded">
                        <span>Payroll Month</span>
                        <span className="font-medium">June 2026</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded">
                        <span>Total Employees</span>
                        <span className="font-medium">280</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded">
                        <span>Net Payroll Amount</span>
                        <span className="font-medium">$2,380,000</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded">
                        <span>Payment Date</span>
                        <span className="font-medium">June 30, 2026</span>
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 5 && (
                  <div className="space-y-4 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                    <h3 className="font-semibold text-lg">Payroll Generated Successfully!</h3>
                    <p className="text-muted-foreground">
                      Payslips have been generated for all 280 employees
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button>Send Payslips via Email</Button>
                      <Button variant="outline">Download All</Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => {
                    if (currentStep === 5) {
                      setWizardOpen(false);
                    } else {
                      setCurrentStep(Math.min(5, currentStep + 1));
                    }
                  }}
                >
                  {currentStep === 5 ? 'Close' : 'Next'}
                  {currentStep !== 5 && <ChevronRight className="w-4 h-4 ml-1" />}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {payrollSummary.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${item.bgColor}`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold">{item.value}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>June 2026 Payroll</CardTitle>
          <CardDescription>Detailed payroll breakdown for all employees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Basic Salary</TableHead>
                  <TableHead>Allowances</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.slice(0, 8).map((payroll) => (
                  <TableRow key={payroll.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payroll.name}</div>
                        <div className="text-sm text-muted-foreground">{payroll.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{payroll.department}</TableCell>
                    <TableCell>${payroll.basicSalary.toLocaleString()}</TableCell>
                    <TableCell>${(payroll.hra + payroll.allowances).toLocaleString()}</TableCell>
                    <TableCell>${payroll.deductions.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">${payroll.netSalary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={payroll.status === 'Processed' ? 'default' : 'secondary'}>
                        {payroll.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
