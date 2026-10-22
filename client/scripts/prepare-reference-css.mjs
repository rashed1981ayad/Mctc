import fs from "node:fs";
import postcss from "postcss";

const source = fs.readFileSync(process.argv[2], "utf8");
const root = postcss.parse(source);
const shellOnly = process.argv.includes("--shell");
const prefix = shellOnly ? ".arabic-site" : ".reference-site-ar";
if (shellOnly) {
  const shellSelector = /\.(?:site-header|site-nav|brand(?:-mark|-mega-menu|-mega-inner|-option)?|menu-toggle|nav-dropdown|products-menu|solutions-menu|products-trigger|solutions-trigger|mega-[\w-]+|language-[\w-]+|current-language|site-footer|footer-[\w-]+|social-icons)\b/;
  root.walkRules((rule) => {
    if (rule.parent.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
    const selectors = rule.selectors.filter((selector) => shellSelector.test(selector));
    if (!selectors.length) rule.remove();
    else rule.selectors = selectors;
  });
  root.walkAtRules((rule) => {
    if (!rule.nodes?.length) rule.remove();
  });
}
root.walkRules((rule) => {
  if (rule.parent.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
  rule.selectors = rule.selectors.map((selector) => {
    if ([":root", "html", "body"].includes(selector)) return prefix;
    if (selector.startsWith("html[dir=")) return selector.replace(/^(html\[dir=[^\]]+\])/, `$1 ${prefix}`);
    return `${prefix} ${selector}`;
  });
});

process.stdout.write(root.toString().replaceAll('url("assets/', 'url("/site-assets/'));
