import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, Users, Settings, ChevronLeft, ChevronRight,
  BookOpen, Award, GraduationCap, Building2, Calendar, Globe, Factory,
  Code2, BadgeCheck, MapPin, Lightbulb, Leaf, Briefcase, Handshake, Wrench,
  ClipboardList, Eye, UserCircle, LogOut, Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sections = [
  { name: "General Points", icon: BookOpen, path: "/section/general-points" },
  { name: "Faculty Joined/Relieved", icon: Users, path: "/section/faculty-joined" },
  { name: "Faculty Achievements", icon: Award, path: "/section/faculty-achievements" },
  { name: "Student Achievements", icon: GraduationCap, path: "/section/student-achievements" },
  { name: "Department Achievements", icon: Building2, path: "/section/department-achievements" },
  { name: "Faculty Events", icon: Calendar, path: "/section/faculty-events" },
  { name: "Student Events", icon: Calendar, path: "/section/student-events" },
  { name: "Non-Technical Events", icon: Globe, path: "/section/non-technical-events" },
  { name: "Industry Visits", icon: Factory, path: "/section/industry-visits" },
  { name: "Hackathons", icon: Code2, path: "/section/hackathons" },
  { name: "Faculty Certifications", icon: BadgeCheck, path: "/section/faculty-certifications" },
  { name: "Faculty Visits", icon: MapPin, path: "/section/faculty-visits" },
  { name: "Patents", icon: Lightbulb, path: "/section/patents" },
  { name: "VEDIC Programs", icon: Leaf, path: "/section/vedic-programs" },
  { name: "Placements", icon: Briefcase, path: "/section/placements" },
  { name: "MoUs", icon: Handshake, path: "/section/mous" },
  { name: "Skill Development", icon: Wrench, path: "/section/skill-development" },
];

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Report Preview", icon: Eye, path: "/report-preview" },
  { name: "Admin Panel", icon: Settings, path: "/admin" },
  { name: "Profile", icon: UserCircle, path: "/profile" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(true);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border shrink-0">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
          <ClipboardList className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-sidebar-accent-foreground text-sm truncate">
            WeeklySync
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}

        {/* Sections group */}
        <div className="pt-4">
          {!collapsed && (
            <button
              onClick={() => setSectionsOpen(!sectionsOpen)}
              className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60"
            >
              Sections
              <ChevronRight
                className={cn("w-3 h-3 transition-transform", sectionsOpen && "rotate-90")}
              />
            </button>
          )}
          {(sectionsOpen || collapsed) && (
            <div className="space-y-0.5 mt-1">
              {sections.map((section) => {
                const active = location.pathname === section.path;
                return (
                  <Link
                    key={section.path}
                    to={section.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-colors",
                      active
                        ? "bg-sidebar-primary/20 text-sidebar-primary-foreground font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )}
                    title={collapsed ? section.name : undefined}
                  >
                    <section.icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="truncate text-xs">{section.name}</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-sidebar-border shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg hover:bg-sidebar-accent/50 transition-colors text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}

export function TopNavbar({ sidebarCollapsed }: { sidebarCollapsed?: boolean }) {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <h2 className="font-display font-semibold text-foreground text-lg">Weekly Report</h2>
        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
          Week 14, 2026
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <FileText className="w-3.5 h-3.5 mr-1.5" />
          Export
        </Button>
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
          JD
        </div>
      </div>
    </header>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "ml-16" : "ml-64")}>
        <TopNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

// Detect sidebar state from DOM for simpler integration
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-64 transition-all duration-300">
        <TopNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
