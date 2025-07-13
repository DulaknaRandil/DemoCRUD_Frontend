# Demo CRUD Frontend

A modern, responsive CRUD (Create, Read, Update, Delete) application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project demonstrates best practices for building production-ready web applications with a clean architecture, custom UI components, and seamless API integration.

## 🌟 Features

- ✅ **Full CRUD Operations** - Create, read, update, and delete products
- ✅ **Modern UI Components** - Custom animated buttons, cards, and alert dialogs
- ✅ **Responsive Design** - Mobile-first approach with glass morphism effects
- ✅ **Type Safety** - Full TypeScript implementation
- ✅ **Dark/Light Theme** - Theme toggle with system preference detection
- ✅ **Production Ready** - Deployed on Vercel with CORS handling
- ✅ **Error Handling** - Comprehensive error boundaries and fallback UIs
- ✅ **Liquid Glass Styling** - Modern UI with backdrop blur effects

## 🚀 Live Demo

**Production URL**: [https://demo-crud-frontend-luo9rwtut-dulaknarandils-projects.vercel.app](https://demo-crud-frontend-luo9rwtut-dulaknarandils-projects.vercel.app)

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **UI Components**: Custom components with animations
- **Deployment**: Vercel
- **Backend API**: ASP.NET Core (External)
- **State Management**: React Hooks

## 📁 Project Structure

```
demo_crud-frontend/
├── 📁 public/                          # Static assets
│   ├── file.svg, globe.svg, next.svg   # Icon assets
│   └── vercel.svg, window.svg
├── 📁 src/
│   ├── 📁 app/                         # Next.js App Router
│   │   ├── layout.tsx                  # Root layout
│   │   ├── page.tsx                    # Home page
│   │   ├── globals.css                 # Global styles
│   │   ├── 📁 api/                     # API routes (CORS proxy)
│   │   │   └── 📁 products/
│   │   │       ├── route.ts            # GET, POST /api/products
│   │   │       └── 📁 [id]/
│   │   │           └── route.ts        # GET, PUT, DELETE /api/products/[id]
│   │   └── 📁 products/                # Product pages
│   │       ├── page.tsx                # Products list
│   │       ├── 📁 [id]/                # Dynamic product routes
│   │       │   ├── page.tsx            # Product detail view
│   │       │   └── 📁 edit/
│   │       │       ├── page.tsx        # Edit product page
│   │       │       └── ClientView.tsx  # Client component for editing
│   │       └── 📁 new/
│   │           └── page.tsx            # Create new product
│   ├── 📁 components/                  # Legacy components (being phased out)
│   ├── 📁 features/                    # Feature-based modules
│   │   └── 📁 products/
│   │       ├── index.ts                # Barrel exports
│   │       ├── 📁 components/
│   │       │   ├── ProductCard.tsx     # Product display card
│   │       │   └── ProductForm.tsx     # Product form component
│   │       ├── 📁 services/
│   │       │   └── product.service.ts  # API service layer
│   │       ├── 📁 styles/              # Feature-specific styles
│   │       │   ├── Forms.module.css
│   │       │   ├── ProductCard.module.css
│   │       │   ├── ProductDetail.module.css
│   │       │   └── ProductList.module.css
│   │       └── 📁 types/
│   │           └── product.types.ts    # Product type definitions
│   ├── 📁 shared/                      # Shared utilities and components
│   │   ├── 📁 components/
│   │   │   ├── index.ts                # Component exports
│   │   │   ├── NotificationProvider.tsx
│   │   │   ├── ThemeProvider.tsx       # Theme context provider
│   │   │   └── 📁 ui/                  # UI component library
│   │   │       ├── AlertDialog.tsx     # Custom confirmation dialog
│   │   │       ├── AlertDialog.module.css
│   │   │       ├── AnimatedCard.tsx    # Animated card component
│   │   │       ├── JellyButton.tsx     # Multi-variant button component
│   │   │       ├── JellyButton.module.css
│   │   │       └── ThemeToggle.tsx     # Theme switcher
│   │   ├── 📁 config/
│   │   │   └── app.config.ts           # App configuration
│   │   ├── 📁 styles/                  # Global style modules
│   │   │   ├── Notification.module.css
│   │   │   └── ThemeToggle.module.css
│   │   ├── 📁 types/
│   │   │   └── api.types.ts            # API type definitions
│   │   └── 📁 utils/
│   │       └── api.utils.ts            # API utility functions
│   └── 📁 [legacy folders]/            # Legacy structure (being cleaned up)
├── 📄 .env.local                       # Local environment variables
├── 📄 .env.production                  # Production environment variables
├── 📄 eslint.config.mjs                # ESLint configuration
├── 📄 next.config.ts                   # Next.js configuration
├── 📄 package.json                     # Dependencies and scripts
├── 📄 postcss.config.mjs               # PostCSS configuration
├── 📄 tailwind.config.ts               # Tailwind CSS configuration
└── 📄 tsconfig.json                    # TypeScript configuration
```

## ⚙️ Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DulaknaRandil/DemoCRUD_Frontend.git
   cd demo_crud-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create `.env.local` for development:
   ```bash
   # Development environment
   NEXT_PUBLIC_EXTERNAL_API_URL=https://dulakna.runasp.net/api/products
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Architecture Overview

### API Strategy
The application uses a **dual API approach** to handle CORS and optimize performance:

```
Client-side → Local API Routes → External ASP.NET API
Server-side → Direct External API calls
```

- **Client requests**: Use `/api/products` (local routes) for CORS handling
- **Server-side rendering**: Direct calls to external API for better performance
- **Production**: Seamless integration with Vercel serverless functions

### Component Architecture

#### 🎨 UI Components (`src/shared/components/ui/`)

**JellyButton.tsx** - Multi-variant button component
```typescript
// Usage examples
<JellyButton variant="primary">Save Product</JellyButton>
<JellyButton variant="danger">Delete</JellyButton>
<JellyButton variant="success">Create</JellyButton>
```

**AlertDialog.tsx** - Custom confirmation dialog
```typescript
// Replaces browser confirm() with beautiful UI
const result = await showAlert({
  title: "Delete Product?",
  message: "This action cannot be undone.",
  type: "danger"
});
```

**AnimatedCard.tsx** - Animated container with glass effect
```typescript
<AnimatedCard className="product-card">
  <ProductContent />
</AnimatedCard>
```

#### 🔧 Service Layer (`src/features/products/services/`)

**product.service.ts** - Centralized API calls
```typescript
// Environment-aware API URL resolution
const API_URL = isServer ? EXTERNAL_API : '/api/products';

// Full CRUD operations
export const ProductService = {
  fetchProducts(),
  fetchProduct(id),
  createProduct(data),
  updateProduct(id, data),
  deleteProduct(id)
};
```

## 🎨 Styling System

### Design Philosophy
- **Mobile-first** responsive design
- **Glass morphism** with backdrop blur effects
- **Liquid animations** for interactive elements
- **Dark/Light theme** support

### CSS Architecture
```
📁 Styling Strategy
├── globals.css           # Global styles, CSS variables
├── Tailwind CSS          # Utility-first styling
└── CSS Modules           # Component-specific styles
    ├── *.module.css      # Scoped component styles
    └── Feature modules   # Feature-specific styling
```

### Theme System
```css
/* CSS Variables for theming */
:root {
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --backdrop-blur: blur(10px);
}

[data-theme="dark"] {
  --glass-bg: rgba(0, 0, 0, 0.2);
  --glass-border: rgba(255, 255, 255, 0.1);
}
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Environment Variables**
   Set in Vercel dashboard:
   ```
   NEXT_PUBLIC_EXTERNAL_API_URL=https://dulakna.runasp.net/api/products
   ```

3. **Production Build**
   ```bash
   npm run build
   npx vercel --prod
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## 🔧 Configuration Files

### Next.js Configuration (`next.config.ts`)
```typescript
const nextConfig = {
  // App Router configuration
  experimental: {
    turbo: {}
  }
};
```

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // Path mapping for imports
    }
  }
}
```

## 📱 Features in Detail

### Product Management
- **Create**: Add new products with name, price, quantity
- **Read**: View products in responsive card grid
- **Update**: Edit existing products with real-time validation
- **Delete**: Remove products with confirmation dialog

### UI/UX Features
- **Responsive Grid**: Adapts from 1 column (mobile) to 4 columns (desktop)
- **Loading States**: Skeleton loading and spinners
- **Error Handling**: User-friendly error messages
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader support

### Performance Optimizations
- **Server-side Rendering**: Fast initial page loads
- **Static Generation**: Pre-built pages for better performance
- **API Caching**: Intelligent caching strategies
- **Code Splitting**: Lazy loading of components

## 🔒 Security & Best Practices

- **Type Safety**: Full TypeScript implementation
- **Environment Variables**: Secure API key management
- **CORS Handling**: Proper cross-origin request setup
- **Input Validation**: Client and server-side validation
- **Error Boundaries**: Graceful error handling
- **Production Builds**: Minified and optimized code

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dulakna Randil**
- GitHub: [@DulaknaRandil](https://github.com/DulaknaRandil)
- Email: [randildulakna@gmail.com]

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for seamless deployment
- **Tailwind CSS** for utility-first styling
- **React** for the component architecture

---

⭐ **Star this repository if you found it helpful!**
