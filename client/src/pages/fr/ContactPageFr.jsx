import React from "react";
import ContactPageView from "../../components/ContactPageView.jsx";
import { contactFrenchContent } from "../../constants/contact.fr.js";

export default function ContactPageFr() {
  return <ContactPageView content={contactFrenchContent} />;
}
