"use client";

import { markdownify } from "@lib/utils/textConverter";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const PricingAccordion = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs?.length) return null;

  return (
    <div className="pricing-accordion">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="pricing-accordion-item mb-3 overflow-hidden rounded-sm bg-light"
          >
            <h4 className="mb-0">
              <button
                type="button"
                className={`pricing-accordion-btn flex w-full items-center justify-between border border-border p-6 text-left h6 mb-0 shadow-none ${
                  isOpen ? "is-open" : ""
                }`}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{faq.title}</span>
                <FaChevronDown
                  className={`shrink-0 text-sm transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h4>
            {isOpen && (
              <div className="content pricing-accordion-body p-6">
                {markdownify(faq.answer, "div")}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PricingAccordion;
