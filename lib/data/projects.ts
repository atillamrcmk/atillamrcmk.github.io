import type { Locale } from "@/lib/i18n/config";

export type LocalizedString = {
  tr: string;
  en: string;
};

export type LocalizedStringList = {
  tr: string[];
  en: string[];
};

export interface Project {
  slug: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  githubRepo?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  featuredOrder?: number;
  categories: string[];
  technologies: string[];
  image?: string;
  gallery?: string[];
  problem?: LocalizedString;
  solution?: LocalizedString;
  features?: LocalizedStringList;
  architecture?: LocalizedStringList;
  decisions?: LocalizedStringList;
  limitations?: LocalizedStringList;
  future?: LocalizedStringList;
  independent?: boolean;
}

export function t(value: LocalizedString | undefined, locale: Locale): string {
  if (!value) return "";
  return value[locale] || value.tr || value.en || "";
}

export function tList(value: LocalizedStringList | undefined, locale: Locale): string[] {
  if (!value) return [];
  const list = value[locale]?.length ? value[locale] : value.tr;
  return list ?? [];
}

export const projects: Project[] = [
  {
    slug: "kkds",
    title: {
      tr: "Kurul Karar Destek Sistemi",
      en: "Board Decision Support System",
    },
    shortDescription: {
      tr: "Kurumsal değerlendirme süreçlerinde kayıt, analiz ve erken uyarı mekanizmalarını tek bir masaüstü sistemde bir araya getiren karar destek uygulaması.",
      en: "A desktop decision-support application that combines recording, analysis, and early-warning mechanisms for institutional evaluation workflows.",
    },
    description: {
      tr: "Bağımsız bir yazılım mühendisliği çalışması olarak geliştirilen masaüstü karar destek sistemi. Değerlendirme kayıtlarını yapılandırır, göstergeleri görselleştirir ve risk sinyallerini tek ekranda toplar.",
      en: "An independent software engineering project: a desktop decision-support system that structures evaluation records, visualizes indicators, and consolidates risk signals in one place.",
    },
    featured: true,
    featuredOrder: 1,
    independent: true,
    categories: ["Desktop", "Decision Support", "Data Visualization"],
    technologies: ["C#", ".NET", "SQL Server", "WinForms"],
    image: "/kkds.png",
    gallery: ["/kkds.png"],
    problem: {
      tr: "Değerlendirme ve karar süreçleri dağınık kayıtlara ve manuel takibe dayanıyordu; erken uyarı sinyalleri gecikiyordu.",
      en: "Evaluation and decision workflows relied on scattered records and manual tracking, delaying early-warning signals.",
    },
    solution: {
      tr: "Kayıt, analiz ve uyarı akışlarını bir masaüstü uygulamada birleştirerek karar vericilere tutarlı bir görünürlük sağladım.",
      en: "I unified recording, analysis, and alerting in a desktop application to give decision-makers consistent visibility.",
    },
    features: {
      tr: [
        "Yapılandırılmış değerlendirme kayıtları",
        "Gösterge panelleri ve özet görünümler",
        "Risk ve eşik odaklı uyarı sinyalleri",
        "Raporlama ve dışa aktarım akışları",
      ],
      en: [
        "Structured evaluation records",
        "Indicator dashboards and summary views",
        "Threshold-oriented risk alerts",
        "Reporting and export flows",
      ],
    },
    architecture: {
      tr: [
        "Masaüstü istemci (.NET / WinForms)",
        "İlişkisel veri modeli (SQL Server)",
        "Katmanlı iş kuralları ve doğrulama",
        "Raporlama servisleri",
      ],
      en: [
        "Desktop client (.NET / WinForms)",
        "Relational data model (SQL Server)",
        "Layered business rules and validation",
        "Reporting services",
      ],
    },
    decisions: {
      tr: [
        "Masaüstü tercih edildi: çevrimdışı kullanım ve kurumsal masaüstü ortamına uyum için.",
        "Uyarı mantığı iş kuralları katmanında tutuldu; arayüz yalnızca sinyalleri sunar.",
        "Hassas kurumsal ayrıntılar ürün anlatımından bilinçli olarak çıkarıldı.",
      ],
      en: [
        "Desktop was chosen for offline use and fit with institutional workstation environments.",
        "Alert logic lives in the business layer; the UI only presents signals.",
        "Sensitive institutional details were intentionally omitted from the public case study.",
      ],
    },
    limitations: {
      tr: [
        "Çok kullanıcılı eşzamanlı düzenleme sınırlıdır.",
        "Gelişmiş self-service raporlama sonraki aşamada planlanabilir.",
      ],
      en: [
        "Concurrent multi-user editing is limited.",
        "Advanced self-service reporting can be planned as a later stage.",
      ],
    },
    future: {
      tr: [
        "Rol bazlı erişim iyileştirmeleri",
        "Daha zengin görselleştirme katmanı",
        "Opsiyonel web panosu entegrasyonu",
      ],
      en: [
        "Role-based access improvements",
        "Richer visualization layer",
        "Optional web dashboard integration",
      ],
    },
  },
  {
    slug: "erken-uyari",
    title: {
      tr: "Kamera Tabanlı Erken Uyarı Sistemi",
      en: "Camera-Based Early Warning System",
    },
    shortDescription: {
      tr: "Poz tahmini ve takip sinyallerini risk motoruyla birleştiren bilgisayarlı görü odaklı erken uyarı prototipi.",
      en: "A computer-vision early-warning prototype that combines pose estimation and tracking signals with a risk engine.",
    },
    description: {
      tr: "Bağımsız bir mühendislik çalışması. Kamera akışından poz ve hareket sinyallerini çıkarır, kural tabanlı risk skorlaması üretir ve operatör için erken uyarı sunar.",
      en: "Independent engineering work that extracts pose and motion signals from camera streams, produces rule-based risk scores, and surfaces early warnings for operators.",
    },
    featured: true,
    featuredOrder: 2,
    independent: true,
    categories: ["Computer Vision", "YOLO Pose", "Tracking", "Risk Engine"],
    technologies: ["Python", "OpenCV", "YOLO", "Pose Estimation"],
    image: "/analiz.png",
    gallery: ["/analiz.png"],
    problem: {
      tr: "Manuel gözlemle riskli durumları erken yakalamak zorlaşıyor; tepki süresi uzuyor.",
      en: "Manual observation makes early detection of risky situations difficult and slows response time.",
    },
    solution: {
      tr: "Poz tahmini + takip + kural tabanlı risk motorunu birleştirerek operatöre zamanında sinyal üreten bir prototip geliştirdim.",
      en: "I built a prototype that combines pose estimation, tracking, and a rule-based risk engine to signal operators in time.",
    },
    features: {
      tr: [
        "Poz tahmini tabanlı hareket analizi",
        "Nesne / kişi takip katmanı",
        "Kural tabanlı risk skorlama",
        "Operatör için uyarı çıktısı",
      ],
      en: [
        "Pose-estimation-based motion analysis",
        "Object / person tracking layer",
        "Rule-based risk scoring",
        "Operator-facing alert output",
      ],
    },
    architecture: {
      tr: [
        "Video giriş katmanı",
        "YOLO Pose çıkarım hattı",
        "Takip ve durum makinesi",
        "Risk motoru ve uyarı kanalı",
      ],
      en: [
        "Video ingestion layer",
        "YOLO Pose inference pipeline",
        "Tracking and state machine",
        "Risk engine and alert channel",
      ],
    },
    decisions: {
      tr: [
        "Gerçek eşikler ve sahaya özel prosedürler portföyde paylaşılmıyor.",
        "Prototip, doğruluk ile gecikme arasında denge kuracak şekilde kurgulandı.",
        "Risk motoru yapılandırılabilir kurallarla tutuldu; model ile politika ayrıldı.",
      ],
      en: [
        "Real thresholds and site-specific procedures are not disclosed in the portfolio.",
        "The prototype balances accuracy against latency.",
        "The risk engine stays configurable so model inference and policy remain separate.",
      ],
    },
    limitations: {
      tr: [
        "Aydınlatma ve kamera açısı performansı etkiler.",
        "Üretim ortamı için kalibrasyon ve doğrulama gerekir.",
      ],
      en: [
        "Lighting and camera angle affect performance.",
        "Production use requires calibration and validation.",
      ],
    },
    future: {
      tr: [
        "Daha dayanıklı takip algoritmaları",
        "Operatör panosu iyileştirmeleri",
        "Olay arşivleme ve inceleme akışları",
      ],
      en: [
        "More robust tracking algorithms",
        "Operator dashboard improvements",
        "Incident archive and review flows",
      ],
    },
  },
  {
    slug: "personel-planlama",
    title: {
      tr: "Personel Planlama ve Görev Yönetimi",
      en: "Staff Planning & Task Management",
    },
    shortDescription: {
      tr: "Vardiya, görev atama ve takip ihtiyaçlarını sadeleştiren planlama odaklı yazılım çalışması.",
      en: "A planning-focused software project that simplifies shift assignment, task allocation, and follow-up.",
    },
    description: {
      tr: "Bağımsız çalışma. Personel planlama, görev dağılımı ve durum takibini daha okunabilir bir iş akışına indirger.",
      en: "Independent work that reduces staff planning, task allocation, and status tracking to a clearer operational workflow.",
    },
    featured: true,
    featuredOrder: 3,
    independent: true,
    categories: ["Operations", "Planning", "Desktop"],
    technologies: ["C#", ".NET", "SQL"],
    image: "/personel_planla.png",
    gallery: ["/personel_planla.png"],
    problem: {
      tr: "Planlama ve görev takibi dağınık tablolar üzerinden yürüyünce koordinasyon maliyeti artıyordu.",
      en: "Planning and task tracking across scattered sheets increased coordination cost.",
    },
    solution: {
      tr: "Atama, durum ve özet görünümleri tek bir uygulamada toplayarak operasyonel görünürlüğü artırdım.",
      en: "I consolidated assignment, status, and summary views into one application to improve operational visibility.",
    },
    features: {
      tr: [
        "Görev atama ve durum güncelleme",
        "Planlama özetleri",
        "Filtrelenebilir listeler",
        "Basit rapor çıktıları",
      ],
      en: [
        "Task assignment and status updates",
        "Planning summaries",
        "Filterable lists",
        "Simple report outputs",
      ],
    },
    architecture: {
      tr: [
        "Masaüstü istemci",
        "İlişkisel veri saklama",
        "İş kuralları ile atama doğrulama",
      ],
      en: [
        "Desktop client",
        "Relational persistence",
        "Business-rule validation for assignments",
      ],
    },
    decisions: {
      tr: [
        "Gerçek personel listeleri ve kurum içi süreçler paylaşılmıyor.",
        "Arayüz sade tutuldu; operasyonel hız önceliklendirildi.",
      ],
      en: [
        "Real staff lists and internal procedures are not shared.",
        "The UI stayed deliberately simple to prioritize operational speed.",
      ],
    },
    limitations: {
      tr: ["Mobil istemci yok", "Gelişmiş kapasite planlama sonraki adım"],
      en: ["No mobile client yet", "Advanced capacity planning is a later step"],
    },
    future: {
      tr: ["Bildirim katmanı", "Takvim görünümü", "Rol bazlı panolar"],
      en: ["Notification layer", "Calendar view", "Role-based dashboards"],
    },
  },
  {
    slug: "kangaroom",
    title: {
      tr: "Kangaroom",
      en: "Kangaroom",
    },
    shortDescription: {
      tr: "Öğretmen-veli iletişim platformu: duyuru, mesajlaşma ve FCM bildirimleriyle çift uygulama mimarisi.",
      en: "Teacher–parent communication platform with announcements, messaging, FCM notifications, and a dual-app architecture.",
    },
    description: {
      tr: "Flutter tabanlı öğretmen ve veli uygulamaları, FCM push bildirimleri, duyuru ve mesajlaşma akışları.",
      en: "Flutter-based teacher and parent apps with FCM push notifications, announcements, and messaging flows.",
    },
    featured: true,
    featuredOrder: 4,
    categories: ["Mobile", "Communication"],
    technologies: ["Flutter", "Dart", "FCM", "Express", "Node.js"],
    image: "/kangaroom.png",
    gallery: ["/kangaroom.png"],
    problem: {
      tr: "Öğretmen ve veliler arasında parçalı iletişim kanalları takip edilebilirliği düşürüyordu.",
      en: "Fragmented channels between teachers and parents reduced follow-through.",
    },
    solution: {
      tr: "Çift uygulama mimarisi ve bildirim destekli mesajlaşma ile iletişimi tek ürün deneyiminde topladım.",
      en: "A dual-app architecture with notification-backed messaging brought communication into one product experience.",
    },
    features: {
      tr: ["Duyuru yayınlama", "Mesajlaşma akışı", "FCM push bildirimleri", "Rol ayrımı (öğretmen / veli)"],
      en: ["Announcements", "Messaging flow", "FCM push notifications", "Role separation (teacher / parent)"],
    },
    architecture: {
      tr: ["Flutter istemciler", "Express API", "FCM entegrasyonu"],
      en: ["Flutter clients", "Express API", "FCM integration"],
    },
    decisions: {
      tr: [
        "İki istemci aynı backend sözleşmesini paylaşır.",
        "Bildirimler kritik olaylara bağlandı; gürültü azaltıldı.",
      ],
      en: [
        "Both clients share the same backend contract.",
        "Notifications are tied to critical events to reduce noise.",
      ],
    },
    limitations: {
      tr: ["Ölçekli üretim metrikleri bu portföyde paylaşılmıyor"],
      en: ["Large-scale production metrics are not shared in this portfolio"],
    },
    future: {
      tr: ["Daha zengin medya paylaşımı", "Moderasyon araçları"],
      en: ["Richer media sharing", "Moderation tools"],
    },
  },
  {
    slug: "cv-jobs",
    title: { tr: "CV Jobs", en: "CV Jobs" },
    shortDescription: {
      tr: "CV’deki meslek ve becerilere göre iş ilanı öneren Flutter uygulaması.",
      en: "Flutter app that recommends job listings based on profession and skills from a CV.",
    },
    description: {
      tr: "JSearch API entegrasyonu ile CV odaklı iş önerileri sunan mobil uygulama.",
      en: "Mobile app offering CV-focused job recommendations via the JSearch API.",
    },
    githubRepo: "atillamrcmk/cv_jobs",
    githubUrl: "https://github.com/atillamrcmk/cv_jobs",
    featured: false,
    categories: ["Mobile"],
    technologies: ["Flutter", "Dart", "REST APIs"],
    image: "/projects/cv-jobs.svg",
    problem: {
      tr: "İş arayanların CV’lerine uygun ilanları hızlı filtrelemesi zordu.",
      en: "Job seekers struggled to quickly filter listings that matched their CV.",
    },
    solution: {
      tr: "CV sinyallerini API sonuçlarıyla eşleştiren bir mobil deneyim tasarladım.",
      en: "I designed a mobile experience that matches CV signals with API results.",
    },
    features: {
      tr: ["CV bazlı öneri", "İlan listesi", "API entegrasyonu"],
      en: ["CV-based recommendations", "Listing view", "API integration"],
    },
  },
  {
    slug: "kriz-asistani",
    title: { tr: "Kriz Asistanı", en: "Crisis Assistant" },
    shortDescription: {
      tr: "Kriz anlarında bilgilendirme ve kaynak sunmaya odaklanan Flutter uygulaması.",
      en: "Flutter application focused on guidance and resources during crisis situations.",
    },
    description: {
      tr: "Acil bilgilendirme ve kaynak erişimi için mobil yardımcı.",
      en: "A mobile helper for emergency information and resource access.",
    },
    githubRepo: "atillamrcmk/kriz_asistani",
    githubUrl: "https://github.com/atillamrcmk/kriz_asistani",
    featured: false,
    categories: ["Mobile"],
    technologies: ["Flutter", "Dart"],
    image: "/projects/kriz-asistani.svg",
  },
  {
    slug: "meeting-app",
    title: { tr: "Meeting App", en: "Meeting App" },
    shortDescription: {
      tr: "WebRTC tabanlı görüntülü görüşme, sohbet ve oda yönetimi.",
      en: "WebRTC-based video calls with chat and room management.",
    },
    description: {
      tr: "Gerçek zamanlı sohbet ve oda desteği olan WebRTC görüntülü görüşme uygulaması.",
      en: "WebRTC video conferencing app with real-time chat and rooms.",
    },
    githubRepo: "atillamrcmk/meeting-app",
    githubUrl: "https://github.com/atillamrcmk/meeting-app",
    featured: false,
    categories: ["Web", "Realtime"],
    technologies: ["JavaScript", "WebRTC", "Node.js"],
    image: "/projects/meeting-app.svg",
  },
  {
    slug: "hizli-market",
    title: { tr: "Hızlı Market", en: "Quick Market" },
    shortDescription: {
      tr: "Barkod tabanlı satış otomasyonu için sade bir C# masaüstü uygulaması.",
      en: "A simple C# desktop app for barcode-based sales automation.",
    },
    description: {
      tr: "Barkod okuma, stok ve satış işlemleri için kullanıcı dostu masaüstü araç.",
      en: "User-friendly desktop tool for barcode reading, inventory, and sales.",
    },
    githubRepo: "atillamrcmk/HizliMarket",
    githubUrl: "https://github.com/atillamrcmk/HizliMarket",
    featured: false,
    categories: ["Desktop"],
    technologies: ["C#", ".NET", "WinForms"],
    image: "/projects/hizli-market.svg",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
