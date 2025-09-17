import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Eye, Edit, Send } from "lucide-react";

interface AppraisalSubmission {
  id: string;
  faculty_id: string;
  academic_year: string;
  name: string;
  designation: string;
  status: string;
  total_score: number;
  submitted_at: string;
  faculty: {
    full_name: string;
    email: string;
  };
}

export function HODReviews() {
  const { profile } = useAuth();
  const [submissions, setSubmissions] = useState<AppraisalSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, [profile]);

  const fetchSubmissions = async () => {
    if (!profile?.department_id) return;

    try {
      const { data, error } = await supabase
        .from('faculty_self_appraisals')
        .select(`
          *,
          faculty:profiles!faculty_self_appraisals_faculty_id_fkey (
            full_name,
            email
          )
        `)
        .eq('department_id', profile.department_id)
        .eq('status', 'submitted')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'default';
      case 'reviewed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getPerformanceCategory = (score: number) => {
    if (score >= 90) return { category: 'Excellent', color: 'success' };
    if (score >= 80) return { category: 'Very Good', color: 'default' };
    if (score >= 70) return { category: 'Good', color: 'secondary' };
    if (score >= 60) return { category: 'Average', color: 'outline' };
    return { category: 'Below Average', color: 'destructive' };
  };

  if (loading) {
    return (
      <DashboardLayout userRole="hod">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading reviews...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="hod">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Reviews</h1>
          <p className="text-muted-foreground">
            Review and evaluate faculty self-appraisal submissions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <div className="text-2xl font-bold">{submissions.length}</div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.status === 'submitted').length}
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed Reviews</CardTitle>
              <div className="text-2xl font-bold">
                {submissions.filter(s => s.status === 'reviewed').length}
              </div>
            </CardHeader>
          </Card>
        </div>

        {submissions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No submissions to review</h3>
              <p className="text-muted-foreground text-center mb-4">
                Faculty submissions will appear here once they submit their self-appraisal forms.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {submissions.map((submission) => {
              const performance = getPerformanceCategory(submission.total_score);
              return (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {submission.faculty.full_name}
                          <Badge variant={getStatusColor(submission.status)}>
                            {submission.status === 'submitted' ? 'Pending Review' : 'Reviewed'}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {submission.designation} • {submission.academic_year}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-muted-foreground">
                            {submission.faculty.email}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {submission.total_score}
                        </div>
                        <div className="text-sm text-muted-foreground">out of 375</div>
                        <Badge variant={performance.color as any} className="mt-1">
                          {performance.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Submission
                        </Button>
                        {submission.status === 'submitted' && (
                          <Button size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Review & Score
                          </Button>
                        )}
                        {submission.status === 'reviewed' && (
                          <Button variant="outline" size="sm">
                            <Send className="mr-2 h-4 w-4" />
                            Send to Principal
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}