import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, MoreHorizontal, Shield, UserCheck, BookOpen, BarChart3, CheckCircle2, Clock } from "lucide-react";

const users = [
  { id: 1, name: "Dr. Priya Mehta", email: "priya@institution.edu", role: "Admin", sections: 17, lastActive: "2 min ago" },
  { id: 2, name: "Prof. Raj Patel", email: "raj@institution.edu", role: "Coordinator", sections: 8, lastActive: "15 min ago" },
  { id: 3, name: "Dr. Ananya Gupta", email: "ananya@institution.edu", role: "Faculty", sections: 3, lastActive: "1 hr ago" },
  { id: 4, name: "Prof. Suresh Kumar", email: "suresh@institution.edu", role: "Faculty", sections: 5, lastActive: "3 hrs ago" },
  { id: 5, name: "Dr. Kavita Sharma", email: "kavita@institution.edu", role: "Coordinator", sections: 12, lastActive: "30 min ago" },
  { id: 6, name: "Prof. Deepak Singh", email: "deepak@institution.edu", role: "Faculty", sections: 2, lastActive: "1 day ago" },
];

const roleConfig: Record<string, { icon: typeof Shield; variant: "default" | "warning" | "secondary" }> = {
  Admin: { icon: Shield, variant: "default" },
  Coordinator: { icon: UserCheck, variant: "warning" },
  Faculty: { icon: BookOpen, variant: "secondary" },
};

const weeklyStats = [
  { label: "Total Users", value: "6", icon: Users },
  { label: "Active This Week", value: "5", icon: CheckCircle2 },
  { label: "Sections Completed", value: "7/17", icon: BarChart3 },
  { label: "Pending Reviews", value: "3", icon: Clock },
];

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage users and monitor report completion across the department.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeklyStats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* User Management */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between flex-wrap gap-4">
            <h3 className="font-display font-semibold text-foreground">User Management</h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-9"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left font-medium text-muted-foreground px-6 py-3">User</th>
                  <th className="text-left font-medium text-muted-foreground px-6 py-3">Role</th>
                  <th className="text-left font-medium text-muted-foreground px-6 py-3">Sections</th>
                  <th className="text-left font-medium text-muted-foreground px-6 py-3">Last Active</th>
                  <th className="text-center font-medium text-muted-foreground px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => {
                  const rc = roleConfig[user.role];
                  return (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0">
                            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <Badge variant={rc.variant} className="gap-1">
                          <rc.icon className="w-3 h-3" />
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-6 py-3 text-muted-foreground">{user.sections} assigned</td>
                      <td className="px-6 py-3 text-muted-foreground">{user.lastActive}</td>
                      <td className="px-6 py-3 text-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
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
