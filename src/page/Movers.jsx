import React, { useEffect } from "react";
import QuoteHeader from "../components/QuoteHeader";
import MoversContainer from "../components/MoversContainer";
import { useLocation } from "react-router-dom";

const Movers = () => {
  const location = useLocation();
  const trackingCode = location.state?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <QuoteHeader />
      <MoversContainer trackingCode={trackingCode} />
    </div>
  );
};

export default Movers;
