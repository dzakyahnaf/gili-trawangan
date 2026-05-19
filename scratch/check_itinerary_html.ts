import fs from "fs";
import path from "path";

function checkFile(name: string) {
  const filePath = path.join(__dirname, "html", name);
  const html = fs.readFileSync(filePath, "utf-8");

  console.log(`\n================= ${name} =================`);
  
  // Find instances of "HARI" (case insensitive)
  const matches = [...html.matchAll(/HARI\s+[0-9]+/gi)];
  console.log(`Found ${matches.length} occurrences of HARI:`);
  matches.forEach((m) => {
    const idx = m.index!;
    console.log(`- "${m[0]}" at index ${idx}:`);
    console.log(html.substring(idx - 50, idx + 200).replace(/\n/g, " "));
  });
}

checkFile("menginap-di-gili-trawangan.html");
checkFile("one-day-trip-lombok.html");
