import test from "node:test";
import assert from "node:assert/strict";
import { normalize, shouldPreserveExistingImages } from "../src/routes/products.js";

test("an explicitly empty image list clears all product images", () => {
  const data = normalize({ images: "", image: "/uploads/old.webp" });
  assert.deepEqual(data.images, []);
  assert.equal(data.image, "");
  assert.equal(shouldPreserveExistingImages({ images: "" }, data.images), false);
});

test("omitting image fields preserves images for older update requests", () => {
  const data = normalize({ name: "Example" });
  assert.equal(shouldPreserveExistingImages({ name: "Example" }, data.images), true);
});

test("an absent request body normalizes to missing fields instead of throwing", () => {
  const data = normalize();
  assert.equal(data.name, "");
  assert.deepEqual(data.images, []);
  assert.equal(shouldPreserveExistingImages(undefined, data.images), true);
});

test("new uploaded images replace a cleared image list", () => {
  const body = { images: "" };
  const data = normalize(body, { imageFiles: [{ filename: "new.webp" }] });
  assert.deepEqual(data.images, ["/uploads/new.webp"]);
  assert.equal(data.image, "/uploads/new.webp");
  assert.equal(shouldPreserveExistingImages(body, data.images), false);
});

test("a newly uploaded PDF replaces every existing datasheet link", () => {
  const data = normalize(
    { datasheetUrls: ["/uploads/old.pdf", "https://example.com/other.pdf"] },
    { datasheetFile: [{ filename: "new.pdf" }] }
  );
  assert.deepEqual(data.datasheetUrls, ["/uploads/new.pdf"]);
  assert.equal(data.datasheetUrl, "/uploads/new.pdf");
});

test("existing datasheet links remain when no new PDF is uploaded", () => {
  const data = normalize({ datasheetUrls: ["/uploads/old.pdf", "https://example.com/other.pdf"] });
  assert.deepEqual(data.datasheetUrls, ["/uploads/old.pdf", "https://example.com/other.pdf"]);
  assert.equal(data.datasheetUrl, "/uploads/old.pdf");
});

test("commas inside feature and specification lines are not separators", () => {
  const data = normalize({ features: "Supports IPv4, IPv6\nPoE+", specifications: "Ports: 8, speed: 1G" });
  assert.deepEqual(data.features, ["Supports IPv4, IPv6", "PoE+"]);
  assert.deepEqual(data.specifications, ["Ports: 8, speed: 1G"]);
});

test("single and array URLs retain commas in paths, query strings and fragments", () => {
  const image = "https://cdn.example.com/images/front,back.webp?size=640,480#view,1";
  const pdf = "https://example.com/spec,v2.pdf?models=A,B";
  for (const [images, datasheetUrls] of [[image, pdf], [[image], [pdf]]]) {
    const data = normalize({ images, datasheetUrls });
    assert.deepEqual(data.images, [image]);
    assert.deepEqual(data.datasheetUrls, [pdf]);
  }
  assert.deepEqual(normalize({ image }).images, [image]);
  assert.deepEqual(normalize({ datasheet_url: pdf }).datasheetUrls, [pdf]);
  assert.deepEqual(normalize({ images: [image, "/uploads/local.webp"] }).images, [image, "/uploads/local.webp"]);
  assert.deepEqual(normalize({ images: "https://example.com/a%2Cb.webp" }).images, ["https://example.com/a%2Cb.webp"]);
});

test("malformed or non-HTTP links are rejected rather than split or coerced", () => {
  for (const value of ["javascript:alert(1)", "data:text/html,test", "//other.example/a.webp", "not a URL", "https://", "https://example.com/a\nhttps://example.com/b", { url: "https://example.com/a" }, ["https://example.com/a", 123]]) {
    assert.throws(() => normalize({ images: value }), error => error.status === 400);
    assert.throws(() => normalize({ datasheetUrls: value }), error => error.status === 400);
  }
});
