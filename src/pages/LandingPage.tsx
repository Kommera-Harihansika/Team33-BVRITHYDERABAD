import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ClipboardList, Users, BarChart3, FileText, Shield, Zap, ArrowRight,
  CheckCircle2, Clock, Globe
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Multi-User Collaboration",
    desc: "Faculty members contribute data simultaneously across 17 structured sections in real-time.",
  },
  {
    icon: ClipboardList,
    title: "Structured Data Entry",
    desc: "Dynamic forms for each section with add, edit, and delete capabilities for every entry.",
  },
  {
    icon: FileText,
    title: "Auto Report Generation",
    desc: "Generate professional weekly reports in PDF/DOCX format with one click.",
  },
  {
    icon: BarChart3,
    title: "Completion Dashboard",
    desc: "Track progress across all 17 sections with real-time status indicators.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    desc: "Admin, Coordinator, and Faculty roles with appropriate permissions for each.",
  },
  {
    icon: Zap,
    title: "Live Preview",
    desc: "Preview the final formatted report before submission to catch errors early.",
  },
];

const stats = [
  { value: "17", label: "Report Sections" },
  { value: "3", label: "User Roles" },
  { value: "100%", label: "Automated" },
  { value: "Real-time", label: "Collaboration" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">WeeklySync</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button variant="hero" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5" />
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              Streamline your institutional reporting
            </div>
            <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Collaborative Weekly
              <span className="block gradient-primary bg-clip-text text-transparent">
                Report Management
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Eliminate manual effort, delays, and inconsistencies. Multiple faculty members
              contribute data across 17 structured sections — all in one seamless platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button variant="hero" size="lg" className="gap-2">
                  Open Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-6 shadow-card text-center">
                <div className="font-display text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Everything you need for weekly reporting
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A complete system designed for educational institutions to manage departmental reports efficiently.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="gradient-primary rounded-2xl p-12 text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Ready to streamline your reports?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Start collaborating with your department faculty today and generate professional reports in minutes.
          </p>
          <Link to="/login">
            <Button
              size="lg"
              className="bg-card text-foreground hover:bg-card/90 gap-2"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ClipboardList className="w-4 h-4" />
            WeeklySync — Collaborative Report Management
          </div>
          <div className="text-sm text-muted-foreground">
            © 2026 All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
