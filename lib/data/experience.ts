import type { Locale } from "@/lib/i18n/config";
import type { LocalizedString, LocalizedStringList } from "./projects";

export interface ExperienceItem {
  id: string;
  company: LocalizedString;
  position: LocalizedString;
  location: LocalizedString;
  employmentType: LocalizedString;
  startDate: string;
  endDate: string | null;
  description: LocalizedStringList;
  technologies: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "1",
    company: {
      tr: "Kamu Kurumu",
      en: "Public Institution",
    },
    position: {
      tr: "İnfaz ve Koruma Memuru",
      en: "Corrections Officer",
    },
    location: { tr: "Türkiye", en: "Türkiye" },
    employmentType: { tr: "Sözleşmeli", en: "Contract" },
    startDate: "2024-02",
    endDate: null,
    description: {
      tr: [
        "Operasyonel süreçlerde otomasyon fırsatlarını tespit etme ve değerlendirme",
        "Teknik birimlere geçiş için kanıtlanabilir (PoC) çözümler geliştirme",
        "Yazılım odaklı görevlerde süreç iyileştirme çalışmaları",
      ],
      en: [
        "Identifying and evaluating automation opportunities in operational processes",
        "Developing proof-of-concept solutions for technical transition",
        "Contributing to process improvements in software-focused tasks",
      ],
    },
    technologies: [],
  },
  {
    id: "2",
    company: {
      tr: "MISSoft Dijital Dönüşüm",
      en: "MISSoft Digital Transformation",
    },
    position: {
      tr: "Yazılım Mühendisliği Stajyeri",
      en: "Software Engineering Intern",
    },
    location: { tr: "Erzurum, Türkiye", en: "Erzurum, Türkiye" },
    employmentType: { tr: "Tam zamanlı", en: "Full-time" },
    startDate: "2025-07",
    endDate: "2025-10",
    description: {
      tr: [
        "Ekip ortamında yazılım geliştirme projelerine aktif katılım",
        "Kod incelemesi ve Agile pratiklerle çalışma",
        "Zamanında teslim edilen bireysel görev sorumluluğu",
      ],
      en: [
        "Active participation in software development projects in a team environment",
        "Working with code reviews and Agile practices",
        "Owning individual tasks with timely delivery",
      ],
    },
    technologies: ["Dart", "Flutter"],
  },
  {
    id: "3",
    company: { tr: "Freelance", en: "Freelance" },
    position: {
      tr: "Flutter Geliştirici",
      en: "Flutter Developer",
    },
    location: { tr: "Uzaktan", en: "Remote" },
    employmentType: { tr: "Freelance", en: "Freelance" },
    startDate: "2023",
    endDate: null,
    description: {
      tr: [
        "Kangaroom: öğretmen-veli iletişim platformunda çift uygulama mimarisi ve FCM bildirimleri",
        "Ölçeklenebilir mobil uygulamalar için mimari tasarım ve geliştirme",
        "REST API entegrasyonları ve performans odaklı iyileştirmeler",
      ],
      en: [
        "Kangaroom: dual-app architecture and FCM notifications for a teacher–parent platform",
        "Architecture and development for scalable mobile applications",
        "REST API integrations and performance-focused improvements",
      ],
    },
    technologies: ["Flutter", "Dart", "Firebase", "FCM", "Node.js", "Express"],
  },
];

export function localizeExperience(item: ExperienceItem, locale: Locale) {
  return {
    ...item,
    company: item.company[locale] || item.company.tr,
    position: item.position[locale] || item.position.tr,
    location: item.location[locale] || item.location.tr,
    employmentType: item.employmentType[locale] || item.employmentType.tr,
    description: item.description[locale]?.length
      ? item.description[locale]
      : item.description.tr,
  };
}
