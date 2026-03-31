import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Entry = {
  id: string;
  dbId?: string;
  fields: Record<string, string>;
};

const sectionConfig: Record<string, { title: string; columns: string[] }> = {
  "general-points": { title: "General Points", columns: ["Point", "Description", "Added By"] },
  "faculty-joined": { title: "Faculty Joined / Relieved", columns: ["Name", "Designation", "Department", "Date", "Status (Joined/Relieved)"] },
  "faculty-achievements": { title: "Faculty Achievements", columns: ["Faculty Name", "Achievement", "Category", "Date"] },
  "student-achievements": { title: "Student Achievements", columns: ["Student Name", "Class", "Achievement", "Event/Competition", "Date"] },
  "department-achievements": { title: "Department Achievements", columns: ["Achievement", "Description", "Date"] },
  "faculty-events": { title: "Faculty Events", columns: ["Event Name", "Organizer", "Date", "Venue", "Participants"] },
  "student-events": { title: "Student Events", columns: ["Event Name", "Coordinator", "Date", "Venue", "Participants"] },
  "non-technical-events": { title: "Non-Technical Events", columns: ["Event Name", "Type", "Date", "Venue", "Participants"] },
  "industry-visits": { title: "Industry Visits", columns: ["Company", "Date", "Faculty Coordinator", "Students Count", "Purpose"] },
  "hackathons": { title: "Hackathons Participation", columns: ["Hackathon Name", "Team Members", "Date", "Organizer", "Result"] },
  "faculty-certifications": { title: "Faculty Certifications", columns: ["Faculty Name", "Certification", "Issuing Body", "Date"] },
  "faculty-visits": { title: "Faculty Visits", columns: ["Faculty Name", "Institute/Company", "Purpose", "Date"] },
  "patents": { title: "Patents", columns: ["Title", "Inventors", "Filing Date", "Status", "Patent Number"] },
  "vedic-programs": { title: "VEDIC Programs", columns: ["Program Name", "Coordinator", "Date", "Participants", "Description"] },
  "placements": { title: "Placements", columns: ["Student Name", "Company", "Package (LPA)", "Role", "Date"] },
  "mous": { title: "MoUs", columns: ["Organization", "Purpose", "Date Signed", "Duration", "Contact Person"] },
  "skill-development": { title: "Skill Development Programs", columns: ["Program Name", "Trainer", "Date", "Duration", "Participants"] },
};

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0];
}

export default function SectionEntryPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const config = sectionConfig[sectionId || ""] || { title: "Unknown Section", columns: [] };
  const { user } = useAuth();
  const weekStart = getWeekStart();

  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !sectionId) return;
    loadEntries();
  }, [user, sectionId]);

  const loadEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("report_entries")
      .select("*")
      .eq("section_id", sectionId!)
      .eq("week_start", weekStart);

    if (error) {
      toast.error("Failed to load entries");
      setLoading(false);
      return;
    }

    if (data && data.length > 0) {
      setEntries(data.map((d) => ({
        id: crypto.randomUUID(),
        dbId: d.id,
        fields: (d.fields as Record<string, string>) || {},
      })));
    } else {
      setEntries([{
        id: crypto.randomUUID(),
        fields: Object.fromEntries(config.columns.map((c) => [c, ""])),
      }]);
    }
    setLoading(false);
  };

  const addRow = () => {
    setEntries([
      ...entries,
      { id: crypto.randomUUID(), fields: Object.fromEntries(config.columns.map((c) => [c, ""])) },
    ]);
  };

  const removeRow = (id: string) => {
    if (entries.length > 1) setEntries(entries.filter((e) => e.id !== id));
  };

  const updateField = (id: string, column: string, value: string) => {
    setEntries(entries.map((e) =>
      e.id === id ? { ...e, fields: { ...e.fields, [column]: value } } : e
    ));
  };

  const saveEntries = async () => {
    if (!user) {
      toast.error("You must be logged in");
      return;
    }
    setSaving(true);

    // Delete existing entries for this section/week
    const existingIds = entries.filter((e) => e.dbId).map((e) => e.dbId!);
    // Delete all entries for this section/week first, then re-insert
    await supabase
      .from("report_entries")
      .delete()
      .eq("section_id", sectionId!)
      .eq("week_start", weekStart)
      .eq("created_by", user.id);

    // Insert all current entries
    const nonEmpty = entries.filter((e) =>
      Object.values(e.fields).some((v) => v.trim() !== "")
    );

    if (nonEmpty.length > 0) {
      const { error } = await supabase.from("report_entries").insert(
        nonEmpty.map((e) => ({
          section_id: sectionId!,
          week_start: weekStart,
          fields: e.fields,
          created_by: user.id,
        }))
      );

      if (error) {
        toast.error("Failed to save: " + error.message);
        setSaving(false);
        return;
      }
    }

    toast.success("Section saved successfully!");
    setSaving(false);
    loadEntries();
  };

  if (!user) {
    return (
      <AppLayout>
        <div className="p-8 text-center text-muted-foreground">
          Please <a href="/login" className="text-primary underline">sign in</a> to enter data.
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{config.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Add, edit, or remove entries for this section. Week: {weekStart}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1">
              {entries.length} entries
            </Badge>
            <Button size="sm" className="gap-1.5" onClick={saveEntries} disabled={saving}>
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving..." : "Save Section"}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="bg-card rounded-xl p-8 text-center text-muted-foreground">Loading...</div>
        ) : (
          <div className="bg-card rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left font-medium text-muted-foreground px-4 py-3 w-12">#</th>
                    {config.columns.map((col) => (
                      <th key={col} className="text-left font-medium text-muted-foreground px-4 py-3 min-w-[160px]">
                        {col}
                      </th>
                    ))}
                    <th className="text-center font-medium text-muted-foreground px-4 py-3 w-16">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={entry.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2 text-muted-foreground">{index + 1}</td>
                      {config.columns.map((col) => (
                        <td key={col} className="px-4 py-2">
                          <Input
                            value={entry.fields[col] || ""}
                            onChange={(e) => updateField(entry.id, col, e.target.value)}
                            className="h-8 text-sm bg-background"
                            placeholder={col}
                          />
                        </td>
                      ))}
                      <td className="px-4 py-2 text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeRow(entry.id)}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-border">
              <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Add Row
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
