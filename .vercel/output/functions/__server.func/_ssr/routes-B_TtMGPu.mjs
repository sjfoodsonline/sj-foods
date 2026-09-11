import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ArrowRight, l as MessageCircle, n as Truck, o as ShieldCheck, u as Clock3 } from "../_libs/lucide-react.mjs";
import { a as PRODUCTS, m as useAllVendors, n as CATEGORIES, o as SiteShell, t as Button } from "./site-shell-DZ6watzH.mjs";
import { t as ProductCard } from "./product-card-KE3s-UQL.mjs";
import { t as Badge } from "./badge-WST92Ocm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B_TtMGPu.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const featured = PRODUCTS.filter((p) => p.featured);
	const vendors = useAllVendors();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-forest-950 text-cream",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/hero.jpg",
					alt: "Mingora produce market",
					className: "absolute inset-0 h-full w-full object-cover opacity-35"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-forest-950/55" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "border-gold-500/40 bg-forest-950/40 text-gold-400",
							children: "Live in Mingora, Swat"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-5 font-display text-4xl leading-tight tracking-tight md:text-5xl",
							children: [
								"Swat’s first",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"online market"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-base leading-relaxed text-cream/80",
							children: "SJ Online — Mingora se few hours mein ghar tak. Cash on Delivery, WhatsApp order, aur sirf owner-approved vendors."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "gold",
								size: "lg",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/market",
									children: ["Shop the market", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "cream",
								size: "lg",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/apply",
									children: "Become a vendor"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4 text-gold-400" }), " Local delivery"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-gold-400" }), " Few hours"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4 text-gold-400" }), " WhatsApp"]
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden self-center rounded-xl border border-cream/15 bg-forest-950/50 p-6 md:block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-gold-400",
								children: "Owner controlled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-2xl",
								children: "One market. One standard."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-cream/75",
								children: "Categories, units (kg, piece, dozen) aur item pricing owner set karta hai. Naye vendors tabhi live hote hain jab aap approve karein."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-start gap-3 text-sm text-cream/80",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-5 shrink-0 text-gold-400" }), "Approved shops only · same units for everyone"]
							})
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl text-forest-900",
					children: "Categories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Owner-defined, same for every shop"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/market",
					className: "text-sm text-forest-800 hover:underline",
					children: "All items"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
				children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/category/$slug",
					params: { slug: c.slug },
					className: "rounded-xl border border-line bg-cream px-4 py-5 transition-colors hover:border-forest-800",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-forest-900",
						children: c.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: c.blurb
					})]
				}, c.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-cream/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-forest-900",
						children: "Top deals"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Standard rates · SJ Foods Mingora"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl text-forest-900",
				children: "How it works"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: [
					{
						n: "01",
						t: "Order",
						d: "Website se add karein ya WhatsApp pe bhej dein. Order realtime list mein save hota hai."
					},
					{
						n: "02",
						t: "Approved vendor",
						d: "Sirf owner-approved shop prepare karti hai — same units, same pricing rules."
					},
					{
						n: "03",
						t: "Delivery",
						d: "Mingora mein few hours. Cash on Delivery ya online payment."
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-line bg-paper p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wider text-gold-600",
							children: s.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-display text-xl text-forest-900",
							children: s.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: s.d
						})
					]
				}, s.n))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-cream/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl text-forest-900",
						children: "Shops"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Har vendor ko apni shop page milti hai. Control owner ke paas."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: vendors.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/shop/$slug",
							params: { slug: v.slug },
							className: "overflow-hidden rounded-xl border border-line bg-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: v.cover,
								alt: "",
								className: "h-36 w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg text-forest-900",
										children: v.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: v.status === "approved" ? "border-forest-100 bg-forest-50 text-forest-800" : "border-gold-100 bg-gold-100 text-forest-900",
										children: v.status === "approved" ? "Live" : "Coming soon"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										v.city,
										" · ",
										v.note
									]
								})]
							})]
						}, v.id))
					})
				]
			})
		})
	] });
}
//#endregion
export { Home as component };
