import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Bell, DollarSign, CalendarDays, UserCheck, FileText, CheckCheck, Trash2 } from 'lucide-react';
import { notifications } from '../../lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'payroll':
      return DollarSign;
    case 'leave':
      return CalendarDays;
    case 'attendance':
      return UserCheck;
    case 'tax':
      return FileText;
    case 'document':
      return FileText;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'payroll':
      return 'bg-green-100 text-green-600';
    case 'leave':
      return 'bg-orange-100 text-orange-600';
    case 'attendance':
      return 'bg-blue-100 text-blue-600';
    case 'tax':
      return 'bg-purple-100 text-purple-600';
    case 'document':
      return 'bg-indigo-100 text-indigo-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function Notifications() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-1">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with important alerts and messages
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <CheckCheck className="w-4 h-4" />
            Mark All Read
          </Button>
          <Button variant="outline" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold">{notifications.length}</div>
                <div className="text-sm text-muted-foreground">Total Notifications</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100">
                <Bell className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold">{unreadCount}</div>
                <div className="text-sm text-muted-foreground">Unread</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold">{notifications.length - unreadCount}</div>
                <div className="text-sm text-muted-foreground">Read</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>Recent alerts and system messages</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
              <TabsTrigger value="payroll">Payroll</TabsTrigger>
              <TabsTrigger value="leave">Leave</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-3">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const colorClass = getNotificationColor(notification.type);

                return (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="font-semibold">{notification.title}</h4>
                            {!notification.read && (
                              <Badge variant="default" className="ml-2">New</Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          {!notification.read && (
                            <Button size="sm" variant="ghost">Mark as Read</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabsContent>
            <TabsContent value="unread" className="space-y-3">
              {notifications
                .filter((n) => !n.read)
                .map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colorClass = getNotificationColor(notification.type);

                  return (
                    <div
                      key={notification.id}
                      className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${colorClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h4 className="font-semibold">{notification.title}</h4>
                              <Badge variant="default" className="ml-2">New</Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            <Button size="sm" variant="ghost">Mark as Read</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </TabsContent>
            <TabsContent value="payroll">
              <p className="text-muted-foreground text-center py-8">
                Filter notifications by payroll type
              </p>
            </TabsContent>
            <TabsContent value="leave">
              <p className="text-muted-foreground text-center py-8">
                Filter notifications by leave type
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
