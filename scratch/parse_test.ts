import fs from "fs";
import path from "path";

function run() {
  const filePath = path.join(__dirname, "html", "open-trip-lombok.html");
  const html = fs.readFileSync(filePath, "utf-8");

  console.log("=== Title ===");
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  console.log("Title Match:", titleMatch ? titleMatch[1] : "None");

  console.log("\n=== Content search ===");
  const target = "Harga Sudah Termasuk";
  const index = html.indexOf(target);
  if (index !== -1) {
    console.log(`Found "${target}" at index ${index}. Context around it:`);
    console.log(html.substring(index - 100, index + 500));
  } else {
    console.log(`"${target}" not found.`);
  }

  const target2 = "HARI 1";
  const index2 = html.indexOf(target2);
  if (index2 !== -1) {
    console.log(`\nFound "${target2}" at index ${index2}. Context around it:`);
    console.log(html.substring(index2 - 100, index2 + 500));
  } else {
    console.log(`"${target2}" not found.`);
  }
}
run();
