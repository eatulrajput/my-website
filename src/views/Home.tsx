import {
  Hero,
  Projects,
  Skills,
  Education,
  Experience,
  Certificate,
  Contact,
  Blogs
} from "@/components/Home";
import GeometricLines from "@/components/GeometricLines";
import SectionNav from "@/components/SectionNav";

const Home = () => {
  return (
    <main className="min-h-screen w-full relative">
      {/* Fixed decorative geometric lines in the left/right margins */}
      <GeometricLines />

      {/* Sticky left-side section navigator (xl+ only) */}
      <SectionNav />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-14 sm:gap-16">
        <section id="hero">
          <Hero />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="blogs">
          <Blogs />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="certificates">
          <Certificate />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </div>
    </main>
  );
};

export default Home;
