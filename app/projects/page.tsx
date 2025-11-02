import Link from "next/link";
import Container from "../components/Container";
import ThemeToggle from "../components/ThemeToggle";
import { profile } from "../components/data/profile";
import { projects } from "../components/data/projects";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <Container>
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              {profile.name.split(" ")[0]}
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/cv"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                CV
              </Link>
              <Link
                href="/projects"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold"
              >
                Projeler
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main className="py-12">
        <Container>
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Projelerim
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Geliştirdiğim projeler ve açık kaynak katkılarım. Her bir proje, problem çözme
              yaklaşımımı ve teknoloji yeteneklerimi yansıtır.
            </p>
          </div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Öne Çıkan Projeler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Diğer Projeler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                Henüz proje eklenmemiş. Yakında burada projelerinizi görebileceksiniz!
              </p>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}

