// import React, { useEffect } from "react";
// import Header from "../components/Header";
// import HeroSection from "../components/HeroSection";
// import MoveDetails from "../components/MoveDetails";
// import TrustedBy from "../components/TrustedBy";
// import SellingPoint from "../components/SellingPoint";
// import Process from "../components/Process";
// import Testimonials from "../components/Testimonials";
// import NewsLetter from "../components/NewsLetter";
// import Footer from "../components/Footer";
// import FAQ from "../components/FAQ";

// const Home = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <div className="relative">
//       <Header />
//       <HeroSection />
//       <MoveDetails />
//       {/* <TrustedBy /> */}
//       <SellingPoint />
//       <Process />
//       <Testimonials />
//       <FAQ />
//       <NewsLetter />
//       <Footer />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MoveDetails from "../components/MoveDetails";
import SellingPoint from "../components/SellingPoint";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import { Helmet } from "react-helmet-async";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>Zinter – Home</title>
        <meta
          name="description"
          content="Zinter – Fast and reliable moving and tracking services."
        />
        <meta name="keywords" content="moving, tracking, Zinter, logistics" />
        <meta property="og:title" content="Zinter – Home" />
        <meta
          property="og:description"
          content="Zinter – Fast and reliable moving and tracking services."
        />
        <meta property="og:url" content="https://zinter.nl/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="relative">
        <Header />
        <HeroSection />
        <MoveDetails />
        <SellingPoint />
        <Process />
        <Testimonials />
        <FAQ />
        <NewsLetter />
        <Footer />
      </div>
    </>
  );
};

export default Home;
