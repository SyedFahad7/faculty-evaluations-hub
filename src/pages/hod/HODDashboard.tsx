import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  BarChart3,
  UserPlus,
  FileSearch,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockUser = {
  name: "Dr. Suresh Reddy",
  email: "suresh.reddy@liet.edu",
  role: 'hod' as const,
  department: "Computer Science & Engineering"
};

const mockStats = {
  totalFaculty: 12,
  pendingReviews: 3,
  completedReviews: 8,
  awaitingSubmissions: 1,
};

const mockFacultyList = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    designation: "Assistant Professor",
    status: "completed",
    score: 87,
    submittedDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Prof. Anita Sharma",
    designation: "Associate Professor", 
    status: "under_review",
    score: 0,
    submittedDate: "2024-01-18"
  },
  {
    id: 3,
    name: "Dr. Vikram Singh",
    designation: "Assistant Professor",
    status: "pending",
    score: 0,
    submittedDate: null
  }
];

export function HODDashboard() {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-orange-300 text-orange-600">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout 
      userRole="hod" 
      user={mockUser}
      onLogout={() => navigate("/login")}
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">HOD Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Computer Science & Engineering Department
            </p>
          </div>
          <Button 
            onClick={() => navigate("/hod/faculty/create")}
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add Faculty
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalFaculty}</div>
              <p className="text-xs text-muted-foreground">Active members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{mockStats.pendingReviews}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockStats.completedReviews}</div>
              <p className="text-xs text-muted-foreground">Reviews completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">82%</div>
              <p className="text-xs text-muted-foreground">Department average</p>
            </CardContent>
          </Card>
        </div>

        {/* Urgent Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Urgent Actions Required
            </CardTitle>
            <CardDescription>
              Faculty appraisals that need immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">3 Faculty Submissions Pending Review</p>
                    <p className="text-sm text-muted-foreground">
                      Self-appraisals submitted and awaiting HOD evaluation
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Review Now
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileSearch className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">1 Faculty Yet to Submit</p>
                    <p className="text-sm text-muted-foreground">
                      Dr. Vikram Singh hasn't submitted self-appraisal form
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Send Reminder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faculty Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Faculty Performance Overview</CardTitle>
            <CardDescription>Status of faculty appraisals in your department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockFacultyList.map((faculty) => (
                <div 
                  key={faculty.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium text-primary">
                        {faculty.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{faculty.name}</p>
                      <p className="text-sm text-muted-foreground">{faculty.designation}</p>
                      {faculty.submittedDate && (
                        <p className="text-xs text-muted-foreground">
                          Submitted: {faculty.submittedDate}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {faculty.status === 'completed' && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{faculty.score}%</div>
                        <p className="text-xs text-muted-foreground">Final Score</p>
                      </div>
                    )}
                    {getStatusBadge(faculty.status)}
                    <Button variant="outline" size="sm">
                      {faculty.status === 'completed' ? 'View Details' : 
                       faculty.status === 'under_review' ? 'Continue Review' : 
                       'Send Reminder'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Review Progress</CardTitle>
              <CardDescription>Overall department appraisal progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">8</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">3</div>
                    <div className="text-xs text-muted-foreground">In Review</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">1</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Distribution</CardTitle>
              <CardDescription>Faculty performance score ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Excellent (90-100)</span>
                  <span className="text-sm font-medium">2 faculty</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Very Good (80-89)</span>
                  <span className="text-sm font-medium">4 faculty</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Good (70-79)</span>
                  <span className="text-sm font-medium">2 faculty</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average (60-69)</span>
                  <span className="text-sm font-medium">0 faculty</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Below Average (&lt;60)</span>
                  <span className="text-sm font-medium">0 faculty</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}