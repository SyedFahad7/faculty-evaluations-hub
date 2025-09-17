import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, 
  Send, 
  Upload, 
  Plus, 
  Trash2, 
  FileText, 
  GraduationCap,
  Award,
  Users,
  Settings
} from "lucide-react";

const mockUser = {
  name: "Dr. Rajesh Kumar",
  email: "rajesh.kumar@liet.edu",
  role: 'faculty' as const,
  department: "Computer Science & Engineering"
};

interface CourseData {
  semester: string;
  courseName: string;
  periodsTeught: number;
  studentsAppeared: number;
  studentsPassed: number;
  passPercentage: number;
  timesTaught: number;
  assessmentScore: number;
}

interface ProjectData {
  program: string;
  rollNumbers: string;
  studentNames: string;
  projectType: 'mini' | 'major';
  title: string;
  type: 'inhouse' | 'external';
  assessmentScore: number;
}

export function SelfAppraisalForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("basic-info");
  
  // Basic Information State
  const [basicInfo, setBasicInfo] = useState({
    name: "Dr. Rajesh Kumar",
    department: "Computer Science & Engineering",
    designation: "Assistant Professor",
    qualification: "Ph.D in Computer Science",
    joiningDate: "2020-07-01",
    totalExperience: "8 years",
    lietExperience: "4 years",
    phdUniversity: "Osmania University",
    mode: "Full Time",
    pgUniversity: "JNTU Hyderabad",
    pgCollege: "CBIT",
    ugCollege: "VJIT",
    ugUniversity: "JNTU Hyderabad",
    clsAvailed: "5",
    lopsTaken: "0",
    lastIncrement: "2024-07-01"
  });

  // Teaching Data
  const [courses, setCourses] = useState<CourseData[]>([
    {
      semester: "I",
      courseName: "Data Structures",
      periodsTeught: 60,
      studentsAppeared: 45,
      studentsPassed: 42,
      passPercentage: 93.3,
      timesTaught: 3,
      assessmentScore: 35
    }
  ]);

  const [projects, setProjects] = useState<ProjectData[]>([
    {
      program: "B.Tech CSE",
      rollNumbers: "20CSE001, 20CSE002",
      studentNames: "Aarav Singh, Priya Sharma",
      projectType: "major",
      title: "AI-based Health Monitoring System",
      type: "inhouse",
      assessmentScore: 10
    }
  ]);

  const [formProgress, setFormProgress] = useState(25);

  const addCourse = () => {
    setCourses([...courses, {
      semester: "",
      courseName: "",
      periodsTeught: 0,
      studentsAppeared: 0,
      studentsPassed: 0,
      passPercentage: 0,
      timesTaught: 0,
      assessmentScore: 0
    }]);
  };

  const addProject = () => {
    setProjects([...projects, {
      program: "",
      rollNumbers: "",
      studentNames: "",
      projectType: "mini",
      title: "",
      type: "inhouse",
      assessmentScore: 0
    }]);
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved successfully.",
    });
  };

  const handleSubmitForm = () => {
    toast({
      title: "Form Submitted",
      description: "Your self-appraisal has been submitted for HOD review.",
    });
    navigate("/faculty/dashboard");
  };

  return (
    <DashboardLayout 
      userRole="faculty" 
      user={mockUser}
      onLogout={() => navigate("/login")}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Faculty Self Appraisal Form</h1>
            <p className="text-muted-foreground mt-1">Academic Year 2024-25</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1">
              {formProgress}% Complete
            </Badge>
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Form Completion</span>
              <span className="text-sm text-muted-foreground">{formProgress}%</span>
            </div>
            <Progress value={formProgress} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Form */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic-info" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="teaching" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Teaching
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Research
            </TabsTrigger>
            <TabsTrigger value="professional" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Professional
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Admin
            </TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic-info">
            <Card className="form-section">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Please fill in your personal and professional details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name of Faculty Member</Label>
                    <Input
                      id="name"
                      value={basicInfo.name}
                      onChange={(e) => setBasicInfo({...basicInfo, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={basicInfo.department}
                      onChange={(e) => setBasicInfo({...basicInfo, department: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Select value={basicInfo.designation} onValueChange={(value) => setBasicInfo({...basicInfo, designation: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                        <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                        <SelectItem value="Professor">Professor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualification">Qualification</Label>
                    <Input
                      id="qualification"
                      value={basicInfo.qualification}
                      onChange={(e) => setBasicInfo({...basicInfo, qualification: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="joiningDate">Date of Joining</Label>
                    <Input
                      id="joiningDate"
                      type="date"
                      value={basicInfo.joiningDate}
                      onChange={(e) => setBasicInfo({...basicInfo, joiningDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalExperience">Total Experience</Label>
                    <Input
                      id="totalExperience"
                      value={basicInfo.totalExperience}
                      onChange={(e) => setBasicInfo({...basicInfo, totalExperience: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teaching Tab */}
          <TabsContent value="teaching" className="space-y-6">
            {/* Theory/Lab Courses */}
            <Card className="form-section">
              <CardHeader>
                <CardTitle>Part A - Teaching (Total Score: 100)</CardTitle>
                <CardDescription>
                  Theory/Lab courses taught during the last 2 semesters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Course {index + 1}</h4>
                        {courses.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCourses(courses.filter((_, i) => i !== index))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label>Semester</Label>
                          <Select 
                            value={course.semester} 
                            onValueChange={(value) => {
                              const updated = [...courses];
                              updated[index].semester = value;
                              setCourses(updated);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="I">I</SelectItem>
                              <SelectItem value="II">II</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Course Name</Label>
                          <Input
                            value={course.courseName}
                            onChange={(e) => {
                              const updated = [...courses];
                              updated[index].courseName = e.target.value;
                              setCourses(updated);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Periods Taken</Label>
                          <Input
                            type="number"
                            value={course.periodsTeught}
                            onChange={(e) => {
                              const updated = [...courses];
                              updated[index].periodsTeught = parseInt(e.target.value) || 0;
                              setCourses(updated);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Students Appeared</Label>
                          <Input
                            type="number"
                            value={course.studentsAppeared}
                            onChange={(e) => {
                              const updated = [...courses];
                              updated[index].studentsAppeared = parseInt(e.target.value) || 0;
                              updated[index].passPercentage = updated[index].studentsPassed > 0 ? 
                                (updated[index].studentsPassed / parseInt(e.target.value)) * 100 : 0;
                              setCourses(updated);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Students Passed</Label>
                          <Input
                            type="number"
                            value={course.studentsPassed}
                            onChange={(e) => {
                              const updated = [...courses];
                              updated[index].studentsPassed = parseInt(e.target.value) || 0;
                              updated[index].passPercentage = course.studentsAppeared > 0 ? 
                                (parseInt(e.target.value) / course.studentsAppeared) * 100 : 0;
                              setCourses(updated);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Pass %</Label>
                          <Input
                            value={course.passPercentage.toFixed(1)}
                            disabled
                            className="bg-muted"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Times Taught</Label>
                          <Input
                            type="number"
                            value={course.timesTaught}
                            onChange={(e) => {
                              const updated = [...courses];
                              updated[index].timesTaught = parseInt(e.target.value) || 0;
                              setCourses(updated);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Assessment Score</Label>
                          <Input
                            type="number"
                            max="40"
                            value={course.assessmentScore}
                            onChange={(e) => {
                              const updated = [...courses];
                              updated[index].assessmentScore = parseInt(e.target.value) || 0;
                              setCourses(updated);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addCourse} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Course
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Project Guidance */}
            <Card className="form-section">
              <CardHeader>
                <CardTitle>Project Guidance/Supervision</CardTitle>
                <CardDescription>
                  Assessment: 5 points per project and 5 additional points for best project awarded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Project {index + 1}</h4>
                        {projects.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setProjects(projects.filter((_, i) => i !== index))}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Program</Label>
                          <Input
                            value={project.program}
                            onChange={(e) => {
                              const updated = [...projects];
                              updated[index].program = e.target.value;
                              setProjects(updated);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Roll Numbers</Label>
                          <Input
                            value={project.rollNumbers}
                            onChange={(e) => {
                              const updated = [...projects];
                              updated[index].rollNumbers = e.target.value;
                              setProjects(updated);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Student Names</Label>
                          <Input
                            value={project.studentNames}
                            onChange={(e) => {
                              const updated = [...projects];
                              updated[index].studentNames = e.target.value;
                              setProjects(updated);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Project Type</Label>
                          <Select
                            value={project.projectType}
                            onValueChange={(value: 'mini' | 'major') => {
                              const updated = [...projects];
                              updated[index].projectType = value;
                              setProjects(updated);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mini">Mini Project</SelectItem>
                              <SelectItem value="major">Major Project</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Project Title</Label>
                          <Input
                            value={project.title}
                            onChange={(e) => {
                              const updated = [...projects];
                              updated[index].title = e.target.value;
                              setProjects(updated);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addProject} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research">
            <Card className="form-section">
              <CardHeader>
                <CardTitle>Part B - Research, IPR & Consultancy</CardTitle>
                <CardDescription>
                  Research publications, patents, and consultancy work
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="publications">Research Publications</Label>
                    <Textarea
                      id="publications"
                      placeholder="List your research publications with journal names, impact factor, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patents">Patents & IPR</Label>
                    <Textarea
                      id="patents"
                      placeholder="List patents filed/granted, copyrights, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consultancy">Consultancy Work</Label>
                    <Textarea
                      id="consultancy"
                      placeholder="Describe consultancy projects and industry collaborations"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Development Tab */}
          <TabsContent value="professional">
            <Card className="form-section">
              <CardHeader>
                <CardTitle>Part C - Professional Development</CardTitle>
                <CardDescription>
                  Conferences, workshops, certifications, and other professional activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="conferences">Conferences Attended</Label>
                    <Textarea
                      id="conferences"
                      placeholder="List conferences, seminars, and workshops attended"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certifications</Label>
                    <Textarea
                      id="certifications"
                      placeholder="List professional certifications and training programs"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberships">Professional Memberships</Label>
                    <Textarea
                      id="memberships"
                      placeholder="List professional society memberships and activities"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Administration Tab */}
          <TabsContent value="admin">
            <Card className="form-section">
              <CardHeader>
                <CardTitle>Part D - Administration</CardTitle>
                <CardDescription>
                  Administrative responsibilities and other duties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="adminRoles">Administrative Roles</Label>
                    <Textarea
                      id="adminRoles"
                      placeholder="List administrative positions held and responsibilities"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="committees">Committee Memberships</Label>
                    <Textarea
                      id="committees"
                      placeholder="List committee memberships and contributions"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherDuties">Other Duties</Label>
                    <Textarea
                      id="otherDuties"
                      placeholder="Any other institutional duties and responsibilities"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  {/* File Upload Section */}
                  <Separator />
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Supporting Documents</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <div className="mt-4">
                        <Button variant="outline">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Documents
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                          Upload certificates, publications, and other supporting documents
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Digital Signature */}
                  <Separator />
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Digital Signature</Label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="signature-confirm" 
                        className="rounded border-border" 
                      />
                      <Label htmlFor="signature-confirm" className="text-sm">
                        I hereby certify that the information provided in this self-appraisal form is true and accurate to the best of my knowledge.
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submit Section */}
        <div className="flex items-center justify-between py-6">
          <Button variant="outline" onClick={() => navigate("/faculty/dashboard")}>
            Back to Dashboard
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button onClick={handleSubmitForm}>
              <Send className="mr-2 h-4 w-4" />
              Submit for Review
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}