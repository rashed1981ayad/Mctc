import React from "react";
import HeaderLocalized from "./HeaderLocalized.jsx";
import { headerEnglishContent } from "../constants/header.en.js";

export default function HeaderEn() {
  return <HeaderLocalized content={headerEnglishContent} />;
}
