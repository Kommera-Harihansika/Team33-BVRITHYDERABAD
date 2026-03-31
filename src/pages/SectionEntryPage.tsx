import { useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Save, CheckCircle2 } from "lucide-react";

type Entry = {
  id: number;
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

const dummyData: Record<string, Entry[]> = {
  "general-points": [
    { id: 1, fields: { Point: "Academic calendar update", Description: "Mid-semester exams rescheduled to Week 16", "Added By": "Dr. Sharma" } },
    { id: 2, fields: { Point: "Lab maintenance", Description: "CS Lab 3 will be unavailable March 30-31", "Added By": "Prof. Kumar" } },
  ],
  "faculty-achievements": [
    { id: 1, fields: { "Faculty Name": "Dr. Priya Mehta", Achievement: "Best Paper Award at IEEE Conference", Category: "Research", Date: "2026-03-25" } },
    { id: 2, fields: { "Faculty Name": "Prof. Raj Patel", Achievement: "Invited Keynote at National Symposium", Category: "Academic", Date: "2026-03-28" } },
  ],
  "placements": [
    { id: 1, fields: { "Student Name": "Arun Verma", Company: "Google", "Package (LPA)": "24", Role: "SDE-1", Date: "2026-03-20" } },
    { id: 2, fields: { "Student Name": "Sneha Rao", Company: "Microsoft", "Package (LPA)": "22", Role: "Software Engineer", Date: "2026-03-22" } },
    { id: 3, fields: { "Student Name": "Karthik Nair", Company: "Amazon", "Package (LPA)": "18", Role: "SDE Intern", Date: "2026-03-24" } },
  ],
};

export default function SectionEntryPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const config = sectionConfig[sectionId || ""] || { title: "Unknown Section", columns: [] };

  const initialEntries: Entry[] = dummyData[sectionId || ""] || [
    { id: 1, fields: Object.fromEntries(config.columns.map((c) => [c, ""])) },
  ];

  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [nextId, setNextId] = useState(initialEntries.length + 1);

  const addRow = () => {
    setEntries([
      ...entries,
      { id: nextId, fields: Object.fromEntries(config.columns.map((c) => [c, ""])) },
    ]);
    setNextId(nextId + 1);
  };

  const removeRow = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const updateField = (id: number, column: string, value: string) => {
    setEntries(
      entries.map((e) =>
        e.id === id ? { ...e, fields: { ...e.fields, [column]: value } } : e
      )
    );
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{config.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Add, edit, or remove entries for this section. Data is isolated per week.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="warning" className="gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-warning" />
              In Progress
            </Badge>
            <Button variant="success" size="sm" className="gap-1.5">
              <Save className="w-3.5 h-3.5" />
              Save Section
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
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
                  <th className="text-center font-medium text-muted-foreground px-4 py-3 w-16">
                    Action
                  </th>
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

        {/* Entry count */}
        <div className="text-sm text-muted-foreground">
          Total entries: <span className="font-medium text-foreground">{entries.length}</span>
        </div>
      </div>
    </AppLayout>
  );
}
