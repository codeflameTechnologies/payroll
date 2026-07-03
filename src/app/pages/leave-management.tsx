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
import { 
  CalendarClock, 
  CheckCircle, 
  XCircle, 
  Clock,
  Plus 
} from 'lucide-react';
import { leaveRequests } from '../../lib/mock-data';

const leaveSummary = [
  { label: 'Total Requests', value: 48, icon: CalendarClock, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { label: 'Approved', value: 32, icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: 'Pending', value: 12, icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { label: 'Rejected', value: 4, icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-100' },
];

const leaveTypes = [
  { type: 'Casual Leave', total: 12, used: 5, color: 'bg-blue-500' },
  { type: 'Sick Leave', total: 12, used: 3, color: 'bg-green-500' },
  { type: 'Earned Leave', total: 24, used: 12, color: 'bg-purple-500' },
  { type: 'Maternity Leave', total: 180, used: 0, color: 'bg-pink-500' },
  { type: 'Paternity Leave', total: 15, used: 0, color: 'bg-indigo-500' },
];

export default function LeaveManagement() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Leave Management</h1>
          <p className="text-muted-foreground">Manage employee leave requests and balances</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Apply Leave
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveSummary.map((item) => {
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

      {/* Leave Types */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Balance Overview</CardTitle>
          <CardDescription>Available leave types and balances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveTypes.map((leave) => {
              const percentage = (leave.used / leave.total) * 100;
              return (
                <div key={leave.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{leave.type}</span>
                    <span className="text-muted-foreground">
                      {leave.used} / {leave.total} days used
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${leave.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>All leave applications and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.employeeName}</div>
                        <div className="text-sm text-muted-foreground">{request.employeeId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>{request.days}</TableCell>
                    <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          request.status === 'Approved' ? 'default' :
                          request.status === 'Rejected' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {request.status === 'Pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="default">Approve</Button>
                          <Button size="sm" variant="destructive">Reject</Button>
                        </div>
                      )}
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
