import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import GetQuote from "./page/GetQuote";
import AboutUs from "./page/AboutUs";
import Movers from "./page/Movers";
import EnterTrackCode from "./page/EnterTrackCode";
import "./App.css";
import MakeAReport from "./page/MakeAReport";
import TrackReport from "./page/TrackReport";
import Faq from "./page/Faq";
import PrivacyPolicy from "./page/PrivacyPolicy";
import TermsAndCondition from "./page/TermsAndCondition";
import FirstStepCompanies from "./page/FirstStepCompanies";
import SecondStepCompanies from "./page/SecondStepCompanies";
import ThirdStepCompanies from "./page/ThirdStepCompanies";
import Overview from "./page/OverviewPage";
import CalendarPage from "./page/calendarPage";
import JobsPage from "./page/jobsPage";
import Payment from "./page/PaymentPage";
import ViewNewJobs from "./page/ViewNewJobs";
import UpcomingJobView from "./page/UpcomingJobView";
import OverviewPageAdmin from "./page/OverviewPageAdmin";
import RequestPage from "./page/RequestPage";
import UsersPage from "./page/UserPageAdmin";
import Transactions from "./page/Transaction";
import AdminLogin from "./page/AdminLogin";
import Resolution from "./page/Resolution";
import VendorLogin from "./page/VendorLogin";
import Stripe from "./page/Stripe";
import { loadStripe } from "@stripe/stripe-js";

// import StripeComponent from "./StripeComponent";

const stripePromise = loadStripe(
  "pk_test_51O2JovLw5fKJMXx3zvARABxAlQpptJi9aO6gPkcbH9lFFCfJXV8rgAw170q4wt3CHz00uDfGtPqKmvdvPFWQqNMc00c3Dqphpr"
);

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/quote" element={<GetQuote />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/get-started" element={<FirstStepCompanies />} />
        <Route path="/email-verification" element={<SecondStepCompanies />} />
        <Route path="/profile-setup" element={<ThirdStepCompanies />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/view-new-jobs" element={<ViewNewJobs />} />
        <Route path="/upcoming-jobs-view" element={<UpcomingJobView />} />
        <Route path="/movers/:id" element={<Movers />} />
        <Route path="/track-code" element={<EnterTrackCode />} />
        <Route path="/make-report" element={<MakeAReport />} />
        <Route path="/track-report" element={<TrackReport />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndCondition />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/overview-admin" element={<OverviewPageAdmin />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/resolution" element={<Resolution />} />
        <Route path="/stripe" element={<Stripe />} />
        {/* Sidebar should only be visible on Overview & Calendar */}
      </Routes>
    </div>
  );
}

export default App;

// import { loadStripe } from "@stripe/stripe-js";
// import React, { lazy, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import Loader from "./components/loader";

// const Home = lazy(() => import("./page/Home"));
// const GetQuote = lazy(() => import("./page/GetQuote"));
// const AboutUs = lazy(() => import("./page/AboutUs"));
// const Movers = lazy(() => import("./page/Movers"));
// const EnterTrackCode = lazy(() => import("./page/EnterTrackCode"));
// const MakeAReport = lazy(() => import("./page/MakeAReport"));
// const TrackReport = lazy(() => import("./page/TrackReport"));
// const Faq = lazy(() => import("./page/Faq"));
// const PrivacyPolicy = lazy(() => import("./page/PrivacyPolicy"));
// const TermsAndCondition = lazy(() => import("./page/TermsAndCondition"));
// const FirstStepCompanies = lazy(() => import("./page/FirstStepCompanies"));
// const SecondStepCompanies = lazy(() => import("./page/SecondStepCompanies"));
// const ThirdStepCompanies = lazy(() => import("./page/ThirdStepCompanies"));
// const Overview = lazy(() => import("./page/OverviewPage"));
// const CalendarPage = lazy(() => import("./page/calendarPage"));
// const JobsPage = lazy(() => import("./page/jobsPage"));
// const Payment = lazy(() => import("./page/PaymentPage"));
// const ViewNewJobs = lazy(() => import("./page/ViewNewJobs"));
// const UpcomingJobView = lazy(() => import("./page/UpcomingJobView"));
// const OverviewPageAdmin = lazy(() => import("./page/OverviewPageAdmin"));
// const RequestPage = lazy(() => import("./page/RequestPage"));
// const UsersPage = lazy(() => import("./page/UserPageAdmin"));
// const Transactions = lazy(() => import("./page/Transaction"));
// const AdminLogin = lazy(() => import("./page/AdminLogin"));
// const Resolution = lazy(() => import("./page/Resolution"));
// const VendorLogin = lazy(() => import("./page/VendorLogin"));
// const Stripe = lazy(() => import("./page/Stripe"));

// // import StripeComponent from "./StripeComponent";

// // const stripePromise = loadStripe(
// //   "pk_test_51O2JovLw5fKJMXx3zvARABxAlQpptJi9aO6gPkcbH9lFFCfJXV8rgAw170q4wt3CHz00uDfGtPqKmvdvPFWQqNMc00c3Dqphpr"
// // );

// function App() {
//   return (
//     <div className="app-container">
//       <Suspense fallback={<Loader />}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/vendor-login" element={<VendorLogin />} />
//           <Route path="/quote" element={<GetQuote />} />
//           <Route path="/faq" element={<Faq />} />
//           <Route path="/about-us" element={<AboutUs />} />
//           <Route path="/get-started" element={<FirstStepCompanies />} />
//           <Route path="/email-verification" element={<SecondStepCompanies />} />
//           <Route path="/profile-setup" element={<ThirdStepCompanies />} />
//           <Route path="/overview" element={<Overview />} />
//           <Route path="/calendar" element={<CalendarPage />} />
//           <Route path="/jobs" element={<JobsPage />} />
//           <Route path="/payment" element={<Payment />} />
//           <Route path="/view-new-jobs" element={<ViewNewJobs />} />
//           <Route path="/upcoming-jobs-view" element={<UpcomingJobView />} />
//           <Route path="/movers" element={<Movers />} />
//           <Route path="/track-code" element={<EnterTrackCode />} />
//           <Route path="/make-report" element={<MakeAReport />} />
//           <Route path="/track-report" element={<TrackReport />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms" element={<TermsAndCondition />} />
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route path="/overview-admin" element={<OverviewPageAdmin />} />
//           <Route path="/request" element={<RequestPage />} />
//           <Route path="/users" element={<UsersPage />} />
//           <Route path="/transactions" element={<Transactions />} />
//           <Route path="/resolution" element={<Resolution />} />
//           <Route path="/stripe" element={<Stripe />} />
//         </Routes>
//       </Suspense>
//     </div>
//   );
// }

// export default App;
