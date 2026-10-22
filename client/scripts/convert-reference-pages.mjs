import fs from "node:fs";
import path from "node:path";

const reference = process.argv[2];
const pages = ["about.html", ...fs.readdirSync(path.join(reference, "solutions")).filter((name) => name.endsWith(".html")).map((name) => `solutions/${name}`)];

function convert(html) {
  let hasLink = false;
  let markup = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0];
  if (!markup) throw new Error("Missing main element");
  markup = markup.replace(/<!--[\s\S]*?-->/g, "");
  markup = markup.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (_, attributes, children) => {
    const href = attributes.match(/\bhref="([^"]+)"/)?.[1];
    let route = null;
    if (href?.startsWith("solutions/")) route = `/solutions/${href.slice(10).replace(/\.html$/, "")}`;
    if (href === "../index.html" || href === "index.html") route = "/";
    if (href === "../about.html" || href === "about.html") route = "/about";
    if (href === "#contact") route = "/contact";
    if (route) {
      hasLink = true;
      return `<Link${attributes.replace(/\bhref="[^"]+"/, `to="${route}"`)}>${children}</Link>`;
    }
    return `<a${attributes}>${children}</a>`;
  });
  markup = markup.replace(/(?:\.\.\/)?assets\//g, "/site-assets/");
  markup = markup.replace(/\bclass=/g, "className=").replace(/\btabindex=/g, "tabIndex=");
  markup = markup.replace(/\bautoplay\b/g, "autoPlay").replace(/\bplaysinline\b/g, "playsInline");
  markup = markup.replace(/\ballowfullscreen\b/g, "allowFullScreen").replace(/\bframeborder\b/g, "frameBorder");
  markup = markup.replace(/<(img|source|input|br|hr)(\s[^>]*?)?\s*\/?\s*>/gi, (_, tag, attributes = "") => `<${tag}${attributes.trimEnd()} />`);
  return { markup, hasLink };
}

const result = pages.map((name) => {
  const html = fs.readFileSync(path.join(reference, name), "utf8");
  const { markup, hasLink } = convert(html);
  const isAbout = name === "about.html";
  const component = isAbout ? "AboutPage" : name.split("/")[1].replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase()).replace(/\.html$/, "") + "Page";
  const base = isAbout ? ".." : "../..";
  const imports = ["import React from \"react\";", hasLink ? "import { Link } from \"react-router-dom\";" : "", !isAbout ? `import { useWorkflowReveal } from \"${base}/hooks/useWorkflowReveal.js\";` : "", `import \"${base}/styles/reference.ar.css\";`].filter(Boolean).join("\n");
  const source = `${imports}\n\nexport default function ${component}() {\n${!isAbout ? "  useWorkflowReveal();\n" : ""}  return (\n${markup}\n  );\n}\n`;
  const destination = isAbout ? "client/src/pages/AboutPage.jsx" : `client/src/pages/solutions/${name.split("/")[1].replace(/\.html$/, "")}.jsx`;
  return { destination, source };
});

process.stdout.write(JSON.stringify(result));
