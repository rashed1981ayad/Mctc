import React from "react";
import { Link } from "react-router-dom";

export default function FrenchLink({ href, children, ...props }) {
  if (href === "#contact") return <Link to="/fr/contact" {...props}>{children}</Link>;
  if (href?.startsWith("#") || /^(?:https?:|mailto:|tel:)/i.test(href || "")) {
    return <a href={href} {...props}>{children}</a>;
  }
  const solution = href?.match(/(?:^|\/)solutions\/([\w-]+)\.html$/) || href?.match(/^([\w-]+)\.html$/);
  if (solution) return <Link to={`/fr/solutions/${solution[1]}`} {...props}>{children}</Link>;
  if (href?.endsWith("about.html")) return <Link to="/fr/about" {...props}>{children}</Link>;
  if (href?.includes("index.html")) return <Link to="/fr" {...props}>{children}</Link>;
  return <a href={href} {...props}>{children}</a>;
}
