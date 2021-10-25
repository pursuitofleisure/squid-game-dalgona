/* Prepare canvas */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let mouseDown = false;
let prevX = '';
let prevY = '';
let pixelsShape = '';

function setupCanvas() {
   canvas.height = 520;
   canvas.width = 520;
   ctx.lineWidth = 20;
   ctx.lineCap = 'round';
   ctx.strokeStyle = 'rgb(0, 0, 0)';
}

function drawTriangle() {
   ctx.strokeStyle = 'rgb(66, 10, 0)';
   ctx.beginPath();
   ctx.moveTo(260, 10);
   ctx.lineTo(510, 510);
   ctx.lineTo(10, 510);
   ctx.closePath();
   ctx.stroke();
   /* Get pixels of shape */
   pixelsShape = getPixelAmount(66, 10, 0);
}

function handleMouseMove(e) {
   const x = e.clientX;
   const y = e.clientY;
   /* Only paint when user is holding mouse down */
   if (mouseDown) {
      paint(x, y);
   }
}

function handleMouseDown(e) {
   mouseDown = true;
   //e.preventDefault();
}

function handleMouseUp(e) {
   mouseDown = false;
   evaluatePixels();
   //e.preventDefault();
}

/* Get opacity of canvas */
function getPixelColor(x, y) {
   const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
   let index = ((y * (pixels.width * 4)) + (x * 4));
   return {
      r:pixels.data[index],
      g:pixels.data[index + 1],
      b:pixels.data[index + 2],
      a:pixels.data[index + 3]
   };
}

/* Begins path and moves context and paints line */
function paint(x, y) {
   let color = getPixelColor(x, y);
   /* if user is not on the shape, then display error */
   if (color.a === 0) {
      console.log('error');
   } else {
      ctx.strokeStyle = 'rgb(1, 1, 1)';
      ctx.beginPath();
      /* Draw a continuous line */
      if (prevX > 0 && prevY > 0) {
         ctx.moveTo(prevX, prevY);
      }
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.closePath();
      prevX = x;
      prevY = y;
   }
}

/* Read the context and get all the pixels in the canvas */
function getPixelAmount(r, g, b) {
   const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
   const allPixels = pixels.data.length;
   let amount = 0;
   for (let i = 0; i < allPixels; i += 4) {
      if (pixels.data[i] === r &&
          pixels.data[i+1] === g &&
          pixels.data[i+2] === b) {
        amount++;
      }
    }
    return amount;
}

/* Divide the number of pixels that were traced by the pixels in the shape to determine how accurate the cut out is */
function evaluatePixels() {
   let pixelsTrace = getPixelAmount(1, 1, 1);
   console.log(`Pixels Shape: ${pixelsShape}`);
   console.log(`Pixels Trace: ${pixelsTrace}`);
   let pixelDifference = pixelsTrace / pixelsShape;
   if (pixelDifference > 0.35) {
      console.log(`${pixelDifference} You passed`);
   } else {
      console.log(`${pixelDifference} You failed`)
   }
}

/* Event Handlers */
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);

setupCanvas();
drawTriangle();