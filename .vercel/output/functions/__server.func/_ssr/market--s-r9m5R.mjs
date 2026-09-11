import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as PRODUCTS, o as SiteShell } from "./site-shell-DZ6watzH.mjs";
import { t as ProductCard } from "./product-card-KE3s-UQL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market--s-r9m5R.js
var import_jsx_runtime = require_jsx_runtime();
function MarketPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-forest-900",
				children: "Market"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "All items follow owner units and pricing. Mingora delivery."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: PRODUCTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})
		]
	}) });
}
//#endregion
export { MarketPage as component };
