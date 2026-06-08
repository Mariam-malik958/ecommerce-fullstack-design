# 🛒 E-Commerce Full Stack Design

> **Internship Project @ DeveloperHub Corporation**  
> **Task**: Full-Stack Development Task for Interns  
> **Based on**: Ecommerce Web Design Figma template

**🚀 Live Demo**: https://brand-ecommerce-site.netlify.app  
**📂 GitHub Repo**: ecommerce-fullstack-design  

### **✨ Features**
**Auth**: Login/Signup flows using React Hook Form + Toast notifications

**Dashboards**:
- **Customer**: Orders, saved items, profile management
- **Admin**: Add/Edit products, inventory list, basic analytics

**Catalog**:
- **PLP (Product List Page)**: Filters, sorting, pagination
- **PDP (Product Detail Page)**: Image gallery with Embla Carousel + related products
- **Product Management**: Create/Update/Delete products for sellers

**Profile**: Customer & seller profile pages 

**UI/UX**: Responsive Grid/Flex layouts, loading spinners, toast feedback

**Routing**: React Router v7 nested routes + protected routes for admin/seller

**State**: Redux Toolkit slices for auth, products, cart management

**Charts**: Recharts for basic seller metrics

### **🧰 Tech Stack**
**Framework**: React 19 + Vite 7  
**Language**: JavaScript  
**Routing**: react-router-dom 7  
**State**: @reduxjs/toolkit, react-redux  
**HTTP**: axios  
**UI**: Tailwind CSS 4, Radix UI primitives, Lucide icons  
**Forms**: react-hook-form  
**Charts**: recharts  
**Build/Dev**: Vite, ESLint

### *📁 Frontend Folder Structure*
Frontend/
├── dist/
├── Frontend/
├── images/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   ├── index.js
│   └── main.jsx
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js

## Install Dependencies
npm install
## Start Dev server 
npm run dev 
## Build command 
npm run build 


