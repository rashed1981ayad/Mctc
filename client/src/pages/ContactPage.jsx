import React from "react";
import ContactPageView from "../components/ContactPageView.jsx";
import { contactArabicContent } from "../constants/contact.ar.js";

export default function ContactPage() {
  return <ContactPageView content={contactArabicContent} />;
}
