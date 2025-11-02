export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website?: string;
  bio: string;
  skills: string[];
  languages: { name: string; level: string }[];
}

export const profile: Profile = {
  name: "Atilla Mercimek",
  title: "Software Engineer • Mobile & AI Developer",
  location: "Türkiye",
  email: "mercimekatilla53@gmail.com",
  phone: "",
  linkedin: "www.linkedin.com/in/atilla-mercimek-6025b7222",
  github: "github.com/atillamrcmk",
  bio: "Atatürk University Software Engineering graduate. I develop mobile applications (Flutter), desktop applications (C#/.NET), and AI projects (Python/OpenCV). I value writing clean, readable, and maintainable code.",
  skills: [
    "C",
    "C++",
    "C#",
    "Dart",
    "Python",
    "JavaScript",
    "Flutter",
    ".NET",
    "WinForms",
    "OpenCV",
    "Machine Learning",
    "Firebase / FCM",
    "Isar",
    "Node.js",
    "REST APIs",
    "WebRTC",
    "Git",
    "SQL",
  ],
  languages: [
    { name: "Turkish", level: "Native" },
    { name: "English", level: "Advanced" },
  ],
};
