const fs = require('fs');
const html = fs.readFileSync('gili-boat-car.html', 'utf-8');

// The items are usually inside elements with class containing 'tour-item' or similar.
// Let's find all <img src="..."> in the HTML that are near the titles.
const titles = ['Private Speed Boat: Lombok', 'Private Speed Boat and Car', 'Private Car'];
titles.forEach(t => {
  const index = html.indexOf(t);
  if (index !== -1) {
    // Look backward for an image
    const substr = html.substring(Math.max(0, index - 2000), index);
    const imgMatch = substr.match(/<img[^>]*src="([^"]+)"/g);
    if (imgMatch) {
      console.log('Title:', t);
      console.log('Image:', imgMatch[imgMatch.length - 1]);
    }
  }
});
