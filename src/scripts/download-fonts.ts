/**
 * Script to download Font Awesome font files and CSS
 * This can be used by consuming projects to download font assets
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { IncomingMessage } from 'http';

interface FileToDownload {
  url: string;
  dest: string;
}

/**
 * Downloads Font Awesome assets to the specified directory
 * @param targetDir - The directory where fonts should be downloaded
 */
export async function downloadFontAwesomeAssets(targetDir?: string): Promise<void> {
  // Default to public/fonts in the current working directory
  const fontsDir = targetDir || path.join(process.cwd(), 'public', 'fonts');
  
  // Ensure the fonts directory exists
  if (!fs.existsSync(fontsDir)) {
    fs.mkdirSync(fontsDir, { recursive: true });
  }

  // Files to download
  const filesToDownload: FileToDownload[] = [
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
      dest: path.join(fontsDir, 'font-awesome.css')
    },
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-solid-900.woff2',
      dest: path.join(fontsDir, 'fa-solid-900.woff2')
    },
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-regular-400.woff2',
      dest: path.join(fontsDir, 'fa-regular-400.woff2')
    },
    {
      url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/webfonts/fa-brands-400.woff2',
      dest: path.join(fontsDir, 'fa-brands-400.woff2')
    }
  ];

  // eslint-disable-next-line no-console
  console.log(`Downloading Font Awesome assets to ${fontsDir}...`);

  try {
    await Promise.all(filesToDownload.map(file => downloadFile(file.url, file.dest)));
    // eslint-disable-next-line no-console
    console.log('All Font Awesome assets downloaded successfully.');
  } catch (error) {
    console.error('Failed to download one or more Font Awesome assets.', error);
    throw error;
  }
}

/**
 * Downloads a single file from a URL
 * @param url - The URL to download from
 * @param destPath - The destination file path
 */
function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-console
    console.log(`Downloading ${path.basename(destPath)} from ${url}...`);

    const handleResponse = (response: IncomingMessage): void => {
      if (response.statusCode !== 200) {
        const errorMsg = `Failed to download ${path.basename(destPath)}: ${response.statusCode} ${response.statusMessage}`;
        console.error(errorMsg);
        reject(new Error(errorMsg));
        return;
      }
      
      // Create write stream
      const file = fs.createWriteStream(destPath);
      
      // Pipe the response to the file
      response.pipe(file);
      
      // Handle errors during write
      file.on('error', (err: Error) => {
        console.error(`Error writing file ${path.basename(destPath)}: ${err.message}`);
        file.close();
        fs.unlink(destPath, () => {}); // Attempt to delete the partial file
        reject(err);
      });
      
      // Resolve promise when done
      file.on('finish', () => {
        file.close();
        // eslint-disable-next-line no-console
        console.log(`${path.basename(destPath)} downloaded successfully.`);
        resolve();
      });
    };

    // Make the HTTPS request
    https.get(url, (response: IncomingMessage) => {
      // Handle redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        // eslint-disable-next-line no-console
        console.log(`Following redirect for ${path.basename(destPath)} to ${response.headers.location}...`);
        if (response.headers.location) {
          https.get(response.headers.location, handleResponse).on('error', (err: Error) => {
            const errorMsg = `Error following redirect for ${path.basename(destPath)}: ${err.message}`;
            console.error(errorMsg);
            reject(new Error(errorMsg));
          });
        } else {
          const errorMsg = `Redirect location missing for ${path.basename(destPath)}`;
          console.error(errorMsg);
          reject(new Error(errorMsg));
        }
        return;
      }
      
      handleResponse(response);
    }).on('error', (err: Error) => {
      const errorMsg = `Error downloading ${path.basename(destPath)}: ${err.message}`;
      console.error(errorMsg);
      reject(err);
    });
  });
}

// CLI execution
if (require.main === module) {
  downloadFontAwesomeAssets()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}