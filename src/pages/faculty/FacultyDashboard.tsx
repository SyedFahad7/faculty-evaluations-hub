import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Calendar,
  User,
  GraduationCap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockUser = {
  name: "Dr. Rajesh Kumar",
  email: "rajesh.kumar@liet.edu",
  role: 'faculty' as const,
  department: "Computer Science & Engineering"
};

const mockStats = {
  totalAppraisals: 3,
  pendingAppraisals: 1,
  completedAppraisals: 2,
  averageScore: 85,
  currentScore: 0, // In progress
};

const mockSubmissions = [
  {
    id: 1,
    period: "2023-24 (Semester I)",
    status: "completed",
    score: 87,
    submittedDate: "2024-01-15",
    hodReview: "completed"
  },
  {
    id: 2,
    period: "2023-24 (Semester II)",
    status: "completed", 
    score: 83,
    submittedDate: "2024-06-10",
    hodReview: "completed"
  },
  {
    id: 3,
    period: "2024-25 (Semester I)",
    status: "draft",
    score: 0,
    submittedDate: null,
    hodReview: "pending"
  }
];

export function FacultyDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout 
      userRole="faculty" 
      user={mockUser}
      onLogout={() => navigate("/login")}
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, Dr. Kumar</h1>
            <p className="text-muted-foreground mt-1">
              Computer Science & Engineering Department
            </p>
          </div>
          <Button 
            onClick={() => navigate("/faculty/self-appraisal")}
            className="gap-2"
          >
            <FileText className="h-4 w-4" />
            Start New Appraisal
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Appraisals</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalAppraisals}</div>
              <p className="text-xs text-muted-foreground">All time submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{mockStats.pendingAppraisals}</div>
              <p className="text-xs text-muted-foreground">Awaiting completion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockStats.completedAppraisals}</div>
              <p className="text-xs text-muted-foreground">Successfully submitted</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{mockStats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Current Appraisal Progress
            </CardTitle>
            <CardDescription>
              2024-25 Semester I - Self Appraisal Form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Form Completion</span>
                <span className="text-sm text-muted-foreground">0% Complete</span>
              </div>
              <Progress value={0} className="h-2" />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Complete your self-appraisal to proceed with the review process
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/faculty/self-appraisal")}
                >
                  Continue Form
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>Your appraisal history and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSubmissions.map((submission) => (
                <div 
                  key={submission.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      submission.status === 'completed' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-orange-100 text-orange-600'
                    }`}>
                      {submission.status === 'completed' ? 
                        <CheckCircle className="h-5 w-5" /> : 
                        <Clock className="h-5 w-5" />
                      }
                    </div>
                    <div>
                      <p className="font-medium">{submission.period}</p>
                      <p className="text-sm text-muted-foreground">
                        {submission.submittedDate ? 
                          `Submitted on ${submission.submittedDate}` : 
                          'Not submitted yet'
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {submission.status === 'completed' && (
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Score: {submission.score}%
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">HOD Reviewed</p>
                      </div>
                    )}
                    {submission.status === 'draft' && (
                      <Badge variant="outline" className="border-orange-300 text-orange-600">
                        Draft
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}