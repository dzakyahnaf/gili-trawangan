import fs from "fs";
import path from "path";

const urls = [
  "https://opentriplombok.com/tour/open-trip-lombok/",
  "https://opentriplombok.com/tour/one-day-trip-lombok/",
  "https://opentriplombok.com/tour/menginap-di-gili-trawangan/",
  "https://opentriplombok.com/tour/paket-honeymoon-lombok/",
  "https://opentriplombok.com/tour/paket-tour-lombok-2-hari-1-malam/",
  "https://opentriplombok.com/tour/trip-lombok-3-hari-2-malam/",
  "https://opentriplombok.com/tour/liburan-lombok-4-hari-3-malam/",
  "https://opentriplombok.com/tour/wisata-lombok-5-hari-4-malam/",
  "https://opentriplombok.com/tour/honeymoon-lombok-2-hari-1-malam/"
];

async function download() {
  const dir = path.join(__dirname, "html");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const name = url.split("/").filter(Boolean).pop() + ".html";
    const dest = path.join(dir, name);
    
    console.log(`Downloading ${url} -> ${dest}`);
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      if (res.status === 200) {
        const text = await res.text();
        fs.writeFileSync(dest, text, "utf-8");
        console.log(`Saved ${name} (${text.length} bytes)`);
      } else {
        console.error(`Failed to download ${url}: status ${res.status}`);
      }
    } catch (err) {
      console.error(`Error downloading ${url}:`, err);
    }
  }
}

download();
