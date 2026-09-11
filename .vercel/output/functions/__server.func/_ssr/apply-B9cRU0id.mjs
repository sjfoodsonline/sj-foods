import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as useMarket, i as Label, o as SiteShell, r as Input, t as Button } from "./site-shell-DZ6watzH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/apply-B9cRU0id.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ApplyPage() {
	const apply = useMarket((s) => s.apply);
	const applications = useMarket((s) => s.applications);
	const [name, setName] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("Mingora");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	function submit(e) {
		e.preventDefault();
		if (!name.trim()) return;
		apply({
			name: name.trim(),
			city: city.trim() || "Mingora",
			phone: phone.trim(),
			note: note.trim()
		});
		setDone(true);
		setName("");
		setPhone("");
		setNote("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl text-forest-900",
				children: "Become a vendor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: "Aapki shop tabhi live hogi jab owner approve kare. Categories, units aur pricing aap decide nahi karte — SJ Online ka standard follow hoga. Har approved vendor ko apni shop page milti hai."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-8 space-y-4 rounded-xl border border-line bg-cream p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "v-name",
						children: "Shop name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "v-name",
						className: "mt-1",
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "v-city",
						children: "City"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "v-city",
						className: "mt-1",
						value: city,
						onChange: (e) => setCity(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "v-phone",
						children: "WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "v-phone",
						className: "mt-1",
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						placeholder: "03xx..."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "v-note",
						children: "Note"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "v-note",
						className: "mt-1",
						value: note,
						onChange: (e) => setNote(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "gold",
						className: "w-full",
						children: "Submit for approval"
					}),
					done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-forest-800",
						children: "Request owner desk pe chali gayi."
					}) : null
				]
			}),
			applications.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 space-y-2 text-sm",
				children: applications.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex justify-between rounded-md border border-line bg-paper px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: a.status
					})]
				}, a.id))
			}) : null
		]
	}) });
}
//#endregion
export { ApplyPage as component };
