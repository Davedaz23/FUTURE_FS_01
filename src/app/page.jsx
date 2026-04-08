// D:\Works\portfolio-website\frontend\src\app\page.jsx
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Stats from '../components/Stats';
import HireConsult from '../components/HireConsult';

export default function Home() {
  return (
    <>
     {/* Render the components in the desired order */}
      <Hero />
      <Stats />
      <Skills />
      <Experience />
      <Projects />
      <HireConsult />
      <Contact />
    </>
  );
}