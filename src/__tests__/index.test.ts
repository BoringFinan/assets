import { describe, it, expect } from 'vitest';
import * as mainIndex from '../index';

describe('main index exports', () => {
  it('should export all modules without errors', () => {
    // Test that the main index file can be imported without throwing
    expect(mainIndex).toBeDefined();
  });

  it('should re-export downloadFontAwesomeAssets from scripts', () => {
    expect(mainIndex.downloadFontAwesomeAssets).toBeDefined();
    expect(typeof mainIndex.downloadFontAwesomeAssets).toBe('function');
  });

  it('should re-export asset utilities', () => {
    expect(mainIndex.assetPaths).toBeDefined();
    expect(mainIndex.cdnAssets).toBeDefined();
    expect(mainIndex.getAssetPath).toBeDefined();
    expect(typeof mainIndex.getAssetPath).toBe('function');
  });
});