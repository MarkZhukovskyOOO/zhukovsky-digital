import Hero from "../components/Hero.jsx";
import Products from "../components/Products.jsx";
import Services from "../components/Services.jsx";
import Pricing from "../components/Pricing.jsx";
import Faq from "../components/Faq.jsx";
import Team from "../components/Team.jsx";
import Reviews from "../components/Reviews.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Products />
        <Services />
        <Pricing />
        <Faq />
        <Team />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
