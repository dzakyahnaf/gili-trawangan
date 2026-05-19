import fs from "fs";
import path from "path";

function run() {
  const filePath = path.join(__dirname, "html", "menginap-di-gili-trawangan.html");
  const html = fs.readFileSync(filePath, "utf-8");

  const match = html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (match) {
    console.log("=== entry-content of Menginap di Gili Trawangan ===");
    console.log(match[1].substring(0, 4000));
  } else {
    console.log("entry-content not found!");
  }
}
run();
