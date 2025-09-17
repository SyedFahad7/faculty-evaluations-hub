import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  BookOpen,
  UserCheck,
  Shield,
} from "lucide-react";

interface AppSidebarProps {
  userRole: 'faculty' | 'hod' | 'principal';
}

const sidebarItems = {
  faculty: [
    { title: "Dashboard", url: "/faculty/dashboard", icon: LayoutDashboard },
    { title: "Self Appraisal Form", url: "/faculty/self-appraisal", icon: FileText },
    { title: "My Submissions", url: "/faculty/submissions", icon: ClipboardList },
    { title: "Profile", url: "/faculty/profile", icon: UserCheck },
  ],
  hod: [
    { title: "Dashboard", url: "/hod/dashboard", icon: LayoutDashboard },
    { title: "Faculty Management", url: "/hod/faculty", icon: Users },
    { title: "Performance Reviews", url: "/hod/reviews", icon: BarChart3 },
    { title: "Department Reports", url: "/hod/reports", icon: BookOpen },
    { title: "Settings", url: "/hod/settings", icon: Settings },
  ],
  principal: [
    { title: "Dashboard", url: "/principal/dashboard", icon: LayoutDashboard },
    { title: "All Departments", url: "/principal/departments", icon: Shield },
    { title: "Appraisal Reviews", url: "/principal/reviews", icon: BarChart3 },
    { title: "Reports & Analytics", url: "/principal/analytics", icon: BookOpen },
    { title: "System Settings", url: "/principal/settings", icon: Settings },
  ],
};

export function AppSidebar({ userRole }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const items = sidebarItems[userRole] || [];
  const isCollapsed = state === "collapsed";

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-muted/50 text-foreground";

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarContent className="bg-card border-r">
        <SidebarGroup>
          <SidebarGroupLabel className="text-foreground/70 uppercase tracking-wider text-xs font-semibold">
            {userRole === 'faculty' && 'Faculty Portal'}
            {userRole === 'hod' && 'HOD Portal'}
            {userRole === 'principal' && 'Principal Portal'}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}