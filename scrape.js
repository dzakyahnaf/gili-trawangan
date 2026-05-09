const https = require('https');
https.get('https://gilisnorkelingtour.com/private-speed-boat-and-car/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const fs = require('fs');
    fs.writeFileSync('gili-boat-car.html', data);
    console.log('Saved to gili-boat-car.html');
  });
});
