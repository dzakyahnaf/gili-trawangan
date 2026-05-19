import fs from "fs";
import path from "path";

function run() {
  const filePath = path.join(__dirname, "html", "open-trip-lombok.html");
  const html = fs.readFileSync(filePath, "utf-8");

  console.log("=== H1 tags ===");
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  h1Matches.forEach((m, idx) => console.log(`H1 [${idx}]:`, m[1].trim()));

  console.log("\n=== Main image / Featured image ===");
  // Usually featured images on Oketheme are inside some specific container or we can search for wp-content/uploads/
  const imgMatches = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/gi)];
  console.log("Found", imgMatches.length, "images.");
  imgMatches.slice(0, 10).forEach((m, idx) => console.log(`Image [${idx}]:`, m[1]));
}
run();
