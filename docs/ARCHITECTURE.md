# Architecture Overview

This document provides a comprehensive overview of the PDL Rentals website architecture, including system design, technology choices, and implementation patterns.

## 🏗️ High-Level Architecture

### System Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Client        │    │   Application    │    │   Backend       │
│   (Browser)     │◄──►│   (React SPA)    │◄──►│   (Supabase)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
│                      │                      │
│ • HTML/CSS/JS        │ • React Components   │ • PostgreSQL DB
│ • Responsive UI      │ • TypeScript Logic   │ • Edge Functions
│ • Modern Browsers    │ • Vite Build Tool    │ • Authentication
│                      │ • Tailwind Styles   │ • File Storage
```

### Technology Stack

#### Frontend Layer
- **React 18** - UI framework with modern hooks
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

#### Backend Layer
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database
- **Edge Functions** - Serverless TypeScript functions
- **Real-time APIs** - Live data synchronization

#### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking
- **npm** - Package management

## 🎯 Design Principles

### 1. Component-Based Architecture

```
App.tsx
├── Router Configuration
├── Route Definitions
└── Layout Components
    ├── Header.tsx (Navigation)
    ├── Main Content Area
    │   ├── Home.tsx
    │   ├── Properties.tsx
    │   ├── About.tsx
    │   ├── Contact.tsx
    │   ├── Application.tsx
    │   └── RetroHome.tsx
    └── Footer.tsx (Site Info)
```

### 2. Separation of Concerns

- **Components** - UI presentation and interaction
- **Pages** - Route-specific component composition
- **Utils** - Shared business logic and helpers
- **Types** - TypeScript interfaces and type definitions
- **Styles** - Global styling and CSS modules

### 3. Responsive Design

- **Mobile-first** approach with Tailwind CSS
- **Flexible layouts** using CSS Grid and Flexbox
- **Scalable typography** and spacing systems
- **Touch-friendly** interactions for mobile devices

## 📁 Project Structure

### Source Directory Layout

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Site navigation
│   ├── Footer.tsx       # Site footer
│   └── WelcomeVideoOverlay.tsx  # Video modal
├── pages/               # Route-specific pages
│   ├── Home.tsx         # Landing page
│   ├── Properties.tsx   # Property listings
│   ├── About.tsx        # Company information
│   ├── Contact.tsx      # Contact forms
│   ├── Application.tsx  # Rental applications
│   └── RetroHome.tsx    # Alternative theme
├── styles/              # Global and component styles
│   ├── index.css        # Global styles
│   └── retro.css        # Retro theme styles
├── types/               # TypeScript type definitions
├── utils/               # Helper functions and utilities
│   └── browserStorage.ts # Local storage utilities
├── videos/              # Video-related assets
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

### Public Assets

```
public/
├── assets/              # Static images and media
│   ├── PDL_Logo.svg     # Company logo
│   └── videos/          # Video files
└── captions/            # Video caption files
```

## 🔄 Data Flow

### 1. Application Initialization

```typescript
main.tsx → App.tsx → Router → Page Components
```

1. **main.tsx** - Bootstraps React application
2. **App.tsx** - Sets up routing and global layout
3. **Router** - Handles client-side navigation
4. **Page Components** - Render route-specific content

### 2. State Management

- **Local State** - React useState for component state
- **URL State** - React Router for navigation state
- **Browser Storage** - localStorage for persistence
- **Form State** - Controlled components for forms

### 3. Data Communication

```typescript
Frontend ←→ Supabase Backend
├── REST API calls for data operations
├── Real-time subscriptions for live updates
├── File uploads for application documents
└── Authentication for secure access
```

## 🌐 Routing Architecture

### Route Configuration

```typescript
// App.tsx route structure
<Routes>
  <Route path="/retro" element={<RetroHome />} />
  <Route path="/*" element={
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/application" element={<Application />} />
        </Routes>
      </main>
      <Footer />
    </>
  } />
</Routes>
```

### Navigation Pattern

- **Nested routing** for main application layout
- **Special route** for retro theme without standard layout
- **Programmatic navigation** using React Router hooks
- **URL-based state** for shareable links

## 🎨 Styling Architecture

### Tailwind CSS Structure

```css
/* Utility-first approach */
<div className="flex flex-col min-h-screen bg-gray-50">
  <header className="sticky top-0 z-50 bg-white shadow-sm">
    <!-- Navigation content -->
  </header>
  <main className="flex-1 container mx-auto px-4 py-8">
    <!-- Page content -->
  </main>
  <footer className="bg-gray-800 text-white">
    <!-- Footer content -->
  </footer>
</div>
```

### CSS Organization

- **Global styles** in `index.css`
- **Component styles** using Tailwind classes
- **Custom CSS** in separate modules when needed
- **Responsive breakpoints** following Tailwind conventions

## 🔌 Backend Integration

### Supabase Architecture

```typescript
// API Communication Pattern
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', value);

// Real-time Subscriptions
const subscription = supabase
  .channel('public:table_name')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'table_name' }, payload => {
    // Handle real-time updates
  })
  .subscribe();
```

### Edge Functions

- **Application processing** - Handle rental applications
- **Email notifications** - Send automated emails
- **Data validation** - Server-side form validation
- **File processing** - Handle document uploads

## 🔒 Security Architecture

### Client-Side Security

- **Input validation** on all form fields
- **XSS prevention** through React's built-in protection
- **Type safety** with TypeScript
- **Secure routing** with proper authentication checks

### Backend Security

- **Row Level Security** (RLS) in Supabase
- **API authentication** with JWT tokens
- **CORS configuration** for secure cross-origin requests
- **Input sanitization** in Edge Functions

## 🚀 Performance Architecture

### Frontend Optimization

- **Code splitting** with dynamic imports
- **Lazy loading** for route components
- **Asset optimization** with Vite
- **Bundle analysis** for size monitoring

### Backend Optimization

- **Database indexing** for query performance
- **Connection pooling** in Supabase
- **CDN delivery** for static assets
- **Caching strategies** where appropriate

## 📱 Responsive Design

### Breakpoint Strategy

```typescript
// Tailwind CSS breakpoints
sm: '640px'   // Small devices
md: '768px'   // Medium devices (tablets)
lg: '1024px'  // Large devices (laptops)
xl: '1280px'  // Extra large devices (desktops)
2xl: '1536px' // 2X large devices (large desktops)
```

### Mobile-First Approach

- **Base styles** target mobile devices
- **Progressive enhancement** for larger screens
- **Touch-friendly** interface elements
- **Optimized images** for different screen densities

## 🔄 Build Architecture

### Development Build

```bash
npm run dev
├── Vite development server
├── Hot module replacement (HMR)
├── TypeScript compilation
└── Tailwind CSS processing
```

### Production Build

```bash
npm run build
├── TypeScript compilation
├── React component optimization
├── CSS purging and minification
├── Asset bundling and compression
└── Static file generation
```

## 🧪 Testing Architecture

### Testing Strategy

- **Component testing** with React Testing Library (when implemented)
- **Type checking** with TypeScript compiler
- **Linting** with ESLint for code quality
- **Manual testing** across different devices and browsers

### Quality Assurance

- **Code reviews** for all changes
- **Browser compatibility** testing
- **Performance monitoring** in production
- **Accessibility audits** for WCAG compliance

## 📈 Scalability Considerations

### Frontend Scalability

- **Component reusability** for maintainable code
- **Modular architecture** for easy feature additions
- **Performance monitoring** for optimization opportunities
- **Progressive enhancement** for broader device support

### Backend Scalability

- **Supabase auto-scaling** for database and API
- **Edge Functions** for distributed processing
- **CDN integration** for global content delivery
- **Monitoring and alerting** for proactive maintenance

## 🔮 Future Architecture

### Planned Enhancements

- **Progressive Web App** (PWA) capabilities
- **Advanced state management** (Redux/Zustand if needed)
- **Micro-frontend** architecture for larger teams
- **Automated testing** suite implementation
- **CI/CD pipeline** for deployment automation

### Technology Evolution

- **React 19** migration when stable
- **Vite 6** upgrade for latest features
- **New Tailwind** features adoption
- **Supabase** feature integration

---

*This architecture document is maintained by the PDL Rentals development team and updated with each major system change.*