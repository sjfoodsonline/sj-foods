# Mingora Bazaar

Mingora, Swat ke local vendors ke liye e-commerce + delivery marketplace.
Orders WhatsApp par jaate hain, data Firebase Realtime Database mein sync
hota hai, aur har vendor ki apni shop page hoti hai (`/vendor/<slug>`).
Full control (Approve/Reject vendors, Categories, Pricing, Units) `/admin`
par hai.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Firebase Realtime Database (client SDK — no backend server needed)
- WhatsApp deep links (`wa.me`) for order handoff

## 1. Firebase setup
1. [Firebase Console](https://console.firebase.google.com) par naya project banayein.
2. **Build > Realtime Database > Create Database** — pehle "test mode" mein shuru karein.
3. **Project settings > General > Your apps > Web app (`</>`)** — config values copy karein.
4. `.env.local.example` ko `.env.local` mein copy karein aur values fill karein, plus ek
   `NEXT_PUBLIC_ADMIN_PASSWORD` set karein.

### Database rules (test mode se upgrade karein)
Test mode sab ke liye open hota hai — production se pehle rules lock karein:

```json
{
  "rules": {
    "vendors": {
      ".read": true,
      ".write": false
    },
    "categories": {
      ".read": true,
      ".write": false
    },
    "orders": {
      ".read": false,
      ".write": true
    }
  }
}
```

Yeh sirf ek starting point hai — asal write access (admin approve/reject,
category add, pricing update) Firebase Authentication ke saath lock karna
chahiye. Abhi admin panel sirf ek client-side password se gated hai
(`NEXT_PUBLIC_ADMIN_PASSWORD`), jo **security ke liye kaafi nahi hai** —
yeh sirf casual access rokta hai. Jaise hi real vendors aur real orders
aane lagein, Firebase Auth (email/password ya phone OTP) add karein aur
database rules ko admin UID se link karein.

## 2. Local development
```bash
npm install
npm run dev
```
`http://localhost:3000` par khulega.

## 3. Deploy — Vercel (recommended)
1. Yeh repo GitHub par push karein.
2. [vercel.com](https://vercel.com) par GitHub se login karein > "New Project" > apna repo select karein.
3. Environment variables (wahi jo `.env.local` mein hain) Vercel project settings mein add karein.
4. Deploy — Vercel har `git push` par khud-ba-khud rebuild kar dega.
5. Apna custom domain (agar hai) Vercel project settings > Domains mein add kar sakte hain.

## 4. Naye vendor add karna
Abhi vendor signup form nahi hai — naye vendor ko Firebase Console mein
manually `vendors/<id>` ke tehet add karein (ya aap chahein to ek simple
signup form bhi bana sakte hain):

```json
{
  "name": "Ali General Store",
  "slug": "ali-general-store",
  "category": "Grocery",
  "phone": "923001234567",
  "whatsapp": "923001234567",
  "area": "Green Chowk, Mingora",
  "description": "Roz mara ki cheezein",
  "status": "pending"
}
```

Phir `/admin` par jaake **Vendors** tab se Approve karein — us ke baad
dukaan homepage par nazar aayegi.

## Folder structure
```
sj-foods/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Global layout + fonts
│   │   ├── page.tsx          # Homepage — vendor directory
│   │   ├── vendor/[slug]/    # Har vendor ki apni shop page
│   │   └── admin/            # Master control dashboard
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   └── WhatsAppCheckout.tsx
│   └── lib/
│       ├── firebase.ts       # Realtime DB read/write helpers
│       └── whatsapp.ts       # Order message + wa.me link builder
├── package.json
└── tailwind.config.js
```
