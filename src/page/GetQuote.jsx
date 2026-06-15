import React, { useEffect } from "react";
import QuoteHeader from "../components/QuoteHeader";
import QuoteContainer from "../components/QuoteContainer";
import { useLocation } from "react-router-dom";

const GetQuote = () => {
  const location = useLocation();
  const data = location.state?.data;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      <QuoteHeader />
      <QuoteContainer data={data} />
    </div>
  );
};

export default GetQuote;
