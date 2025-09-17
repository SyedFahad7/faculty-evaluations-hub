import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export function PrincipalSettings() {
  return (
    <DashboardLayout userRole="principal">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">
            Configure institution-wide settings and preferences.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Settings className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">System Configuration</h3>
            <p className="text-muted-foreground text-center">
              Advanced system settings and configuration options.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}