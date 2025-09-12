import { describe, it, expect } from 'vitest';
import { assetPaths, cdnAssets, getAssetPath } from '../index';

describe('assets/index', () => {
  describe('assetPaths', () => {
    it('should define all asset path categories', () => {
      expect(assetPaths).toBeDefined();
      expect(assetPaths.images).toBe('@boring-financial/assets/src/assets/images');
      expect(assetPaths.icons).toBe('@boring-financial/assets/src/assets/icons');
      expect(assetPaths.fonts).toBe('@boring-financial/assets/src/assets/fonts');
      expect(assetPaths.logos).toBe('@boring-financial/assets/src/assets/logos');
    });
  });

  describe('cdnAssets', () => {
    it('should define Font Awesome CDN URLs', () => {
      expect(cdnAssets).toBeDefined();
      expect(cdnAssets.fontAwesome).toBeDefined();
      expect(cdnAssets.fontAwesome.css).toContain('font-awesome');
      expect(cdnAssets.fontAwesome.solidFont).toContain('fa-solid-900.woff2');
      expect(cdnAssets.fontAwesome.regularFont).toContain('fa-regular-400.woff2');
      expect(cdnAssets.fontAwesome.brandsFont).toContain('fa-brands-400.woff2');
    });

    it('should have valid HTTPS URLs', () => {
      const urls = Object.values(cdnAssets.fontAwesome);
      urls.forEach(url => {
        expect(url).toMatch(/^https:\/\//);
      });
    });
  });

  describe('getAssetPath', () => {
    it('should generate correct asset paths', () => {
      const imagePath = getAssetPath('images', 'logo.png');
      expect(imagePath).toBe('@boring-financial/assets/src/assets/images/logo.png');
      
      const iconPath = getAssetPath('icons', 'check.svg');
      expect(iconPath).toBe('@boring-financial/assets/src/assets/icons/check.svg');
    });

    it('should work with all asset categories', () => {
      const categories = ['images', 'icons', 'fonts', 'logos'] as const;
      
      categories.forEach(category => {
        const testPath = getAssetPath(category, 'test-file.ext');
        expect(testPath).toBe(`@boring-financial/assets/src/assets/${category}/test-file.ext`);
      });
    });
  });
});