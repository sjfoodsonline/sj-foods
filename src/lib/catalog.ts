export type Unit = "kg" | "piece" | "dozen" | "litre" | "pack";

export type Category = {
  slug: string;
  name: string;
  blurb: string;
};

export type Vendor = {
  id: string;
  slug: string;
  name: string;
  city: string;
  status: "approved" | "pending" | "coming-soon";
  cover: string;
  note: string;
};

export type Product = {
  id: string;
  name: string;
  roman: string;
  category: string;
  vendorId: string;
  unit: Unit;
  price: number;
  image: string;
  featured?: boolean;
};

export const UNITS: Unit[] = ["kg", "piece", "dozen", "litre", "pack"];

export const CATEGORIES: Category[] = [
  { slug: "vegetables", name: "Fresh Vegetables", blurb: "Rozana sabzi, owner units" },
  { slug: "fruits", name: "Fruits", blurb: "Seasonal phal" },
  { slug: "dairy", name: "Dairy", blurb: "Doodh, dahi, makhan" },
  { slug: "meat", name: "Meat", blurb: "Chicken & mutton" },
  { slug: "grocery", name: "Grocery", blurb: "Rice, daal, oil" },
  { slug: "household", name: "Household", blurb: "Rozmarra items" },
];

export const VENDORS: Vendor[] = [
  {
    id: "sj-foods",
    slug: "sj-foods",
    name: "SJ Foods",
    city: "Mingora",
    status: "approved",
    cover: "/hero.jpg",
    note: "Owner shop — standard pricing",
  },
  {
    id: "rhz-mart",
    slug: "rhz-mart",
    name: "RHZ Mart",
    city: "Mingora",
    status: "coming-soon",
    cover: "/products/rice.jpg",
    note: "Waiting for owner approval",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "lemon",
    name: "Lemon",
    roman: "Lemon",
    category: "fruits",
    vendorId: "sj-foods",
    unit: "kg",
    price: 200,
    image: "/products/lemon.jpg",
    featured: true,
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
    featured: true,
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
    featured: true,
  },
  {
    id: "apple",
    name: "Apple",
    roman: "Saib",
    category: "fruits",
    vendorId: "sj-foods",
    unit: "kg",
    price: 350,
    image: "/products/apple.jpg",
  },
  {
    id: "greens",
    name: "Leafy Greens",
    roman: "Saag / Palak",
    category: "vegetables",
    vendorId: "sj-foods",
    unit: "kg",
    price: 120,
    image: "/products/greens.jpg",
  },
  {
    id: "milk",
    name: "Fresh Milk",
    roman: "Taza doodh",
    category: "dairy",
    vendorId: "sj-foods",
    unit: "litre",
    price: 220,
    image: "/products/dairy.jpg",
  },
  {
    id: "chicken",
    name: "Chicken",
    roman: "Murghi",
    category: "meat",
    vendorId: "sj-foods",
    unit: "kg",
    price: 650,
    image: "/products/chicken.jpg",
  },
  {
    id: "rice",
    name: "Basmati Rice",
    roman: "Basmati chawal",
    category: "grocery",
    vendorId: "sj-foods",
    unit: "kg",
    price: 280,
    image: "/products/rice.jpg",
  },
];

export const DEFAULT_WHATSAPP = "923001234567";

export function productsByCategory(slug: string) {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function productsByVendor(vendorId: string) {
  return PRODUCTS.filter((p) => p.vendorId === vendorId);
}

export function getVendor(slug: string) {
  return VENDORS.find((v) => v.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}
