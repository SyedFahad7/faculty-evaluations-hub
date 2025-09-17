import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: 'faculty' | 'hod' | 'principal';
  user?: {
    name: string;
    email: string;
    role: 'faculty' | 'hod' | 'principal';
    department?: string;
  };
  onLogout?: () => void;
}

export function DashboardLayout({ children, userRole, user, onLogout }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar user={user} onLogout={onLogout} />
        
        <div className="flex flex-1 w-full">
          <AppSidebar userRole={userRole} />
          
          <main className="flex-1 faculty-dashboard">
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b px-6 py-3">
              <SidebarTrigger className="hover:bg-muted" />
            </div>
            
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}