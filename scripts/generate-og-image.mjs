import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const logoPath = resolve(root, 'src/assets/images/margin-logo.png');
const outPath = resolve(root, 'public/assets/images/og-default.png');

const WIDTH = 1200;
const HEIGHT = 630;

const background = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#060E1A"/>
      <stop offset="100%" stop-color="#0A1828"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="55%">
      <stop offset="0%" stop-color="#E8B84B" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#E8B84B" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#5A7A9E" fill-opacity="0.18"/>
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#ground)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#dots)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${WIDTH}" height="4" fill="#E8B84B"/>
</svg>`;

const text = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <text x="96" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="82" fill="#F2EBD9">
    Your personal
  </text>
  <text x="96" y="424" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-weight="bold" fill="#E8B84B">
    Investment Cockpit
  </text>
  <rect x="96" y="466" width="64" height="2" fill="#E8B84B"/>
  <text x="96" y="524" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="#5A7A9E">
    DCF valuation, XIRR by period, dividends and capital gains for NSE &amp; BSE
  </text>
</svg>`;

const logo = await sharp(logoPath).resize({ height: 62 }).toBuffer();

await mkdir(dirname(outPath), { recursive: true });
await sharp(Buffer.from(background))
  .composite([
    { input: logo, top: 92, left: 96 },
    { input: Buffer.from(text), top: 0, left: 0 },
  ])
  .png()
  .toFile(outPath);

console.log(`wrote ${outPath}`);
