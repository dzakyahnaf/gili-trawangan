import fs from "fs";
import path from "path";

function listHeadings(name: string) {
  const filePath = path.join(__dirname, "html", name);
  const html = fs.readFileSync(filePath, "utf-8");

  console.log(`\n================= ${name} =================`);
  const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/h[1-6]>/gi)];
  headings.forEach((h, idx) => {
    const text = h[2].replace(/<\/?[^>]+(>|$)/g, "").trim().replace(/\s+/g, " ");
    if (text.length > 0 && text.length < 150) {
      console.log(`[${h[1]}] ${text}`);
    }
  });
}

listHeadings("one-day-trip-lombok.html");
listHeadings("menginap-di-gili-trawangan.html");
