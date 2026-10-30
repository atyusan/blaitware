"use client";

import { markdownify } from "@lib/utils/textConverter";
import { useMemo, useState } from "react";
import { FaCheckCircle, FaSearch } from "react-icons/fa";

function Faq({ data }) {
  const { frontmatter } = data;
  const { title, description, faqs } = frontmatter;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (faq) =>
        faq.title.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q),
    );
  }, [faqs, query]);

  return (
    <>
      <section className="section pb-0">
        <div className="container text-center">
          {markdownify(title, "h1", "h2 mb-3")}
          {description && <p className="mb-0 font-medium">{description}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row justify-center">
            <div className="col-12 mb-12 lg:col-8">
              <div className="faq-search flex overflow-hidden rounded-sm border border-border">
                <span
                  className="flex items-center px-4 text-text-dark"
                  aria-hidden="true"
                >
                  <FaSearch />
                </span>
                <input
                  type="text"
                  id="search_faq"
                  className="form-input w-full border-0 py-3 font-medium shadow-none focus:ring-0"
                  placeholder="Click and search FAQ.."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Click and search FAQ.."
                />
              </div>
            </div>
          </div>

          <div className="row justify-center">
            <div className="col-12 lg:col-8">
              {filtered.map((faq, index) => (
                <div
                  key={index}
                  className="faq-content is-hoverable mb-6 rounded-xl border border-border p-6 md:mb-12 md:p-12"
                >
                  <h3 className="check-mark h5 mb-4">
                    <FaCheckCircle aria-hidden="true" />
                    {faq.title}
                  </h3>
                  <div className="content faq-body">
                    {markdownify(faq.answer, "div")}
                  </div>
                </div>
              ))}
              {!filtered.length && (
                <p className="text-center">No FAQ matched your search.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
