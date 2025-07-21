# Blissfulmom Website

A modern, full-featured web application for Blissfulmom — providing prenatal, postnatal, and holistic maternal care services.

## Live Site

[avierastudio.netlify.app](https://avierastudio.netlify.app)

---

## Overview

Blissfulmom is a platform dedicated to empowering mothers with innovative care and support throughout their motherhood journey. The site offers information about services, team, philosophy, and provides direct contact and booking options.

---

## Features

- **Landing Page:**
  - Hero carousel, quotes, statistics, features, and difference sections
  - WhatsApp quick contact button
- **About & About Us:**
  - Mission, values, team, philosophy, and vision
- **Services:**
  - Detailed breakdown of prenatal, postnatal, and wellness services
  - Step-by-step process and feature highlights
- **Contact:**
  - Interactive contact form (sends details via WhatsApp)
  - Direct links for email, phone, and map
- **FAQ:**
  - Accordion-based answers for common questions about care, recovery, and support
- **Responsive Design:**
  - Fully mobile-friendly and accessible
- **Modern UI:**
  - Built with Tailwind CSS, Framer Motion, and Radix UI components

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS, CSS Modules
- **UI Components:** Radix UI, custom components
- **Animation:** Framer Motion, GSAP, AOS
- **Forms:** React Hook Form, Zod validation
- **Icons:** Lucide, Phosphor
- **Other:** WhatsApp integration, dynamic font loading

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
# or
yarn install
```

### Development
```bash
npm run dev
# or
yarn dev
```

### Production
```bash
npm run build
npm start
```

---

## Project Structure

- `app/` — Next.js app directory (pages, layouts, routes)
- `components/` — Reusable UI and section components
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `public/` — Static assets (images, icons, etc.)
- `styles/` — Global and shared styles

---

## Customization
- Update service details in `app/services/page.tsx`
- Edit team, mission, and values in `app/about/page.tsx` and `app/about-us/page.tsx`
- Adjust contact info in `app/contact/page.tsx`
- Add/modify FAQs in `app/faq/page.tsx`

---

## License

This project is for Blissfulmom. All rights reserved.

Live Site :  https://blissfulmom.netlify.app/