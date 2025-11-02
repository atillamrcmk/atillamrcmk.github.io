# 👋 Hi, I'm Atilla Mercimek

**Software Engineer • Mobile & AI Developer**

[![GitHub followers](https://img.shields.io/github/followers/atillamrcmk?style=social)](https://github.com/atillamrcmk)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/atilla-mercimek-6025b7222)

---

## 🚀 About Me

I'm a mobile app developer who places **design, performance, and user experience** at the center of my work. I build modern, fast, and scalable applications using **Flutter, Firebase, and Isar DB** technologies.

- 🎓 **Atatürk University** Software Engineering graduate
- 💼 Currently working in a public institution
- 🚀 Developing private projects as a freelancer
- 🎯 Passionate about clean code and scalable architecture

---

## 🛠️ Tech Stack

### Programming Languages
**C • C++ • C# • Dart • Python • JavaScript**

### Mobile Development
**Flutter • Firebase / FCM • Isar**

### Backend & Desktop
**.NET • WinForms • Node.js • REST APIs • SQL**

### AI & Computer Vision
**Python • OpenCV • Machine Learning**

### Other
**WebRTC • Git • Docker**

---

## 📊 GitHub Stats

<div align="center">
  
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=atillamrcmk&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true"/>
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=atillamrcmk&layout=compact&langs_count=8&theme=tokyonight"/>
  
</div>

---

## 🎯 Featured Projects

- **[Kangaroom](https://github.com/atillamrcmk/kangaroom)** - Teacher-parent communication platform with FCM push notifications
- **[CV Jobs](https://github.com/atillamrcmk/cv_jobs)** - Job recommendation app based on CV analysis
- **[Crisis Assistant](https://github.com/atillamrcmk/kriz_asistani)** - Emergency assistance mobile application
- **[Meeting App](https://github.com/atillamrcmk/meeting-app)** - WebRTC-based video conferencing application

---

## 📈 My Approach

> A developer who thinks beyond code, with a **strong product vision**. My goal is to spread digitalization and user-centric software culture. I view technology not just as a tool, but as **an impact area that simplifies people's lives**.

- **Design-Oriented** - Prioritizes user experience and visual aesthetics
- **Performance** - Develops fast, fluid, and optimized applications
- **Scalable** - Robust architectural approaches for growing projects
- **Product Vision** - Thinks beyond code with a strategic approach

---

## 📬 Get in Touch

- 📧 **Email:** [mercimekatilla53@gmail.com](mailto:mercimekatilla53@gmail.com)
- 💼 **LinkedIn:** [atilla-mercimek-6025b7222](https://www.linkedin.com/in/atilla-mercimek-6025b7222)
- 🌐 **Portfolio:** [atillamrcmk.github.io](https://atillamrcmk.github.io)
- 💻 **GitHub:** [@atillamrcmk](https://github.com/atillamrcmk)

---

<div align="center">
  
  **⚡ Building the future, one line of code at a time ⚡**

</div>

---

# 📖 Portfolio Website Documentation

Profesyonel, performans odaklı ve erişilebilir portföy web sitesi. Next.js App Router ile geliştirilmiş, statik export (SSG) için optimize edilmiş.

## 🚀 Özellikler

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS 4
- **Static Site Generation (SSG)** - GitHub Pages için optimize edilmiş
- **Lighthouse 90+** - Performance, SEO, Best Practices, Accessibility
- **WCAG AA** uyumlu - Kontrast, focus states, landmark'lar
- **SEO Optimized** - Metadata, OpenGraph, Twitter Cards, JSON-LD
- **Dark Theme** - Mor→vizyon gradient vurgulu modern tasarım
- **Responsive** - Mobil, tablet ve desktop için optimize edilmiş
- **Minimal JS** - Ağır kütüphane yok, inline SVG ikonlar

## 📋 Gereksinimler

- Node.js 18+ 
- npm veya yarn

## 🛠️ Kurulum

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```
   Site `http://localhost:3000` adresinde açılacaktır.

## 🏗️ Build ve Export

**Statik export için:**
```bash
npm run build
```

Bu komut:
- Next.js uygulamasını build eder
- `out/` klasöründe statik dosyalar oluşturur
- GitHub Pages için hazır hale getirir

**Local test için:**
```bash
npm run start
```
`out/` klasöründeki statik dosyaları serve eder (port 3000 veya başka bir port).

## 📁 Proje Yapısı

```
cv-site/
├── app/
│   ├── components/          # React bileşenleri
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Experience.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   └── data/           # Veri dosyaları
│   │       ├── profile.ts
│   │       ├── experience.ts
│   │       └── projects.ts
│   ├── layout.tsx          # Root layout (metadata, JSON-LD)
│   ├── page.tsx            # Ana sayfa
│   ├── globals.css         # Global stiller
│   ├── sitemap.ts          # Sitemap generator
│   └── robots.ts           # Robots.txt generator
├── public/
│   ├── Atilla-Mercimek-CV.pdf  # CV dosyası (eklenmeli)
│   └── og.png             # OpenGraph görseli (eklenmeli)
├── next.config.ts         # Next.js yapılandırması
├── package.json
└── README.md
```

## 🎨 Tasarım Sistemi

### Renk Paleti

- **bg-dark**: `#0E0E12`
- **surface**: `#1A1A22`
- **text**: `#E5E7EB`
- **muted**: `#9CA3AF`
- **border**: `#2F2A37`
- **primary**: `#6D28D9` (mor)
- **primary2**: `#9333EA` (vizyon)

### Utility Sınıfları

- `.btn` - Temel buton stili
- `.btn-primary` - Primary buton (gradient)
- `.card` - Kart bileşeni
- `.container-x` - Max-width container
- `.gradient-text` - Gradient text efekti
- `.nav-sticky` - Sticky navigation

## 🌐 GitHub Pages Deployment

GitHub Pages'e deploy etmek için otomatik GitHub Actions workflow'u hazırdır (`.github/workflows/deploy.yml`).

### Adımlar:

1. **Repository oluşturun:**
   - GitHub'da repository oluşturun
   - Eğer `username.github.io` adında ise (kullanıcı sayfası), `basePath` boş kalacak
   - Eğer başka bir isimde ise (proje sayfası), `next.config.ts`'de `basePath`'i repository adına ayarlayın

2. **Repository'yi GitHub'a push edin:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPOSITORY_NAME.git
   git push -u origin main
   ```

3. **GitHub Pages ayarlarını yapın:**
   - Repository → **Settings** → **Pages**
   - **Source**: "GitHub Actions" seçin
   - Artık her push'ta otomatik deploy yapılacak

4. **İlk deploy:**
   - `main` branch'ine push yaptığınızda otomatik olarak build başlayacak
   - **Actions** sekmesinden deploy durumunu takip edebilirsiniz
   - Deploy tamamlandığında siteniz `https://USERNAME.github.io` veya `https://USERNAME.github.io/REPOSITORY_NAME` adresinde yayında olacak

### Repository Adı Değişikliği

Eğer repository adı `cv-site` değilse, `next.config.ts` dosyasında `basePath`'i güncelleyin:

```typescript
basePath: process.env.NODE_ENV === "production" ? "/repository-adi" : "",
```

Örnek: Repository adı `my-portfolio` ise:
```typescript
basePath: process.env.NODE_ENV === "production" ? "/my-portfolio" : "",
```

## 📝 İçerik Güncelleme

### Kişisel Bilgiler
`app/components/data/profile.ts` dosyasını düzenleyin.

### İş Deneyimi
`app/components/data/experience.ts` dosyasını düzenleyin.

### Projeler
`app/components/data/projects.ts` dosyasını düzenleyin.

### CV Dosyası
`public/Atilla-Mercimek-CV.pdf` dosyasını ekleyin.

### OpenGraph Görseli
`public/og.png` dosyasını ekleyin (1200x630px önerilen).

## 🔍 SEO ve Metadata

Metadata `app/layout.tsx` dosyasında yapılandırılmıştır:
- OpenGraph tags
- Twitter Cards
- JSON-LD (Schema.org Person)
- Sitemap (otomatik)
- Robots.txt (otomatik)

Site URL'i için `.env.local` dosyası oluşturun:
```
NEXT_PUBLIC_SITE_URL=https://atillamrcmk.github.io
```

## ♿ Erişilebilirlik

- WCAG AA kontrast oranları
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels ve roles
- Keyboard navigation desteği
- Focus indicators
- Skip to main content link
- Screen reader uyumlu

## 📊 Performans

- Static export (SSG) - Sunucu gerektirmez
- Minimal JavaScript bundle
- Lazy loading için hazır
- Optimized fonts (next/font/google)
- Inline SVG icons

## 🧪 Test

**Lighthouse testi:**
```bash
# Chrome DevTools > Lighthouse
# veya
npx lighthouse http://localhost:3000 --view
```

**Erişilebilirlik testi:**
- Chrome DevTools > Lighthouse > Accessibility
- axe DevTools extension
- WAVE browser extension

## 📦 Bağımlılıklar

```json
{
  "dependencies": {
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "next": "16.0.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "16.0.1"
  }
}
```

## 🐛 Sorun Giderme

**Build hatası:**
- `npm install` ile bağımlılıkları yeniden yükleyin
- `node_modules` ve `.next` klasörlerini silip yeniden build edin

**GitHub Pages'te görünmüyor:**
- Repository Settings → Pages'te doğru branch ve folder seçili olduğundan emin olun
- Build çıktısının (`out/`) doğru branch'e push edildiğini kontrol edin

**Stiller yüklenmiyor:**
- Tailwind CSS build sırasında compile edilir
- `npm run build` komutunu tekrar çalıştırın

## 📄 Lisans

Bu proje kişisel portföy için oluşturulmuştur.

## 📧 İletişim

**Atilla Mercimek**
- Email: mercimekatilla53@gmail.com
- GitHub: [@atillamrcmk](https://github.com/atillamrcmk)
- LinkedIn: [atilla-mercimek-6025b7222](https://www.linkedin.com/in/atilla-mercimek-6025b7222)

---

**Not:** Bu README, projenin GitHub Pages'e deploy edilmesi için gerekli tüm adımları içerir. Sorularınız için issue açabilirsiniz.
