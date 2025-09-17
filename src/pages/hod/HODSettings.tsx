import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Settings, Bell, Shield, Users, Save } from "lucide-react";

export function HODSettings() {
  const { profile } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    submissionReminders: true,
    weeklyReports: false,
    autoApproval: false,
    deadlineExtensions: true,
  });

  const [departmentSettings, setDepartmentSettings] = useState({
    submissionDeadline: "2024-03-31",
    evaluationCriteria: "",
    instructions: "",
  });

  const handleSaveSettings = async () => {
    try {
      // Here you would save settings to the database
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout userRole="hod">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your department settings and preferences.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Update your personal information and account settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile?.full_name || ""}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profile?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={profile?.position || ""}
                  placeholder="e.g., Head of Department, Professor"
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about faculty submissions
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Submission Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send reminders to faculty about pending submissions
                  </p>
                </div>
                <Switch
                  checked={settings.submissionReminders}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, submissionReminders: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly summary reports
                  </p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, weeklyReports: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Department Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Department Settings
              </CardTitle>
              <CardDescription>
                Configure settings for your department's appraisal process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deadline">Submission Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={departmentSettings.submissionDeadline}
                  onChange={(e) =>
                    setDepartmentSettings({
                      ...departmentSettings,
                      submissionDeadline: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="criteria">Evaluation Criteria</Label>
                <Textarea
                  id="criteria"
                  value={departmentSettings.evaluationCriteria}
                  onChange={(e) =>
                    setDepartmentSettings({
                      ...departmentSettings,
                      evaluationCriteria: e.target.value,
                    })
                  }
                  placeholder="Enter specific evaluation criteria for your department..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions for Faculty</Label>
                <Textarea
                  id="instructions"
                  value={departmentSettings.instructions}
                  onChange={(e) =>
                    setDepartmentSettings({
                      ...departmentSettings,
                      instructions: e.target.value,
                    })
                  }
                  placeholder="Additional instructions for faculty completing their appraisals..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Permissions
              </CardTitle>
              <CardDescription>
                Manage security settings and access permissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-approve Submissions</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve faculty submissions that meet criteria
                  </p>
                </div>
                <Switch
                  checked={settings.autoApproval}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, autoApproval: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Allow Deadline Extensions</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow faculty to request deadline extensions
                  </p>
                </div>
                <Switch
                  checked={settings.deadlineExtensions}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, deadlineExtensions: checked })
                  }
                />
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSaveSettings} className="w-32">
              <Save className="mr-2 h-4 w-4" />
              Save All
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}