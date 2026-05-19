import fs from "fs";
import path from "path";

function run() {
  const filePath = path.join(__dirname, "html", "one-day-trip-lombok.html");
  const html = fs.readFileSync(filePath, "utf-8");
  const lines = html.split("\n");

  console.log("=== Matching Lines ===");
  lines.forEach((l, idx) => {
    if ((l.toLowerCase().includes("explore") || l.toLowerCase().includes("sasak tour")) && !l.includes("menu-item")) {
      console.log(`Line ${idx + 1}: ${l.trim().substring(0, 200)}`);
    }
  });
}
run();
