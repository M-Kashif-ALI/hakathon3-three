# 🌟 Hackathon Day 4: Comforty Marketplace Template:
**Theme:** Building Dynamic Frontend Components

# 🪑 Comforty: Your Chair Marketplace  

Welcome to **Comforty**, the ultimate online marketplace for chairs. This project focuses on building dynamic, reusable, and responsive frontend components for showcasing your product range and delivering an engaging user experience.  

---

## 🎯 Objective  

Create a feature-rich website that dynamically displays chair data fetched from a CMS (like Sanity) or an API, with a focus on scalability and modern UI/UX practices.  

---

## 🏆 Key Features  

- **Dynamic Chair Listing**: Display a collection of chairs with pagination or infinite scrolling.  
- **Product Details**: Detailed information for each chair, including sizes, colors, and reviews.  
- **Category Filtering**: Sort chairs by category, price range, or availability.  
- **Shopping Cart**: Manage items with quantity controls and automatic price calculation.  
- **Responsive Design**: Optimized for all devices with flexible layouts.  

---

## 🧩 Core Components  

### 1. Chair Listing Component 🪑  
Displays a list of chairs dynamically fetched from the API.  

#### **TypeScript Interface**  
```typescript
interface types {
  _id: string;
  title: string;
  tags: string[];
  price: number;
  category: string;
  categoryImg: string;
  inventory: number;
  description: string;
  imageurl: string;
}
```

### 2. **Product Detail Component** 🛒  
- Display detailed product information, including:  
  - **Description** 📝   
  - **Price** $$
  - **Stock Number** 📦


  - ### 3. **Category Component** 📂  
- Showcase product categories dynamically.  
- Allow users to **filter** and **sort** products by category.  

---

### 4. **Cart Component** 🛒  
- Manage items added to the cart with:  
  - **Quantity Controls** ➕➖  
  - **Total Price Calculation** 💲  

---

### 5. **Header Component** 🔝  
- Create a responsive navigation bar with:  
  - Links to key pages (Home, Product, About, Contact, etc.).
    
---

### 6. **Footer Component** 📢  
- Add links to pages like:  
  - **About Us**  
  - **Privacy Policy**  
  - **Contact Us** 📞  
- Include:  
  - **Social Media Icons** 📱  
  - **Newsletter Subscription Form** ✉️  


## 🛠️ Tools and Technologies  
- **Frontend Framework:** ReactJS NEXTJS  
- **State Management:** Context API.  
- **CMS/Backend:** Sanity CMS or APIs.  
- **Styling:** Tailwind CSS.  
- **Responsive Design:** Flexbox.  

---

![image alt](https://github.com/M-Kashif-ALI/hakathon3-three/blob/aeb85b16853d0df6361c0a150b6490c03c8a192b/components-ScreenShot.png)
