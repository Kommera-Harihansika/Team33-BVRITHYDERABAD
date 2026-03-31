import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Building2, Shield, Camera, Save } from "lucide-react";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6 max-w-3xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your account settings.</p>
        </div>

        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          {/* Profile Header */}
          <div className="gradient-primary p-8">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-card/20 flex items-center justify-center text-primary-foreground text-2xl font-display font-bold">
                  PM
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card flex items-center justify-center shadow-md">
                  <Camera className="w-3.5 h-3.5 text-foreground" />
                </button>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-primary-foreground">Dr. Priya Mehta</h2>
                <p className="text-primary-foreground/70 text-sm">priya@institution.edu</p>
                <Badge className="mt-2 bg-card/20 text-primary-foreground border-0 gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </Badge>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="Dr. Priya Mehta" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="priya@institution.edu" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="Computer Science & Engineering" className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Designation</Label>
                <Input defaultValue="Associate Professor & HOD" />
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <Button variant="hero" className="gap-1.5">
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
