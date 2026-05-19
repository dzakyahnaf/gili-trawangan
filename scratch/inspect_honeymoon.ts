import fs from "fs";
import path from "path";

function run() {
  const filePath = path.join(__dirname, "html", "paket-honeymoon-lombok.html");
  const html = fs.readFileSync(filePath, "utf-8");

  const matches = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/gi)];
  console.log(`Found ${matches.length} headings in paket-honeymoon-lombok.html:`);
  matches.forEach((h, idx) => {
    const text = h[2].replace(/<\/?[^>]+(>|$)/g, "").trim().replace(/\s+/g, " ");
    console.log(`- Head [${idx}]: [${h[1]}] "${text.substring(0, 100)}"`);
  });
}
run();
