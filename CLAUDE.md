# Boring.Financial Assets Package Guidelines

## Project Context
- This is a shared assets NPM package for the Boring Financial ecosystem of projects.
- Provides common resources, components, utilities, and assets for multiple NextJS/TailwindCSS projects.
- Sibling projects that consume this package include:
  - Boring.Financial (main PWA)
  - whitelabel (white-label version)
  - great-american-token-co
  - www.boring.financial
- All consumer projects use NextJS, TailwindCSS, and support magic link/passkey authentication.
- This package should maintain compatibility with the authentication model used across all projects.

## Commands
- Build: `npm run build` or `pnpm build`
- Test: `npm test` or `pnpm test`
- Lint: `npm run lint` or `pnpm lint`
- Publish: `npm publish` (requires proper versioning)
- DO NOT ever `git add`, `git rm` or `git commit` code. Allow the Claude user to always manually review git changes. `git mv` is permitted and inform the developer.
- DO NOT ever remove tests from eslint or type checks.
- Run tests before publishing new versions.
- **Operating outside of local repository (with .git/ directory root)**: Not permitted and any file or other operations require user approval and notification

## Package Structure
- **src/components**: Reusable React components that work across all projects
- **src/utils**: Common utility functions and helpers
- **src/types**: TypeScript definitions for all shared interfaces and types
- **src/assets**: Static asset management (images, icons, fonts, logos)
- **src/data**: Shared data resources (historical prices, market data)
- **src/scripts**: Utility scripts (font downloads, asset management)
- **src/theme**: Shared Tailwind configurations and CSS utilities
- **src/auth**: Authentication utilities (magic link, passkey support)
- **src/testing**: Testing utilities and mocks

## Code Style
- **TypeScript**: Use TypeScript for all files. Enable `strictNullChecks`.
- **Compatibility**: Ensure all exports work with React 19 and Next.js 15.
- **Tree-shaking**: Structure exports to support proper tree-shaking.
- **Versioning**: Follow semantic versioning for releases.
- **Documentation**: Include JSDoc comments for all exported functions and components.
- **Naming**: PascalCase for components, camelCase for functions/variables.
- **Testing**: Write unit tests for all utilities and components.
- Use Vitest for testing framework consistency with consumer projects.

## Best Practices
- **Zero Dependencies**: Minimize external dependencies to reduce version conflicts.
- **Peer Dependencies**: Properly declare peer dependencies for React, Next.js, and other frameworks.
- **Bundle Size**: Keep bundle size minimal - consumers should only import what they need.
- **Cross-project Compatibility**: Test changes against all consumer projects before publishing.
- **Backward Compatibility**: Maintain backward compatibility or use proper deprecation notices.
- **Type Safety**: Export all TypeScript types and interfaces.
- Work with the user to develop shared components using test driven development.

## Testing Best Practices
- DO NOT use console.warn with expects in unit tests to check for component behavior
- Use test ids in unit test for checking element presence and DOM behavior. NEVER check for specific text in the DOM since that is much less maintainable.
- Prefer these testing approaches instead:
  - Render components with Testing Library and check DOM updates/content
  - Use test-ids to identify rendered elements with screen.getByTestId()
  - Spy on component rendering using proper mocks
  - Use router mocks to verify navigation behavior directly
  - Test actual user interactions and their effects
  - Spy on fetch/API calls to verify data handling
  - Test history state changes directly
- Always mock external dependencies consistently
- Write tests that focus on behavior over implementation details
- Use await/waitFor for asynchronous operations
- Create component stubs with data-testid attributes for complex child components

## Common Tasks
- **Extract Shared Components**: Identify components used across multiple projects and extract them to src/components.
- **Create Type Definitions**: Define shared TypeScript interfaces and types in src/types.
- **Build Utility Functions**: Create reusable utility functions in src/utils.
- **Asset Management**: Organize shared images, icons, and fonts in src/assets.
- **Data Resources**: Add shared data files (CSV, JSON) to src/data.
- **Script Consolidation**: Move utility scripts from projects to src/scripts.
- **Theme Utilities**: Create shared Tailwind configurations in src/theme.
- **Authentication Helpers**: Provide shared authentication utilities in src/auth.
- **Testing Utilities**: Create shared testing utilities in src/testing.

## Package Specifics
- **Authentication Model**: All shared authentication components must support the magic link/passkey model used across projects.
- **No Passwords**: Never include password-based authentication in any shared components.
- **Type Exports**: All TypeScript types should be exported from a central index.
- **Component Exports**: React components should be exported as both named and default exports when appropriate.
- **Asset Paths**: Use relative imports for assets within the package.
- **Documentation**: Include README files for complex components or utilities.
- **Changelog**: Maintain a CHANGELOG.md for version history.

## Consumer Projects
- **Boring.Financial**: Main PWA application
- **whitelabel**: White-label version for custom branding
- **great-american-token-co**: Token-focused variant
- **www.boring.financial**: Marketing/landing site

## Publishing Workflow
1. Update version in package.json following semantic versioning
2. Run all tests: `npm test`
3. Build the package: `npm run build`
4. Update CHANGELOG.md with version notes
5. Publish to npm registry: `npm publish`
6. Update consumer projects to use new version
