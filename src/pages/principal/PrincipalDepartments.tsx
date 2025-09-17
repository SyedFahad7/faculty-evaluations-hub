import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Building, Users, FileText, Eye } from "lucide-react";

interface Department {
  id: string;
  name: string;
  code: string;
  faculty_count?: number;
  submissions_count?: number;
}

export function PrincipalDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const { data, error } = await supabase
        .from('departments')
        .select('*')
        .order('name');

      if (error) throw error;
      setDepartments(data || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout userRole="principal">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Departments</h1>
          <p className="text-muted-foreground">
            Overview of all departments and their performance metrics.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <Card key={dept.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  {dept.name}
                </CardTitle>
                <CardDescription>Department Code: {dept.code}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Faculty:</span>
                    <Badge variant="secondary">{dept.faculty_count || 0}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Submissions:</span>
                    <Badge variant="outline">{dept.submissions_count || 0}</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}