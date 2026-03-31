import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Printer, Calendar } from "lucide-react";
import { downloadReportPDF } from "@/lib/generateReport";

const weeklyData: Record<string, { title: string; columns: string[]; rows: string[][] }[]> = {
  "week-14": [
    { title: "1. General Points", columns: ["S.No", "Point", "Description", "Added By"], rows: [
      ["1", "Academic calendar update", "Mid-semester exams rescheduled to Week 16", "Dr. Sharma"],
      ["2", "Lab maintenance", "CS Lab 3 will be unavailable March 30-31", "Prof. Kumar"],
    ]},
    { title: "2. Faculty Joined / Relieved", columns: ["S.No", "Name", "Designation", "Department", "Date", "Status"], rows: [
      ["1", "Dr. Ananya Gupta", "Assistant Professor", "CSE", "25-Mar-2026", "Joined"],
    ]},
    { title: "3. Faculty Achievements", columns: ["S.No", "Faculty Name", "Achievement", "Category", "Date"], rows: [
      ["1", "Dr. Priya Mehta", "Best Paper Award at IEEE Conference", "Research", "25-Mar-2026"],
      ["2", "Prof. Raj Patel", "Invited Keynote at National Symposium", "Academic", "28-Mar-2026"],
    ]},
    { title: "4. Student Achievements", columns: ["S.No", "Student Name", "Class", "Achievement", "Event", "Date"], rows: [
      ["1", "Arun Verma", "IV CSE", "1st Place", "HackIndia 2026, National Level", "26-Mar-2026"],
    ]},
    { title: "5. Department Achievements", columns: ["S.No", "Achievement", "Description", "Date"], rows: [
      ["1", "NAAC A++ Accreditation", "Confirmed for 2026-2031", "24-Mar-2026"],
    ]},
    { title: "6. Faculty Events", columns: ["S.No", "Event Name", "Organizer", "Date", "Venue", "Participants"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "7. Student Events", columns: ["S.No", "Event Name", "Coordinator", "Date", "Venue", "Participants"], rows: [
      ["1", "Tech Symposium 2026", "Dr. Sharma", "29-Mar-2026", "Main Auditorium", "150"],
    ]},
    { title: "8. Non-Technical Events", columns: ["S.No", "Event Name", "Type", "Date", "Venue", "Participants"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "9. Industry Visits", columns: ["S.No", "Company", "Date", "Faculty Coordinator", "Students", "Purpose"], rows: [
      ["1", "TCS Innovation Labs, Pune", "28-Mar-2026", "Dr. Sharma", "45", "Industry Exposure"],
    ]},
    { title: "10. Hackathons", columns: ["S.No", "Hackathon Name", "Team Members", "Date", "Organizer", "Result"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "11. Faculty Certifications", columns: ["S.No", "Faculty Name", "Certification", "Issuing Body", "Date"], rows: [
      ["1", "Prof. Kumar", "AWS Solutions Architect", "Amazon Web Services", "27-Mar-2026"],
    ]},
    { title: "12. Faculty Visits", columns: ["S.No", "Faculty Name", "Institute/Company", "Purpose", "Date"], rows: [
      ["1", "Dr. Mehta", "IIT Bombay", "Research Collaboration", "26-Mar-2026"],
    ]},
    { title: "13. Patents", columns: ["S.No", "Title", "Inventors", "Filing Date", "Status", "Patent No."], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "14. VEDIC Programs", columns: ["S.No", "Program Name", "Coordinator", "Date", "Participants", "Description"], rows: [
      ["1", "Yoga & Wellness Session", "Dr. Rao", "27-Mar-2026", "20", "Staff wellness initiative"],
    ]},
    { title: "15. Placements", columns: ["S.No", "Student Name", "Company", "Package (LPA)", "Role", "Date"], rows: [
      ["1", "Arun Verma", "Google", "24", "SDE-1", "20-Mar-2026"],
      ["2", "Sneha Rao", "Microsoft", "22", "Software Engineer", "22-Mar-2026"],
      ["3", "Karthik Nair", "Amazon", "18", "SDE Intern", "24-Mar-2026"],
    ]},
    { title: "16. MoUs", columns: ["S.No", "Organization", "Purpose", "Date Signed", "Duration", "Contact"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "17. Skill Development Programs", columns: ["S.No", "Program Name", "Trainer", "Date", "Duration", "Participants"], rows: [
      ["1", "Python Bootcamp", "Prof. Singh", "25-Mar-2026", "3 days", "80"],
    ]},
  ],
  "week-13": [
    { title: "1. General Points", columns: ["S.No", "Point", "Description", "Added By"], rows: [
      ["1", "Semester planning", "Department meeting scheduled for next week", "HOD"],
    ]},
    { title: "2. Faculty Joined / Relieved", columns: ["S.No", "Name", "Designation", "Department", "Date", "Status"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "3. Faculty Achievements", columns: ["S.No", "Faculty Name", "Achievement", "Category", "Date"], rows: [
      ["1", "Dr. Sharma", "Published paper in Springer journal", "Research", "18-Mar-2026"],
    ]},
    { title: "4. Student Achievements", columns: ["S.No", "Student Name", "Class", "Achievement", "Event", "Date"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "5. Department Achievements", columns: ["S.No", "Achievement", "Description", "Date"], rows: [
      ["—", "No entries this week", "", "", ""],
    ]},
    { title: "6. Faculty Events", columns: ["S.No", "Event Name", "Organizer", "Date", "Venue", "Participants"], rows: [
      ["1", "FDP on AI/ML", "Dr. Rao", "17-Mar-2026", "Seminar Hall", "30"],
    ]},
    { title: "7. Student Events", columns: ["S.No", "Event Name", "Coordinator", "Date", "Venue", "Participants"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "8. Non-Technical Events", columns: ["S.No", "Event Name", "Type", "Date", "Venue", "Participants"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "9. Industry Visits", columns: ["S.No", "Company", "Date", "Faculty Coordinator", "Students", "Purpose"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "10. Hackathons", columns: ["S.No", "Hackathon Name", "Team Members", "Date", "Organizer", "Result"], rows: [
      ["1", "Smart India Hackathon", "Team Alpha (5 members)", "19-Mar-2026", "MHRD", "Qualified for finals"],
    ]},
    { title: "11. Faculty Certifications", columns: ["S.No", "Faculty Name", "Certification", "Issuing Body", "Date"], rows: [
      ["—", "No entries this week", "", "", ""],
    ]},
    { title: "12. Faculty Visits", columns: ["S.No", "Faculty Name", "Institute/Company", "Purpose", "Date"], rows: [
      ["—", "No entries this week", "", "", ""],
    ]},
    { title: "13. Patents", columns: ["S.No", "Title", "Inventors", "Filing Date", "Status", "Patent No."], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "14. VEDIC Programs", columns: ["S.No", "Program Name", "Coordinator", "Date", "Participants", "Description"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
    { title: "15. Placements", columns: ["S.No", "Student Name", "Company", "Package (LPA)", "Role", "Date"], rows: [
      ["1", "Priya Desai", "Infosys", "8", "Systems Engineer", "15-Mar-2026"],
    ]},
    { title: "16. MoUs", columns: ["S.No", "Organization", "Purpose", "Date Signed", "Duration", "Contact"], rows: [
      ["1", "Wipro Technologies", "Internship collaboration", "16-Mar-2026", "2 years", "Mr. Rajan"],
    ]},
    { title: "17. Skill Development Programs", columns: ["S.No", "Program Name", "Trainer", "Date", "Duration", "Participants"], rows: [
      ["—", "No entries this week", "", "", "", ""],
    ]},
  ],
};

const weekOptions = [
  { value: "week-14", label: "Week 14 (Mar 24 – Mar 31, 2026)" },
  { value: "week-13", label: "Week 13 (Mar 17 – Mar 23, 2026)" },
];

export default function ReportPreviewPage() {
  const [selectedWeek, setSelectedWeek] = useState("week-14");
  const sections = weeklyData[selectedWeek] || [];

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
            <Button variant="default" size="sm" className="gap-1.5" onClick={downloadReportPDF}>
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Report Document */}
        <div className="bg-card rounded-xl shadow-lg max-w-6xl mx-auto overflow-hidden">
          {/* Header */}
          <div className="bg-primary rounded-t-xl p-8 text-center">
            <h2 className="font-display text-xl font-bold text-primary-foreground">
              Department of Computer Science & Engineering
            </h2>
            <p className="text-primary-foreground/80 text-sm mt-1">
              Weekly Report — {weekOptions.find((w) => w.value === selectedWeek)?.label}
            </p>
            <p className="text-primary-foreground/60 text-xs mt-2">
              Prepared on: March 31, 2026 | Submitted by: HOD Office
            </p>
          </div>

          {/* Sections as Tables */}
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

          {/* Footer */}
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
