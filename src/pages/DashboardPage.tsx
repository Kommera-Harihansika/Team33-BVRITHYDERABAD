import AppLayout from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ClipboardList, CheckCircle2, Clock, AlertCircle, TrendingUp,
  Users, FileText, BarChart3
} from "lucide-react";

const sectionStatuses = [
  { name: "General Points", status: "completed", entries: 5 },
  { name: "Faculty Joined/Relieved", status: "completed", entries: 2 },
  { name: "Faculty Achievements", status: "in-progress", entries: 3 },
  { name: "Student Achievements", status: "in-progress", entries: 4 },
  { name: "Department Achievements", status: "completed", entries: 1 },
  { name: "Faculty Events", status: "pending", entries: 0 },
  { name: "Student Events", status: "in-progress", entries: 2 },
  { name: "Non-Technical Events", status: "pending", entries: 0 },
  { name: "Industry Visits", status: "completed", entries: 3 },
  { name: "Hackathons", status: "pending", entries: 0 },
  { name: "Faculty Certifications", status: "in-progress", entries: 1 },
  { name: "Faculty Visits", status: "completed", entries: 2 },
  { name: "Patents", status: "pending", entries: 0 },
  { name: "VEDIC Programs", status: "completed", entries: 1 },
  { name: "Placements", status: "in-progress", entries: 6 },
  { name: "MoUs", status: "pending", entries: 0 },
  { name: "Skill Development", status: "completed", entries: 4 },
];

const completed = sectionStatuses.filter((s) => s.status === "completed").length;
const inProgress = sectionStatuses.filter((s) => s.status === "in-progress").length;
const pending = sectionStatuses.filter((s) => s.status === "pending").length;
const completionPct = Math.round((completed / sectionStatuses.length) * 100);

const statusConfig: Record<string, { badge: "success" | "warning" | "pending"; icon: typeof CheckCircle2; label: string }> = {
  completed: { badge: "success", icon: CheckCircle2, label: "Completed" },
  "in-progress": { badge: "warning", icon: Clock, label: "In Progress" },
  pending: { badge: "pending", icon: AlertCircle, label: "Pending" },
};

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your weekly report completion across all 17 sections.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Sections", value: "17", icon: ClipboardList, color: "text-primary" },
            { label: "Completed", value: completed.toString(), icon: CheckCircle2, color: "text-success" },
            { label: "In Progress", value: inProgress.toString(), icon: Clock, color: "text-warning" },
            { label: "Pending", value: pending.toString(), icon: AlertCircle, color: "text-muted-foreground" },
          ].map((card) => (
            <div key={card.label} className="bg-card rounded-xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{card.label}</span>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="font-display text-3xl font-bold text-foreground">{card.value}</div>
            </div>
          ))}
        </div>

        {/* Overall Progress */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-semibold text-foreground">Overall Progress</h3>
              <p className="text-sm text-muted-foreground">Week 14, 2026</p>
            </div>
            <span className="text-2xl font-display font-bold text-primary">{completionPct}%</span>
          </div>
          <Progress value={completionPct} className="h-3" />
          <div className="flex items-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-1.5 text-success">
              <div className="w-2.5 h-2.5 rounded-full bg-success" /> {completed} Completed
            </span>
            <span className="flex items-center gap-1.5 text-warning">
              <div className="w-2.5 h-2.5 rounded-full bg-warning" /> {inProgress} In Progress
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full bg-muted" /> {pending} Pending
            </span>
          </div>
        </div>

        {/* Section Tracker */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="font-display font-semibold text-foreground">Section Progress Tracker</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-6 py-3">#</th>
                  <th className="text-left font-medium text-muted-foreground px-6 py-3">Section</th>
                  <th className="text-left font-medium text-muted-foreground px-6 py-3">Entries</th>
                  <th className="text-left font-medium text-muted-foreground px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {sectionStatuses.map((section, i) => {
                  const cfg = statusConfig[section.status];
                  return (
                    <tr key={section.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3 text-muted-foreground">{i + 1}</td>
                      <td className="px-6 py-3 font-medium text-foreground">{section.name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{section.entries}</td>
                      <td className="px-6 py-3">
                        <Badge variant={cfg.badge} className="gap-1">
                          <cfg.icon className="w-3 h-3" />
                          {cfg.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
