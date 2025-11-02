export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "2",
    title: "Kangaroom",
    description: "Teacher-parent communication platform with FCM push notifications, announcements, messaging flow, and dual application architecture.",
    longDescription: "Teacher-parent communication platform with FCM push notifications, announcements, messaging flow, and dual application architecture.",
    technologies: ["Flutter", "FCM", "Express"],
    featured: true,
  },
  {
    id: "3",
    title: "CV Jobs",
    description: "Flutter application that recommends job listings based on your profession and skills from your CV. Uses JSearch API.",
    longDescription: "Flutter application that recommends job listings based on your profession and skills from your CV. Integrates with JSearch API.",
    technologies: ["Flutter", "Dart", "REST APIs"],
    githubUrl: "https://github.com/atillamrcmk/cv_jobs",
    featured: false,
  },
  {
    id: "4",
    title: "Crisis Assistant",
    description: "Flutter-based mobile application that provides assistance during crisis situations.",
    longDescription: "Flutter-based mobile application that provides assistance during crisis situations, offering emergency information and resources to users.",
    technologies: ["Flutter", "Dart"],
    githubUrl: "https://github.com/atillamrcmk/kriz_asistani",
    featured: false,
  },
  {
    id: "5",
    title: "Meeting App",
    description: "WebRTC-based video conferencing application. Real-time chat and room support.",
    longDescription: "Web application featuring video calls, real-time chat, and room management using WebRTC technology.",
    technologies: ["JavaScript", "WebRTC", "Node.js"],
    githubUrl: "https://github.com/atillamrcmk/meeting-app",
    featured: false,
  },
  {
    id: "6",
    title: "Quick Market",
    description: "Barcode-based sales automation. Simple and user-friendly desktop application developed with C#.",
    longDescription: "Simple and effective desktop application developed for barcode reading, inventory management, and sales operations.",
    technologies: ["C#", ".NET", "WinForms"],
    githubUrl: "https://github.com/atillamrcmk/HizliMarket",
    featured: false,
  },
];
