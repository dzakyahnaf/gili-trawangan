async function run() {
  try {
    const url = "https://opentriplombok.com/tour/open-trip-lombok/";
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    console.log("Status:", res.status);
    const html = await res.text();
    console.log("HTML length:", html.length);
    console.log("Snippet:", html.substring(0, 500));
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
