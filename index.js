/* Prepare canvas */
//const intViewportWidth = window.innerWidth;
const container = document.querySelector('.container');
const bounds = container.getBoundingClientRect();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const buttonTriangle = document.querySelector('.game__button-triangle');
const buttonCircle = document.querySelector('.game__button-circle');
const buttonStar = document.querySelector('.game__button-star');
const buttonUmbrella = document.querySelector('.game__button-umbrella');
const gameStart = document.querySelector('.game');

let mouseDown = false;
let prevX = '';
let prevY = '';
let pixelsShape = '';

function setupCanvas() {
   canvas.height = 500;
   canvas.width = 500;
   ctx.lineWidth = 16;
   ctx.lineCap = 'round';
   //ctx.strokeStyle = 'rgb(0, 0, 0)';
}

/* Triangle shape */
function drawTriangle() {
   gameStart.classList.add('hidden');
   ctx.strokeStyle = 'rgb(66, 10, 0)';
   ctx.beginPath();
   ctx.moveTo(250, 100);
   ctx.lineTo(400, 350);
   ctx.lineTo(100, 350);
   ctx.closePath();
   ctx.stroke();
   /* Get pixels of shape */
   pixelsShape = getPixelAmount(66, 10, 0);
}

/* Circle shape */
function drawCircle() {
   gameStart.classList.add('hidden');
   ctx.strokeStyle = 'rgb(66, 10, 0)';
   ctx.beginPath();
   ctx.arc(250, 250, 125, 0*Math.PI, 2 * Math.PI);
   ctx.closePath();
   ctx.stroke();
   /* Get pixels of shape */
   pixelsShape = getPixelAmount(66, 10, 0);
}

/* Star shape */
function drawStar() {
   gameStart.classList.add('hidden');
   ctx.strokeStyle = 'rgb(66, 10, 0)';

   let rot = Math.PI / 2 * 3;
   let x = 250;
   let y = 250;
   let cx = 250;
   let cy = 250;
   const spikes = 5;
   const outerRadius = 150;
   const innerRadius = 75;
   const step = Math.PI / 5;

   ctx.strokeSyle = "#000";
   ctx.beginPath();
   ctx.moveTo(cx, cy - outerRadius)
   for (i = 0; i < spikes; i++) {
       x = cx + Math.cos(rot) * outerRadius;
       y = cy + Math.sin(rot) * outerRadius;
       ctx.lineTo(x, y)
       rot += step

       x = cx + Math.cos(rot) * innerRadius;
       y = cy + Math.sin(rot) * innerRadius;
       ctx.lineTo(x, y)
       rot += step
   }
   ctx.lineTo(cx, cy - outerRadius)
   ctx.closePath();
   ctx.stroke();
   /* Get pixels of shape */
   pixelsShape = getPixelAmount(66, 10, 0);
}

/* Umbrella Shape */
function drawUmbrella() {
   gameStart.classList.add('hidden');
   ctx.strokeStyle = 'rgb(66, 10, 0)';
   let path = new Path2D('M 100,100 h 50 v 50 h 50');
   ctx.stroke(path);
   /* Get pixels of shape */
   pixelsShape = getPixelAmount(66, 10, 0);
}

/* Determine X and Y coordinates of mouse */
function handleMouseMove(e) {
   const x = e.clientX - bounds.left;
   const y = e.clientY - bounds.top;
   /* Only paint when user is holding mouse down */
   // console.log(`x is ${e.clientX}, bounds x is ${x}`);
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
      ctx.strokeStyle = 'rgb(247, 226, 135)';
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
   let pixelsTrace = getPixelAmount(247, 226, 135);
   console.log(`Pixels Shape: ${pixelsShape}`);
   console.log(`Pixels Trace: ${pixelsTrace}`);
   let pixelDifference = pixelsTrace / pixelsShape;
   if (pixelDifference > 0.75 && pixelDifference < 1.25) {
      console.log(`${pixelDifference} You passed`);
   } else {
      console.log(`${pixelDifference} You failed`)
   }
}

/* Event Handlers */
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);

buttonTriangle.addEventListener('click', drawTriangle);
buttonCircle.addEventListener('click', drawCircle);
buttonStar.addEventListener('click', drawStar);
buttonUmbrella.addEventListener('click', drawUmbrella);

//console.log(intViewportWidth);
setupCanvas();
//drawTriangle();