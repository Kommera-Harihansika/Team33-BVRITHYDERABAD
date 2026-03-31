import { useState, useEffect } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Printer, Calendar } from "lucide-react";
import { downloadReportPDF } from "@/lib/generateReport";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const sectionMeta: Record<string, { title: string; columns: string[] }> = {
  "general-points": { title: "1. General Points", columns: ["Point", "Description", "Added By"] },
  "faculty-joined": { title: "2. Faculty Joined / Relieved", columns: ["Name", "Designation", "Department", "Date", "Status (Joined/Relieved)"] },
  "faculty-achievements": { title: "3. Faculty Achievements", columns: ["Faculty Name", "Achievement", "Category", "Date"] },
  "student-achievements": { title: "4. Student Achievements", columns: ["Student Name", "Class", "Achievement", "Event/Competition", "Date"] },
  "department-achievements": { title: "5. Department Achievements", columns: ["Achievement", "Description", "Date"] },
  "faculty-events": { title: "6. Faculty Events", columns: ["Event Name", "Organizer", "Date", "Venue", "Participants"] },
  "student-events": { title: "7. Student Events", columns: ["Event Name", "Coordinator", "Date", "Venue", "Participants"] },
  "non-technical-events": { title: "8. Non-Technical Events", columns: ["Event Name", "Type", "Date", "Venue", "Participants"] },
  "industry-visits": { title: "9. Industry Visits", columns: ["Company", "Date", "Faculty Coordinator", "Students Count", "Purpose"] },
  "hackathons": { title: "10. Hackathons", columns: ["Hackathon Name", "Team Members", "Date", "Organizer", "Result"] },
  "faculty-certifications": { title: "11. Faculty Certifications", columns: ["Faculty Name", "Certification", "Issuing Body", "Date"] },
  "faculty-visits": { title: "12. Faculty Visits", columns: ["Faculty Name", "Institute/Company", "Purpose", "Date"] },
  "patents": { title: "13. Patents", columns: ["Title", "Inventors", "Filing Date", "Status", "Patent Number"] },
  "vedic-programs": { title: "14. VEDIC Programs", columns: ["Program Name", "Coordinator", "Date", "Participants", "Description"] },
  "placements": { title: "15. Placements", columns: ["Student Name", "Company", "Package (LPA)", "Role", "Date"] },
  "mous": { title: "16. MoUs", columns: ["Organization", "Purpose", "Date Signed", "Duration", "Contact Person"] },
  "skill-development": { title: "17. Skill Development Programs", columns: ["Program Name", "Trainer", "Date", "Duration", "Participants"] },
};

const sectionOrder = [
  "general-points", "faculty-joined", "faculty-achievements", "student-achievements",
  "department-achievements", "faculty-events", "student-events", "non-technical-events",
  "industry-visits", "hackathons", "faculty-certifications", "faculty-visits",
  "patents", "vedic-programs", "placements", "mous", "skill-development",
];

function getWeekOptions() {
  const options = [];
  const now = new Date();
  for (let i = 0; i < 8; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const value = monday.toISOString().split("T")[0];
    const label = `${monday.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} – ${sunday.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`;
    // Avoid duplicates
    if (!options.find((o) => o.value === value)) {
      options.push({ value, label });
    }
  }
  return options;
}

type SectionData = {
  title: string;
  columns: string[];
  rows: string[][];
};

export default function ReportPreviewPage() {
  const weekOptions = getWeekOptions();
  const [selectedWeek, setSelectedWeek] = useState(weekOptions[0]?.value || "");
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadReport();
  }, [selectedWeek]);

  const loadReport = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("report_entries")
      .select("*")
      .eq("week_start", selectedWeek);

    if (error) {
      setLoading(false);
      return;
    }

    const grouped: Record<string, Record<string, string>[]> = {};
    (data || []).forEach((entry) => {
      if (!grouped[entry.section_id]) grouped[entry.section_id] = [];
      grouped[entry.section_id].push(entry.fields as Record<string, string>);
    });

    const result: SectionData[] = sectionOrder.map((sId) => {
      const meta = sectionMeta[sId];
      const entries = grouped[sId] || [];
      const rows = entries.length > 0
        ? entries.map((fields, i) => [
            String(i + 1),
            ...meta.columns.map((col) => fields[col] || "—"),
          ])
        : [["—", "No entries this week", ...meta.columns.slice(1).map(() => "")]];
      return {
        title: meta.title,
        columns: ["S.No", ...meta.columns],
        rows,
      };
    });

    setSections(result);
    setLoading(false);
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Weekly Report</h1>
            <p className="text-sm text-muted-foreground mt-1">
              View the weekly report in table format. Filter by week.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-[280px] h-9">
                <Calendar className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {weekOptions.map((w) => (
                  <SelectItem key={w.value} value={w.value}>{w.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => window.print()}>
              <Printer className="w-3.5 h-3.5" />
              Print
            </Button>
            <Button size="sm" className="gap-1.5" onClick={downloadReportPDF}>
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg max-w-6xl mx-auto overflow-hidden">
          <div className="bg-primary rounded-t-xl p-8 text-center">
            <h2 className="font-display text-xl font-bold text-primary-foreground">
              Department of Computer Science & Engineering
            </h2>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Weekly Report — {weekOptions.find((w) => w.value === selectedWeek)?.label}
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading report data...</div>
          ) : (
            <div className="p-6 space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-display font-semibold text-primary text-sm mb-3">
                    {section.title}
                  </h3>
                  <div className="overflow-x-auto border border-border rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50 border-b border-border">
                          {section.columns.map((col) => (
                            <th key={col} className="text-left font-medium text-muted-foreground px-4 py-2.5 whitespace-nowrap">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.rows.map((row, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                            {row.map((cell, j) => (
                              <td key={j} className="px-4 py-2.5 text-foreground whitespace-nowrap">
                                {cell || "—"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-border p-6 text-center">
            <p className="text-xs text-muted-foreground">
              This report was auto-generated by WeeklySync. All data verified by respective coordinators.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
