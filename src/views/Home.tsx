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
    <main className="min-h-screen w-full">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-14 sm:gap-16">
        <Hero />
        <Projects />
        <Blogs />
        <Experience />
        <Skills />
        <Education />
        <Certificate />
        <Contact />
      </div>
    </main>
  );
};

export default Home;
