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

**Profile**: Customer & seller profile pages with avatar upload

**UI/UX**: Responsive Grid/Flex layouts, loading spinners, toast feedback

**Routing**: React Router v7 nested routes + protected routes for admin/seller

**State**: Redux Toolkit slices for auth, products, cart management

**Charts**: Recharts for basic seller metrics

### **🧰 Tech Stack**
**Framework**: React 19 + Vite 7  
**Language**: JavaScript (ESM)  
**Routing**: react-router-dom 7  
**State**: @reduxjs/toolkit, react-redux  
**HTTP**: axios  
**UI**: Tailwind CSS 4, Radix UI primitives, Lucide icons  
**Forms**: react-hook-form  
**Charts**: recharts  
**Build/Dev**: Vite, ESLint

Frontend/
├── dist/             # Production build files - auto generated after npm run build
├── node_modules/     # Project dependencies - auto generated
├── public/           # Public assets like favicon, robots.txt
│
└── src/              # Main source code
    ├── assets/       # Images, icons, fonts used in components
    ├── components/   # Reusable UI: Navbar, Card, Button, Carousel
    ├── hooks/        # Custom hooks: useAuth, useCart
    ├── pages/        # All route pages
    │   ├── AdminAddProduct.jsx    # Seller panel - Add new product
    │   ├── AdminDashboard.jsx     # Seller panel - Dashboard + analytics
    │   ├── AdminLogin.jsx         # Seller panel - Login page
    │   ├── Cart.jsx               # Shopping cart page
    │   ├── Home.jsx               # Landing / Homepage
    │   ├── Login.jsx              # User login/signup page
    │   ├── Message.jsx            # Notifications / Messages page
    │   ├── Order.jsx              # Order history & details
    │   ├── ProductDetails.jsx     # PDP with gallery & related products
    │   ├── ProductListView.jsx    # PLP with filters/sorting/pagination
    │   └── Products.jsx           # All products grid page
    ├── routes/       # React Router v7 config + protected routes
    ├── services/     # Axios API calls for backend
    ├── store/        # Redux Toolkit slices: auth, products, cart
    ├── styles/       # Global styles, Tailwind config
    └── utils/        # Helper functions
