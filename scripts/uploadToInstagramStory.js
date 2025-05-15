
const puppeteer = require('puppeteer');
const path = require('path');

const IG_USERNAME = process.env.IG_USERNAME;
const IG_PASSWORD = process.env.IG_PASSWORD;

const mediaPath = process.argv[2]; // Pass full path to the media file
if (!mediaPath) {
  console.error("❌ Missing media file path");
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // set to true after debugging
  const page = await browser.newPage();

  await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });

  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', IG_USERNAME, { delay: 50 });
  await page.type('input[name="password"]', IG_PASSWORD, { delay: 50 });
  await page.click('button[type="submit"]');

  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  // Navigate to story upload
  await page.waitForTimeout(5000);
  await page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2' });

  await page.waitForSelector('svg[aria-label="New story"]', { timeout: 10000 });
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('svg[aria-label="New story"]')
  ]);

  await fileChooser.accept([path.resolve(mediaPath)]);

  await page.waitForTimeout(5000);
  await page.keyboard.press('Enter'); // Post the story
  await page.waitForTimeout(5000);

  console.log("✅ Story posted!");
  await browser.close();
})();
