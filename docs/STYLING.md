# Styling Guide

This guide provides comprehensive instructions for styling and design patterns in the PDL Rentals website using Tailwind CSS and custom CSS.

## 🎨 Design System Overview

### Brand Colors

```css
/* Primary Brand Colors */
--primary-50: #eff6ff;
--primary-100: #dbeafe;
--primary-500: #3b82f6;  /* Main brand blue */
--primary-600: #2563eb;
--primary-700: #1d4ed8;

/* Secondary Colors */
--gray-50: #f9fafb;   /* Light background */
--gray-100: #f3f4f6;  /* Card backgrounds */
--gray-500: #6b7280;  /* Text secondary */
--gray-800: #1f2937;  /* Text primary */
--gray-900: #111827;  /* Headers */

/* Accent Colors */
--green-500: #10b981;  /* Success states */
--red-500: #ef4444;    /* Error states */
--yellow-500: #f59e0b; /* Warning states */
```

### Typography Scale

```css
/* Font Sizes (Tailwind Classes) */
text-xs     /* 12px - Fine print */
text-sm     /* 14px - Small text */
text-base   /* 16px - Body text */
text-lg     /* 18px - Large body */
text-xl     /* 20px - Small headings */
text-2xl    /* 24px - Medium headings */
text-3xl    /* 30px - Large headings */
text-4xl    /* 36px - Hero headings */
text-5xl    /* 48px - Display headings */
```

### Spacing System

```css
/* Spacing Scale (rem values) */
space-1   /* 0.25rem - 4px */
space-2   /* 0.5rem  - 8px */
space-4   /* 1rem    - 16px */
space-6   /* 1.5rem  - 24px */
space-8   /* 2rem    - 32px */
space-12  /* 3rem    - 48px */
space-16  /* 4rem    - 64px */
space-24  /* 6rem    - 96px */
```

## 🏗️ Layout Patterns

### Container Layouts

```typescript
// Main container with responsive padding
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>

// Full-width hero sections
<section className="w-full bg-gradient-to-r from-blue-600 to-blue-800">
  <div className="container mx-auto px-4 py-16 lg:py-24">
    {/* Hero content */}
  </div>
</section>

// Card grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
      {/* Card content */}
    </div>
  ))}
</div>
```

### Responsive Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Medium tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

### Mobile-First Examples

```typescript
// Responsive navigation
<nav className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
  <div className="lg:hidden mb-4">
    {/* Mobile menu button */}
  </div>
  <ul className="space-y-4 lg:space-y-0 lg:space-x-6 lg:flex">
    {/* Navigation items */}
  </ul>
</nav>

// Responsive image grids
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  {images.map(image => (
    <img 
      className="w-full h-48 object-cover rounded-lg"
      src={image.src}
      alt={image.alt}
    />
  ))}
</div>
```

## 🧩 Component Patterns

### Button Styles

```typescript
// Primary button
<button className="
  inline-flex items-center justify-center
  px-4 py-2 border border-transparent
  text-sm font-medium rounded-md
  text-white bg-blue-600
  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
  transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Primary Action
</button>

// Secondary button
<button className="
  inline-flex items-center justify-center
  px-4 py-2 border border-gray-300
  text-sm font-medium rounded-md
  text-gray-700 bg-white
  hover:bg-gray-50 focus:ring-2 focus:ring-blue-500
  transition-colors duration-200
">
  Secondary Action
</button>

// Icon button
<button className="
  p-2 rounded-full
  text-gray-400 hover:text-gray-600
  hover:bg-gray-100
  transition-colors duration-200
">
  <CloseIcon className="w-5 h-5" />
</button>
```

### Form Elements

```typescript
// Input field
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Email Address
  </label>
  <input
    type="email"
    className="
      w-full px-3 py-2 border border-gray-300 rounded-md
      focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      disabled:bg-gray-100 disabled:cursor-not-allowed
      transition-colors duration-200
    "
    placeholder="Enter your email"
  />
</div>

// Select dropdown
<select className="
  w-full px-3 py-2 border border-gray-300 rounded-md
  focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  bg-white appearance-none
">
  <option value="">Select an option</option>
  <option value="option1">Option 1</option>
</select>

// Textarea
<textarea
  className="
    w-full px-3 py-2 border border-gray-300 rounded-md
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    resize-vertical
  "
  rows={4}
  placeholder="Enter your message"
/>
```

### Card Components

```typescript
// Basic card
<div className="bg-white rounded-lg shadow-md overflow-hidden">
  <img 
    className="w-full h-48 object-cover"
    src="/property-image.jpg"
    alt="Property"
  />
  <div className="p-6">
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Property Title
    </h3>
    <p className="text-gray-600 mb-4">
      Property description goes here...
    </p>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-bold text-blue-600">
        $1,500/month
      </span>
      <button className="btn-primary">
        View Details
      </button>
    </div>
  </div>
</div>

// Feature card with icon
<div className="text-center p-6 bg-white rounded-lg shadow-sm">
  <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
    <HomeIcon className="w-6 h-6 text-blue-600" />
  </div>
  <h3 className="text-lg font-semibold text-gray-900 mb-2">
    Feature Title
  </h3>
  <p className="text-gray-600">
    Feature description text
  </p>
</div>
```

### Navigation Patterns

```typescript
// Header navigation
<header className="sticky top-0 z-50 bg-white shadow-sm">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        <img className="h-8 w-auto" src="/logo.svg" alt="PDL Rentals" />
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="/" className="nav-link">Home</a>
        <a href="/properties" className="nav-link">Properties</a>
        <a href="/about" className="nav-link">About</a>
        <a href="/contact" className="nav-link">Contact</a>
      </nav>
      <div className="md:hidden">
        <button className="mobile-menu-button">
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</header>

// Breadcrumb navigation
<nav className="flex mb-8" aria-label="Breadcrumb">
  <ol className="flex items-center space-x-2">
    <li>
      <a href="/" className="text-gray-500 hover:text-gray-700">
        Home
      </a>
    </li>
    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
    <li>
      <a href="/properties" className="text-gray-500 hover:text-gray-700">
        Properties
      </a>
    </li>
    <ChevronRightIcon className="w-4 h-4 text-gray-400" />
    <li className="text-gray-900 font-medium">
      Property Details
    </li>
  </ol>
</nav>
```

## 🎯 Utility Classes

### Custom Utility Classes

```css
/* Add to globals.css or component CSS */
.btn-primary {
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-200;
}

.btn-secondary {
  @apply inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-colors duration-200;
}

.nav-link {
  @apply text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200;
}

.nav-link-active {
  @apply text-blue-600 font-semibold;
}

.card {
  @apply bg-white rounded-lg shadow-md overflow-hidden;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.error-text {
  @apply text-sm text-red-600 mt-1;
}

.success-text {
  @apply text-sm text-green-600 mt-1;
}
```

### Animation Classes

```css
/* Loading animations */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* Custom animations */
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## 🖼️ Image and Media Styles

### Responsive Images

```typescript
// Basic responsive image
<img 
  className="w-full h-auto rounded-lg shadow-md"
  src="/property-image.jpg"
  alt="Property description"
  loading="lazy"
/>

// Aspect ratio maintained images
<div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
  <img 
    className="w-full h-full object-cover"
    src="/hero-image.jpg"
    alt="Hero background"
  />
</div>

// Image gallery grid
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {images.map((image, index) => (
    <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
      <img 
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        src={image.src}
        alt={image.alt}
        loading="lazy"
      />
    </div>
  ))}
</div>
```

### Video Styling

```typescript
// Video overlay component
<div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
  <div className="relative w-full max-w-4xl mx-4">
    <video 
      className="w-full h-auto rounded-lg shadow-2xl"
      controls
      autoPlay
      muted
    >
      <source src="/welcome-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <button 
      className="absolute top-4 right-4 p-2 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition-opacity"
      onClick={onClose}
    >
      <CloseIcon className="w-6 h-6 text-gray-800" />
    </button>
  </div>
</div>
```

## 🌈 Color Usage Guidelines

### Text Colors

```typescript
// Primary text hierarchy
<h1 className="text-gray-900">Main Heading</h1>
<h2 className="text-gray-800">Secondary Heading</h2>
<p className="text-gray-700">Body text</p>
<span className="text-gray-500">Supporting text</span>
<small className="text-gray-400">Fine print</small>

// Brand colors for emphasis
<span className="text-blue-600">Brand accent</span>
<span className="text-green-600">Success message</span>
<span className="text-red-600">Error message</span>
<span className="text-yellow-600">Warning message</span>
```

### Background Colors

```typescript
// Background hierarchy
<body className="bg-gray-50">              {/* Page background */}
  <div className="bg-white">               {/* Card/content backgrounds */}
    <div className="bg-gray-100">          {/* Section dividers */}
      <div className="bg-blue-600">        {/* Primary actions */}
        <div className="bg-blue-50">       {/* Subtle highlights */}
        </div>
      </div>
    </div>
  </div>
</body>
```

## 📱 Mobile-Specific Styles

### Touch-Friendly Interfaces

```typescript
// Minimum touch target sizes (44px)
<button className="min-h-[44px] min-w-[44px] p-2">
  <Icon className="w-6 h-6" />
</button>

// Mobile-optimized forms
<div className="space-y-4 md:space-y-6">
  <input 
    className="text-base md:text-sm p-4 md:p-3" // Larger on mobile
    type="email"
  />
  <button className="w-full h-12 md:w-auto md:h-10">
    Submit
  </button>
</div>

// Mobile navigation
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:relative md:border-0">
  <div className="flex justify-around p-2">
    {navItems.map(item => (
      <a 
        key={item.name}
        className="flex flex-col items-center p-2 min-w-[60px]"
        href={item.href}
      >
        <item.icon className="w-6 h-6 mb-1" />
        <span className="text-xs">{item.name}</span>
      </a>
    ))}
  </div>
</nav>
```

### Mobile Performance

```css
/* Optimize animations for mobile */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Optimize images for mobile */
.mobile-optimized-image {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
}
```

## 🎨 Theme Customization

### Tailwind Theme Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'pdl-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'pdl-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#6b7280',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    }
  }
}
```

### CSS Custom Properties

```css
/* Define CSS variables for theming */
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --color-text: #1f2937;
  --color-text-light: #6b7280;
  --color-background: #ffffff;
  --color-background-alt: #f9fafb;
  
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  --border-radius: 0.5rem;
  --border-radius-lg: 1rem;
  
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Dark theme variables (future implementation) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: #f9fafb;
    --color-text-light: #d1d5db;
    --color-background: #1f2937;
    --color-background-alt: #111827;
  }
}
```

## ♿ Accessibility Styling

### Focus States

```css
/* Custom focus styles */
.focus-visible {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2;
}

/* High contrast focus for accessibility */
.focus-high-contrast {
  @apply outline-none ring-4 ring-yellow-400 ring-offset-2 ring-offset-black;
}

/* Skip to content link */
.skip-link {
  @apply absolute -top-10 left-0 bg-blue-600 text-white px-4 py-2 z-50 focus:top-0 transition-all;
}
```

### Color Contrast

```typescript
// Ensure sufficient contrast ratios
<div className="bg-blue-600 text-white">        {/* 4.5:1 contrast */}
<div className="bg-gray-100 text-gray-800">     {/* 7:1 contrast */}
<div className="bg-yellow-100 text-yellow-800"> {/* 4.5:1 contrast */}
```

### Screen Reader Friendly

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Show on focus for keyboard navigation */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

## 🔧 Development Tools

### VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",     // Tailwind CSS IntelliSense
    "esbenp.prettier-vscode",        // Code formatting
    "formulahendry.auto-rename-tag", // HTML tag renaming
    "ms-vscode.vscode-css-peek"      // CSS navigation
  ]
}
```

### Browser Extensions

- **Tailwind CSS DevTools** - Inspect Tailwind classes
- **React Developer Tools** - Component inspection
- **axe DevTools** - Accessibility testing
- **Lighthouse** - Performance and accessibility audits

### CSS Debugging

```css
/* Debug layout issues */
.debug-layout * {
  outline: 1px solid red;
}

.debug-grid {
  background-image: 
    linear-gradient(rgba(255,0,0,.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,0,0,.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Debug responsive breakpoints */
body::before {
  content: 'XS';
  position: fixed;
  top: 0;
  right: 0;
  background: red;
  color: white;
  padding: 4px 8px;
  z-index: 9999;
}

@media (min-width: 640px) {
  body::before { content: 'SM'; }
}

@media (min-width: 768px) {
  body::before { content: 'MD'; }
}

@media (min-width: 1024px) {
  body::before { content: 'LG'; }
}

@media (min-width: 1280px) {
  body::before { content: 'XL'; }
}
```

## 🚀 Performance Optimization

### CSS Performance

```css
/* Use efficient selectors */
.component-class { /* Good: Class selector */ }
#unique-id { /* Good: ID selector */ }
div.component { /* Avoid: Tag + class */ }
.parent .child .grandchild { /* Avoid: Deep nesting */ }

/* Optimize animations */
.optimized-animation {
  transform: translateX(100px);
  /* Use transform instead of changing left/right */
  will-change: transform;
  /* Hint to browser for optimization */
}

/* Minimize repaints */
.gpu-accelerated {
  transform: translateZ(0);
  /* Force GPU acceleration */
}
```

### Bundle Size Optimization

```javascript
// Purge unused CSS in production
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
```

## 📏 Spacing and Layout Rules

### Consistent Spacing

```typescript
// Use consistent spacing scale
<div className="space-y-4">        {/* 16px vertical spacing */}
<div className="space-y-6">        {/* 24px vertical spacing */}
<div className="space-y-8">        {/* 32px vertical spacing */}

// Section spacing
<section className="py-16 lg:py-24">   {/* Large section padding */}
<section className="py-8 lg:py-12">    {/* Medium section padding */}
<section className="py-4 lg:py-6">     {/* Small section padding */}

// Component spacing
<div className="mb-4">              {/* Component bottom margin */}
<div className="mt-8">              {/* Section top margin */}
<div className="mx-auto">           {/* Center horizontally */}
```

### Grid Systems

```typescript
// 12-column grid system
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-8">Main Content</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>

// Flexible grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {/* Auto-responsive grid items */}
</div>

// CSS Grid areas
<div className="grid grid-areas-layout">
  <header className="grid-area-header">Header</header>
  <main className="grid-area-main">Main</main>
  <aside className="grid-area-sidebar">Sidebar</aside>
  <footer className="grid-area-footer">Footer</footer>
</div>
```

## 🎯 Best Practices Summary

### Do's
- ✅ Use mobile-first responsive design
- ✅ Maintain consistent spacing and typography
- ✅ Follow accessibility guidelines
- ✅ Use semantic HTML elements
- ✅ Optimize for performance
- ✅ Test across different devices and browsers
- ✅ Use utility classes for common patterns
- ✅ Maintain sufficient color contrast

### Don'ts
- ❌ Don't use arbitrary values without good reason
- ❌ Don't ignore keyboard navigation
- ❌ Don't rely solely on color for information
- ❌ Don't create overly complex CSS selectors
- ❌ Don't forget to test on real devices
- ❌ Don't use animations that may cause seizures
- ❌ Don't ignore loading states and error handling

---

*This styling guide is maintained by the PDL Rentals development team and updated with each design system change or new component addition.*