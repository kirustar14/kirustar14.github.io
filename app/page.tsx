import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Hackathons from "@/components/Hackathons";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import BlobDivider from "@/components/BlobDivider";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BlobDivider fill="var(--color-bg-alt)" variant={0} />
        <Story />
        <BlobDivider fill="var(--color-bg)" variant={1} flip />
        <Hackathons />
        <BlobDivider fill="var(--color-bg-alt)" variant={0} />
        <CurrentlyBuilding />
        <BlobDivider fill="var(--color-bg)" variant={1} flip />
        <Projects />
        <BlobDivider fill="var(--color-bg-alt)" variant={0} />
      </main>
      <Footer />
    </>
  );
}
