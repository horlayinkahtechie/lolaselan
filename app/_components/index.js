import FeaturedCollections from "./collections";
import ContactSection from "./contactus";
import Hero from "./hero";
import NewArrivals from "./newArrivals";
import NewsletterModal from "./subscriptionModal";
import Testimonials from "./testimonials";

export default function Index() {
  return (
    <>
      <NewsletterModal />
      <Hero />
      <FeaturedCollections />
      <Testimonials />
      <NewArrivals />
      <ContactSection />
    </>
  );
}
