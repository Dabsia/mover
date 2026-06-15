// import React, { useEffect } from "react";
// import Header from "../components/Header";
// import FAQ from "../components/FAQ";
// import Footer from "../components/Footer";
// import ContactUs from "../components/ContactUs";

// const Faq = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   return (
//     <div>
//       <Header />
//       <div className="  w-full  bg-gradient-to-b mt-[40px] md:mt-[80px] from-[#E8F5F5] to-white">
//         <div className="w-[90vw] heroSection pt-14 max-w-[1500px] items-center flex justify-between mx-auto">
//           <FAQ showBackgroundColor={false} />
//         </div>
//       </div>
//       <ContactUs />
//       <Footer />
//     </div>
//   );
// };

// export default Faq;

import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";

const Faq = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>FAQ - Frequently Asked Questions | Zinter</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about Zinter's services, pricing, support, and more. Get the information you need quickly and easily."
        />
        <meta
          name="keywords"
          content="FAQ, frequently asked questions, zinter help, customer support, common questions"
        />

        {/* Additional SEO tags */}
        <link rel="canonical" href="https://zinter.nl/faq" />
        <meta name="robots" content="index, follow" />

        {/* FAQ Structured Data (JSON-LD) */}
      </Helmet>

      <div>
        <Header />
        <div className="w-full bg-gradient-to-b mt-[40px] md:mt-[80px] from-[#E8F5F5] to-white">
          <div className="w-[90vw] heroSection pt-14 max-w-[1500px] items-center flex justify-between mx-auto">
            <FAQ showBackgroundColor={false} />
          </div>
        </div>
        <ContactUs />
        <Footer />
      </div>
    </>
  );
};

export default Faq;
