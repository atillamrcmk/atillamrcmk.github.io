import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import CursorFollower from "./components/CursorFollower";
import SectionDivider from "./components/SectionDivider";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      {/* CursorFollower disabled for better performance - uncomment if needed */}
      {/* <CursorFollower /> */}
      <LeftSidebar />
      <RightSidebar />
      <Container>
        <Navbar />
        <main id="main-content" className="pt-24 md:pt-32">
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Contact />
        </main>
      </Container>
      <Container>
        <Footer />
      </Container>
    </>
  );
}
