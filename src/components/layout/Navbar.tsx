import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings } from "lucide-react";

import logoImage from "@/assets/liet-logo.png";

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    role: 'faculty' | 'hod' | 'principal';
    department?: string;
  };
  onLogout?: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="college-header border-b border-white/20 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* College Logo and Name */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src={logoImage} 
              alt="LIET Logo" 
              className="w-10 h-10 object-contain"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                const target = e.currentTarget;
                const fallback = target.nextElementSibling as HTMLElement;
                target.style.display = 'none';
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <span 
              className="text-white font-bold text-lg hidden items-center justify-center w-full h-full"
              style={{ display: 'none' }}
            >
              LIET
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Lords Institute of Engineering & Technology
            </h1>
            <p className="text-white/80 text-sm">Faculty Performance Appraisal System</p>
          </div>
        </div>

        {/* User Profile */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-white/20 hover:bg-white/10">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="bg-white text-primary">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">
                    {user.role} {user.department && `- ${user.department}`}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}