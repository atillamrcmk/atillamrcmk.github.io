import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { projects } from "@/lib/data/projects";
import { fetchGitHubMetaMap } from "@/lib/github/fetch-repos";
import Container from "@/app/components/Container";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import Projects from "@/app/components/Projects";
import Experience from "@/app/components/Experience";
import Skills from "@/app/components/Skills";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import ScrollProgress from "@/app/components/ScrollProgress";
import LeftSidebar from "@/app/components/LeftSidebar";
import ThemeInit from "@/app/components/ThemeInit";
import { warnMissingCv } from "@/lib/constants/cv-check";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  warnMissingCv();

  const githubMeta = await fetchGitHubMetaMap(projects.map((p) => p.githubRepo));

  return (
    <>
      <ThemeInit />
      <ScrollProgress />
      <LeftSidebar />
      <Container>
        <Navbar locale={locale} dict={dict} />
        <main id="main-content">
          <Hero locale={locale} dict={dict} />
          <Projects locale={locale} dict={dict} githubMeta={githubMeta} />
          <About dict={dict} />
          <Experience locale={locale} dict={dict} />
          <Skills dict={dict} />
          <Contact dict={dict} />
        </main>
      </Container>
      <Footer dict={dict} />
    </>
  );
}
