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

  // We want to extract the main content container.
  // In Oketheme, it is inside <div class="entry-content"> or similar. Let's isolate the main entry-content block to avoid the sidebar or form.
  let contentHtml = html;
  const contentMatch = html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<!--/i) || 
                       html.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                       html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (contentMatch) {
    contentHtml = contentMatch[1];
  }

  // Extract description
  let description = "";
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  if (descMatch) {
    description = cleanHtmlText(descMatch[1]);
  }
  
  if (!description || description.includes("Open Trip Lombok")) {
    const pMatches = [...contentHtml.matchAll(/<p>([\s\S]*?)<\/p>/gi)];
    for (const p of pMatches) {
      const txt = cleanHtmlText(p[1]);
      if (txt.length > 50 && !txt.includes("http") && !txt.includes("Open Trip") && !txt.includes("Detail Tour")) {
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
  const incSearch = /Harga Sudah Termasuk\s*:\s*<\/strong><\/h[34]>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const incSearch2 = /Harga Sudah Termasuk\s*<\/strong><\/h[34]>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const incSearch3 = /Harga Termasuk\s*:\s*<\/strong><\/h[34]>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const incSearch4 = /Fasilitas yang didapat\s*:\s*<\/strong><\/h[34]>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;

  let incBlock = contentHtml.match(incSearch) || contentHtml.match(incSearch2) || contentHtml.match(incSearch3) || contentHtml.match(incSearch4);
  if (!incBlock) {
    const incIndex = contentHtml.search(/Harga Sudah Termasuk|Harga Termasuk|Fasilitas/gi);
    if (incIndex !== -1) {
      const sub = contentHtml.substring(incIndex, incIndex + 2000);
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
      if (item && !item.includes("Detail Tour")) includes.push(item);
    });
  }

  // Extract Exclusions (Harga Belum Termasuk)
  const excludes: string[] = [];
  const excSearch = /Harga Belum Termasuk\s*:\s*<\/strong><\/h[34]>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const excSearch2 = /Harga Belum Termasuk\s*<\/strong><\/h[34]>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;
  const excSearch3 = /Harga Tidak Termasuk\s*:\s*<\/strong><\/h[34]>[\s\S]*?<ul>([\s\S]*?)<\/ul>/i;

  let excBlock = contentHtml.match(excSearch) || contentHtml.match(excSearch2) || contentHtml.match(excSearch3);
  if (!excBlock) {
    const excIndex = contentHtml.search(/Harga Belum Termasuk|Harga Tidak Termasuk/gi);
    if (excIndex !== -1) {
      const sub = contentHtml.substring(excIndex, excIndex + 2000);
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
      if (item && !item.includes("Detail Tour")) excludes.push(item);
    });
  }

  if (excludes.length === 0) {
    excludes.push("Tiket pesawat dari/ke kota asal", "Pengeluaran pribadi", "Tips guide/driver");
  }

  // Extract Itinerary (HARI 1, HARI 2, etc.)
  const itinerary: ItineraryDay[] = [];
  
  // Custom parsing for day headers to completely avoid booking widgets
  // We look for headers (h3, h4) that contain "HARI" followed by a number
  const dayHeaderRegex = /<(h[34])[^>]*>([\s\S]*?HARI\s+[0-9]+[\s\S]*?)<\/\1>/gi;
  const headers = [...contentHtml.matchAll(dayHeaderRegex)];

  headers.forEach((h, idx) => {
    const fullText = cleanHtmlText(h[2]);
    
    // FILTER OUT BOOKING FORM JUNK
    if (
      fullText.includes("Detail Tour") || 
      fullText.includes("Detail Pemesan") || 
      fullText.includes("Metode Pembayaran") || 
      fullText.includes("Titel Pilih") || 
      fullText.includes("Harga Rp") ||
      fullText.includes("Tamu Orang") ||
      fullText.includes("Proses Pemesanan") ||
      fullText.includes("Syarat & Ketentuan") ||
      fullText.includes("Tour Lainnya") ||
      fullText.includes("Daftar Harga") ||
      fullText.length > 100 // Day headers are usually short and sweet
    ) {
      return;
    }

    // Extract day number
    const numMatch = fullText.match(/HARI\s+([0-9]+)/i);
    if (!numMatch) return;
    const dayNum = parseInt(numMatch[1]);
    
    let title = fullText.replace(/HARI\s+[0-9]+[\s.:-]*\s*/gi, "").trim();
    if (!title) title = "Kegiatan Wisata";

    // Find activities: subsequent HTML until the next header or end
    const startIndex = contentHtml.indexOf(h[0]) + h[0].length;
    let endIndex = contentHtml.length;
    
    // Find the next VALID day header
    let nextHeaderIndex = -1;
    for (let k = idx + 1; k < headers.length; k++) {
      const nextFullText = cleanHtmlText(headers[k][2]);
      if (
        !nextFullText.includes("Detail Tour") && 
        !nextFullText.includes("Detail Pemesan") && 
        !nextFullText.includes("Metode Pembayaran") &&
        nextFullText.length <= 100
      ) {
        nextHeaderIndex = contentHtml.indexOf(headers[k][0]);
        break;
      }
    }
    
    if (nextHeaderIndex !== -1) {
      endIndex = nextHeaderIndex;
    } else {
      // If no next header, look for booking widget start or other section
      const formIndex = contentHtml.search(/id="booking"|class="[^"]*booking[^"]*"/gi);
      if (formIndex !== -1 && formIndex > startIndex) {
        endIndex = formIndex;
      }
    }

    const subHtml = contentHtml.substring(startIndex, endIndex);
    const activities: string[] = [];
    const liMatches = [...subHtml.matchAll(/<li>([\s\S]*?)<\/li>/gi)];
    
    liMatches.forEach(m => {
      const act = cleanHtmlText(m[1]);
      if (act && !act.includes("http") && act.length > 3 && !act.includes("Detail Tour") && !act.includes("Daftar Harga")) {
        activities.push(act);
      }
    });

    if (activities.length === 0) {
      const pMatches = [...subHtml.matchAll(/<p>([\s\S]*?)<\/p>/gi)];
      pMatches.forEach(m => {
        const act = cleanHtmlText(m[1]);
        if (act && act.length > 10 && !act.includes("http") && !act.includes("Detail Tour") && !act.includes("Daftar Harga")) {
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

  const uniqueItinerary = itinerary.filter((val, index, self) => 
    self.findIndex(t => t.day === val.day) === index
  ).sort((a, b) => a.day - b.day);

  // Generate clean program highlights based on itinerary titles
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
