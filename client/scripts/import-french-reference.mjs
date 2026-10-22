// Mechanical one-time import of the supplied French reference pages.
// Run from client/: node scripts/import-french-reference.mjs <source-directory>
import fs from "node:fs";
import path from "node:path";

const source = process.argv[2];
if (!source || !fs.existsSync(path.join(source, "about.html"))) {
  throw new Error("Pass the French reference directory containing about.html.");
}

const root = process.cwd();
const destination = path.join(root, "src/pages/fr");
const css = fs.readFileSync(path.join(root, "src/styles/reference.en.css"), "utf8")
  .replaceAll(".reference-site-en", ".reference-site-fr")
  .replaceAll('url("assets/world-map.webp")', 'url("/site-assets/world-map.webp")');
fs.writeFileSync(path.join(root, "src/styles/reference.fr.css"), css);

function toJsx(html) {
  const match = html.match(/<main\b([^>]*)>([\s\S]*?)<\/main>/i);
  if (!match) throw new Error("No main element found in reference page.");
  const mainClass = match[1].match(/class="([^"]+)"/)?.[1] || "";
  const mainId = match[1].match(/id="([^"]+)"/)?.[1];
  let inner = match[2]
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\bclass=/g, "className=")
    .replace(/\bfor=/g, "htmlFor=")
    .replace(/\btabindex=/g, "tabIndex=")
    .replace(/\bframeborder=/g, "frameBorder=")
    .replace(/\ballowfullscreen(?=[\s>])/g, "allowFullScreen")
    .replace(/\bplaysinline(?=[\s>])/g, "playsInline")
    .replace(/\bautoplay(?=[\s>])/g, "autoPlay")
    .replace(/\bpreload=/g, "preload=")
    .replace(/\b(src|poster)="(?:\.\.\/)?assets\//g, '$1="/site-assets/')
    .replace(/<a\b/g, "<FrenchLink")
    .replace(/<\/a>/g, "</FrenchLink>")
    .replace(/<(img|source|br|hr|input)\b([^>]*?)\s*\/?>/g, (_all, tag, attrs) => `<${tag}${attrs} />`);
  const id = mainId ? ` id="${mainId}"` : "";
  return `<div${id} className="${mainClass}" lang="fr" dir="ltr">${inner}</div>`;
}

function savePage(input, output, component, isSolution) {
  const html = fs.readFileSync(input, "utf8");
  const jsx = toJsx(html);
  const cssImport = isSolution ? "../../../styles/reference.fr.css" : "../../styles/reference.fr.css";
  const linkImport = isSolution ? "../../../components/FrenchLink.jsx" : "../../components/FrenchLink.jsx";
  const hookImport = isSolution && jsx.includes("enterprise-workflow")
    ? 'import { useWorkflowReveal } from "../../../hooks/useWorkflowReveal.js";\n'
    : "";
  const hookCall = hookImport ? '  useWorkflowReveal(".reference-site-fr");\n' : "";
  const content = `import React from "react";\nimport FrenchLink from "${linkImport}";\n${hookImport}import "${cssImport}";\n\nexport default function ${component}() {\n${hookCall}  return (\n    ${jsx}\n  );\n}\n`;
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, content);
}

savePage(path.join(source, "about.html"), path.join(destination, "AboutPageFr.jsx"), "AboutPageFr", false);
for (const file of fs.readdirSync(path.join(source, "solutions")).filter((name) => name.endsWith(".html"))) {
  const slug = path.basename(file, ".html");
  const component = `Solution${slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join("")}Fr`;
  savePage(path.join(source, "solutions", file), path.join(destination, "solutions", `${slug}.jsx`), component, true);
}
