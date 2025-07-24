# Car Wash SaaS Application

A modern, full-featured SaaS platform for managing car wash businesses. Includes multi-branch, employee, and vendor management, authentication, and a responsive dashboard.

---

## Overview

This Car Wash SaaS application streamlines operations for car wash businesses, supporting multiple branches, employee/vendor management, and secure authentication. Built with Next.js 14, TypeScript, and Tailwind CSS for a modern, scalable experience.

---

## Features

- **Authentication:**
  - Login, registration, email verification, OTP, password reset/forget flows
- **Dashboard:**
  - Overview, navigation, and analytics
- **Branch Management:**
  - Add, edit, and manage car wash branches
- **Employee Management:**
  - Add, edit, and manage employees
- **Vendor Management:**
  - Add, edit, and manage vendors
- **Pricing & Services:**
  - Pricing page, service management
- **User Profile:**
  - Profile icon, logout, and user settings
- **Contact & Support:**
  - Contact form, support options
- **Responsive UI:**
  - Mobile-friendly, accessible, and modern design
- **Reusable Components:**
  - Built with Radix UI, custom components, and Tailwind CSS

---

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, custom components
- **Forms:** React Hook Form, Zod (if used)
- **Icons:** Lucide, Phosphor (if used)

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
  - `components/` — Page-level and shared components
  - `contexts/` — React context providers (Auth, Language)
  - `dashboard/` — Dashboard and management pages (branches, employees, vendors)
  - `employees/` — Employee management pages
  - `register/`, `login/`, `reset-password/`, etc. — Auth flows
- `components/` — Reusable UI components (buttons, dialogs, sidebar, etc.)
- `hooks/` — Custom React hooks
- `lib/` — Utility functions
- `public/` — Static assets (images, icons, etc.)
- `styles/` — Global and shared styles

---

## Customization
- Update pricing/services in `app/pricing/page.tsx`
- Edit employee/branch/vendor logic in respective dashboard subfolders
- Adjust authentication flows in `app/contexts/AuthContext.tsx` and related pages
- Change contact info in `app/contact/page.tsx`
- Update UI components in `components/ui/`

---

## License

This project is for demonstration and internal use. All rights reserved.

---
Live Site Link :  https://carwash-application.netlify.app/
ID :mathaniyappan2023@gmail.com 
pass :Mathan@5

Create a .env File and update the "NEXT_PUBLIC_API_URL=https://carwash-saas.onrender.com
 " paste this in ENV file 


<img width="1903" height="930" alt="image" src="https://github.com/user-attachments/assets/312a4499-cdab-425b-af46-d45c5450773f" /><img width="1899" height="930" alt="image" src="https://github.com/user-attachments/assets/a9f5a80d-8596-43ff-a64e-939a2fcaf788" /><img width="1905" height="930" alt="image" src="https://github.com/user-attachments/assets/1ae20a49-9f7e-4d80-8ec7-b3169748daa8" /><img width="1905" height="933" alt="image" src="https://github.com/user-attachments/assets/882390c5-906b-4fa9-beaa-de66b7ff89cb" /><img width="1911" height="930" alt="image" src="https://github.com/user-attachments/assets/6610de01-0cce-48bc-9f15-67512a76d431" />




