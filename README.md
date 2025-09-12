# @boring-financial/assets

> Shared assets, components, utilities, and resources for the Boring Financial ecosystem

## Overview

`@boring-financial/assets` is a centralized NPM package that provides common resources for all Boring Financial projects. This package ensures consistency across multiple applications while reducing code duplication and maintenance overhead.

## Features

- 🎨 **Shared Components** - Reusable React components that work across all projects
- 🔧 **Utility Functions** - Common helpers and utilities for frequent operations
- 🎭 **Type Definitions** - Shared TypeScript interfaces and types
- 🖼️ **Static Assets** - Common images, icons, and fonts
- 🎨 **Theme Utilities** - Shared Tailwind CSS configurations and theme helpers
- 🔐 **Authentication Helpers** - Utilities compatible with Satchel Auth^2 (magic link/passkey)
- 🧪 **Testing Utilities** - Shared testing helpers and mocks

## Installation

```bash
pnpm add @boring-financial/assets
# or
npm install @boring-financial/assets
# or
yarn add @boring-financial/assets
```

## Usage

### Importing Components

```typescript
import { Button, Card, Modal } from '@boring-financial/assets/components';

function MyComponent() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

### Using Utilities

```typescript
import { formatCurrency, validateEmail } from '@boring-financial/assets/utils';

const formatted = formatCurrency(1234.56); // "$1,234.56"
const isValid = validateEmail('user@example.com'); // true
```

### TypeScript Types

```typescript
import type { User, Transaction, Wallet } from '@boring-financial/assets/types';

const user: User = {
  id: '123',
  email: 'user@example.com',
  // ...
};
```

### Theme Configuration

```javascript
// tailwind.config.js
import { sharedTheme } from '@boring-financial/assets/theme';

export default {
  ...sharedTheme,
  // Your project-specific overrides
};
```

### Authentication Helpers

```typescript
import { createMagicLink, verifyPasskey } from '@boring-financial/assets/auth';

// Magic link authentication
const link = await createMagicLink(email);

// Passkey verification
const verified = await verifyPasskey(credential);
```

### Static Assets

```typescript
import { assetPaths, getAssetPath, cdnAssets } from '@boring-financial/assets/assets';

// Get path to an asset
const logoPath = getAssetPath('logos', 'company-logo.png');

// Access CDN URLs for fonts
const fontUrl = cdnAssets.fontAwesome.solidFont;
```

### Shared Data

```typescript
import { loadHistoricalPrices } from '@boring-financial/assets/data';

// Load historical price data
const btcPrices = await loadHistoricalPrices('BTC', '2024-01-01', '2024-12-31');
```

### Utility Scripts

```typescript
import { downloadFontAwesomeAssets } from '@boring-financial/assets/scripts';

// Download Font Awesome assets to your project
await downloadFontAwesomeAssets('./public/fonts');
```

Or use as a CLI script:
```bash
pnpm exec tsx node_modules/@boring-financial/assets/dist/scripts/download-fonts.js
```

## Package Structure

```
@boring-financial/assets/
├── src/
│   ├── components/      # React components
│   │   ├── Button/
│   │   ├── Card/
│   │   └── ...
│   ├── utils/          # Utility functions
│   │   ├── format.ts
│   │   └── validation.ts
│   ├── types/          # TypeScript definitions
│   │   ├── user.ts
│   │   └── transaction.ts
│   ├── assets/         # Static asset management
│   │   ├── images/     # Shared images
│   │   ├── icons/      # Shared icons
│   │   ├── fonts/      # Font files
│   │   ├── logos/      # Logo files
│   │   └── index.ts    # Asset path utilities
│   ├── data/           # Shared data resources
│   │   ├── historical-prices/
│   │   └── market-data/
│   ├── scripts/        # Utility scripts
│   │   ├── download-fonts.ts
│   │   └── index.ts
│   ├── theme/          # Theme configurations
│   │   ├── tailwind.js
│   │   └── colors.ts
│   ├── auth/           # Authentication utilities
│   │   ├── magicLink.ts
│   │   └── passkey.ts
│   └── testing/        # Testing utilities
│       ├── mocks.ts
│       └── helpers.ts
```

## Consumer Projects

This package is designed to be used by:

- **Boring.Financial** - Main PWA application
- **whitelabel** - White-label version for custom branding
- **great-american-token-co** - Token-focused variant
- **www.boring.financial** - Marketing/landing site

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- TypeScript 5+

### Setup

```bash
# Clone the repository
git clone [repository-url]
cd assets

# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the package
pnpm build

# Lint code
pnpm lint

# Type check
pnpm typecheck
```

### Testing

All components and utilities should have corresponding tests:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Building

```bash
# Build for production
pnpm build

# Build in watch mode for development
pnpm build:watch
```

## Contributing

### Adding New Components

1. Create component directory in `src/components/`
2. Include TypeScript definitions
3. Add unit tests
4. Export from main index
5. Document usage in component README

### Adding Utilities

1. Add utility function in appropriate file under `src/utils/`
2. Include JSDoc documentation
3. Add comprehensive unit tests
4. Export from utils index

### Code Style

- TypeScript with `strictNullChecks` enabled
- React functional components with hooks
- PascalCase for components, camelCase for functions
- Comprehensive JSDoc comments for public APIs
- Follow existing patterns and conventions

## Versioning

This package follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## Publishing

### Release Process

1. Update version in `package.json`
2. Run all tests: `pnpm test`
3. Build package: `pnpm build`
4. Update CHANGELOG.md
5. Create git tag: `git tag v1.0.0`
6. Publish: `pnpm publish`
7. Update consumer projects

### Pre-release Testing

Before publishing:

```bash
# Build the package first
pnpm build

# Create a local link
pnpm link --global

# In consumer project
pnpm link --global @boring-financial/assets

# Test thoroughly
# Unlink when done
pnpm unlink --global @boring-financial/assets
```

## API Documentation

Full API documentation is available at [docs-url] (coming soon).

### Quick Reference

#### Components
- `Button` - Customizable button component
- `Card` - Container component with styling
- `Modal` - Accessible modal dialog
- `Form` - Form components with validation

#### Utilities
- `formatCurrency()` - Format numbers as currency
- `formatDate()` - Format dates consistently
- `validateEmail()` - Email validation
- `debounce()` - Debounce function calls

#### Types
- `User` - User account interface
- `Transaction` - Transaction data structure
- `Wallet` - Wallet configuration
- `Asset` - Asset definition

## Compatibility

- React 19+
- Next.js 15+
- TypeScript 5+
- Node.js 18+
- Tailwind CSS 3+

## Security

This package is designed with security in mind:

- No password-based authentication
- Support for magic links and passkeys only
- No sensitive data in client-side code
- Regular security audits
- Dependency updates

## License

Proprietary - Boring Financial

## Support

For issues, questions, or contributions:

- GitHub Issues: [repository-issues-url]
- Documentation: [docs-url]
- Internal Slack: #boring-financial-dev

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

Maintained by the Boring Financial development team