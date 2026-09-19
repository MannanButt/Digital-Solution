/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const https = require('https');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function main() {
  try {
    // Official Microsoft Windows/Corp logo to use for Microsoft 365
    await download('https://unpkg.com/simple-icons@13.14.1/icons/microsoft.svg', path.join(__dirname, 'frontend/public/assets/logos/tools/microsoft365.svg'));
    
    // Official Microsoft Edge logo
    await download('https://unpkg.com/simple-icons@13.14.1/icons/microsoftedge.svg', path.join(__dirname, 'frontend/public/assets/logos/tools/microsoftedge.svg'));

    console.log("Logos downloaded successfully!");
  } catch (err) {
    console.error(err);
  }
}

main();
