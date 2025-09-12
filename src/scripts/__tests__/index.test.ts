/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest';
import * as scriptsIndex from '../index';

describe('scripts/index', () => {
  it('should export downloadFontAwesomeAssets function', () => {
    expect(scriptsIndex.downloadFontAwesomeAssets).toBeDefined();
    expect(typeof scriptsIndex.downloadFontAwesomeAssets).toBe('function');
  });

  it('should have the correct function signature', () => {
    const fn = scriptsIndex.downloadFontAwesomeAssets;
    expect(fn.length).toBe(1); // Should accept 1 parameter (targetDir)
  });
});