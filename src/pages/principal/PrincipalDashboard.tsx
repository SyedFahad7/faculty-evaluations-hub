import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Calendar,
  Award,
  BarChart3,
  Filter,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const mockUser = {
  name: "Dr. M. Ramesh",
  email: "principal@liet.edu",
  role: 'principal' as const,
  department: "Administration"
};

const mockStats = {
  totalDepartments: 8,
  totalFaculty: 95,
  completedAppraisals: 72,
  avgInstitutionScore: 84,
};

const mockDepartments = [
  {
    id: 1,
    name: "Computer Science & Engineering",
    hod: "Dr. Suresh Reddy",
    totalFaculty: 12,
    completedReviews: 10,
    avgScore: 86,
    status: "excellent"
  },
  {
    id: 2,
    name: "Electronics & Communication",
    hod: "Dr. Priya Nair",
    totalFaculty: 10,
    completedReviews: 8,
    avgScore: 82,
    status: "very_good"
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    hod: "Prof. Ravi Kumar",
    totalFaculty: 15,
    completedReviews: 12,
    avgScore: 78,
    status: "good"
  },
  {
    id: 4,
    name: "Civil Engineering",
    hod: "Dr. Lakshmi Devi",
    totalFaculty: 11,
    completedReviews: 9,
    avgScore: 85,
    status: "very_good"
  }
];

const mockRecentReviews = [
  {
    id: 1,
    facultyName: "Dr. Rajesh Kumar",
    department: "CSE",
    finalScore: 87,
    hodRemarks: "Excellent performance in teaching and research",
    submittedDate: "2024-01-20",
    status: "reviewed"
  },
  {
    id: 2,
    facultyName: "Prof. Anita Sharma",
    department: "ECE",
    finalScore: 82,
    hodRemarks: "Good teaching performance, needs improvement in research",
    submittedDate: "2024-01-19",
    status: "pending"
  }
];

export function PrincipalDashboard() {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'very_good':
        return <Badge className="bg-blue-100 text-blue-800">Very Good</Badge>;
      case 'good':
        return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
      case 'reviewed':
        return <Badge className="bg-green-100 text-green-800">Reviewed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-orange-300 text-orange-600">Pending Review</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout 
      userRole="principal" 
      user={mockUser}
      onLogout={() => navigate("/login")}
    >
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Principal Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Lords Institute of Engineering & Technology
            </p>
          </div>
          <Button 
            variant="outline"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export Reports
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cse">Computer Science</SelectItem>
                  <SelectItem value="ece">Electronics & Comm.</SelectItem>
                  <SelectItem value="mech">Mechanical</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Semester</SelectItem>
                  <SelectItem value="previous">Previous Semester</SelectItem>
                  <SelectItem value="annual">Annual Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Institution Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalDepartments}</div>
              <p className="text-xs text-muted-foreground">Academic departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalFaculty}</div>
              <p className="text-xs text-muted-foreground">Active faculty members</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Reviews</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{mockStats.completedAppraisals}</div>
              <p className="text-xs text-muted-foreground">Of {mockStats.totalFaculty} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Institution Average</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{mockStats.avgInstitutionScore}%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Institution Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Institution Overview</CardTitle>
            <CardDescription>Overall appraisal completion progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Completion Rate</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round((mockStats.completedAppraisals / mockStats.totalFaculty) * 100)}%
                </span>
              </div>
              <Progress value={(mockStats.completedAppraisals / mockStats.totalFaculty) * 100} className="h-3" />
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">{mockStats.completedAppraisals}</div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">15</div>
                  <div className="text-xs text-muted-foreground">In Review</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">8</div>
                  <div className="text-xs text-muted-foreground">Pending</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">{mockStats.avgInstitutionScore}%</div>
                  <div className="text-xs text-muted-foreground">Avg Score</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>Performance overview by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDepartments.map((dept) => (
                <div 
                  key={dept.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{dept.name}</p>
                      <p className="text-sm text-muted-foreground">HOD: {dept.hod}</p>
                      <p className="text-xs text-muted-foreground">
                        {dept.completedReviews}/{dept.totalFaculty} reviews completed
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{dept.avgScore}%</div>
                      <p className="text-xs text-muted-foreground">Avg Score</p>
                    </div>
                    {getStatusBadge(dept.status)}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews Pending Principal Remarks</CardTitle>
            <CardDescription>Faculty appraisals awaiting your final review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentReviews.map((review) => (
                <div 
                  key={review.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium text-primary text-sm">
                        {review.facultyName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{review.facultyName}</p>
                      <p className="text-sm text-muted-foreground">{review.department} Department</p>
                      <p className="text-xs text-muted-foreground">
                        Submitted: {review.submittedDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{review.finalScore}%</div>
                      <p className="text-xs text-muted-foreground">Final Score</p>
                    </div>
                    {getStatusBadge(review.status)}
                    <Button variant="outline" size="sm">
                      {review.status === 'pending' ? 'Add Remarks' : 'View Review'}
                    </Button>
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