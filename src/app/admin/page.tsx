"use client";

import { useI18n } from "@/hooks/use-i18n";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Activity, Settings, CheckCircle, XCircle } from "lucide-react";

export default function AdminDashboard() {
  const { t } = useI18n();

  const stats = [
    { label: "Total Tools", value: "5,432", icon: <FileText className="h-5 w-5" />, color: "text-primary" },
    { label: "Active Users", value: "128.5k", icon: <Users className="h-5 w-5" />, color: "text-accent" },
    { label: "Pending Reviews", value: "142", icon: <Activity className="h-5 w-5" />, color: "text-yellow-500" },
  ];

  const pendingSubmissions = [
    { id: 1, name: "Nexus AI", category: "Writing", date: "2024-05-20", status: "Pending" },
    { id: 2, name: "PixFlow", category: "Video", date: "2024-05-19", status: "Reviewing" },
    { id: 3, name: "CodeGPT-4", category: "Coding", date: "2024-05-18", status: "Pending" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          Admin Control Center
        </h1>
        <Button>System Report</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-secondary/20 border-secondary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Card className="bg-secondary/10 border-secondary h-full">
            <CardHeader>
              <CardTitle>Pending Tool Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-secondary hover:bg-transparent">
                    <TableHead>Tool Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingSubmissions.map((sub) => (
                    <TableRow key={sub.id} className="border-secondary/50 hover:bg-secondary/20">
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell>{sub.category}</TableCell>
                      <TableCell className="text-muted-foreground">{sub.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-yellow-500/50 text-yellow-500">
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right flex justify-end gap-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-secondary/10 border-secondary h-full">
            <CardHeader>
              <CardTitle>Global Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  "User 'Sarah' registered from France",
                  "Tool 'Midjourney' received a 5-star review",
                  "Search peak detected in UAE (Arabic)",
                  "Admin approved 'ChatGPT' update"
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <p className="text-sm text-muted-foreground leading-snug">{log}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}