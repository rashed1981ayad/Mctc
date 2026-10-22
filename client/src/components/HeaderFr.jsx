import React from "react";
import HeaderLocalized from "./HeaderLocalized.jsx";
import { headerFrenchContent } from "../constants/header.fr.js";

export default function HeaderFr() {
  return <HeaderLocalized content={headerFrenchContent} />;
}
