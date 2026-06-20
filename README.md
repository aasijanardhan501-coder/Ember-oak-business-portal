# 🔥 Ember & Oak — Premium Restaurant Website

> **Internship Project:** Build, Pitch & Monetize a Real Local Business Website  
> **Role:** Full Stack Web Developer · UI/UX Designer · Freelance Consultant

---

## 🌐 Live Preview

Open `index.html` in your browser — no build step needed.

**Deploy in 60 seconds:**
1. Drag the project folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Get a live URL instantly (e.g., `ember-and-oak.netlify.app`)
3. Or push to GitHub → connect to Netlify / Vercel for auto-deployment

---

## 📁 Project Structure

```
LocalBusiness portal/
├── index.html           → Home page
├── menu.html            → Menu (tabbed: Starters, Mains, Desserts, Cocktails)
├── about.html           → Our Story (timeline, team, awards)
├── gallery.html         → Photo gallery with lightbox
├── reservations.html    → Table booking form
├── contact.html         → Contact + Google Maps
├── css/
│   ├── style.css        → Full design system (tokens, components, layout)
│   ├── animations.css   → Keyframes, scroll-reveal, stagger
│   └── responsive.css   → Mobile / tablet breakpoints
├── js/
│   ├── main.js          → Navbar, scroll effects, counter, testimonials, parallax
│   ├── menu.js          → Menu tab filtering
│   ├── gallery.js       → Lightbox + gallery filter
│   └── reservation.js   → Form validation + guest stepper
└── images/
    ├── hero-bg.png      → AI-generated hero background
    ├── about-chef.png   → AI-generated chef portrait
    ├── dish-steak.png   → AI-generated steak photo
    ├── dish-cocktail.png→ AI-generated cocktail photo
    └── dish-dessert.png → AI-generated dessert photo
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **Responsive Design** | Fully mobile-first, tested from 320px to 1440px |
| **Page Loader** | Branded loading screen on every page |
| **Sticky Navbar** | Blur backdrop on scroll, mobile hamburger drawer |
| **Parallax Hero** | Smooth scroll parallax on hero background |
| **Scroll Animations** | Intersection Observer — fade, slide, scale, stagger |
| **Animated Counters** | Numbers count up when scrolled into view |
| **Menu Filtering** | Animated tab system for 4 categories, 14 items |
| **Gallery + Lightbox** | 12 photos, keyboard navigation (← → Esc) |
| **Testimonials Slider** | Auto-advancing, dots, arrows, responsive |
| **Reservation Form** | Guest stepper, date validation, success screen |
| **Contact Form** | Formspree-ready, subject dropdown, live validation |
| **Google Maps** | Embedded iframe with dark filter |
| **Float CTA Button** | Appears after scrolling 400px |
| **Back to Top** | Smooth scroll, appears after 500px |
| **SEO Ready** | Meta title, description, OG tags on every page |
| **Accessibility** | ARIA labels, roles, keyboard navigable |

---

## 🎨 Design System

**Brand:** Ember & Oak — Premium wood-fired restaurant

| Token | Value | Purpose |
|---|---|---|
| `--clr-primary` | `#c9893f` | Ember amber — CTAs, accents |
| `--clr-bg` | `#0a0907` | Deep charcoal background |
| `--clr-surface` | `#1a1814` | Card & section surfaces |
| `--clr-text` | `#f0ead6` | Warm cream text |
| Heading font | Playfair Display | Elegant serif |
| Body font | Inter | Clean sans-serif |
| Accent font | Dancing Script | Handwritten accent |

---

## 🚀 Deployment Guide

### Option 1: Netlify Drop (Fastest — 60 seconds)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `LocalBusiness portal` folder
3. Get a live URL → share with your internship supervisor

### Option 2: GitHub Pages
```bash
git init
git add .
git commit -m "feat: Ember & Oak restaurant website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ember-and-oak.git
git push -u origin main
```
Then: GitHub repo → Settings → Pages → Deploy from `main` branch

### Option 3: Vercel
```bash
npx vercel --prod
```

---

## 📧 Enabling Contact & Reservation Forms

1. Go to [formspree.io](https://formspree.io) → Create free account
2. Create a new form → Copy your form ID (e.g., `xpwzabcd`)
3. Replace `YOUR_FORM_ID` in both `contact.html` and `reservations.html`:
   ```html
   action="https://formspree.io/f/xpwzabcd"
   ```
4. Forms will now deliver to your email — no backend needed!

---

## 💰 Client Pitch & Monetization Guide

### What This Website Is Worth

| Service | Freelance Rate |
|---|---|
| Design (UI/UX, 6 pages) | ₹8,000 – ₹15,000 |
| Development (HTML/CSS/JS) | ₹12,000 – ₹20,000 |
| Content (copy, images) | ₹3,000 – ₹5,000 |
| SEO Setup | ₹2,000 – ₹4,000 |
| Deployment + Domain Setup | ₹1,000 – ₹2,000 |
| **Total Project Value** | **₹26,000 – ₹46,000** |

### How to Pitch to a Local Business

**Step 1 — Identify the Business**
- Walk into local restaurants, gyms, salons, or bakeries
- Check if they have a website (many don't, or have outdated ones)
- Research their Instagram/Google reviews

**Step 2 — The 30-Second Pitch**
> *"Hi, I noticed your business doesn't have a proper website — or your current one isn't mobile-friendly. I've built a professional website for [similar business] and I'd love to show you a demo. It would help you show up on Google, take online bookings, and impress new customers. Can I show you a 5-minute demo?"*

**Step 3 — Show the Demo**
- Open your live Netlify URL on your phone
- Demonstrate: mobile layout, menu, reservation form, gallery
- Show the Google Maps integration

**Step 4 — Address Objections**

| Objection | Response |
|---|---|
| "We already have a website" | "May I take a look? I specialise in modernising outdated sites." |
| "Too expensive" | "This is a one-time investment. A single extra table per week pays for it in a month." |
| "We don't need one" | "72% of diners check a restaurant's website before visiting. If you're not there, you lose them." |
| "We use Instagram" | "Instagram is great, but you don't own that platform. A website is yours forever." |

**Step 5 — Close the Deal**
- Offer a 50% upfront / 50% on delivery payment
- Offer a 3-month support period
- Provide a simple 1-page contract

### Recurring Revenue Opportunities
- **Monthly maintenance:** ₹1,500–₹3,000/mo for updates
- **SEO package:** ₹3,000–₹8,000/mo
- **Content updates:** ₹500–₹1,000 per update
- **Social media integration:** ₹2,000–₹5,000 setup

---

## 🛠️ Customisation Guide (Swap to Any Business)

To adapt this template for a **Gym, Salon, or Bakery**:

| Element | Where to Change |
|---|---|
| Brand name | All 6 HTML files — search `Ember & Oak` |
| Color palette | `css/style.css` → `:root` section |
| Menu items | `menu.html` |
| Hero image | `images/hero-bg.png` → replace file |
| Business hours | Footer of each HTML + `contact.html` |
| Contact details | Footer + `contact.html` sidebar |
| Google Maps | `contact.html` → update iframe `src` coordinates |
| Formspree ID | `contact.html` + `reservations.html` → form `action` |

---

## 📋 Internship Checklist

- [x] Business type selected (Restaurant — "Ember & Oak")
- [x] Premium design system created (dark amber theme)
- [x] Home page with hero, features, dishes, testimonials
- [x] Menu page with category filtering
- [x] About page with timeline, team, awards
- [x] Gallery with lightbox and category filter
- [x] Reservation form with validation
- [x] Contact page with map
- [x] Fully responsive (mobile, tablet, desktop)
- [x] SEO meta tags on all pages
- [x] Accessibility (ARIA, keyboard nav)
- [x] Deployment ready (Netlify/GitHub Pages)
- [x] Client pitch documentation

---

## 👨‍💻 Built With

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, Animations
- **Vanilla JavaScript** — No frameworks, no dependencies
- **Google Fonts** — Playfair Display + Inter + Dancing Script
- **Unsplash** — Free CDN photography
- **Formspree** — Zero-config form backend
- **Google Maps** — Embedded iframe

---

*Built as part of the Full Stack Web Development Internship Task — "Build, Pitch & Monetize a Real Local Business Website"*
