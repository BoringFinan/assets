/**
 * Static assets for Boring Financial projects
 * This module provides paths and utilities for accessing shared assets
 * like images, icons, fonts, and logos.
 */

// Asset path helpers
export const assetPaths = {
  images: '@boring-financial/assets/src/assets/images',
  icons: '@boring-financial/assets/src/assets/icons',
  fonts: '@boring-financial/assets/src/assets/fonts',
  logos: '@boring-financial/assets/src/assets/logos',
} as const;

// Common asset URLs (for assets that should be loaded from CDN)
export const cdnAssets = {
  fontAwesome: {
    css: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    solidFont: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2',
    regularFont: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-regular-400.woff2',
    brandsFont: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-brands-400.woff2',
  },
} as const;

// Export utilities for working with assets
export function getAssetPath(category: keyof typeof assetPaths, filename: string): string {
  return `${assetPaths[category]}/${filename}`;
}