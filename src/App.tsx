import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { FacultyDashboard } from "./pages/faculty/FacultyDashboard";
import { SelfAppraisalForm } from "./pages/faculty/SelfAppraisalForm";
import { HODDashboard } from "./pages/hod/HODDashboard";
import { PrincipalDashboard } from "./pages/principal/PrincipalDashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Faculty Routes */}
          <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty/self-appraisal" element={<SelfAppraisalForm />} />
          
          {/* HOD Routes */}
          <Route path="/hod/dashboard" element={<HODDashboard />} />
          
          {/* Principal Routes */}
          <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
          
          {/* Legacy route */}
          <Route path="/index" element={<Index />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
