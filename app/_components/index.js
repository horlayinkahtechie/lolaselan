import FeaturedCollections from "./collections";
import ContactSection from "./contactus";
import Footer from "./footer";
import Hero from "./hero";
import ProductScrollSection from "./newArrivals";
import Testimonials from "./testimonials";

export default function Index() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <Testimonials />
      <ProductScrollSection />
      <ContactSection />
      <Footer />
    </>
  );
}
