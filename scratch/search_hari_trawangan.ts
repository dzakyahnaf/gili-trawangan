import fs from "fs";
import path from "path";

function run() {
  const filePath = path.join(__dirname, "html", "menginap-di-gili-trawangan.html");
  const html = fs.readFileSync(filePath, "utf-8");
  const lines = html.split("\n");

  console.log("=== Matching Lines ===");
  lines.forEach((l, idx) => {
    if (l.toLowerCase().includes("hari") && !l.includes("menu-item") && !l.includes("stylesheet")) {
      console.log(`Line ${idx + 1}: ${l.trim().substring(0, 200)}`);
    }
  });
}
run();
