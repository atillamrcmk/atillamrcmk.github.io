export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  employmentType: string; // "Tam zamanlı", "Sözleşmeli", "Part-time", "Freelance"
  startDate: string;
  endDate: string | null; // null means "current"
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Adalet Bakanlığı",
    position: "Corrections Officer",
    location: "Erzurum, Turkey",
    employmentType: "Contract",
    startDate: "2024-02",
    endDate: null,
    description: [
      "Identifying and evaluating automation opportunities in operational processes",
      "Developing proof-of-concept (PoC) solutions for transition to technical units",
      "Taking an active role in software-focused tasks and process improvements",
      "Creating efficiency-enhancing solutions for central control systems",
    ],
    technologies: [],
  },
  {
    id: "2",
    company: "MISSoft Digital Transformation",
    position: "Software Engineering Intern",
    location: "Erzurum, Turkey",
    employmentType: "Full-time",
    startDate: "2025-07",
    endDate: "2025-10",
    description: [
      "Actively participating in software development projects in a collaborative team environment",
      "Working closely with senior developers, participating in code reviews, and applying Agile methodologies",
      "Taking responsibility for individual tasks, ensuring timely and high-quality deliverables",
      "Gaining practical experience in software engineering workflows, problem-solving, and effective teamwork",
    ],
    technologies: ["Dart", "Flutter", "Mobile App Development"],
  },
  {
    id: "3",
    company: "Freelance",
    position: "Flutter Developer",
    location: "Remote",
    employmentType: "Freelance",
    startDate: "2023",
    endDate: null,
    description: [
      "Kangaroom: Teacher-parent communication platform - developing dual application architecture, FCM push notifications, and real-time messaging flow",
      "Architectural design and development for scalable mobile applications",
      "Working seamlessly with RESTful API integrations and backend services",
      "Focusing on performance optimization and user experience improvements",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "FCM", "Node.js", "Express"],
  },
];
