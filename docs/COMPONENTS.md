# Component Documentation

This document provides comprehensive documentation for all React components in the PDL Rentals website, including usage examples, props, and best practices.

## 📋 Component Overview

### Component Categories

- **Layout Components** - Header, Footer, main structure
- **Page Components** - Route-specific page implementations
- **Feature Components** - Video overlay, forms, interactive elements
- **Utility Components** - Reusable UI elements

### Component Tree

```
App.tsx
├── Router
├── Header.tsx (Navigation)
├── Main Content
│   ├── Home.tsx
│   ├── Properties.tsx  
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Application.tsx
│   └── RetroHome.tsx (Alternative layout)
├── Footer.tsx
└── WelcomeVideoOverlay.tsx (Modal)
```

## 🧩 Layout Components

### Header.tsx

**Purpose**: Main navigation component with responsive design

**Features**:
- Responsive navigation menu
- Logo integration
- Mobile hamburger menu
- Active route highlighting

**Usage**:
```typescript
import Header from './components/Header';

// Used in main app layout
<Header />
```

**Key Functionality**:
- Navigation between main pages
- Mobile-responsive design
- Accessibility features
- Brand logo display

**Styling**:
- Tailwind CSS classes
- Sticky positioning
- Shadow effects
- Responsive breakpoints

---

### Footer.tsx

**Purpose**: Site footer with company information and links

**Features**:
- Company contact information
- Social media links
- Copyright information
- Additional navigation links

**Usage**:
```typescript
import Footer from './components/Footer';

// Used in main app layout
<Footer />
```

**Key Functionality**:
- Company branding
- Contact information display
- Legal information
- Secondary navigation

**Styling**:
- Dark theme design
- Multi-column layout
- Responsive design
- Consistent spacing

## 🎥 Feature Components

### WelcomeVideoOverlay.tsx

**Purpose**: Modal video player with overlay functionality

**Features**:
- Video playback controls
- Fullscreen capability
- Keyboard navigation
- Close functionality
- Accessibility support

**Props** (Inferred from usage):
```typescript
interface WelcomeVideoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  // Additional props as needed
}
```

**Usage**:
```typescript
import WelcomeVideoOverlay from './components/WelcomeVideoOverlay';

<WelcomeVideoOverlay 
  isOpen={showVideo}
  onClose={() => setShowVideo(false)}
  videoSrc="/path/to/video.mp4"
/>
```

**Key Functionality**:
- Modal overlay behavior
- Video player controls
- Keyboard accessibility
- Focus management
- Responsive design

**Styling**:
- CSS Modules (`WelcomeVideoOverlay.module.css`)
- Overlay backdrop
- Centered positioning
- Animation effects

## 📄 Page Components

### Home.tsx

**Purpose**: Main landing page with company overview

**Features**:
- Hero section
- Service highlights
- Call-to-action buttons
- Company introduction

**Structure**:
```typescript
const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <ServicesSection />
      <AboutPreview />
      <ContactCTA />
    </div>
  );
};
```

**Key Sections**:
- Hero banner with main messaging
- Property management services
- Company value proposition
- Contact information

---

### Properties.tsx

**Purpose**: Property listings and search functionality

**Features**:
- Property grid layout
- Search and filter options
- Property details display
- Responsive image galleries

**Key Functionality**:
- Property data presentation
- Interactive filtering
- Responsive layout
- Image optimization

---

### About.tsx

**Purpose**: Company information and team details

**Features**:
- Company history
- Team member profiles
- Mission and values
- Service descriptions

**Key Sections**:
- Company overview
- Team introductions
- Core values
- Service offerings

---

### Contact.tsx

**Purpose**: Contact forms and company information

**Features**:
- Contact form submission
- Company location details
- Multiple contact methods
- Form validation

**Form Structure**:
```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject: string;
}
```

**Key Functionality**:
- Form validation
- Submission handling
- Contact information display
- Responsive layout

---

### Application.tsx

**Purpose**: Rental application form processing

**Features**:
- Multi-step form
- File upload capabilities
- Form validation
- Progress indicators

**Form Sections**:
- Personal information
- Employment details
- Rental history
- References
- Document uploads

**Key Functionality**:
- Complex form state management
- File upload handling
- Validation logic
- Supabase integration

---

### RetroHome.tsx

**Purpose**: Alternative retro-themed landing page

**Features**:
- Retro styling and animations
- Alternative navigation
- Unique visual design
- Nostalgic user experience

**Key Differences**:
- Custom CSS styling
- Alternative color scheme
- Different layout structure
- Unique animations

## 🔧 Component Patterns

### 1. Functional Components with Hooks

```typescript
import React, { useState, useEffect } from 'react';

const ComponentName: React.FC = () => {
  const [state, setState] = useState<Type>(initialValue);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  return (
    <div className="component-container">
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### 2. TypeScript Interface Definitions

```typescript
interface ComponentProps {
  required: string;
  optional?: number;
  callback: (data: any) => void;
  children?: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({ 
  required, 
  optional = defaultValue, 
  callback,
  children 
}) => {
  // Component implementation
};
```

### 3. Conditional Rendering

```typescript
return (
  <div>
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      <ContentComponent data={data} />
    )}
    
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <ModalContent />
      </Modal>
    )}
  </div>
);
```

### 4. Event Handling

```typescript
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  // Handle form submission
};

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // Handle button click
};
```

## 🎨 Styling Patterns

### Tailwind CSS Classes

```typescript
// Common utility patterns
<div className="flex flex-col min-h-screen bg-gray-50">
  <header className="sticky top-0 z-50 bg-white shadow-sm">
  <main className="flex-1 container mx-auto px-4 py-8">
  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
</div>
```

### Responsive Design

```typescript
// Mobile-first responsive classes
<div className="w-full md:w-1/2 lg:w-1/3">
  <img className="w-full h-48 md:h-64 object-cover rounded-lg" />
  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
</div>
```

### Component-Specific Styles

```typescript
// CSS Modules for component-specific styles
import styles from './Component.module.css';

<div className={`${styles.container} additional-class`}>
  <span className={styles.highlight}>Styled content</span>
</div>
```

## 🔄 State Management

### Local State with useState

```typescript
const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  message: ''
});

const updateField = (field: keyof FormData, value: string) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};
```

### Effect Hooks for Side Effects

```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await api.getData();
      setData(response);
    } catch (error) {
      setError(error.message);
    }
  };

  fetchData();
}, [dependency]);
```

### Callback Hooks for Performance

```typescript
const memoizedCallback = useCallback(
  (param: string) => {
    // Expensive calculation or API call
    return processData(param, dependency);
  },
  [dependency]
);
```

## 📱 Responsive Design

### Mobile-First Approach

```typescript
// Component structure for mobile-first
<div className="container mx-auto px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map(item => (
      <div key={item.id} className="bg-white rounded-lg p-4 shadow">
        <img className="w-full h-48 object-cover rounded mb-4" />
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.description}</p>
      </div>
    ))}
  </div>
</div>
```

### Breakpoint Usage

- **sm (640px)**: Small tablets and large phones
- **md (768px)**: Medium tablets and small laptops
- **lg (1024px)**: Large tablets and laptops
- **xl (1280px)**: Desktop computers
- **2xl (1536px)**: Large desktop computers

## ♿ Accessibility

### ARIA Labels and Roles

```typescript
<button 
  aria-label="Close modal"
  aria-expanded={isOpen}
  onClick={onClose}
>
  <CloseIcon aria-hidden="true" />
</button>

<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
  </ul>
</nav>
```

### Keyboard Navigation

```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Escape') {
    onClose();
  }
  if (event.key === 'Enter' || event.key === ' ') {
    onSubmit();
  }
};
```

### Focus Management

```typescript
useEffect(() => {
  if (isOpen) {
    // Focus first interactive element when modal opens
    const firstFocusable = modalRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (firstFocusable as HTMLElement)?.focus();
  }
}, [isOpen]);
```

## 🧪 Testing Considerations

### Component Testing Structure

```typescript
// Example test structure (when implemented)
describe('ComponentName', () => {
  test('renders correctly with required props', () => {
    // Test implementation
  });

  test('handles user interactions', () => {
    // Interaction testing
  });

  test('displays error states appropriately', () => {
    // Error state testing
  });
});
```

### Testing Best Practices

- Test component behavior, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Test user interactions and edge cases
- Mock external dependencies
- Ensure accessibility compliance

## 🔄 Component Lifecycle

### Modern React Lifecycle with Hooks

```typescript
const Component: React.FC = () => {
  // Mounting phase (componentDidMount equivalent)
  useEffect(() => {
    // Initialize component
    return () => {
      // Cleanup (componentWillUnmount equivalent)
    };
  }, []);

  // Update phase (componentDidUpdate equivalent)
  useEffect(() => {
    // Handle updates
  }, [dependency]);

  // Conditional effects
  useEffect(() => {
    if (condition) {
      // Run effect only when condition is true
    }
  }, [condition]);
};
```

## 📚 Component Documentation Standards

### JSDoc Comments

```typescript
/**
 * WelcomeVideoOverlay component for displaying promotional videos
 * 
 * @param isOpen - Controls visibility of the video overlay
 * @param onClose - Callback function when overlay is closed
 * @param videoSrc - URL or path to the video file
 * @param title - Accessible title for the video content
 * @returns JSX element for video overlay
 */
interface WelcomeVideoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title?: string;
}
```

### PropTypes (if using)

```typescript
// TypeScript interfaces are preferred, but PropTypes can supplement
import PropTypes from 'prop-types';

Component.propTypes = {
  required: PropTypes.string.isRequired,
  optional: PropTypes.number,
  callback: PropTypes.func.isRequired
};
```

## 🔮 Future Component Enhancements

### Planned Improvements

- **Storybook integration** for component documentation
- **Unit testing** with React Testing Library
- **Performance optimization** with React.memo
- **Advanced state management** if complexity increases
- **Component library** extraction for reusability

### Best Practices for New Components

- Follow existing component patterns
- Use TypeScript for type safety
- Implement proper accessibility features
- Add comprehensive documentation
- Consider responsive design requirements
- Test across different browsers and devices

---

*This component documentation is maintained by the PDL Rentals development team and updated with each component addition or modification.*