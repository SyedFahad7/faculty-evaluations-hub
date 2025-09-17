import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: Replace with actual authentication logic using Supabase
      // This is a demo implementation
      if (email && password) {
        // Mock authentication - replace with real auth
        let role: 'faculty' | 'hod' | 'principal' = 'faculty';
        
        if (email.includes('hod')) role = 'hod';
        if (email.includes('principal')) role = 'principal';

        toast({
          title: "Login Successful",
          description: `Welcome to the Faculty Appraisal System`,
        });

        // Navigate based on role
        navigate(`/${role}/dashboard`);
      } else {
        setError("Please enter both email and password");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center faculty-dashboard px-4">
      <div className="w-full max-w-md">
        {/* College Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-primary rounded-xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">LIET</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Lords Institute of Engineering & Technology
          </h1>
          <p className="text-muted-foreground mt-2">Faculty Performance Appraisal System</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Enter your college credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">College Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your college email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Demo Credentials:</p>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p><strong>Faculty:</strong> faculty@liet.edu | password123</p>
                <p><strong>HOD:</strong> hod@liet.edu | password123</p>
                <p><strong>Principal:</strong> principal@liet.edu | password123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}