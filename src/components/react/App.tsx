import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import MotionToggle from "./MotionToggle";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import SkillsUniverse from "./sections/SkillsUniverse";
import Projects from "./sections/Projects";
import DashboardLab from "./sections/DashboardLab";
import DataStory from "./sections/DataStory";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Footer from "./Footer";

export default function App() {
  return (
    <>
      <CustomCursor />
      <MotionToggle />
      <Navbar />
      <main className="relative w-full">
        <Hero />
        <About />
        <Experience />
        <SkillsUniverse />
        <Projects />
        <DashboardLab />
        <DataStory />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
