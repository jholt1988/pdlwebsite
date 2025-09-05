# Troubleshooting Guide

This guide provides solutions to common issues encountered when developing, building, or deploying the PDL Rentals website.

## 🚨 Common Development Issues

### Build and Compilation Errors

#### TypeScript Compilation Errors

**Problem**: `Property 'X' does not exist on type 'Y'`
```bash
Error: Property 'firstName' does not exist on type 'FormData'
```

**Solution**:
```typescript
// Define proper interface
interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  // ... other fields
}

// Use the interface
const [formData, setFormData] = useState<ApplicationFormData>({
  firstName: '',
  lastName: '',
  email: '',
});
```

**Problem**: `Cannot find module or its corresponding type declarations`
```bash
Error: Cannot find module '@/components/Header' or its corresponding type declarations
```

**Solution**:
```typescript
// Check tsconfig.json paths configuration
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"]
    }
  }
}

// Or use relative imports
import Header from './components/Header';
import { ApiResponse } from '../types/api';
```

**Problem**: `Type 'any' is not assignable to type 'never'`
```bash
Error: Argument of type 'any' is not assignable to parameter of type 'never'
```

**Solution**:
```typescript
// Define proper types instead of using 'any'
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Use proper generic types
const response: ApiResponse<User> = await fetchUser(id);
```

#### ESLint Errors

**Problem**: `'React' must be in scope when using JSX`
```bash
Error: 'React' must be in scope when using JSX
```

**Solution**:
```typescript
// Import React at the top of the file
import React from 'react';

// Or configure eslint to use automatic JSX runtime
// In eslint.config.js
{
  "rules": {
    "react/react-in-jsx-scope": "off"
  }
}
```

**Problem**: `React Hook useEffect has missing dependencies`
```bash
Warning: React Hook useEffect has missing dependencies: 'fetchData'
```

**Solution**:
```typescript
// Option 1: Add dependencies
useEffect(() => {
  fetchData();
}, [fetchData]);

// Option 2: Use useCallback for function dependencies
const fetchData = useCallback(async () => {
  const response = await api.getData();
  setData(response);
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);

// Option 3: Move function inside useEffect
useEffect(() => {
  const fetchData = async () => {
    const response = await api.getData();
    setData(response);
  };
  fetchData();
}, []);
```

#### Vite Build Issues

**Problem**: Build fails with memory errors
```bash
Error: JavaScript heap out of memory
```

**Solution**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or add to package.json scripts
"build": "cross-env NODE_OPTIONS='--max-old-space-size=4096' vite build"
```

**Problem**: Module not found during build
```bash
Error: Could not resolve "./component" from "src/pages/Home.tsx"
```

**Solution**:
```typescript
// Check file extensions and paths
import Component from './component.tsx'; // Include .tsx extension
import { utils } from '../utils/index';   // Check relative path

// Verify Vite config for resolve aliases
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components')
    }
  }
});
```

### Runtime Errors

#### React Component Errors

**Problem**: `Cannot read property 'map' of undefined`
```bash
TypeError: Cannot read property 'map' of undefined
```

**Solution**:
```typescript
// Use optional chaining and provide fallback
{data?.items?.map(item => (
  <div key={item.id}>{item.name}</div>
)) || <div>No items found</div>}

// Or use default values
const items = data?.items || [];
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// With proper loading state
{loading ? (
  <div>Loading...</div>
) : (
  items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))
)}
```

**Problem**: `Warning: Each child in a list should have a unique "key" prop`
```bash
Warning: Each child in a list should have a unique "key" prop
```

**Solution**:
```typescript
// Use unique identifiers for keys
{items.map(item => (
  <div key={item.id}>{item.name}</div> // Good: unique ID
))}

// Avoid using array index as key when list can change
{items.map((item, index) => (
  <div key={`item-${item.id}-${index}`}>{item.name}</div>
))}

// For static lists, index is acceptable
{staticItems.map((item, index) => (
  <div key={index}>{item.name}</div> // OK for static lists
))}
```

**Problem**: `Warning: Cannot update a component while rendering a different component`
```bash
Warning: Cannot update a component while rendering a different component
```

**Solution**:
```typescript
// Move state updates to event handlers or useEffect
// Bad: State update during render
const Component = () => {
  const [count, setCount] = useState(0);
  setCount(count + 1); // ❌ Don't do this
  
  return <div>{count}</div>;
};

// Good: State update in event handler
const Component = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1); // ✅ Good
  };
  
  return <button onClick={handleClick}>{count}</button>;
};

// Good: State update in useEffect
const Component = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1); // ✅ Good
  }, []);
  
  return <div>{count}</div>;
};
```

### Styling Issues

#### Tailwind CSS Problems

**Problem**: Tailwind classes not applying
```bash
Class 'bg-blue-500' not working
```

**Solution**:
```bash
# Check if Tailwind is properly configured
# Verify tailwind.config.js content paths
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  // ...
}

# Restart development server
npm run dev

# Check if CSS is imported in main.tsx
import './index.css'

# Verify @tailwind directives in CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Problem**: Custom Tailwind classes not working
```bash
Custom class 'btn-primary' not found
```

**Solution**:
```css
/* Add custom classes using @apply directive */
@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700;
  }
}

/* Or use CSS custom properties */
.btn-primary {
  background-color: rgb(59 130 246);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
```

**Problem**: Styles not updating in development
```bash
Changes to CSS not reflected in browser
```

**Solution**:
```bash
# Clear browser cache
Ctrl+Shift+R (Chrome/Firefox)

# Restart development server
npm run dev

# Check browser developer tools for CSS errors
F12 → Console → Look for CSS errors

# Verify file is being watched
# Check Vite config for CSS processing
```

#### Layout Issues

**Problem**: Layout breaking on mobile devices
```bash
Content overflowing on small screens
```

**Solution**:
```typescript
// Use responsive classes
<div className="w-full px-4 sm:px-6 lg:px-8"> {/* Responsive padding */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"> {/* Responsive grid */}
<div className="text-sm md:text-base lg:text-lg"> {/* Responsive text */}

// Use max-width utilities
<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">

// Test on actual devices or browser dev tools
// Chrome DevTools → Toggle device toolbar → Test different screen sizes
```

**Problem**: Images not responsive
```bash
Images overflow container on mobile
```

**Solution**:
```typescript
// Make images responsive
<img className="w-full h-auto" src="image.jpg" alt="Description" />

// Use aspect ratio utilities
<div className="aspect-w-16 aspect-h-9">
  <img className="object-cover w-full h-full" src="image.jpg" alt="Description" />
</div>

// Use picture element for different screen sizes
<picture>
  <source media="(max-width: 768px)" srcSet="mobile-image.jpg" />
  <source media="(min-width: 769px)" srcSet="desktop-image.jpg" />
  <img src="fallback-image.jpg" alt="Description" />
</picture>
```

## 🌐 API and Backend Issues

### Supabase Connection Problems

**Problem**: `Invalid API key` or authentication errors
```bash
Error: Invalid API key
```

**Solution**:
```bash
# Check environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Verify .env.local file exists and has correct values
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Restart development server after env changes
npm run dev

# Check Supabase dashboard for correct keys
# Project Settings → API → Project URL and anon/public key
```

**Problem**: CORS errors when calling Supabase functions
```bash
Access to fetch at 'https://project.supabase.co/functions/v1/applications' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**:
```typescript
// Check Edge Function CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Handle OPTIONS requests in Edge Function
if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders })
}

// Add headers to all responses
return new Response(
  JSON.stringify(data),
  { 
    headers: { 
      ...corsHeaders,
      'Content-Type': 'application/json' 
    } 
  }
)
```

**Problem**: Database queries failing
```bash
Error: relation "applications" does not exist
```

**Solution**:
```bash
# Check if migrations are applied
supabase db pull
supabase db push

# Verify table exists in Supabase dashboard
# Database → Tables → Check for 'applications' table

# Check Row Level Security (RLS) policies
# Database → Authentication → RLS policies

# Test query in SQL editor
SELECT * FROM applications LIMIT 1;
```

### Network and Performance Issues

**Problem**: Slow API responses
```bash
Application form submission taking too long
```

**Solution**:
```typescript
// Add loading states
const [loading, setLoading] = useState(false);

const handleSubmit = async (data) => {
  setLoading(true);
  try {
    const result = await submitApplication(data);
    // Handle success
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};

// Implement timeout for requests
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds

try {
  const response = await fetch(url, {
    signal: controller.signal,
    // ... other options
  });
  clearTimeout(timeoutId);
} catch (error) {
  if (error.name === 'AbortError') {
    console.error('Request timed out');
  }
}

// Optimize large file uploads
const compressFile = (file) => {
  // Implement file compression
  return compressedFile;
};
```

**Problem**: Memory leaks with useEffect
```bash
Warning: Can't perform a React state update on an unmounted component
```

**Solution**:
```typescript
// Use cleanup function in useEffect
useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    const response = await api.getData();
    if (isMounted) {
      setData(response);
    }
  };
  
  fetchData();
  
  return () => {
    isMounted = false; // Cleanup
  };
}, []);

// Use AbortController for fetch requests
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        signal: controller.signal
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error);
      }
    }
  };
  
  fetchData();
  
  return () => {
    controller.abort(); // Cleanup
  };
}, []);
```

## 🚀 Deployment Issues

### Build Deployment Problems

**Problem**: Environment variables not working in production
```bash
Production build showing undefined for environment variables
```

**Solution**:
```bash
# Ensure variables are prefixed with VITE_ for client-side access
VITE_SUPABASE_URL=https://your-project.supabase.co  # ✅ Good
SUPABASE_URL=https://your-project.supabase.co       # ❌ Won't work in browser

# Check deployment platform environment variables
# Vercel: Project Settings → Environment Variables
# Netlify: Site Settings → Environment Variables
# GitHub Pages: Repository Settings → Secrets

# Verify variables in build logs
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
```

**Problem**: Routing not working in production (404 errors)
```bash
404 errors when navigating to /properties or /about
```

**Solution**:
```bash
# Configure redirects for SPA routing

# Vercel (vercel.json)
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}

# Netlify (_redirects file in public folder)
/*    /index.html   200

# Apache (.htaccess)
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Nginx
try_files $uri $uri/ /index.html;
```

**Problem**: Large bundle size affecting performance
```bash
Bundle size too large, slow loading times
```

**Solution**:
```typescript
// Implement code splitting with lazy loading
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

// Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/assets/*.js

// Configure Vite for better chunking
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
```

### SSL and Security Issues

**Problem**: Mixed content warnings (HTTP resources on HTTPS site)
```bash
Mixed Content: The page was loaded over HTTPS, but requested an insecure resource
```

**Solution**:
```typescript
// Ensure all resources use HTTPS
<img src="https://example.com/image.jpg" alt="Description" />

// Use protocol-relative URLs
<img src="//example.com/image.jpg" alt="Description" />

// For local development, use relative paths
<img src="/assets/image.jpg" alt="Description" />

// Configure Content Security Policy
<meta http-equiv="Content-Security-Policy" 
      content="upgrade-insecure-requests">
```

## 🛠️ Development Environment Issues

### Node.js and npm Problems

**Problem**: `npm install` fails with permission errors
```bash
EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**Solution**:
```bash
# Use Node Version Manager (nvm) instead of global install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Or fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Version conflicts between dependencies
```bash
ERESOLVE unable to resolve dependency tree
```

**Solution**:
```bash
# Try legacy peer deps
npm install --legacy-peer-deps

# Or force resolution
npm install --force

# Check for conflicting versions
npm ls

# Update dependencies
npm update

# Use exact versions in package.json
"react": "18.3.1" // Instead of "^18.3.1"
```

### IDE and Editor Issues

**Problem**: VS Code not recognizing TypeScript types
```bash
TypeScript intellisense not working
```

**Solution**:
```bash
# Restart TypeScript server
Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Check workspace TypeScript version
Ctrl+Shift+P → "TypeScript: Select TypeScript Version"
Choose "Use Workspace Version"

# Verify tsconfig.json is valid
npx tsc --noEmit

# Check VS Code extensions
# Install "TypeScript and JavaScript Language Features"
```

**Problem**: ESLint not working in VS Code
```bash
ESLint errors not showing in editor
```

**Solution**:
```bash
# Install ESLint extension
# VS Code Extensions → Search "ESLint" → Install

# Check ESLint configuration
npx eslint --print-config src/App.tsx

# Restart VS Code
# Or reload window: Ctrl+Shift+P → "Developer: Reload Window"

# Check VS Code settings
{
  "eslint.workingDirectories": ["./"],
  "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"]
}
```

## 🔍 Debugging Techniques

### Browser Developer Tools

#### Console Debugging
```typescript
// Use console methods effectively
console.log('Basic logging:', variable);
console.error('Error logging:', error);
console.warn('Warning logging:', warning);
console.table(arrayOfObjects); // Nice table format
console.group('Grouped logs');
console.log('Item 1');
console.log('Item 2');
console.groupEnd();

// Conditional logging
const DEBUG = import.meta.env.DEV;
DEBUG && console.log('Debug info:', data);

// Performance timing
console.time('API Call');
await apiCall();
console.timeEnd('API Call');
```

#### Network Tab Debugging
```bash
# Check API requests
1. Open Developer Tools (F12)
2. Go to Network tab
3. Filter by "XHR" or "Fetch"
4. Look for failed requests (red status)
5. Check request headers, payload, and response

# Common issues to look for:
- 404: Endpoint not found
- 401: Authentication issue
- 403: Permission denied
- 500: Server error
- CORS: Cross-origin request blocked
```

#### React DevTools
```bash
# Install React Developer Tools browser extension
# Chrome Web Store → "React Developer Tools"

# Usage:
1. Open Developer Tools
2. Click "Components" tab
3. Inspect component props and state
4. Click "Profiler" tab for performance analysis

# Find components causing re-renders
# Look for components highlighted in yellow/red
```

### Error Boundary Implementation

```typescript
// Create error boundary for better error handling
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Send to error reporting service in production
    if (import.meta.env.PROD) {
      // reportError(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We're sorry, but something unexpected happened.
            </p>
            <button
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## 📞 Getting Help

### Internal Resources

1. **Documentation**: Check docs/ directory first
2. **Code Comments**: Look for JSDoc comments in components
3. **Git History**: `git log --oneline` for recent changes
4. **Issue Tracker**: Check GitHub issues for similar problems

### External Resources

1. **React Documentation**: [react.dev](https://react.dev)
2. **TypeScript Handbook**: [typescriptlang.org](https://www.typescriptlang.org/docs/)
3. **Tailwind CSS Docs**: [tailwindcss.com](https://tailwindcss.com/docs)
4. **Vite Guide**: [vitejs.dev](https://vitejs.dev/guide/)
5. **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

### Community Support

1. **Stack Overflow**: Search existing questions first
2. **GitHub Discussions**: For project-specific questions
3. **Discord/Reddit**: React, TypeScript, and Tailwind communities

### Creating Good Bug Reports

```markdown
## Bug Report Template

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Node.js version: [e.g. 18.17.0]
- npm version: [e.g. 9.6.7]

**Additional context**
Add any other context about the problem here.

**Console errors**
```
Paste any console errors here
```

**Code snippets**
```typescript
// Relevant code that's causing the issue
```
```

---

*This troubleshooting guide is maintained by the PDL Rentals development team. If you encounter an issue not covered here, please create a GitHub issue with detailed information.*