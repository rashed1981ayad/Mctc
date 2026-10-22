import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { productBrands, productCategories } from "../constants/products.js";
import { getLocalizedPath } from "../services/localizedPath.js";
import CartLink from "./CartLink.jsx";

export default function HeaderLocalized({ content }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [productsMenuTab, setProductsMenuTab] = useState("brands");
  const [solutionsMenuOpen, setSolutionsMenuOpen] = useState(false);
  const [solutionsMenuTab, setSolutionsMenuTab] = useState("technology");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: content.language,
    direction: "ltr",
    label: content.language === "fr" ? "Français" : "English"
  });
  const headerRef = useRef(null);
  const productsCloseTimer = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const languageOptions = [
    { code: "ar", direction: "rtl", label: "العربي" },
    { code: "en", direction: "ltr", label: "English" },
    { code: "fr", direction: "ltr", label: "Français" }
  ];

  const isSmallNav = () => window.matchMedia("(max-width: 1024px)").matches;
  const clearProductsCloseTimer = () => {
    if (productsCloseTimer.current) {
      clearTimeout(productsCloseTimer.current);
      productsCloseTimer.current = null;
    }
  };
  const closeMenu = () => {
    clearProductsCloseTimer();
    setMenuOpen(false);
    setProductsMenuOpen(false);
    setSolutionsMenuOpen(false);
    setLanguageOpen(false);
  };
  const toggleMainMenu = () => {
    setMenuOpen((open) => {
      if (open) {
        setProductsMenuOpen(false);
        setSolutionsMenuOpen(false);
        setLanguageOpen(false);
      }
      return !open;
    });
  };
  const handleProductsClick = () => {
    clearProductsCloseTimer();
    setLanguageOpen(false);
    setSolutionsMenuOpen(false);
    setProductsMenuOpen((open) => isSmallNav() ? !open : true);
    setProductsMenuTab("brands");
  };
  const openProductsMenu = () => {
    if (!isSmallNav()) {
      clearProductsCloseTimer();
      setLanguageOpen(false);
      setSolutionsMenuOpen(false);
      setProductsMenuOpen(true);
      setProductsMenuTab((current) => current || "brands");
    }
  };
  const toggleLanguage = () => {
    clearProductsCloseTimer();
    setProductsMenuOpen(false);
    setSolutionsMenuOpen(false);
    setLanguageOpen((open) => !open);
  };
  const handleSolutionsClick = () => {
    clearProductsCloseTimer();
    setProductsMenuOpen(false);
    setLanguageOpen(false);
    setSolutionsMenuOpen((open) => isSmallNav() ? !open : true);
  };
  const openSolutionsMenu = () => {
    if (!isSmallNav()) {
      clearProductsCloseTimer();
      setProductsMenuOpen(false);
      setLanguageOpen(false);
      setSolutionsMenuOpen(true);
    }
  };
  const scheduleSolutionsMenuClose = () => {
    if (!isSmallNav()) {
      clearProductsCloseTimer();
      productsCloseTimer.current = setTimeout(() => {
        setSolutionsMenuOpen(false);
        productsCloseTimer.current = null;
      }, 220);
    }
  };
  const selectLanguage = (option) => {
    setSelectedLanguage(option);
    document.documentElement.lang = option.code;
    document.documentElement.dir = option.direction;
    localStorage.setItem("selected-language", option.code);
    localStorage.setItem("selected-direction", option.direction);
    localStorage.setItem("selected-language-label", option.label);
    setLanguageOpen(false);
    setMenuOpen(false);

    const localizedPath = getLocalizedPath(location.pathname, location.search, option.code);
    if (localizedPath !== `${location.pathname}${location.search}`) {
      navigate(localizedPath);
    }
  };
  const scheduleProductsMenuClose = () => {
    if (!isSmallNav()) {
      clearProductsCloseTimer();
      productsCloseTimer.current = setTimeout(() => {
        setProductsMenuOpen(false);
        productsCloseTimer.current = null;
      }, 220);
    }
  };
  const goTo = (to) => {
    closeMenu();
    navigate(to);
  };
  const showBrands = productsMenuTab === "brands";
  const showCategories = productsMenuTab === "categories";

  useEffect(() => () => {
    clearProductsCloseTimer();
  }, []);

  useEffect(() => {
    clearProductsCloseTimer();
    setMenuOpen(false);
    setProductsMenuOpen(false);
    setSolutionsMenuOpen(false);
    setLanguageOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.documentElement.lang = content.language;
    document.documentElement.dir = "ltr";
    localStorage.setItem("selected-language", content.language);
    localStorage.setItem("selected-direction", "ltr");
    localStorage.setItem("selected-language-label", content.language === "fr" ? "Français" : "English");
  }, [content.language]);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (headerRef.current?.contains(event.target)) return;
      clearProductsCloseTimer();
      setProductsMenuOpen(false);
      setSolutionsMenuOpen(false);
      setLanguageOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;
      clearProductsCloseTimer();
      setProductsMenuOpen(false);
      setSolutionsMenuOpen(false);
      setLanguageOpen(false);
      setMenuOpen(false);
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="site-header site-header-ltr" ref={headerRef} dir="ltr" lang={content.language}>
      <Link className="brand" to={`/${content.language}`}>
        <img className="brand-logo" src="/site-assets/logo-en.webp" alt="Almutaqaddim for IT Solutions" />
      </Link>
      <CartLink language={content.language} />
      <button
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        type="button"
        aria-label={menuOpen ? content.closeMenu : content.openMenu}
        aria-expanded={menuOpen}
        onClick={toggleMainMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
        <Link to={`/${content.language}`} onClick={closeMenu}>{content.home}</Link>
        <div
          className={`nav-dropdown products-menu ${productsMenuOpen ? "open" : ""}`}
          onMouseEnter={openProductsMenu}
          onMouseLeave={scheduleProductsMenuClose}
        >
          <button
            className="products-trigger"
            type="button"
            aria-expanded={productsMenuOpen}
            onClick={handleProductsClick}
          >
            {content.products}
          </button>
          <div className="brand-mega-menu" aria-label={content.productOptions}>
            <div className="brand-mega-inner">
              <div className="mega-tabs" aria-label={content.productMenuType}>
                <button
                  className={`mega-tab ${showBrands ? "active" : ""}`}
                  type="button"
                  onClick={() => setProductsMenuTab("brands")}
                >
                  {content.brands}
                </button>
                <button
                  className={`mega-tab ${showCategories ? "active" : ""}`}
                  type="button"
                  onClick={() => setProductsMenuTab("categories")}
                >
                  {content.categories}
                </button>
                <button className="mega-tab-link" type="button" onClick={() => goTo(`/${content.language}/products`)}>
                  {content.allProducts}
                </button>
              </div>

              <div className="mega-content">
                {showBrands && (
                  <div className="mega-section">
                    <h3>{content.brands}</h3>
                    <div className="mega-options">
                      {productBrands.map((brand) => (
                        <button className="brand-option" type="button" key={brand} onClick={() => goTo(`/${content.language}/products-list?brand=${encodeURIComponent(brand)}`)}>
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {showCategories && (
                  <div className="mega-section">
                    <h3>{content.categories}</h3>
                    <div className="mega-options">
                      {productCategories.map((category) => (
                        <button className="brand-option" type="button" key={category} onClick={() => goTo(`/${content.language}/products-list?category=${encodeURIComponent(category)}`)}>
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {content.solutions && (
          <div className={`nav-dropdown solutions-menu ${solutionsMenuOpen ? "open" : ""}`} onMouseEnter={openSolutionsMenu} onMouseLeave={scheduleSolutionsMenuClose}>
            <button className="solutions-trigger" type="button" aria-expanded={solutionsMenuOpen} aria-current={location.pathname.startsWith(`/${content.language}/solutions/`) ? "page" : undefined} onClick={handleSolutionsClick}>{content.solutions}</button>
            <div className="brand-mega-menu" aria-label={content.solutionOptions}>
              <div className="brand-mega-inner">
                <div className="mega-tabs" aria-label={content.solutionTypes}>
                  <button className={`mega-tab ${solutionsMenuTab === "technology" ? "active" : ""}`} type="button" onClick={() => setSolutionsMenuTab("technology")}>{content.solutionTechnology || "By Technology"}</button>
                  <button className={`mega-tab ${solutionsMenuTab === "industry" ? "active" : ""}`} type="button" onClick={() => setSolutionsMenuTab("industry")}>{content.solutionIndustry || "By Industrial"}</button>
                </div>
                <div className="mega-content">
                  <div className="mega-section">
                    <h3>{solutionsMenuTab === "technology" ? content.solutionTechnology || "By Technology" : content.solutionIndustry || "By Industrial"}</h3>
                    <div className="mega-options">
                      {(solutionsMenuTab === "technology" ? content.solutionsByTechnology : content.solutionsByIndustry).map((item) => (
                        <Link className="brand-option" key={item.slug} to={`/${content.language}/solutions/${item.slug}`} onMouseEnter={() => content.language === "fr" ? import("../pages/fr/SolutionRouteFr.jsx").then(({ preloadFrenchSolution }) => preloadFrenchSolution(item.slug)) : import("../pages/en/SolutionRouteEn.jsx").then(({ preloadEnglishSolution }) => preloadEnglishSolution(item.slug))} onFocus={() => content.language === "fr" ? import("../pages/fr/SolutionRouteFr.jsx").then(({ preloadFrenchSolution }) => preloadFrenchSolution(item.slug)) : import("../pages/en/SolutionRouteEn.jsx").then(({ preloadEnglishSolution }) => preloadEnglishSolution(item.slug))} onClick={closeMenu}>{item.label}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {content.about && <Link to={`/${content.language}/about`} onClick={closeMenu} aria-current={location.pathname === `/${content.language}/about` ? "page" : undefined}>{content.about}</Link>}
        <Link to={`/${content.language}/contact`} onClick={closeMenu}>{content.contact}</Link>
        <div className={`language-switcher ${languageOpen ? "open" : ""}`}>
          <button
            className="language-trigger"
            type="button"
            aria-expanded={languageOpen}
            onClick={toggleLanguage}
          >
            <i className="fa-solid fa-globe" aria-hidden="true"></i>
            <span className="current-language">{selectedLanguage.label}</span>
            <i className="fa-solid fa-chevron-down language-arrow" aria-hidden="true"></i>
          </button>

          <div className="language-panel">
            {languageOptions.map((option) => (
              <button
                className={`language-option ${selectedLanguage.code === option.code ? "active" : ""}`}
                type="button"
                key={option.code}
                onClick={() => selectLanguage(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
