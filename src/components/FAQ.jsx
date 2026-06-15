import question from "../Assets/question.svg";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const FAQ = ({ showBackgroundColor }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const { t } = useTranslation();

  const faqData = [
    {
      question: t("faq.paymentMethods"),
      answer: t("faq.ans1"),
    },
    {
      question: t("faq.howEarly"),
      answer: t("faq.ans2"),
    },
    {
      question: t("faq.packing"),
      answer: t("faq.ans3"),
    },
    {
      question: t("faq.whatsIncluded"),
      answer: t("faq.ans4"),
    },

    {
      question: t("faq.reschedule"),
      answer: t("faq.ans5"),
    },

    {
      question: t("faq.storage"),
      answer: t("faq.ans6"),
    },
    {
      question: t("faq.costCalculation"),
      answer: t("faq.ans7"),
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className={`w-full ${
        showBackgroundColor && "bg-gradient-to-br from-gray-50 to-gray-100"
      } py-8 sm:py-12 md:py-16 lg:py-20`}
    >
      <div className="mx-auto w-[90vw] max-w-[1500px]">
        {/* Mobile/Small Screen Layout */}
        <div className="block lg:hidden">
          {/* Header and Icon Side by Side */}
          <div className="flex items-center justify-between mb-8 sm:mb-12 md:mb-16">
            <div className="flex-1 pr-4">
              <h2 className="text-[20px] font-unbounded sm:text-[25px] md:text-[28px] font-bold text-gray-800">
                {t("faq.title")}
              </h2>
            </div>
            <img src={question} className="w-[70px] h-[90px] " alt="question" />
          </div>

          {/* FAQ Items Full Width */}
          <div className=" w-full">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg mb-3 sm:rounded-xl md:rounded-2xl transition-all duration-300 border border-[#e9e9e9] scrollbar-hide "
              >
                {/* Question */}
                <button
                  className="w-full p-4 sm:p-5 md:p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#373737] pr-4 leading-tight">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transform transition-transform duration-200" />
                      ) : (
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transform transition-transform duration-200" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                    <div className="h-px bg-gray-200 mb-4 sm:mb-5 md:mb-6"></div>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center h-[750px] justify-between">
          {/* Header Section */}
          <div className="text-center mb-8 flex justify-between w-[47%] h-full flex-col sm:mb-12 md:mb-16">
            <h2 className="text-[20px] font-unbounded sm:text-[25px] mt-[32px] w-[50%] font-bold md:text-[28px] lg:text-[38px] text-gray-800 mb-3 sm:mb-4 md:mb-6">
              {t("faq.title")}
            </h2>
            <img
              src={question}
              className="w-[250px] h-[300px] "
              alt="question"
            />
          </div>

          {/* FAQ Items */}
          <div className="h-fit w-[50%] max-h-[750px] scrollbar-hide overflow-y-auto pr-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg mb-3 sm:rounded-xl md:rounded-2xl transition-all duration-300 overflow-hidden border border-[#e9e9e9] "
              >
                {/* Question */}
                <button
                  className="w-full p-4 sm:p-5 md:p-6 lg:p-8 text-left hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[#373737] pr-4 leading-tight">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transform transition-transform duration-200" />
                      ) : (
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 transform transition-transform duration-200" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-4 sm:pb-5 md:pb-6 lg:pb-8">
                    <div className="h-px bg-gray-200 mb-4 sm:mb-5 md:mb-6"></div>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
