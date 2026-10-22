import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ProductCard from "./ProductCard.jsx";
import { validPage, correctedProductPage } from "../services/pagination.js";
import { productBrands, productCategories } from "../constants/products.js";
import { useFeaturedProducts, useProductOptions, useProducts } from "../hooks/useProducts.js";

function ProductsLoadError({ error, content, isFetching, onRetry }) {
  return (
    <div className="products-load-error" role="alert">
      <p>{error?.status ? content.errors.server : content.errors.connection}</p>
      <button type="button" className="primary" onClick={() => onRetry()} disabled={isFetching}>
        {isFetching ? content.errors.retrying : content.errors.retry}
      </button>
    </div>
  );
}

export default function ProductsPageView({ content, LandingHero }) {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const urlSearch = searchParams.get("q") || "";
  const [searchText, setSearchText] = useState(urlSearch);
  const searchTimerRef = useRef(null);
  const currentPage = validPage(searchParams.get("page"));
  const filters = useMemo(() => ({
    q: urlSearch,
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    summary: "true",
    limit: 12,
    page: currentPage
  }), [urlSearch, searchParams, currentPage]);
  const { data: options = { categories: [], brands: [] } } = useProductOptions();
  const { data: featured, isLoading: featuredLoading, isError: featuredError, error: featuredErrorDetails, isFetching: featuredFetching, refetch: refetchFeatured } = useFeaturedProducts();
  const { data, isLoading, isError, error, isFetching, refetch } = useProducts(filters);
  const products = data?.items || [];
  const total = data?.total || 0;
  const totalPages = data?.pages || 1;
  const isListPage = location.pathname === content.routes.list;
  const correctedPage = !isError ? correctedProductPage(currentPage, data) : currentPage;
  const correctingPage = correctedPage !== currentPage;
  useEffect(() => {
    if (!isListPage || isLoading || isError || !data) return;
    const rawPage = searchParams.get("page");
    if (!correctingPage && (rawPage === null || rawPage === String(currentPage))) return;
    const next = new URLSearchParams(searchParams);
    if (correctingPage) {
      queryClient.invalidateQueries({ queryKey: ["products", { ...filters, page: correctedPage }], exact: true });
    }
    if (correctedPage > 1) next.set("page", String(correctedPage));
    else next.delete("page");
    setSearchParams(next, { replace: true });
  }, [isListPage, isLoading, isError, data, searchParams, currentPage, correctedPage, correctingPage, setSearchParams, queryClient, filters]);
  const pageNumbers = useMemo(() => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  useEffect(() => {
    document.documentElement.lang = content.lang;
    document.documentElement.dir = content.direction;
  }, [content.direction, content.lang]);

  useEffect(() => {
    window.clearTimeout(searchTimerRef.current);
    setSearchText(urlSearch);
    return () => window.clearTimeout(searchTimerRef.current);
  }, [urlSearch, location.key]);

  const updateSearch = (value) => {
    setSearchText(value);
    window.clearTimeout(searchTimerRef.current);
    searchTimerRef.current = window.setTimeout(() => {
      setSearchParams((current) => {
        const next = new URLSearchParams(current);
        if (value.trim()) next.set("q", value.trim());
        else next.delete("q");
        next.delete("page");
        return next;
      }, { replace: true });
    }, 450);
  };

  const updateFilter = (key, value) => {
    window.clearTimeout(searchTimerRef.current);
    const next = new URLSearchParams(searchParams);
    if (searchText.trim()) next.set("q", searchText.trim());
    else next.delete("q");
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  };

  const updatePage = (page) => {
    window.clearTimeout(searchTimerRef.current);
    const next = new URLSearchParams(searchParams);
    if (searchText.trim()) next.set("q", searchText.trim());
    else next.delete("q");
    if (page > 1) next.set("page", String(page));
    else next.delete("page");
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isListPage) {
    return (
      <>
        <LandingHero content={content} />

        <section className="section featured-section" dir={content.direction} lang={content.lang}>
          <div className="section-title">
            <span>{content.featured.title}</span>
            <Link to={content.routes.list}>{content.featured.viewAll}</Link>
          </div>
          {featuredLoading ? <p className="notice">{content.featured.loading}</p> : (
            <>
              {featuredError && <ProductsLoadError error={featuredErrorDetails} content={content} isFetching={featuredFetching} onRetry={refetchFeatured} />}
              {featured && <div className="grid">
              {featured.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  detailsLabel={content.card.details}
                  addToCartLabel={content.card.addToCart}
                  cartFullLabel={content.card.cartFull}
                  detailsPath={content.routes.product(product.id)}
                />
              ))}
              </div>}
            </>
          )}
        </section>
      </>
    );
  }

  return (
    <section className="section" id="products-list" dir={content.direction} lang={content.lang}>
      <div className="section-title">
        <span>{content.list.title}</span>
        {data && !correctingPage && <small>{content.list.pageSummary({ currentPage, totalPages, total })}</small>}
      </div>

      <div className="filters">
        <input
          placeholder={content.list.searchPlaceholder}
          value={searchText}
          onChange={(event) => updateSearch(event.target.value)}
        />
        <select value={filters.category} onChange={(event) => updateFilter("category", event.target.value)}>
          <option value="">{content.list.allCategories}</option>
          {[...new Set([...productCategories, ...options.categories])].map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={filters.brand} onChange={(event) => updateFilter("brand", event.target.value)}>
          <option value="">{content.list.allBrands}</option>
          {[...new Set([...productBrands, ...options.brands])].map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>

      {isLoading || correctingPage ? <p className="notice">{content.list.loading}</p> : (
        <>
          {isError && <ProductsLoadError error={error} content={content} isFetching={isFetching} onRetry={refetch} />}
          {products.length ? (
            <div className="grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  detailsLabel={content.card.details}
                  addToCartLabel={content.card.addToCart}
                  cartFullLabel={content.card.cartFull}
                  detailsPath={content.routes.product(product.id)}
                />
              ))}
            </div>
          ) : data && !isError ? (
            <p className="notice">{content.list.empty}</p>
          ) : null}

          {data && totalPages > 1 && (
            <nav className="blog-pager products-pagination" id="products-pager" aria-label={content.list.pagerLabel}>
              <span className="showpageOf">{content.list.pageOf({ currentPage, totalPages })}</span>

              <span className="showpageNum">
                <button type="button" onClick={() => updatePage(currentPage - 1)} disabled={currentPage <= 1 || isFetching} aria-label={content.list.previousLabel}>
                  {content.list.previous}
                </button>
              </span>

              {pageNumbers[0] > 1 && (
                <>
                  <span className="showpageNum">
                    <button type="button" onClick={() => updatePage(1)} disabled={isFetching}>1</button>
                  </span>
                  {pageNumbers[0] > 2 && <span className="showpageEllipsis">...</span>}
                </>
              )}

              {pageNumbers.map((page) => (
                page === currentPage ? (
                  <span className="showpagePoint" key={page}>{page}</span>
                ) : (
                  <span className="showpageNum" key={page}>
                    <button type="button" onClick={() => updatePage(page)} disabled={isFetching}>{page}</button>
                  </span>
                )
              ))}

              {pageNumbers[pageNumbers.length - 1] < totalPages && (
                <>
                  {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="showpageEllipsis">...</span>}
                  <span className="showpageNum">
                    <button type="button" onClick={() => updatePage(totalPages)} disabled={isFetching}>{totalPages}</button>
                  </span>
                </>
              )}

              <span className="showpageNum">
                <button type="button" onClick={() => updatePage(currentPage + 1)} disabled={currentPage >= totalPages || isFetching}>
                  {content.list.next}
                </button>
              </span>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
