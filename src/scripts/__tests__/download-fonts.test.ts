/**
 * @vitest-environment node
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fs from 'fs';
import https from 'https';
import path from 'path';

// Mock modules before importing the function
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    createWriteStream: vi.fn(),
    unlink: vi.fn(),
  },
}));

vi.mock('https', () => ({
  default: {
    get: vi.fn().mockReturnValue({
      on: vi.fn(),
    }),
  },
}));

vi.mock('path', () => ({
  default: {
    join: vi.fn(),
    basename: vi.fn(),
  },
}));

const mockFs = vi.mocked(fs);
const mockHttps = vi.mocked(https);
const mockPath = vi.mocked(path);

// Import after mocking
import { downloadFontAwesomeAssets } from '../download-fonts';

describe('downloadFontAwesomeAssets', () => {
  const mockTargetDir = '/test/fonts';

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default path mocks
    mockPath.join.mockImplementation((...args) => args.join('/'));
    mockPath.basename.mockImplementation((filepath) => filepath.split('/').pop() || '');
    
    // Default fs mocks
    mockFs.existsSync.mockReturnValue(true);
    mockFs.mkdirSync.mockImplementation(() => undefined);
  });

  describe('basic functionality', () => {
    it('should be a function', () => {
      expect(typeof downloadFontAwesomeAssets).toBe('function');
    });

    it('should accept targetDir parameter', () => {
      expect(downloadFontAwesomeAssets.length).toBe(1);
    });
  });

  describe('directory setup', () => {
    it('should use default directory if no targetDir provided', () => {
      const mockCwd = '/current/working/dir';
      vi.spyOn(process, 'cwd').mockReturnValue(mockCwd);
      
      mockPath.join.mockReturnValue('/current/working/dir/public/fonts');
      mockFs.existsSync.mockReturnValue(true);
      
      // Mock HTTPS to prevent actual network calls but allow function to run
      mockHttps.get.mockReturnValue({ on: vi.fn() } as any);
      
      // Call without awaiting to just test the setup logic
      downloadFontAwesomeAssets().catch(() => {
        // Expected to fail with mocked modules
      });
      
      expect(mockPath.join).toHaveBeenCalledWith(mockCwd, 'public', 'fonts');
    });

    it('should create directory if it does not exist', () => {
      mockFs.existsSync.mockReturnValue(false);
      mockHttps.get.mockReturnValue({ on: vi.fn() } as any);
      
      downloadFontAwesomeAssets(mockTargetDir).catch(() => {
        // Expected to fail with mocked modules
      });
      
      expect(mockFs.mkdirSync).toHaveBeenCalledWith(mockTargetDir, { recursive: true });
    });

    it('should not create directory if it already exists', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockHttps.get.mockReturnValue({ on: vi.fn() } as any);
      
      downloadFontAwesomeAssets(mockTargetDir).catch(() => {
        // Expected to fail with mocked modules
      });
      
      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
    });
  });

  describe('file download URLs', () => {
    it('should attempt to download Font Awesome files', () => {
      mockHttps.get.mockReturnValue({ on: vi.fn() } as any);
      
      downloadFontAwesomeAssets(mockTargetDir).catch(() => {
        // Expected to fail with mocked modules
      });
      
      // Should attempt to download 4 files
      expect(mockHttps.get).toHaveBeenCalledTimes(4);
      
      // Check that all expected URLs are being requested
      const calls = mockHttps.get.mock.calls;
      const urls = calls.map(call => call[0]);
      
      expect(urls).toContain('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
      expect(urls).toContain('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2');
      expect(urls).toContain('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-regular-400.woff2');
      expect(urls).toContain('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-brands-400.woff2');
    });

    it('should generate correct file paths', () => {
      mockHttps.get.mockReturnValue({ on: vi.fn() } as any);
      
      downloadFontAwesomeAssets(mockTargetDir).catch(() => {
        // Expected to fail with mocked modules
      });
      
      // Should join paths for all expected files
      const joinCalls = mockPath.join.mock.calls;
      const expectedFiles = [
        'font-awesome.css',
        'fa-solid-900.woff2',
        'fa-regular-400.woff2',
        'fa-brands-400.woff2'
      ];
      
      expectedFiles.forEach(filename => {
        expect(joinCalls).toContainEqual([mockTargetDir, filename]);
      });
    });
  });
});