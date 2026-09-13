export type SkillGroupId =
  | "frontend"
  | "backend"
  | "mobile"
  | "desktop"
  | "computerVision"
  | "data"
  | "infrastructure";

export interface SkillGroup {
  id: SkillGroupId;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    id: "backend",
    items: ["Node.js", "Express", "REST APIs"],
  },
  {
    id: "mobile",
    items: ["Flutter", "Dart", "Firebase / FCM", "Isar"],
  },
  {
    id: "desktop",
    items: ["C#", ".NET", "WinForms"],
  },
  {
    id: "computerVision",
    items: ["Python", "OpenCV", "YOLO", "Pose Estimation"],
  },
  {
    id: "data",
    items: ["PostgreSQL", "SQL Server", "SQL"],
  },
  {
    id: "infrastructure",
    items: ["Linux", "Nginx", "PM2", "Git"],
  },
];
