# Contributing to PDL Rentals Website

Thank you for your interest in contributing to the PDL Rentals website! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

1. **Search existing issues** to avoid duplicates
2. **Use the issue template** when creating new issues
3. **Provide detailed information**:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/videos if applicable
   - Browser and device information

### Suggesting Features

1. **Check the roadmap** for planned features
2. **Open a feature request** with:
   - Clear use case and benefits
   - Detailed description
   - Mockups or examples if applicable

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Submit a pull request**

## 🛠️ Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm (comes with Node.js)
- Git

### Local Development

1. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/pdlwebsite.git
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

4. **Open browser**
   Navigate to `http://localhost:5173`

## 📝 Coding Standards

### TypeScript/JavaScript

- Use **TypeScript** for all new code
- Follow **ES6+** standards
- Use **functional components** with hooks
- Implement proper **error handling**
- Add **JSDoc comments** for complex functions

### React Best Practices

- Use **functional components** over class components
- Implement proper **prop types** or TypeScript interfaces
- Follow **React hooks** best practices
- Use **meaningful component names**
- Keep components **small and focused**

### Styling

- Use **Tailwind CSS** for styling
- Follow **mobile-first** responsive design
- Use **semantic HTML** elements
- Ensure **accessibility** compliance
- Maintain **consistent spacing** and colors

### File Organization

- Use **kebab-case** for file names
- Group related files in appropriate directories
- Keep **components** modular and reusable
- Use **index files** for clean imports

## 🧪 Testing Guidelines

### Before Submitting

1. **Run linting**
   ```bash
   npm run lint
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Test manually**
   - Check all affected pages
   - Test responsive design
   - Verify accessibility
   - Test in multiple browsers

### Code Quality

- Fix all **ESLint warnings** and errors
- Ensure **TypeScript** compiles without errors
- Follow **accessibility** guidelines
- Test on **multiple devices** and browsers

## 🎨 Design Guidelines

### UI/UX Principles

- **Consistency** with existing design system
- **Accessibility** first approach
- **Mobile responsive** design
- **User-friendly** interactions
- **Professional** appearance matching PDL brand

### Colors and Typography

- Use colors from **Tailwind CSS** palette
- Maintain **brand consistency**
- Ensure **sufficient contrast** for accessibility
- Use **system fonts** with proper fallbacks

## 📋 Pull Request Process

### Before Creating a PR

1. **Update your branch** with latest main
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Test your changes** thoroughly
3. **Update documentation** if needed
4. **Run linting and build** to ensure no errors

### PR Requirements

- **Clear title** describing the change
- **Detailed description** of what was changed and why
- **Link to related issues** if applicable
- **Screenshots** for UI changes
- **Testing notes** for reviewers

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** of the changes
4. **Approval** and merge by maintainers

## 🚀 Release Process

### Versioning

- Follow **Semantic Versioning** (SemVer)
- Document changes in **CHANGELOG.md**
- Tag releases appropriately

### Deployment

- Changes are deployed after merge to main
- Production deployment is handled by maintainers
- Emergency hotfixes follow expedited process

## 💬 Communication

### Channels

- **GitHub Issues** - Bug reports and feature requests
- **Pull Request Discussions** - Code review conversations
- **Email** - contact@pdlrentals.com for urgent matters

### Code of Conduct

- Be **respectful** and professional
- **Constructive** feedback only
- **Inclusive** language and behavior
- **Help others** learn and improve

## 📚 Resources

### Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Component Documentation](./docs/COMPONENTS.md)
- [API Documentation](./docs/API.md)
- [Styling Guide](./docs/STYLING.md)

### External Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

## ❓ Questions?

If you have questions that aren't covered in this guide:

1. Check the [documentation](./docs/)
2. Search [existing issues](https://github.com/jholt1988/pdlwebsite/issues)
3. Create a new issue with the **question** label
4. Contact the team at contact@pdlrentals.com

Thank you for contributing to PDL Rentals! 🏠