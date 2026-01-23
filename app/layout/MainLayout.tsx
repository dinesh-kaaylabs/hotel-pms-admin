
import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  DoorOpen, 
  Users, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  LogOut,
  Menu,
  ChevronDown,
  Sparkles,
  Settings2,
  TrendingUp,
  Tag,
  ShieldHalf,
  CreditCard,
  Zap,
  Wrench,
  FileText,
  Landmark,
  GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../../auth/AuthContext';
import { hasPermission } from '../../auth/permissions';
import { AppPermission } from '../../auth/auth.types';
import { useBrandTheme } from '../../components/providers/BrandThemeProvider';
import { HotelSwitcher } from '../../components/ui/HotelSwitcher';
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { CurrencySelector } from '../../components/ui/CurrencySelector';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NavItem {
  label: string;
  path: string;
  icon: any;
  permission: AppPermission;
  tourId?: string;
  children?: { label: string; path: string; icon: any; permission: AppPermission; tourId?: string }[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard, permission: 'dashboard:view' },
  { label: 'Bookings', path: '/bookings', icon: CalendarDays, permission: 'bookings:view', tourId: 'nav-bookings' },
  { 
    label: 'Room Management', 
    path: '/rooms', 
    icon: DoorOpen,
    permission: 'rooms:view',
    children: [
      { label: 'Inventory', path: '/rooms/inventory', icon: CalendarDays, permission: 'rooms:view' },
      { label: 'Room Types', path: '/rooms/types', icon: Settings2, permission: 'rooms:edit' },
    ]
  },
  { label: 'Housekeeping', path: '/housekeeping', icon: Zap, permission: 'rooms:view', tourId: 'nav-housekeeping' },
  { label: 'Maintenance', path: '/maintenance', icon: Wrench, permission: 'rooms:view' },
  { 
    label: 'Pricing & Revenue', 
    path: '/pricing', 
    icon: TrendingUp,
    permission: 'pricing:view',
    tourId: 'nav-pricing',
    children: [
      { label: 'Rate Plans', path: '/pricing/rate-plans', icon: Tag, permission: 'pricing:edit' },
      { label: 'Pricing Calendar', path: '/pricing/calendar', icon: CalendarDays, permission: 'pricing:view' },
    ]
  },
  { label: 'Payments', path: '/payments', icon: CreditCard, permission: 'payments:view' },
  { label: 'Invoices & GST', path: '/invoices', icon: FileText, permission: 'payments:view', tourId: 'nav-finance' },
  { label: 'Settlements', path: '/settlements', icon: Landmark, permission: 'payments:view' },
  { label: 'Guests', path: '/guests', icon: Users, permission: 'bookings:view' },
  { label: 'Reports & Analytics', path: '/reports', icon: BarChart3, permission: 'reports:view', tourId: 'nav-reports' },
  { label: 'AI Concierge', path: '/ai-insights', icon: Sparkles, permission: 'dashboard:view' },
  { label: 'Training Hub', path: '/training', icon: GraduationCap, permission: 'dashboard:view' },
  { label: 'User Management', path: '/users', icon: ShieldHalf, permission: 'users:manage' },
  { label: 'Settings', path: '/settings', icon: Settings, permission: 'settings:view' },
];

export const MainLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['/rooms', '/pricing']);
  const { user, logout } = useAuth();
  const { theme } = useBrandTheme();
  const location = useLocation();

  const toggleMenu = (path: string) => {
    setExpandedMenus(prev => 
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const visibleNavItems = navItems.filter(item => {
    const mainAccess = hasPermission(user?.role as any, item.permission);
    if (!mainAccess) return false;
    
    if (item.children) {
      const visibleChildren = item.children.filter(child => hasPermission(user?.role as any, child.permission));
      return visibleChildren.length > 0;
    }
    
    return true;
  }).map(item => {
    if (item.children) {
      return {
        ...item,
        children: item.children.filter(child => hasPermission(user?.role as any, child.permission))
      };
    }
    return item;
  });

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        className="hidden md:flex flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 shadow-sm z-30"
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 overflow-hidden">
            {theme.logoUrl ? (
              <img src={theme.logoUrl} alt={theme.name} className="w-8 h-8 object-contain flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{theme.name.charAt(0)}</span>
              </div>
            )}
            {isSidebarOpen && (
              <span className="font-bold text-lg whitespace-nowrap truncate">{theme.name}</span>
            )}
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto scrollbar-hide">
          {visibleNavItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            const isExpanded = expandedMenus.includes(item.path);
            const Icon = item.icon;

            return (
              <div key={item.path} className="space-y-1">
                {item.children ? (
                  <button
                    data-tour={item.tourId}
                    onClick={() => toggleMenu(item.path)}
                    className={cn(
                      "flex items-center justify-between w-full gap-3 px-3 py-2.5 rounded-xl transition-all group duration-200 text-left",
                      isActive
                        ? "bg-brand-primary/10 text-brand-primary font-medium" 
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={cn(isActive ? "text-brand-primary" : "text-slate-400 group-hover:text-slate-600")} />
                      {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                    </div>
                    {isSidebarOpen && (
                      <ChevronDown 
                        size={14} 
                        className={cn("transition-transform duration-200", isExpanded && "rotate-180")} 
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    data-tour={item.tourId}
                    className={cn(
                      "flex items-center justify-between w-full gap-3 px-3 py-2.5 rounded-xl transition-all group duration-200 text-left",
                      isActive
                        ? "bg-brand-primary/10 text-brand-primary font-medium" 
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={cn(isActive ? "text-brand-primary" : "text-slate-400 group-hover:text-slate-600")} />
                      {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                    </div>
                  </Link>
                )}

                {isSidebarOpen && item.children && isExpanded && (
                  <div className="ml-9 space-y-1 border-l border-slate-100 dark:border-slate-700 pl-4">
                    {item.children.map((child) => {
                      const isChildActive = location.pathname === child.path;
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          data-tour={child.tourId}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                            isChildActive 
                              ? "text-brand-primary font-bold" 
                              : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-700">
          <button 
            onClick={logout}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors",
              !isSidebarOpen && "justify-center"
            )}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg md:flex hidden"
            >
              <Menu size={20} className="text-slate-600 dark:text-slate-300" />
            </button>
            
            {/* Multi-Hotel Context Switcher */}
            <HotelSwitcher />

            <div className="relative group hidden sm:block ml-2">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search everywhere..."
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none text-slate-900 dark:text-slate-100 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            <CurrencySelector />
            
            <ThemeToggle />

            <div className="flex items-center gap-2 mx-2 px-3 py-1 bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{user?.role}</span>
            </div>
            
            <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
              <Bell size={20} className="text-slate-600 dark:text-slate-300" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <div className="flex items-center gap-3 pl-1">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold leading-none">{user?.name || 'Loading...'}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black">{user?.role?.replace('_', ' ')}</p>
              </div>
              <img 
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=${theme.primaryColor.replace('#', '')}&color=fff`}
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
