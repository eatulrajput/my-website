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


const Home = () => {
  return (
    <main className="min-h-screen w-full relative">


      <div className="group/home max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-14 sm:gap-16">
        <section id="hero" className="transition duration-500 group-hover/home:opacity-40 group-hover/home:blur-[2px] hover:!opacity-100 hover:!blur-none">
          <Hero />
        </section>

        <section id="projects" className="transition duration-500 group-hover/home:opacity-40 group-hover/home:blur-[2px] hover:!opacity-100 hover:!blur-none">
          <Projects />
        </section>

        <section id="blogs" className="transition duration-500 group-hover/home:opacity-40 group-hover/home:blur-[2px] hover:!opacity-100 hover:!blur-none">
          <Blogs />
        </section>

        <section id="experience" className="transition duration-500 group-hover/home:opacity-40 group-hover/home:blur-[2px] hover:!opacity-100 hover:!blur-none">
          <Experience />
        </section>

        <section id="skills" className="transition duration-500 group-hover/home:opacity-40 group-hover/home:blur-[2px] hover:!opacity-100 hover:!blur-none">
          <Skills />
        </section>

        <section id="education" className="transition duration-500 group-hover/home:opacity-40 group-hover/home:blur-[2px] hover:!opacity-100 hover:!blur-none">
          <Education />
        </section>

        <section id="certificates" className="transition duration-500 group-hover/home:opacity-40 group-hover/home:blur-[2px] hover:!opacity-100 hover:!blur-none">
          <Certificate />
        </section>

        <section id="contact" className="transition duration-500 group-hover/home:opacity-40 group-hover/home:blur-[2px] hover:!opacity-100 hover:!blur-none">
          <Contact />
        </section>
      </div>
    </main>
  );
};

export default Home;
