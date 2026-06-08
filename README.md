# 🛒 E-Commerce Full Stack Design

> **Internship Project @ DeveloperHub Corporation**  
> **Task**: Full-Stack Development Task for Interns  
> **Based on**: Ecommerce Web Design Figma template

**🚀 Live Demo**: https://brand-ecommerce-site.netlify.app  
**📂 GitHub Repo**: ecommerce-fullstack-design  
**📅 Deadline**: 5th June, 2026

### **🎯 Project Objective**
Build a fully functional eCommerce web application based on the Ecommerce Web Design Figma template with both desktop and responsive mobile versions + backend integration for dynamic content.

### **📋 Tasks Overview**
Project divided into weekly milestones covering frontend development, backend integration, and final deployment.

### **🗓️ Week 1: Project Setup and Static Frontend Development**
**Goal**: Set up project environment and implement static frontend for desktop and mobile views.

**Tasks Completed**:
1. **Development Environment**: Installed Node.js, React for frontend, Express.js for backend
2. **Figma to Code**: Cloned Figma design template into project
3. **Static Pages Developed**: 
   - Home Page
   - Product Listing Page
   - Product Details Page
   - Cart Page
4. **Responsive Design**: Used CSS Grid, Flexbox, TailwindCSS for desktop + mobile views

**Deliverables**: 
- Responsive frontend for desktop and mobile
- Pages matching Figma design
- Code committed to GitHub

### **🗓️ Week 2: Backend Setup and Dynamic Integration**
**Goal**: Set up backend and connect to frontend for dynamic content rendering.

**Tasks Completed**:
1. **Database**: Set up MongoDB for storing product data
2. **API Development**: Node.js + Express.js backend with CRUD endpoints for products
   - Products Collection: id, name, price, image, description, category, stock
3. **Dynamic Rendering**: Fetched data from backend to render:
   - Home Page: Featured products
   - Product Listing Page: All products in grid layout
   - Product Details Page: Selected product details
   - Cart Page: Add products and display selected items
4. **Search Feature**: Search bar to filter products by name or category

**Deliverables**:
- Functional backend with APIs for product management
- Fully integrated frontend displaying dynamic data

### **🗓️ Week 3: Additional Features and Final Deployment**
**Goal**: Add essential eCommerce features, complete responsive testing, and deploy.

**Tasks Completed**:
1. **User Authentication**: JWT/Firebase Auth for login/signup + protected admin routes
2. **Cart Management**: Add/remove products, persist cart via localStorage/backend
3. **Admin Panel**: Interface to add/edit/delete products with CRUD operations
4. **Responsive Testing**: Fixed issues for desktop and mobile views
5. **Deployment**: Deployed project to Vercel/Render

**Deliverables**:
- User authentication implemented and tested
- Cart functionality working for desktop and mobile
- Admin panel integrated with CRUD operations
- Deployed application with live URL

### **🛠️ Tools and Technologies Used**
- **Frontend**: React.js, CSS3, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB / Firebase Realtime Database
- **Version Control**: GitHub
- **Deployment**: Vercel / Render
- **Auth**: JWT / Firebase Auth

### **📁 Project Folder Structure**
*Yahan wo Frontend folder structure paste kar do jo maine diya tha*

### **📸 UI Screenshots**
| Desktop View | Mobile View |
| --- | --- |
| *Add screenshot* | *Add screenshot* |

### **⚙️ How to Run Locally**
```bash
# Clone repo
git clone https://github.com/Mariam-malik958/ecommerce-fullstack-design.git

# Frontend setup
cd Frontend
npm install
npm run dev

# Backend setup
cd Backend
npm install
npm start
