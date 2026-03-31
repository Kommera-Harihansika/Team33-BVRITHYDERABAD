import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClipboardList, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("faculty");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-card blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-card blur-3xl" />
        </div>
        <div className="relative max-w-md text-primary-foreground">
          <div className="w-14 h-14 rounded-2xl bg-card/20 flex items-center justify-center mb-8">
            <ClipboardList className="w-7 h-7" />
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">WeeklySync</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            Collaborative weekly report management for educational institutions.
            Streamline data collection across 17 sections with your team.
          </p>
          <div className="mt-12 space-y-4">
            {["Real-time collaboration", "Auto-generated reports", "Role-based access control"].map(
              (item) => (
                <div key={item} className="flex items-center gap-3 text-sm opacity-80">
                  <div className="w-5 h-5 rounded-full bg-card/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-card" />
                  </div>
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">WeeklySync</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {isSignUp
                ? "Sign up to start collaborating on reports"
                : "Sign in to continue managing reports"}
            </p>
          </div>

          <div className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="name" placeholder="Dr. Jane Smith" className="pl-10" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@institution.edu" className="pl-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "faculty", label: "Faculty" },
                    { value: "coordinator", label: "Coordinator" },
                    { value: "admin", label: "Admin" },
                  ].map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setRole(r.value)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                        role === r.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Link to="/dashboard">
              <Button variant="hero" className="w-full mt-2">
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </Link>

            <p className="text-center text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:underline font-medium"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
