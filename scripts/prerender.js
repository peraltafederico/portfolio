import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";
import puppeteer from "puppeteer";

const DIST = join(import.meta.dirname, "..", "dist");
const PORT = 4321;
const ROUTES = ["/", "/contact"];

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
};

// Simple static file server for the dist directory
function createStaticServer() {
  return createServer((req, res) => {
    let filePath = join(DIST, req.url === "/" ? "index.html" : req.url);

    // SPA fallback: if file doesn't exist, serve index.html
    let content;
    try {
      content = readFileSync(filePath);
    } catch {
      // Try with index.html appended (for /contact -> /contact/index.html)
      try {
        content = readFileSync(join(filePath, "index.html"));
        filePath = join(filePath, "index.html");
      } catch {
        // SPA fallback
        content = readFileSync(join(DIST, "index.html"));
        filePath = join(DIST, "index.html");
      }
    }

    const ext = extname(filePath);
    const mime = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": mime });
    res.end(content);
  });
}

async function prerender() {
  console.log("Starting pre-render...");

  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Static server listening on port ${PORT}`);

  const browser = await puppeteer.launch({ headless: true });

  for (const route of ROUTES) {
    console.log(`Pre-rendering ${route}...`);
    const page = await browser.newPage();

    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: "networkidle0",
    });

    // Wait a bit for GSAP animations to initialize DOM elements
    await page.waitForSelector("#root > *", { timeout: 10000 });

    // Get the full HTML
    const html = await page.content();

    // Determine output path
    const outDir =
      route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
    mkdirSync(outDir, { recursive: true });
    const outFile = join(outDir, "index.html");

    writeFileSync(outFile, html, "utf-8");
    console.log(`  Wrote ${outFile}`);

    await page.close();
  }

  await browser.close();
  server.close();
  console.log("Pre-rendering complete!");
}

prerender().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
