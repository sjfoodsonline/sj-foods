import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as getCategory, f as productsByCategory, o as SiteShell } from "./site-shell-DZ6watzH.mjs";
import { r as Route$1 } from "./router-D97QWt_F.mjs";
import { t as ProductCard } from "./product-card-KE3s-UQL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-9N6WjTDv.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route$1.useParams();
	const category = getCategory(slug);
	const items = productsByCategory(slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm text-muted hover:text-forest-900",
				children: "Home"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-forest-900",
				children: category?.name ?? "Category"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: category?.blurb
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: "Is category mein abhi items nahi hain."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})
		]
	}) });
}
//#endregion
export { CategoryPage as component };
