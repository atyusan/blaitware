import GithubSlugger from "github-slugger";

/** Build a nested TOC tree from markdown ##–###### headings (Hugo-style). */
export function getHeadings(content = "") {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,5})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[#*`_[\]]/g, "").trim();
    if (!text) continue;
    headings.push({ level, text, id: slugger.slug(text) });
  }
  return headings;
}

function nestHeadings(headings) {
  const root = [];
  const stack = [{ level: 1, children: root }];

  headings.forEach((heading) => {
    while (stack.length > 1 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }
    const node = { ...heading, children: [] };
    stack[stack.length - 1].children.push(node);
    stack.push(node);
  });

  return root;
}

function TocList({ items }) {
  if (!items?.length) return null;
  return (
    <ol>
      {items.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`}>{item.text}</a>
          <TocList items={item.children} />
        </li>
      ))}
    </ol>
  );
}

const TableOfContents = ({ content }) => {
  const headings = getHeadings(content);
  if (headings.length < 2) return null;

  return (
    <details className="table-of-content">
      <summary>Table Of Contents</summary>
      <nav id="TableOfContents">
        <TocList items={nestHeadings(headings)} />
      </nav>
    </details>
  );
};

export default TableOfContents;
