// import Header from "../components/Header";
// import AboutZinter from "../components/AboutZinter";
// import OurMission from "../components/OurMission";
// import OurVision from "../components/OurVision";
// import OurServices from "../components/OurServices";
// // import Testimonials from "../components/Testimonials";
// import TestimonialsAboutUs from "../components/TestimonialsAbout";
// import ContactUs from "../components/ContactUs";
// import Testimonials from "../components/Testimonials";
// // import ContactUs from "../components/ContactUs";
// import Footer from "../components/Footer";
// import { useEffect } from "react";

// const AboutUs = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <div>
//       <Header />
//       <AboutZinter />
//       <OurMission />
//       <OurVision />
//       <OurServices />
//       <Testimonials />
//       <ContactUs />
//       <Footer />
//     </div>
//   );
// };

// export default AboutUs;

import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import AboutZinter from "../components/AboutZinter";
import OurMission from "../components/OurMission";
import OurVision from "../components/OurVision";
import OurServices from "../components/OurServices";
import ContactUs from "../components/ContactUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About Us - Zinter | Our Mission, Vision & Services</title>
        <meta
          name="description"
          content="Learn about Zinter's mission to deliver innovative solutions. Discover our vision, values, and the services we provide to transform businesses."
        />
        <meta
          name="keywords"
          content="about zinter, company mission, our vision, business services, company values"
        />

        {/* Additional SEO tags */}
        <link rel="canonical" href="https://zinter.ln/about-us" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Zinter" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Zinter",
              "url": "https://zinter.nl",
              "logo": "https://zinter.nl/images/logo.png",
              "description": "Your company description here",

              ]
            }
          `}
        </script>
      </Helmet>

      <div>
        <Header />
        <AboutZinter />
        <OurMission />
        <OurVision />
        <OurServices />
        <Testimonials />
        <ContactUs />
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
