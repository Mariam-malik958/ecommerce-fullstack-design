# 🛒 E-Commerce Full Stack Design (Frontend)
A modern React + Vite frontend for a full-stack ecommerce project built for the Developers Hub Full-Stack Internship. The app focuses on clean UI, fast performance, and a scalable structure. It includes authentication, customer & Admin dashboards, product CRUD, catalog (PLP), product detail (PDP), and profile management. Layouts use responsive Grid and Flex with Tailwind CSS.

**🚀 Live Demo**: https://brand-ecommerce-site.netlify.app  

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

## Deployment (Netlify)
**🚀 Live Frontend is deploy here **: https://brand-ecommerce-site.netlify.app  

 ## E-commerce fullstack design (Backend)
 This is the backend for an e-commerce application  built with Node.js, Express, and MongoDB.
It includes authentication with email verification, a secure access & refresh token system, Order request, products catalog, user disctionary& Cart.


## Authentication
User registration with email
Login with secure password hashing (bcrypt)
Access & refresh tokens for authentication (jsonwebtoken)
Role-based authentication for buyers and suppliers
## Product Management
Add, updatee, delete products 
Product categories with automatic slug generation
Product search & filtering
## Cart System
Add, remove, and view items in cart
Buyer authentication for cart operations
## User Profile Management
Buyer profile retrieval
Supplier profile update with form validation
Secure logout functionality.

## Develop by:
Mariam Malik

 ## Credits
 Built for Developers Hub full-stack internship.



 
 








