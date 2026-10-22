import React from "react";
import ContactPageView from "../../components/ContactPageView.jsx";
import { contactEnglishContent } from "../../constants/contact.en.js";

export default function ContactPageEn() {
  return <ContactPageView content={contactEnglishContent} />;
}
