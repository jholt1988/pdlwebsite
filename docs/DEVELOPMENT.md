# Development Guide

This guide provides comprehensive instructions for setting up and working with the PDL Rentals website development environment.

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher)
  ```bash
  node --version  # Should be v18.x.x or higher
  ```
- **npm** (comes with Node.js)
  ```bash
  npm --version   # Should be 8.x.x or higher
  ```
- **Git** for version control
  ```bash
  git --version
  ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jholt1988/pdlwebsite.git
   cd pdlwebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The development server supports hot reload

## 📁 Development Environment Setup

### VS Code Configuration

**Recommended Extensions:**
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-eslint"
  ]
}
```

**VS Code Settings** (`.vscode/settings.json`):
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Development Settings
VITE_ENV=development
VITE_API_BASE_URL=http://localhost:54321/functions/v1

# Optional: Analytics
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

**Important**: Never commit `.env.local` or any files containing secrets to version control.

## 🛠️ Development Scripts

### Available npm Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run dev:host     # Start dev server accessible from network

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run type-check   # Run TypeScript type checking

# Utilities
npm run clean        # Clean build artifacts
npm run analyze      # Analyze bundle size
```

### Custom Development Scripts

Add these scripts to `package.json` for enhanced development:

```json
{
  "scripts": {
    "dev:host": "vite --host",
    "type-check": "tsc --noEmit",
    "lint:fix": "eslint . --fix",
    "clean": "rm -rf dist node_modules/.vite",
    "analyze": "npx vite-bundle-analyzer"
  }
}
```

## 🔧 Technology Stack Details

### Frontend Technologies

#### React 18
- **Hooks-based development** - Use functional components with hooks
- **Concurrent features** - Automatic batching, transitions
- **Strict mode** - Enabled in development for better debugging

#### TypeScript
- **Strict mode enabled** - Enhanced type safety
- **Path aliases** - Configured for clean imports
- **Type definitions** - Located in `src/types/`

#### Vite Build Tool
- **Fast HMR** - Hot module replacement for instant updates
- **ES modules** - Native ES module support
- **Plugin ecosystem** - React, TypeScript, CSS plugins

#### Tailwind CSS
- **Utility-first** - Compose styles with utility classes
- **JIT compilation** - Just-in-time CSS generation
- **Custom configuration** - Extended theme in `tailwind.config.js`

### Backend Technologies

#### Supabase
- **PostgreSQL database** - Relational database with full SQL support
- **Edge Functions** - Serverless TypeScript functions
- **Real-time subscriptions** - Live data updates
- **Authentication** - Built-in user management

## 📂 Project Structure

### Source Directory

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation component
│   ├── Footer.tsx      # Site footer
│   └── WelcomeVideoOverlay.tsx  # Video modal
├── pages/              # Route-specific page components
│   ├── Home.tsx        # Main landing page
│   ├── Properties.tsx  # Property listings
│   ├── About.tsx       # Company information
│   ├── Contact.tsx     # Contact forms
│   ├── Application.tsx # Rental application
│   └── RetroHome.tsx   # Alternative theme
├── styles/             # CSS and styling
│   ├── index.css       # Global styles
│   └── retro.css       # Retro theme styles
├── types/              # TypeScript type definitions
│   └── index.ts        # Global type exports
├── utils/              # Helper functions
│   └── browserStorage.ts # Local storage utilities
├── videos/             # Video-related assets
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

### Configuration Files

```
├── eslint.config.js    # ESLint configuration
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
├── tsconfig.app.json   # App-specific TypeScript config
├── tsconfig.node.json  # Node.js TypeScript config
└── vite.config.ts      # Vite build configuration
```

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices

#### Utility-First Approach
```typescript
// Good: Use utility classes
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
  <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome</h1>
  <p className="text-lg text-gray-600 text-center max-w-md">
    Description text here
  </p>
</div>

// Avoid: Custom CSS when utilities suffice
<div className="custom-hero-section">
  <h1 className="custom-title">Welcome</h1>
  <p className="custom-description">Description text here</p>
</div>
```

#### Responsive Design
```typescript
// Mobile-first responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="p-4 bg-white rounded-lg shadow-sm">
    <h3 className="text-lg md:text-xl font-semibold mb-2">Title</h3>
    <p className="text-sm md:text-base text-gray-600">Content</p>
  </div>
</div>
```

#### Component Organization
```typescript
// Keep classes organized and readable
<button className={`
  inline-flex items-center justify-center
  px-4 py-2 border border-transparent
  text-sm font-medium rounded-md
  text-white bg-blue-600
  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
  transition-colors duration-200
  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
`}>
  {loading ? 'Processing...' : 'Submit'}
</button>
```

### Custom CSS Guidelines

When utility classes aren't sufficient:

```css
/* Use CSS modules for component-specific styles */
.videoOverlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.videoContainer {
  position: relative;
  width: 90vw;
  max-width: 800px;
  aspect-ratio: 16 / 9;
}
```

## 🔤 TypeScript Guidelines

### Type Definitions

#### Component Props
```typescript
interface ComponentProps {
  title: string;
  description?: string;
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  children?: React.ReactNode;
}

const Component: React.FC<ComponentProps> = ({
  title,
  description,
  onSubmit,
  loading = false,
  children
}) => {
  // Component implementation
};
```

#### Form Data Types
```typescript
interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  // ... other fields
}

interface ValidationErrors {
  [key: keyof ApplicationFormData]: string;
}
```

#### API Response Types
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string>;
  };
}

interface ApplicationSubmissionResponse {
  applicationId: string;
  submissionTimestamp: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
}
```

### Best Practices

#### Use Strict Types
```typescript
// Good: Strict typing
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
}

// Avoid: Any types
interface User {
  id: any;
  email: any;
  data: any;
}
```

#### Generic Functions
```typescript
// Reusable generic function
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Usage
const userData = await fetchData<User>('/api/users/1');
const applications = await fetchData<Application[]>('/api/applications');
```

## 🧪 Testing Strategy

### Unit Testing (Future Implementation)

When implementing tests, follow these patterns:

```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  test('renders form fields correctly', () => {
    render(<ContactForm onSubmit={jest.fn()} />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    const mockSubmit = jest.fn();
    render(<ContactForm onSubmit={mockSubmit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
```

### Integration Testing

```typescript
// API integration testing
import { ApplicationService } from './services/ApplicationService';

describe('ApplicationService', () => {
  test('submits application successfully', async () => {
    const service = new ApplicationService();
    const mockData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      // ... other required fields
    };

    const result = await service.submitApplication(mockData);
    
    expect(result.success).toBe(true);
    expect(result.data.applicationId).toBeDefined();
  });
});
```

## 🔍 Debugging

### Browser Developer Tools

#### React Developer Tools
- Install React DevTools browser extension
- Inspect component props and state
- Profile component performance

#### Network Tab
- Monitor API requests and responses
- Check request headers and payloads
- Verify CORS settings

#### Console Debugging
```typescript
// Conditional logging
const DEBUG = import.meta.env.VITE_ENV === 'development';

function debugLog(message: string, data?: any) {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, data);
  }
}

// Usage
debugLog('Form submission', formData);
debugLog('API response', response);
```

### Vite Development Features

#### Hot Module Replacement (HMR)
```typescript
// Accept HMR updates
if (import.meta.hot) {
  import.meta.hot.accept();
}
```

#### Environment Variables
```typescript
// Access environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;
```

## 🚀 Performance Optimization

### Code Splitting

```typescript
// Lazy load components
import { lazy, Suspense } from 'react';

const Properties = lazy(() => import('./pages/Properties'));
const Application = lazy(() => import('./pages/Application'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/properties" element={<Properties />} />
        <Route path="/application" element={<Application />} />
      </Routes>
    </Suspense>
  );
}
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/assets/*.js
```

### Image Optimization

```typescript
// Responsive images
<img 
  src="/images/property-large.jpg"
  srcSet="
    /images/property-small.jpg 480w,
    /images/property-medium.jpg 768w,
    /images/property-large.jpg 1200w
  "
  sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
  alt="Property description"
  loading="lazy"
/>
```

## 🔄 State Management

### Local State with useState

```typescript
interface FormState {
  data: FormData;
  errors: ValidationErrors;
  loading: boolean;
}

const [state, setState] = useState<FormState>({
  data: initialFormData,
  errors: {},
  loading: false
});

// Update specific parts of state
const updateFormData = (field: keyof FormData, value: string) => {
  setState(prev => ({
    ...prev,
    data: { ...prev.data, [field]: value },
    errors: { ...prev.errors, [field]: '' } // Clear error
  }));
};
```

### Global State (Future Implementation)

For complex state management, consider:

```typescript
// Context API for global state
const AppContext = createContext<AppState | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Zustand for simple global state
import { create } from 'zustand';

interface AppStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

## 📝 Code Quality

### ESLint Configuration

Current rules enforce:
- TypeScript best practices
- React hooks rules
- Accessibility guidelines
- Code formatting consistency

```javascript
// eslint.config.js highlights
export default [
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error'
    }
  }
];
```

### Pre-commit Hooks (Future)

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## 🤝 Team Collaboration

### Git Workflow

#### Branch Naming
```bash
feature/component-name    # New features
bugfix/issue-description  # Bug fixes
hotfix/critical-fix      # Production hotfixes
docs/documentation-update # Documentation changes
```

#### Commit Messages
```bash
feat: add property search functionality
fix: resolve mobile navigation bug
docs: update API documentation
style: improve button hover states
refactor: optimize image loading
```

### Code Review Checklist

- [ ] Code follows established patterns
- [ ] TypeScript types are properly defined
- [ ] Components are properly structured
- [ ] Styling follows Tailwind conventions
- [ ] Accessibility features are implemented
- [ ] No console errors in development
- [ ] Mobile responsiveness is maintained

## 🔮 Development Roadmap

### Immediate Improvements
- [ ] Add comprehensive test suite
- [ ] Implement error boundaries
- [ ] Add loading states for better UX
- [ ] Optimize bundle size

### Future Enhancements
- [ ] Progressive Web App (PWA) features
- [ ] Advanced state management
- [ ] Automated testing pipeline
- [ ] Performance monitoring
- [ ] Internationalization (i18n)

---

*This development guide is maintained by the PDL Rentals development team and updated with each technology change or workflow improvement.*