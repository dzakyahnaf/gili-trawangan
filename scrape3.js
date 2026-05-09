const fs = require('fs');
const html = fs.readFileSync('gili-boat-car.html', 'utf-8');
const matches = [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)];
matches.forEach(m => {
  console.log(m[1]);
});
