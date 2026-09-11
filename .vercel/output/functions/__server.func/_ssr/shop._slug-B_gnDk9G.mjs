import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as useAllVendors, o as SiteShell, p as productsByVendor } from "./site-shell-DZ6watzH.mjs";
import { n as Route } from "./router-D97QWt_F.mjs";
import { t as ProductCard } from "./product-card-KE3s-UQL.mjs";
import { t as Badge } from "./badge-WST92Ocm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop._slug-B_gnDk9G.js
var import_jsx_runtime = require_jsx_runtime();
function ShopPage() {
	const { slug } = Route.useParams();
	const vendor = useAllVendors().find((v) => v.slug === slug);
	const items = vendor ? productsByVendor(vendor.id) : [];
	if (!vendor) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl text-forest-900",
			children: "Shop not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-4 inline-block text-sm text-forest-800 underline",
			children: "Back home"
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-48 overflow-hidden bg-forest-950 md:h-64",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: vendor.cover,
				alt: "",
				className: "h-full w-full object-cover opacity-50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-forest-950/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 py-6 text-cream",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "border-gold-500/40 bg-forest-950/50 text-gold-400",
						children: vendor.status === "approved" ? "Live shop" : "Coming soon"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl",
						children: vendor.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-cream/80",
						children: [
							vendor.city,
							" · ",
							vendor.note
						]
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: vendor.status !== "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-xl border border-gold-100 bg-gold-100/60 p-6 text-sm text-forest-900",
			children: "Yeh shop owner approval ke baad live hogi. Same categories, units aur pricing rules apply honge."
		}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Is shop pe abhi products list nahi hue."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
		})
	})] });
}
//#endregion
export { ShopPage as component };
