import fs from "fs";
import path from "path";

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

interface ScrapedPackage {
  slug: string;
  title: string;
  price: number;
  duration: string;
  coverImage: string;
  description: string;
  includes: string[];
  excludes: string[];
  programs: string[];
  itinerary: ItineraryDay[];
  category: string;
  isFeatured: boolean;
}

// Basic mappings from our homepage scrape
const cardData: Record<string, { price: number; duration: string; image: string; title: string; category: string; isFeatured: boolean }> = {
  "open-trip-lombok": {
    price: 1500000,
    duration: "3 Hari 2 Malam",
    image: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-open-Trip-lombok.png",
    title: "Open Trip Lombok",
    category: "tour",
    isFeatured: true
  },
  "one-day-trip-lombok": {
    price: 400000,
    duration: "1 Hari",
    image: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-one-day-Trip-lombok.png",
    title: "One Day Trip Lombok",
    category: "tour",
    isFeatured: true
  },
  "menginap-di-gili-trawangan": {
    price: 1450000,
    duration: "3 Hari 2 Malam",
    image: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-over-night-gili-trawangan.png",
    title: "Menginap di Gili Trawangan",
    category: "package",
    isFeatured: true
  },
  "paket-honeymoon-lombok": {
    price: 2000000,
    duration: "3 Hari 2 Malam",
    image: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-honeymoon-Trip-lombok.png",
    title: "Paket Honeymoon Lombok",
    category: "honeymoon",
    isFeatured: true
  },
  "paket-tour-lombok-2-hari-1-malam": {
    price: 870000,
    duration: "2 Hari 1 Malam",
    image: "https://opentriplombok.com/wp-content/uploads/2025/01/Biru-dan-Putih-Ilustrasi-Bunga-Kartu-Ucapan-Terima-Kasih-Untuk-Guru-1.png",
    title: "Paket Tour Lombok 2 Hari 1 Malam",
    category: "package",
    isFeatured: true
  },
  "trip-lombok-3-hari-2-malam": {
    price: 1422000,
    duration: "3 Hari 2 Malam",
    image: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-Trip-lombok-3h2m.png",
    title: "Trip Lombok 3 Hari 2 Malam",
    category: "package",
    isFeatured: true
  },
  "liburan-lombok-4-hari-3-malam": {
    price: 1900000,
    duration: "4 Hari 3 Malam",
    image: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-Trip-lombok-4h3m.png",
    title: "Liburan Lombok 4 Hari 3 Malam",
    category: "package",
    isFeatured: true
  },
  "wisata-lombok-5-hari-4-malam": {
    price: 2600000,
    duration: "5 Hari 4 Malam",
    image: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-Trip-lombok-5h4m.png",
    title: "Paket Wisata Lombok 5 Hari 4 Malam",
    category: "package",
    isFeatured: true
  },
  "honeymoon-lombok-2-hari-1-malam": {
    price: 2000000,
    duration: "2 Hari 1 Malam",
    image: "https://opentriplombok.com/wp-content/uploads/2025/01/Cover-honeymoon-lombok-2h1m.png",
    title: "Honeymoon Lombok 2 Hari 1 Malam",
    category: "honeymoon",
    isFeatured: true
  }
};

function cleanHtmlText(text: string): string {
  return text
    .replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFile(fileName: string): ScrapedPackage | null {
  const slug = fileName.replace(".html", "");
  const cData = cardData[slug];
  if (!cData) return null;

  const html = fs.readFileSync(path.join(__dirname, "html", fileName), "utf-8");

  // Extract description
  // Typically inside a specific paragraph or meta or we can construct a general beautiful summary from their description
  let description = "";
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (descMatch) {
    description = cleanHtmlText(descMatch[1]);
  }
  
  // If description is generic, we can fallback to some parsed text
  if (!description || description.includes("Open Trip Lombok")) {
    // Let's try to extract text from a paragraph under standard elements
    const pMatches = [...html.matchAll(/<p>([\s\S]*?)<\/p>/gi)];
    for (const p of pMatches) {
      const txt = cleanHtmlText(p[1]);
      if (txt.length > 50 && !txt.includes("http") && !txt.includes("Open Trip")) {
        description = txt;
        break;
      }
    }
  }
  
  if (!description) {
    description = `Nikmati liburan seru ke Lombok dan Gili Trawangan dengan paket ${cData.title}. Fasilitas lengkap, akomodasi nyaman, dan guide profesional.`;
  }

  // Extract Inclusions (Harga Sudah Termasuk)
  const includes: string[] = [];
  const incSearch = /Harga Sudah Termasuk\s*:\s*<\/strong><\/h4>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const incSearch2 = /Harga Sudah Termasuk\s*<\/strong><\/h4>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const incSearch3 = /Harga Termasuk\s*:\s*<\/strong><\/h4>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const incSearch4 = /Fasilitas yang didapat\s*:\s*<\/strong><\/h4>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;

  let incBlock = html.match(incSearch) || html.match(incSearch2) || html.match(incSearch3) || html.match(incSearch4);
  if (!incBlock) {
    // Fallback: search for "Harga Sudah Termasuk" in a paragraph or heading
    const incIndex = html.search(/Harga Sudah Termasuk|Harga Termasuk|Fasilitas yang didapat/gi);
    if (incIndex !== -1) {
      const sub = html.substring(incIndex, incIndex + 3000);
      const ulMatch = sub.match(/<ul>([\s\S]*?)<\/ul>/i);
      if (ulMatch) {
        incBlock = [sub, ulMatch[1]] as any;
      }
    }
  }

  if (incBlock) {
    const liMatches = [...incBlock[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)];
    liMatches.forEach(m => {
      const item = cleanHtmlText(m[1]);
      if (item) includes.push(item);
    });
  }

  // Extract Exclusions (Harga Belum Termasuk)
  const excludes: string[] = [];
  const excSearch = /Harga Belum Termasuk\s*:\s*<\/strong><\/h4>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const excSearch2 = /Harga Belum Termasuk\s*<\/strong><\/h4>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const excSearch3 = /Harga Tidak Termasuk\s*:\s*<\/strong><\/h4>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;

  let excBlock = html.match(excSearch) || html.match(excSearch2) || html.match(excSearch3);
  if (!excBlock) {
    const excIndex = html.search(/Harga Belum Termasuk|Harga Tidak Termasuk/gi);
    if (excIndex !== -1) {
      const sub = html.substring(excIndex, excIndex + 3000);
      const ulMatch = sub.match(/<ul>([\s\S]*?)<\/ul>/i);
      if (ulMatch) {
        excBlock = [sub, ulMatch[1]] as any;
      }
    }
  }

  if (excBlock) {
    const liMatches = [...excBlock[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)];
    liMatches.forEach(m => {
      const item = cleanHtmlText(m[1]);
      if (item) excludes.push(item);
    });
  }

  // If exclusions is empty, provide standard fallback
  if (excludes.length === 0) {
    excludes.push("Tiket pesawat dari/ke kota asal", "Pengeluaran pribadi", "Tips guide/driver");
  }

  // Extract Itinerary (HARI 1, HARI 2, etc.)
  const itinerary: ItineraryDay[] = [];
  // Let's find all headers with HARI [0-9]
  // Format is usually <h4><strong>HARI 1 ...</strong></h4> or <h4>HARI 1 ...</h4> or <h3>HARI 1 ...</h3>
  const dayHeaderRegex = /<(h[34])[^>]*>([\s\S]*?HARI\s+[0-9]+[\s\S]*?)<\/\1>/gi;
  const headers = [...html.matchAll(dayHeaderRegex)];

  console.log(`\nParsing ${slug}: Found ${headers.length} day headers.`);

  if (headers.length > 0) {
    headers.forEach((h, idx) => {
      const fullText = cleanHtmlText(h[2]);
      // Extract day number
      const numMatch = fullText.match(/HARI\s+([0-9]+)/i);
      if (!numMatch) return;
      const dayNum = parseInt(numMatch[1]);
      
      // Clean title: remove "HARI 1" or "HARI 1."
      let title = fullText.replace(/HARI\s+[0-9]+[\s.:-]*\s*/gi, "").trim();
      if (!title) title = "Kegiatan Wisata";

      // Find activities: look at subsequent HTML until the next header or end of content
      const startIndex = html.indexOf(h[0]) + h[0].length;
      let endIndex = html.length;
      if (idx < headers.length - 1) {
        endIndex = html.indexOf(headers[idx + 1][0]);
      }
      
      const subHtml = html.substring(startIndex, endIndex);
      const activities: string[] = [];
      const liMatches = [...subHtml.matchAll(/<li>([\s\S]*?)<\/li>/gi)];
      
      liMatches.forEach(m => {
        const act = cleanHtmlText(m[1]);
        if (act && !act.includes("http") && act.length > 3) {
          activities.push(act);
        }
      });

      // If no li's are found, try parsing paragraphs
      if (activities.length === 0) {
        const pMatches = [...subHtml.matchAll(/<p>([\s\S]*?)<\/p>/gi)];
        pMatches.forEach(m => {
          const act = cleanHtmlText(m[1]);
          if (act && act.length > 10 && !act.includes("http")) {
            activities.push(act);
          }
        });
      }

      itinerary.push({
        day: dayNum,
        title: title,
        activities: activities
      });
    });
  }

  // Filter out any duplicate days or empty days
  const uniqueItinerary = itinerary.filter((val, index, self) => 
    self.findIndex(t => t.day === val.day) === index
  ).sort((a, b) => a.day - b.day);

  // Generate programs based on itinerary day titles or first few activities
  const programs: string[] = uniqueItinerary.map(day => day.title).filter(Boolean);
  if (programs.length === 0) {
    programs.push("Explore Lombok & Gili Trawangan", "Snorkeling Trip", "Pantai Pink & Pasir");
  }

  return {
    slug,
    title: cData.title,
    price: cData.price,
    duration: cData.duration,
    coverImage: cData.image,
    description: description,
    includes: includes.length > 0 ? includes : ["Akomodasi hotel", "Transportasi AC PP", "Makan sesuai program", "Guide lokal", "Air mineral"],
    excludes: excludes,
    programs: programs,
    itinerary: uniqueItinerary,
    category: cData.category,
    isFeatured: cData.isFeatured
  };
}

function run() {
  const dir = path.join(__dirname, "html");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".html"));

  const results: ScrapedPackage[] = [];
  files.forEach(f => {
    const pkg = parseFile(f);
    if (pkg) {
      results.push(pkg);
    }
  });

  const dest = path.join(__dirname, "packages_details.json");
  fs.writeFileSync(dest, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\nSuccessfully scraped ${results.length} packages and saved to ${dest}`);
}

run();
