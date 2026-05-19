import fs from "fs";
import path from "path";

function run() {
  const dir = path.join(__dirname, "html");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".html"));

  files.forEach(f => {
    const html = fs.readFileSync(path.join(dir, f), "utf-8");
    const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
    const title = html.match(/<title>([^<]+)<\/title>/i);
    console.log(`File: ${f}`);
    console.log(`  Title: ${title ? title[1] : "None"}`);
    console.log(`  OG Image: ${ogImage ? ogImage[1] : "None"}`);
  });
}
run();
