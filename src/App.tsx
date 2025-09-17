import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { LoginPage } from "./pages/auth/LoginPage";
import { FacultyDashboard } from "./pages/faculty/FacultyDashboard";
import { SelfAppraisalForm } from "./pages/faculty/SelfAppraisalForm";
import { FacultyProfile } from "./pages/faculty/FacultyProfile";
import { FacultySubmissions } from "./pages/faculty/FacultySubmissions";
import { HODDashboard } from "./pages/hod/HODDashboard";
import { HODFaculty } from "./pages/hod/HODFaculty";
import { HODReviews } from "./pages/hod/HODReviews";
import { HODReports } from "./pages/hod/HODReports";
import { HODSettings } from "./pages/hod/HODSettings";
import { PrincipalDashboard } from "./pages/principal/PrincipalDashboard";
import { PrincipalDepartments } from "./pages/principal/PrincipalDepartments";
import { PrincipalReviews } from "./pages/principal/PrincipalReviews";
import { PrincipalAnalytics } from "./pages/principal/PrincipalAnalytics";
import { PrincipalSettings } from "./pages/principal/PrincipalSettings";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user || !profile) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Redirect authenticated users to their dashboard
  if (user && profile) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to={`/${profile.role}/dashboard`} replace />} />
        <Route path="/login" element={<Navigate to={`/${profile.role}/dashboard`} replace />} />
        
        {/* Faculty Routes */}
        <Route path="/faculty/dashboard" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyDashboard />
          </ProtectedRoute>
        } />
        <Route path="/faculty/self-appraisal" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <SelfAppraisalForm />
          </ProtectedRoute>
        } />
        <Route path="/faculty/submissions" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultySubmissions />
          </ProtectedRoute>
        } />
        <Route path="/faculty/profile" element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <FacultyProfile />
          </ProtectedRoute>
        } />
        
        {/* HOD Routes */}
        <Route path="/hod/dashboard" element={
          <ProtectedRoute allowedRoles={['hod']}>
            <HODDashboard />
          </ProtectedRoute>
        } />
        <Route path="/hod/faculty" element={
          <ProtectedRoute allowedRoles={['hod']}>
            <HODFaculty />
          </ProtectedRoute>
        } />
        <Route path="/hod/reviews" element={
          <ProtectedRoute allowedRoles={['hod']}>
            <HODReviews />
          </ProtectedRoute>
        } />
        <Route path="/hod/reports" element={
          <ProtectedRoute allowedRoles={['hod']}>
            <HODReports />
          </ProtectedRoute>
        } />
        <Route path="/hod/settings" element={
          <ProtectedRoute allowedRoles={['hod']}>
            <HODSettings />
          </ProtectedRoute>
        } />
        
        {/* Principal Routes */}
        <Route path="/principal/dashboard" element={
          <ProtectedRoute allowedRoles={['principal']}>
            <PrincipalDashboard />
          </ProtectedRoute>
        } />
        <Route path="/principal/departments" element={
          <ProtectedRoute allowedRoles={['principal']}>
            <PrincipalDepartments />
          </ProtectedRoute>
        } />
        <Route path="/principal/reviews" element={
          <ProtectedRoute allowedRoles={['principal']}>
            <PrincipalReviews />
          </ProtectedRoute>
        } />
        <Route path="/principal/analytics" element={
          <ProtectedRoute allowedRoles={['principal']}>
            <PrincipalAnalytics />
          </ProtectedRoute>
        } />
        <Route path="/principal/settings" element={
          <ProtectedRoute allowedRoles={['principal']}>
            <PrincipalSettings />
          </ProtectedRoute>
        } />
        
        {/* Legacy route */}
        <Route path="/index" element={<Index />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Unauthenticated routes
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
