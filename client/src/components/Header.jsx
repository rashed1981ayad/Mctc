import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { productBrands, productCategories } from "../constants/products.js";
import { getLocalizedPath } from "../services/localizedPath.js";
import { solutionsByIndustry, solutionsByTechnology } from "../constants/solutions.shared.js";
import { preloadSolution } from "../pages/solutions/SolutionRoute.jsx";
import CartLink from "./CartLink.jsx";
import "../styles/header-footer.ar.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [productsMenuTab, setProductsMenuTab] = useState("brands");
  const [solutionsMenuOpen, setSolutionsMenuOpen] = useState(false);
  const [solutionsMenuTab, setSolutionsMenuTab] = useState("technology");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "ar",
    direction: "rtl",
    label: "العربي"
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
    setLanguageOpen(false);
    setProductsMenuOpen(false);
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
      productsCloseTimer.current = setTimeout(() => setSolutionsMenuOpen(false), 220);
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
    const savedLanguage = localStorage.getItem("selected-language");
    const savedDirection = localStorage.getItem("selected-direction");
    const savedLabel = localStorage.getItem("selected-language-label");
    const savedOption = languageOptions.find((option) => option.code === savedLanguage);

    if (savedOption && savedDirection) {
      const option = { ...savedOption, direction: savedDirection, label: savedLabel || savedOption.label };
      setSelectedLanguage(option);
      document.documentElement.lang = option.code;
      document.documentElement.dir = option.direction;
    }
  }, []);

  useEffect(() => {
    const routeLanguage = location.pathname === "/fr" || location.pathname.startsWith("/fr/")
      ? languageOptions.find((option) => option.code === "fr")
      : location.pathname === "/en" || location.pathname.startsWith("/en/")
      ? languageOptions.find((option) => option.code === "en")
      : languageOptions.find((option) => option.code === "ar");

    if (!routeLanguage) return;

    setSelectedLanguage(routeLanguage);
    document.documentElement.lang = routeLanguage.code;
    document.documentElement.dir = routeLanguage.direction;
    localStorage.setItem("selected-language", routeLanguage.code);
    localStorage.setItem("selected-direction", routeLanguage.direction);
    localStorage.setItem("selected-language-label", routeLanguage.label);
  }, [location.pathname]);

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
    <header className={`site-header ${menuOpen ? "nav-open" : ""}`} ref={headerRef}>
      <Link className="brand" to="/">
        <img className="brand-logo" src="/site-assets/logo-ar.webp" alt="المتقدم لحلول تقنية المعلومات" />
      </Link>
      <CartLink language="ar" />
      <button
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        type="button"
        aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
        aria-expanded={menuOpen}
        onClick={toggleMainMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="التنقل الرئيسي">
        <Link to="/" onClick={closeMenu} aria-current={location.pathname === "/" ? "page" : undefined}>الرئيسية</Link>
        <div
          className={`nav-dropdown products-menu ${productsMenuOpen ? "open" : ""}`}
          onMouseEnter={openProductsMenu}
          onMouseLeave={scheduleProductsMenuClose}
        >
          <button
            className="products-trigger"
            type="button"
            aria-expanded={productsMenuOpen}
            aria-current={location.pathname.startsWith("/product") ? "page" : undefined}
            onClick={handleProductsClick}
          >
            المنتجات
          </button>
          <div className="brand-mega-menu" aria-label="خيارات المنتجات">
            <div className="brand-mega-inner">
              <div className="mega-tabs" aria-label="نوع قائمة المنتجات">
                <button
                  className={`mega-tab ${showBrands ? "active" : ""}`}
                  type="button"
                  onClick={() => setProductsMenuTab("brands")}
                >
                  الشركات
                </button>
                <button
                  className={`mega-tab ${showCategories ? "active" : ""}`}
                  type="button"
                  onClick={() => setProductsMenuTab("categories")}
                >
                  الأقسام
                </button>
                <button className="mega-tab-link" type="button" onClick={() => goTo("/products")}>
                  كل المنتجات
                </button>
              </div>

              <div className="mega-content">
                {showBrands && (
                  <div className="mega-section">
                    <h3>الشركات</h3>
                    <div className="mega-options">
                      {productBrands.map((brand) => (
                        <button className="brand-option" type="button" key={brand} onClick={() => goTo(`/products-list?brand=${encodeURIComponent(brand)}`)}>
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {showCategories && (
                  <div className="mega-section">
                    <h3>الأقسام</h3>
                    <div className="mega-options">
                      {productCategories.map((category) => (
                        <button className="brand-option" type="button" key={category} onClick={() => goTo(`/products-list?category=${encodeURIComponent(category)}`)}>
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
        <div className={`nav-dropdown solutions-menu ${solutionsMenuOpen ? "open" : ""}`} onMouseEnter={openSolutionsMenu} onMouseLeave={scheduleSolutionsMenuClose}>
          <button className="solutions-trigger" type="button" aria-expanded={solutionsMenuOpen} aria-current={location.pathname.startsWith("/solutions/") ? "page" : undefined} onClick={handleSolutionsClick}>الحلول</button>
          <div className="brand-mega-menu" aria-label="خيارات الحلول">
            <div className="brand-mega-inner">
              <div className="mega-tabs" dir="ltr" aria-label="تصنيفات الحلول">
                <button className={`mega-tab ${solutionsMenuTab === "technology" ? "active" : ""}`} type="button" onClick={() => setSolutionsMenuTab("technology")}>By Technology</button>
                <button className={`mega-tab ${solutionsMenuTab === "industry" ? "active" : ""}`} type="button" onClick={() => setSolutionsMenuTab("industry")}>By Industrial</button>
              </div>
              <div className="mega-content" dir="ltr">
                <div className="mega-section">
                  <h3>{solutionsMenuTab === "technology" ? "By Technology" : "By Industrial"}</h3>
                  <div className="mega-options" dir="ltr">
                    {(solutionsMenuTab === "technology" ? solutionsByTechnology : solutionsByIndustry).map((item) => (
                      <Link className="brand-option" key={item.slug} to={`/solutions/${item.slug}`} onMouseEnter={() => preloadSolution(item.slug)} onFocus={() => preloadSolution(item.slug)} onClick={closeMenu}>{item.label}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/about" onClick={closeMenu} aria-current={location.pathname === "/about" ? "page" : undefined}>حول الشركة</Link>
        <Link to="/contact" onClick={closeMenu} aria-current={location.pathname === "/contact" ? "page" : undefined}>تواصل معنا</Link>
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

