# Deployment Guide

This guide provides comprehensive instructions for deploying the PDL Rentals website to various hosting platforms and environments.

## 🌐 Deployment Overview

### Supported Platforms

- **Vercel** (Recommended) - Optimal for React/Vite applications
- **Netlify** - Alternative static hosting with serverless functions
- **AWS S3 + CloudFront** - Traditional cloud hosting
- **GitHub Pages** - Simple static hosting
- **DigitalOcean App Platform** - Full-stack hosting

### Architecture

```
Frontend (Static Assets) → CDN → Users
     ↓
Backend (Supabase)
     ↓
Database (PostgreSQL)
```

## 🚀 Vercel Deployment (Recommended)

### Automatic Deployment

1. **Connect Repository**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Import `jholt1988/pdlwebsite` repository

2. **Configure Project**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Environment Variables**
   ```bash
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Automatic deployments on every push to main

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd pdlwebsite
vercel

# Follow prompts to configure project
```

### Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "headers": {
        "cache-control": "public, immutable, max-age=31536000"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 📦 Netlify Deployment

### Automatic Deployment

1. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - Connect GitHub account
   - Select `jholt1988/pdlwebsite`

2. **Build Settings**
   ```
   Build Command: npm run build
   Publish Directory: dist
   ```

3. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add the same variables as Vercel

### Netlify Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, immutable, max-age=31536000"
```

### Deploy with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

## ☁️ AWS S3 + CloudFront

### S3 Bucket Setup

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://pdl-rentals-website
   ```

2. **Configure Static Website Hosting**
   ```json
   {
     "IndexDocument": {
       "Suffix": "index.html"
     },
     "ErrorDocument": {
       "Key": "index.html"
     }
   }
   ```

3. **Set Bucket Policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::pdl-rentals-website/*"
       }
     ]
   }
   ```

### CloudFront Distribution

```json
{
  "Origins": [
    {
      "Id": "S3-pdl-rentals-website",
      "DomainName": "pdl-rentals-website.s3.amazonaws.com",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }
  ],
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-pdl-rentals-website",
    "ViewerProtocolPolicy": "redirect-to-https",
    "DefaultTTL": 86400,
    "MaxTTL": 31536000
  },
  "CustomErrorResponses": [
    {
      "ErrorCode": 404,
      "ResponseCode": 200,
      "ResponsePagePath": "/index.html",
      "ErrorCachingMinTTL": 300
    }
  ]
}
```

### Deployment Script

```bash
#!/bin/bash
# deploy-aws.sh

# Build the application
npm run build

# Upload to S3
aws s3 sync dist/ s3://pdl-rentals-website --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

## 🐙 GitHub Pages

### GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        VITE_ENV: production
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Manual GitHub Pages

```bash
# Build the application
npm run build

# Install gh-pages utility
npm install -g gh-pages

# Deploy to gh-pages branch
gh-pages -d dist
```

## 🌊 DigitalOcean App Platform

### App Spec Configuration

Create `.do/app.yaml`:

```yaml
name: pdl-rentals-website
services:
- name: web
  source_dir: /
  github:
    repo: jholt1988/pdlwebsite
    branch: main
    deploy_on_push: true
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  static_sites:
  - name: pdl-website
    source_dir: /dist
    index_document: index.html
    error_document: index.html
    catchall_document: index.html
```

### Environment Variables

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ENV=production
```

## 🗄️ Supabase Backend Deployment

### Edge Functions Deployment

1. **Install Supabase CLI**
   ```bash
   npm install -g supabase
   ```

2. **Login and Link Project**
   ```bash
   supabase login
   supabase link --project-ref your-project-ref
   ```

3. **Deploy Functions**
   ```bash
   supabase functions deploy applications
   ```

4. **Environment Variables**
   ```bash
   supabase secrets set OPENAI_API_KEY=your-key
   supabase secrets set SMTP_PASSWORD=your-password
   ```

### Database Migrations

```bash
# Apply migrations
supabase db push

# Reset database (development only)
supabase db reset
```

## 🔧 Build Optimization

### Production Build Configuration

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
})
```

### Bundle Analysis

```bash
# Build with analysis
npm run build

# Analyze bundle
npx vite-bundle-analyzer dist/assets/*.js
```

### Performance Optimization

```typescript
// Lazy load components
const Properties = lazy(() => import('./pages/Properties'))
const Application = lazy(() => import('./pages/Application'))

// Preload critical resources
<link rel="preload" href="/assets/hero-image.jpg" as="image">
<link rel="preconnect" href="https://fonts.googleapis.com">
```

## 🔐 Security Configuration

### Security Headers

```javascript
// Security headers for hosting platforms
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    font-src 'self' fonts.gstatic.com;
    img-src 'self' data: blob:;
    connect-src 'self' *.supabase.co;
  `.replace(/\s+/g, ' ').trim()
}
```

### Environment Security

```bash
# Production environment variables
VITE_SUPABASE_URL=https://production-ref.supabase.co
VITE_SUPABASE_ANON_KEY=production-anon-key
VITE_ENV=production

# Never expose service role keys in frontend
# VITE_SUPABASE_SERVICE_ROLE_KEY=❌ DO NOT USE
```

## 📊 Monitoring and Analytics

### Deployment Monitoring

```bash
# Health check endpoint
curl -f https://your-domain.com/health || exit 1

# Performance monitoring
curl -w "@curl-format.txt" -o /dev/null -s "https://your-domain.com"
```

### Error Tracking

```typescript
// Add error boundary for production
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.PROD) {
      // Send to error tracking service
      console.error('Application error:', error, errorInfo)
    }
  }
}
```

### Analytics Integration

```html
<!-- Google Analytics (in index.html) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 CI/CD Pipeline

### GitHub Actions Full Pipeline

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run lint
    - run: npm run type-check
    - run: npm run test # when tests are implemented

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    - run: npm ci
    - run: npm run build
    - uses: actions/upload-artifact@v3
      with:
        name: dist
        path: dist/

  deploy-staging:
    needs: build
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/download-artifact@v3
      with:
        name: dist
        path: dist/
    - name: Deploy to Staging
      run: |
        # Deploy to staging environment
        echo "Deploying to staging..."

  deploy-production:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
    - uses: actions/download-artifact@v3
      with:
        name: dist
        path: dist/
    - name: Deploy to Production
      run: |
        # Deploy to production environment
        echo "Deploying to production..."
```

## 🚨 Rollback Strategy

### Quick Rollback

```bash
# Vercel rollback
vercel --prod --rollback

# Netlify rollback
netlify sites:list
netlify api listSiteDeployments --site-id=SITE_ID
netlify api restoreSiteDeploy --site-id=SITE_ID --deploy-id=DEPLOY_ID
```

### Git-based Rollback

```bash
# Revert to previous commit
git revert HEAD --no-edit
git push origin main

# Automatic redeployment will trigger
```

## 📋 Deployment Checklist

### Pre-deployment

- [ ] All tests pass locally
- [ ] Build completes without errors
- [ ] Environment variables are configured
- [ ] Security headers are implemented
- [ ] Performance is optimized
- [ ] Mobile responsiveness verified

### Post-deployment

- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Forms submit successfully
- [ ] Images and assets load
- [ ] Analytics tracking works
- [ ] Error monitoring is active

### Performance Verification

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# Core Web Vitals check
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://your-domain.com&category=performance"
```

## 🔮 Advanced Deployment

### Multi-environment Setup

```yaml
# Different configurations per environment
environments:
  development:
    VITE_SUPABASE_URL: dev-url
    VITE_API_BASE_URL: localhost:54321
  staging:
    VITE_SUPABASE_URL: staging-url
    VITE_API_BASE_URL: staging-api
  production:
    VITE_SUPABASE_URL: prod-url
    VITE_API_BASE_URL: prod-api
```

### Blue-Green Deployment

```bash
# Deploy to secondary environment
deploy-to-green-environment.sh

# Health check green environment
test-green-environment.sh

# Switch traffic to green
switch-to-green.sh

# Cleanup blue environment
cleanup-blue.sh
```

### Canary Deployment

```yaml
# Gradual traffic routing
traffic_split:
  - weight: 90
    latest_revision: false
  - weight: 10
    latest_revision: true
```

## 🛠️ Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18.x+
```

#### Environment Variable Issues
```bash
# Verify variables are loaded
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)

# Check variable naming (must start with VITE_)
VITE_API_KEY=correct
API_KEY=incorrect # Won't be available in browser
```

#### Routing Issues
```javascript
// Ensure all routes redirect to index.html
// For single-page applications
"routes": [
  { "src": "/(.*)", "dest": "/index.html" }
]
```

---

*This deployment guide is maintained by the PDL Rentals development team and updated with each deployment platform change or infrastructure improvement.*