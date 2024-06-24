const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 4096;
const height = 4096;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

function generateFullSpectrum() {
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, 'rgb(255, 0, 0)');      // Red
    gradient.addColorStop(1/6, 'rgb(255, 255, 0)');  // Yellow
    gradient.addColorStop(2/6, 'rgb(0, 255, 0)');    // Green
    gradient.addColorStop(3/6, 'rgb(0, 255, 255)');  // Cyan
    gradient.addColorStop(4/6, 'rgb(0, 0, 255)');    // Blue
    gradient.addColorStop(5/6, 'rgb(255, 0, 255)');  // Magenta
    gradient.addColorStop(1, 'rgb(255, 0, 0)');      // Red again

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for(let i = 0; i < width; i++) {
      for(let j = 0; j < height/2; j++) {
        const color = `rgba(255, 255 , 255 , ${(1 - j/(height/2))})`;
        ctx.fillStyle = color;
        ctx.fillRect(i, j, 1, 1);
      }
      for(let j = height/2; j < height; j++) {
        const color = `rgba(0, 0 , 0, ${(j/(height/2)) - 1})`;
        ctx.fillStyle = color;
        ctx.fillRect(i, j, 1, 1);
      }
    }
}

generateFullSpectrum();

const out = fs.createWriteStream(__dirname + '/full_spectrum.png');
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('The PNG file was saved.'));
