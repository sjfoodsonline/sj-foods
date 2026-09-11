import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as ShoppingBag, c as Minus, i as Trash2, s as Plus, t as X } from "../_libs/lucide-react.mjs";
import { a as DialogPortal, i as DialogOverlay, l as Slot, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-DZ6watzH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line bg-forest-950 text-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "",
						className: "size-9 rounded-full bg-paper object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg",
						children: "SJ Online"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-xs text-sm text-cream/70",
					children: "Swat ka pehla online market. Mingora local delivery, Cash on Delivery, WhatsApp orders. Categories, units aur pricing owner set karta hai."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-medium",
					children: "Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-cream/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/market",
							className: "hover:text-cream",
							children: "Market"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/apply",
							className: "hover:text-cream",
							children: "Become a vendor"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/owner",
							className: "hover:text-cream",
							children: "Owner desk"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-medium",
					children: "Service"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-cream/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Mingora, Swat" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Delivery in a few hours" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cash on Delivery + online later" })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border-t border-cream/10 py-4 text-center text-xs text-cream/50",
			children: "© 2026 SJ Online · Mingora Swat"
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatPkr(amount) {
	return `Rs. ${amount.toLocaleString("en-PK")}`;
}
function waOrderUrl(phone, message) {
	return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500", {
	variants: {
		variant: {
			default: "bg-forest-900 text-cream hover:bg-forest-800",
			gold: "bg-gold-500 text-forest-950 hover:bg-gold-600",
			outline: "border border-forest-800 bg-transparent text-forest-900 hover:bg-forest-50",
			ghost: "text-forest-900 hover:bg-forest-50",
			cream: "bg-cream text-forest-950 hover:bg-gold-100"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-ink", className),
		...props
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ children, className, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-paper shadow-xl outline-none", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-line px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-lg text-forest-900",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "inline-flex size-10 items-center justify-center rounded-md text-muted hover:bg-cream",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		}), children]
	})] });
}
function useHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setHydrated(true), []);
	return hydrated;
}
var UNITS = [
	"kg",
	"piece",
	"dozen",
	"litre",
	"pack"
];
var CATEGORIES = [
	{
		slug: "vegetables",
		name: "Fresh Vegetables",
		blurb: "Rozana sabzi, owner units"
	},
	{
		slug: "fruits",
		name: "Fruits",
		blurb: "Seasonal phal"
	},
	{
		slug: "dairy",
		name: "Dairy",
		blurb: "Doodh, dahi, makhan"
	},
	{
		slug: "meat",
		name: "Meat",
		blurb: "Chicken & mutton"
	},
	{
		slug: "grocery",
		name: "Grocery",
		blurb: "Rice, daal, oil"
	},
	{
		slug: "household",
		name: "Household",
		blurb: "Rozmarra items"
	}
];
var VENDORS = [{
	id: "sj-foods",
	slug: "sj-foods",
	name: "SJ Foods",
	city: "Mingora",
	status: "approved",
	cover: "/hero.jpg",
	note: "Owner shop — standard pricing"
}, {
	id: "rhz-mart",
	slug: "rhz-mart",
	name: "RHZ Mart",
	city: "Mingora",
	status: "coming-soon",
	cover: "/products/rice.jpg",
	note: "Waiting for owner approval"
}];
var PRODUCTS = [
	{
		id: "lemon",
		name: "Lemon",
		roman: "Lemon",
		category: "fruits",
		vendorId: "sj-foods",
		unit: "kg",
		price: 200,
		image: "/products/lemon.jpg",
		featured: true
	},
	{
		id: "tori",
		name: "Tori (Okra)",
		roman: "Tori / Bhindi",
		category: "vegetables",
		vendorId: "sj-foods",
		unit: "kg",
		price: 300,
		image: "/products/okra.jpg",
		featured: true
	},
	{
		id: "tomato",
		name: "Tomato",
		roman: "Tamatar",
		category: "vegetables",
		vendorId: "sj-foods",
		unit: "kg",
		price: 180,
		image: "/products/tomato.jpg",
		featured: true
	},
	{
		id: "apple",
		name: "Apple",
		roman: "Saib",
		category: "fruits",
		vendorId: "sj-foods",
		unit: "kg",
		price: 350,
		image: "/products/apple.jpg"
	},
	{
		id: "greens",
		name: "Leafy Greens",
		roman: "Saag / Palak",
		category: "vegetables",
		vendorId: "sj-foods",
		unit: "kg",
		price: 120,
		image: "/products/greens.jpg"
	},
	{
		id: "milk",
		name: "Fresh Milk",
		roman: "Taza doodh",
		category: "dairy",
		vendorId: "sj-foods",
		unit: "litre",
		price: 220,
		image: "/products/dairy.jpg"
	},
	{
		id: "chicken",
		name: "Chicken",
		roman: "Murghi",
		category: "meat",
		vendorId: "sj-foods",
		unit: "kg",
		price: 650,
		image: "/products/chicken.jpg"
	},
	{
		id: "rice",
		name: "Basmati Rice",
		roman: "Basmati chawal",
		category: "grocery",
		vendorId: "sj-foods",
		unit: "kg",
		price: 280,
		image: "/products/rice.jpg"
	}
];
var DEFAULT_WHATSAPP = "923001234567";
function productsByCategory(slug) {
	return PRODUCTS.filter((p) => p.category === slug);
}
function productsByVendor(vendorId) {
	return PRODUCTS.filter((p) => p.vendorId === vendorId);
}
function getCategory(slug) {
	return CATEGORIES.find((c) => c.slug === slug);
}
var useCart = create()(persist((set, get) => ({
	lines: [],
	add: (productId, qty = 1) => {
		if (get().lines.find((l) => l.productId === productId)) set({ lines: get().lines.map((l) => l.productId === productId ? {
			...l,
			qty: l.qty + qty
		} : l) });
		else set({ lines: [...get().lines, {
			productId,
			qty
		}] });
	},
	setQty: (productId, qty) => {
		if (qty <= 0) {
			set({ lines: get().lines.filter((l) => l.productId !== productId) });
			return;
		}
		set({ lines: get().lines.map((l) => l.productId === productId ? {
			...l,
			qty
		} : l) });
	},
	remove: (productId) => set({ lines: get().lines.filter((l) => l.productId !== productId) }),
	clear: () => set({ lines: [] })
}), { name: "sj-online-cart" }));
function resolveCart(lines) {
	return lines.map((line) => {
		const product = PRODUCTS.find((p) => p.id === line.productId);
		if (!product) return null;
		return {
			product,
			qty: line.qty,
			lineTotal: product.price * line.qty,
			unit: product.unit
		};
	}).filter((x) => x !== null);
}
function cartCount(lines) {
	return lines.reduce((n, l) => n + l.qty, 0);
}
function cartTotal(lines) {
	return resolveCart(lines).reduce((n, l) => n + l.lineTotal, 0);
}
var useMarket = create()(persist((set, get) => ({
	whatsapp: DEFAULT_WHATSAPP,
	applications: [],
	extraVendors: [],
	setWhatsapp: (phone) => set({ whatsapp: phone }),
	apply: (data) => {
		const id = `app-${Date.now()}`;
		set({ applications: [{
			...data,
			id,
			status: "pending",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}, ...get().applications] });
	},
	decide: (id, status) => {
		const app = get().applications.find((a) => a.id === id);
		if (!app) return;
		const extraVendors = status === "approved" ? [...get().extraVendors, {
			id,
			slug: id,
			name: app.name,
			city: app.city || "Mingora",
			status: "approved",
			cover: "/hero.jpg",
			note: "Approved by owner"
		}] : get().extraVendors;
		set({
			applications: get().applications.map((a) => a.id === id ? {
				...a,
				status
			} : a),
			extraVendors
		});
	}
}), { name: "sj-online-market" }));
function useAllVendors() {
	const extra = useMarket((s) => s.extraVendors);
	const hydrated = useHydrated();
	const map = /* @__PURE__ */ new Map();
	for (const v of VENDORS) map.set(v.id, v);
	if (hydrated) for (const v of extra) map.set(v.id, v);
	return [...map.values()];
}
function CartSheet() {
	const { lines, setQty, remove, clear } = useCart();
	const whatsapp = useMarket((s) => s.whatsapp);
	const hydrated = useHydrated();
	const count = hydrated ? cartCount(lines) : 0;
	const items = hydrated ? resolveCart(lines) : [];
	const total = cartTotal(lines);
	const [name, setName] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	function sendWhatsApp() {
		const list = items.map((l) => `• ${l.product.name} x ${l.qty} ${l.unit} = ${formatPkr(l.lineTotal)}`).join("\n");
		const message = `SJ Online Order (Mingora)\nName: ${name || "Customer"}\nAddress: ${address || "Mingora"}\n\n${list}\n\nTotal: ${formatPkr(total)}\nPayment: Cash on Delivery`;
		window.open(waOrderUrl(whatsapp, message), "_blank", "noopener,noreferrer");
		clear();
		setOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "gold",
				size: "sm",
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4" }),
					"Cart",
					count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -right-1 -top-1 inline-flex size-5 items-center justify-center rounded-full bg-forest-950 text-[10px] font-semibold text-cream tabular-nums",
						children: count
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			title: "Your order",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-4 overflow-y-auto px-5 py-4",
					children: [items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Cart khali hai. Market se item add karein."
					}) : items.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: line.product.image,
							alt: "",
							className: "size-16 rounded-md object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-forest-900",
									children: line.product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted tabular-nums",
									children: [
										formatPkr(line.product.price),
										" / ",
										line.unit
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "outline",
											className: "size-8",
											onClick: () => setQty(line.product.id, line.qty - 1),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-6 text-center text-sm tabular-nums",
											children: line.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "outline",
											className: "size-8",
											onClick: () => setQty(line.product.id, line.qty + 1),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "ml-auto text-muted hover:text-forest-900",
											onClick: () => remove(line.product.id),
											"aria-label": "Remove",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})
									]
								})
							]
						})]
					}, line.product.id)), items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cust-name",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cust-name",
							className: "mt-1",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "Aapka naam"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cust-addr",
							children: "Delivery address (Mingora)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cust-addr",
							className: "mt-1",
							value: address,
							onChange: (e) => setAddress(e.target.value),
							placeholder: "Mohalla / street"
						})] })]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold tabular-nums text-forest-900",
								children: formatPkr(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "gold",
							className: "w-full",
							disabled: items.length === 0,
							onClick: sendWhatsApp,
							children: "Send order on WhatsApp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-xs text-muted",
							children: "Cash on Delivery · few hours in Mingora"
						})
					]
				})]
			})
		})]
	});
}
function SiteHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "",
						className: "size-10 rounded-full bg-paper object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-base text-forest-900",
							children: "SJ Online"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[11px] text-muted",
							children: "Mingora, Swat"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-6 text-sm text-muted md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-forest-900",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/market",
							className: "hover:text-forest-900",
							children: "Market"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/apply",
							className: "hover:text-forest-900",
							children: "Become vendor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/owner",
							className: "hover:text-forest-900",
							children: "Owner"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartSheet, {})
			]
		})
	});
}
function SiteShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-paper text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { PRODUCTS as a, VENDORS as c, getCategory as d, productsByCategory as f, useMarket as g, useCart as h, Label as i, cn as l, useAllVendors as m, CATEGORIES as n, SiteShell as o, productsByVendor as p, Input as r, UNITS as s, Button as t, formatPkr as u };
