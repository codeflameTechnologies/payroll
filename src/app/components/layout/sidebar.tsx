import { Link, useLocation } from 'react-router';
import { cn } from '../ui/utils';
import {
  LayoutDashboard,
  Building2,
  Users,
  Clock,
  CalendarDays,
  DollarSign,
  Wallet,
  FileText,
  HandCoins,
  Receipt,
  FileSpreadsheet,
  Shield,
  BarChart3,
  FolderOpen,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldX
} from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { motion } from 'motion/react';

const menuItems = [
 
  { icon: Building2, label: 'Company', href: '/admin/company' },
  { icon: Users, label: 'Employees', href: '/admin/employees' },
  { icon: Clock, label: 'Attendance', href: '/admin/attendance' },
 
  { icon: DollarSign, label: 'Payroll', href: '/admin/payroll' },
  { icon: FileText, label: 'Payslips', href: '/admin/payslips' },
  { icon: BarChart3, label: 'Reports', href: '/admin/reports' },
  { icon: ShieldX, label: 'Access', href: '/admin/access' },
  // { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative border-r bg-card h-screen flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 border-b flex items-center justify-between px-6">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
           
            <div>
              <h1 className="font-semibold text-sm">Codeflame Technology</h1>
              <p className="text-xs text-muted-foreground">Payroll Software</p>
            </div>
          </motion.div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-3 relative group',
                    collapsed && 'justify-center px-2'
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-sm"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-md -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Toggle Button */}
      <div className="p-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className={cn('w-full', collapsed && 'px-2')}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </motion.aside>
  );
}
