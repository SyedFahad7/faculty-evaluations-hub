import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, FileBarChart, Users, TrendingUp, Calendar } from "lucide-react";

interface ReportData {
  totalFaculty: number;
  submissionsThisYear: number;
  averageScore: number;
  performanceDistribution: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  monthlySubmissions: Array<{
    month: string;
    submissions: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function HODReports() {
  const { profile } = useAuth();
  const [reportData, setReportData] = useState<ReportData>({
    totalFaculty: 0,
    submissionsThisYear: 0,
    averageScore: 0,
    performanceDistribution: [],
    monthlySubmissions: [],
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData();
  }, [profile, selectedYear]);

  const fetchReportData = async () => {
    if (!profile?.department_id) return;

    try {
      // Fetch total faculty count
      const { data: facultyData, error: facultyError } = await supabase
        .from('profiles')
        .select('id')
        .eq('department_id', profile.department_id)
        .eq('role', 'faculty');

      if (facultyError) throw facultyError;

      // Fetch submissions for the selected year
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('faculty_self_appraisals')
        .select('*')
        .eq('department_id', profile.department_id)
        .eq('academic_year', `${selectedYear}-${parseInt(selectedYear) + 1}`);

      if (submissionsError) throw submissionsError;

      // Calculate performance distribution
      const performanceDistribution = [
        { category: 'Excellent (90-100)', count: 0, percentage: 0 },
        { category: 'Very Good (80-90)', count: 0, percentage: 0 },
        { category: 'Good (70-80)', count: 0, percentage: 0 },
        { category: 'Average (60-70)', count: 0, percentage: 0 },
        { category: 'Below Average (<60)', count: 0, percentage: 0 },
      ];

      submissionsData?.forEach(submission => {
        const score = submission.total_score;
        if (score >= 90) performanceDistribution[0].count++;
        else if (score >= 80) performanceDistribution[1].count++;
        else if (score >= 70) performanceDistribution[2].count++;
        else if (score >= 60) performanceDistribution[3].count++;
        else performanceDistribution[4].count++;
      });

      const totalSubmissions = submissionsData?.length || 0;
      performanceDistribution.forEach(item => {
        item.percentage = totalSubmissions > 0 ? (item.count / totalSubmissions) * 100 : 0;
      });

      // Calculate average score
      const averageScore = totalSubmissions > 0 
        ? submissionsData?.reduce((sum, sub) => sum + sub.total_score, 0) / totalSubmissions
        : 0;

      // Generate monthly submissions data (mock data for now)
      const monthlySubmissions = [
        { month: 'Jan', submissions: Math.floor(Math.random() * 10) },
        { month: 'Feb', submissions: Math.floor(Math.random() * 10) },
        { month: 'Mar', submissions: Math.floor(Math.random() * 10) },
        { month: 'Apr', submissions: Math.floor(Math.random() * 10) },
        { month: 'May', submissions: Math.floor(Math.random() * 10) },
        { month: 'Jun', submissions: Math.floor(Math.random() * 10) },
      ];

      setReportData({
        totalFaculty: facultyData?.length || 0,
        submissionsThisYear: totalSubmissions,
        averageScore: Math.round(averageScore * 10) / 10,
        performanceDistribution,
        monthlySubmissions,
      });
    } catch (error: any) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userRole="hod">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading reports...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="hod">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Department Reports</h1>
            <p className="text-muted-foreground">
              Analyze faculty performance and department metrics.
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024-25</SelectItem>
                <SelectItem value="2023">2023-24</SelectItem>
                <SelectItem value="2022">2022-23</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.totalFaculty}</div>
              <p className="text-xs text-muted-foreground">
                Active faculty members
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submissions</CardTitle>
              <FileBarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.submissionsThisYear}</div>
              <p className="text-xs text-muted-foreground">
                This academic year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.averageScore}</div>
              <p className="text-xs text-muted-foreground">
                Out of 375 points
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {reportData.totalFaculty > 0 
                  ? Math.round((reportData.submissionsThisYear / reportData.totalFaculty) * 100)
                  : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                Faculty completed appraisals
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
              <CardDescription>
                Faculty performance categories for {selectedYear}-{parseInt(selectedYear) + 1}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportData.performanceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category}: ${percentage.toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {reportData.performanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Submissions</CardTitle>
              <CardDescription>
                Submission trends throughout the academic year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportData.monthlySubmissions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="submissions" fill="#0071bd" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Report Summary</CardTitle>
            <CardDescription>
              Key insights from the department performance data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Performance Highlights</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {reportData.performanceDistribution[0]?.count || 0} faculty members achieved excellent performance</li>
                  <li>• Average department score: {reportData.averageScore}/375</li>
                  <li>• {Math.round((reportData.submissionsThisYear / reportData.totalFaculty) * 100)}% completion rate</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Areas for Improvement</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Encourage faculty to complete professional development activities</li>
                  <li>• Support research publication initiatives</li>
                  <li>• Provide training on innovative teaching methods</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}