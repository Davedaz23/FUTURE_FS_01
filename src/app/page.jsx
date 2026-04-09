// D:\Works\portfolio-website\frontend\src\app\page.jsx
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Blog from '../components/Blog';  
import Contact from '../components/Contact';
import Stats from '../components/Stats';
import HireConsult from '../components/HireConsult';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />       
      <Skills />
      <Experience />
      <Projects />
      <Blog />           
      <HireConsult />
      <Contact />
    </>
  );
}