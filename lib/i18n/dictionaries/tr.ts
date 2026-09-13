export type Dictionary = {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  skipToContent: string;
  nav: {
    projects: string;
    about: string;
    experience: string;
    contact: string;
    cv: string;
    openMenu: string;
    closeMenu: string;
    home: string;
  };
  hero: {
    label: string;
    heading: string;
    body: string;
    ctaProjects: string;
    ctaCv: string;
    currently: string;
    currentlyItems: string[];
    photoAlt: string;
  };
  sections: {
    projects: { index: string; title: string; subtitle: string };
    about: { index: string; title: string; subtitle: string };
    experience: { index: string; title: string; subtitle: string };
    skills: { index: string; title: string; subtitle: string };
    contact: { index: string; title: string; subtitle: string };
  };
  projects: {
    problem: string;
    solution: string;
    stack: string;
    viewProject: string;
    github: string;
    overview: string;
    features: string;
    architecture: string;
    decisions: string;
    screenshots: string;
    limitations: string;
    future: string;
    back: string;
    allTitle: string;
    allSubtitle: string;
    metaStars: string;
    metaForks: string;
    metaUpdated: string;
    metaLanguage: string;
    independentNote: string;
    imageUnavailable: string;
  };
  about: {
    paragraphs: string[];
  };
  experience: {
    present: string;
    current: string;
  };
  skills: {
    groups: {
      frontend: string;
      backend: string;
      mobile: string;
      desktop: string;
      computerVision: string;
      data: string;
      infrastructure: string;
    };
  };
  contact: {
    intro: string;
    social: string;
    formTitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    emailCta: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
  theme: {
    light: string;
    dark: string;
  };
};

const tr: Dictionary = {
  meta: {
    title: "Atilla Mercimek — Yazılım Mühendisi",
    description:
      "Web, mobil, masaüstü ve bilgisayarlı görü odaklı sistemler geliştiren yazılım mühendisi. Gerçek problemleri çalışan yazılımlara dönüştürüyorum.",
    ogLocale: "tr_TR",
  },
  skipToContent: "Ana içeriğe geç",
  nav: {
    projects: "Projeler",
    about: "Hakkımda",
    experience: "Deneyim",
    contact: "İletişim",
    cv: "CV",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
    home: "Ana sayfa",
  },
  hero: {
    label: "Yazılım Mühendisi",
    heading: "Gerçek problemleri\nçalışan yazılımlara dönüştürüyorum.",
    body:
      "Web, mobil, masaüstü ve bilgisayarlı görü odaklı sistemler geliştiriyorum. Ürün tasarımından backend mimarisine kadar uçtan uca geliştirme süreçleriyle ilgileniyorum.",
    ctaProjects: "Projeleri İncele",
    ctaCv: "CV'yi Görüntüle",
    currently: "Şu an",
    currentlyItems: [
      "Ürün odaklı yazılımlar geliştiriyorum",
      "Bilgisayarlı görü sistemlerini inceliyorum",
    ],
    photoAlt: "Atilla Mercimek profil fotoğrafı",
  },
  sections: {
    projects: { index: "01", title: "Seçili Projeler", subtitle: "Öne çıkan çalışmalar ve mühendislik kararları." },
    about: { index: "02", title: "Nasıl Çalışıyorum", subtitle: "Kısa bir bakış." },
    experience: { index: "03", title: "Deneyim", subtitle: "Rol, kurum ve odak alanları." },
    skills: { index: "04", title: "Yetkinlikler", subtitle: "Alanlara göre araç seti." },
    contact: { index: "05", title: "İletişim", subtitle: "Yeni fırsatlar ve iş birlikleri için." },
  },
  projects: {
    problem: "Problem",
    solution: "Çözüm",
    stack: "Stack",
    viewProject: "Detaylar",
    github: "GitHub",
    overview: "Genel Bakış",
    features: "Öne Çıkan Özellikler",
    architecture: "Teknik Mimari",
    decisions: "Mühendislik Kararları",
    screenshots: "Ekran Görüntüleri",
    limitations: "Kısıtlar",
    future: "İyileştirme Fırsatları",
    back: "Tüm projelere dön",
    allTitle: "Tüm Projeler",
    allSubtitle: "Portföydeki çalışmaların tamamı.",
    metaStars: "Stars",
    metaForks: "Forks",
    metaUpdated: "Son güncelleme",
    metaLanguage: "Dil",
    independentNote: "Bağımsız yazılım mühendisliği çalışması",
    imageUnavailable: "Görsel yakında eklenecek",
  },
  about: {
    paragraphs: [
      "Yazılım mühendisliği geçmişimle gerçek dünyadaki süreçleri çalışan yazılımlara dönüştürmeye odaklanıyorum.",
      "Web, mobil, backend, masaüstü sistemler ve bilgisayarlı görü alanlarında projeler geliştiriyorum.",
      "Bir projede yalnızca arayüzü değil; veri modelini, iş akışını, kullanıcı deneyimini, backend mimarisini ve deployment sürecini birlikte düşünmeye çalışıyorum.",
    ],
  },
  experience: {
    present: "Devam",
    current: "Güncel",
  },
  skills: {
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      mobile: "Mobile",
      desktop: "Desktop",
      computerVision: "Computer Vision",
      data: "Data",
      infrastructure: "Infrastructure",
    },
  },
  contact: {
    intro: "Proje, iş birliği veya teknik bir konuşma için yazabilirsiniz.",
    social: "Bağlantılar",
    formTitle: "Mesaj gönder",
    name: "Ad Soyad",
    email: "E-posta",
    message: "Mesajınız",
    send: "Gönder",
    sending: "Gönderiliyor…",
    success: "Teşekkürler — en kısa sürede dönüş yapacağım.",
    emailCta: "E-posta gönder",
  },
  footer: {
    rights: "Yazılım Mühendisi",
    builtWith: "Next.js ile oluşturuldu",
  },
  theme: {
    light: "Açık tema",
    dark: "Koyu tema",
  },
};

export default tr;
