import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";

export function PrincipalReviews() {
  return (
    <DashboardLayout userRole="principal">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appraisal Reviews</h1>
          <p className="text-muted-foreground">
            Review and provide final remarks on faculty appraisals.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No reviews pending</h3>
            <p className="text-muted-foreground text-center">
              HOD appraisals will appear here for your final review and remarks.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}