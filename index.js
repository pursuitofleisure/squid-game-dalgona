/* Prepare canvas */
const viewportWidth = window.innerWidth;
const container = document.querySelector('.container');
const bounds = container.getBoundingClientRect();
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const buttonTriangle = document.querySelector('.game__button-triangle');
const buttonCircle = document.querySelector('.game__button-circle');
const buttonStar = document.querySelector('.game__button-star');
const buttonUmbrella = document.querySelector('.game__button-umbrella');
const gameStart = document.querySelector('.game');
const results = document.querySelector('.results');

let mouseDown = false;
let startedTurn = false;
let prevX = '';
let prevY = '';
let pixelsShape = '';

function setupCanvas() {
   canvas.height = 400;
   canvas.width = 400;
   canvas.style.width = `${canvas.width}px`;
   canvas.style.height = `${canvas.height}px`;
   ctx.lineWidth = 12;
   ctx.lineCap = 'round';
   //ctx.strokeStyle = 'rgb(0, 0, 0)';
}

/* Triangle shape */
function drawTriangle() {
   gameStart.classList.add('hidden');
   ctx.strokeStyle = 'rgb(66, 10, 0)';
   // if(viewportWidth < 500) {
   //    ctx.scale(0.8, 0.8);
   // }
   ctx.beginPath();
   // ctx.moveTo(250, 100);
   // ctx.lineTo(400, 350);
   // ctx.lineTo(100, 350);
   ctx.moveTo(200, 100);
   ctx.lineTo(300, 275);
   ctx.lineTo(100, 275);
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
   ctx.arc(200, 200, 100, 0*Math.PI, 2 * Math.PI);
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
   let x = 200;
   let y = 200;
   let cx = 200;
   let cy = 200;
   const spikes = 5;
   const outerRadius = 120;
   const innerRadius = 60;
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
   //ctx.beginPath();
   // Umbrella parasol
   //ctx.arc(200, 180, 120, 0*Math.PI, 1 * Math.PI, true); // top of umbrella
   // ctx.moveTo(105, 180);
   // ctx.arc(105, 180, 25, 0*Math.PI, 1 * Math.PI, true);
   // ctx.moveTo(155, 180);
   // ctx.arc(155, 180, 25, 0*Math.PI, 1 * Math.PI, true);
   // ctx.moveTo(240, 180);
   // ctx.arc(240, 180, 25, 0*Math.PI, 1 * Math.PI, true);
   // ctx.moveTo(295, 180);
   // ctx.arc(295, 180, 25, 0*Math.PI, 1 * Math.PI, true);
   
   // line
   
   // end line
   //ctx.closePath();
   //ctx.stroke();
   drawArc(200, 180, 120, 0, 1); // large parasol
   drawArc(108, 180, 26, 0, 1);
   drawArc(161, 180, 26, 0, 1);
   drawArc(243, 180, 26, 0, 1);
   drawArc(294, 180, 26, 0, 1);

   /* Draw handle */
   //ctx.beginPath();
   ctx.moveTo(187, 180);
   ctx.lineTo(187, 300);
   ctx.stroke();

   drawArc(237, 300, 50, 0, 1, false);
   drawArc(271, 300, 16, 0, 1);
   drawArc(236, 301, 19, 0, 1, false);

   ctx.moveTo(217, 300);
   ctx.lineTo(217, 184);
   //ctx.lineTo(220, 180);
   ctx.stroke();

   /* Get pixels of shape */
   pixelsShape = getPixelAmount(66, 10, 0);
}

function drawArc(x, y, radius, start, end, counterClockwise = true) {
   //ctx.strokeStyle = 'rgb(66, 10, 0)';
   ctx.beginPath();
   //ctx.moveTo(x, y);
   ctx.arc(x, y, radius, start * Math.PI, end * Math.PI, counterClockwise);
   ctx.stroke();
}

/* Determine X and Y coordinates of mouse */
function handleMouseMove(e) {
   const x = e.clientX - bounds.left;
   const y = e.clientY - bounds.top;
   //console.log(`x: ${x}, y: ${y}`);
   /* Only paint when user is holding mouse down */
   // console.log(`x is ${e.clientX}, bounds x is ${x}`);
   if (mouseDown) {
      paint(x, y);
   }
}

function handleMouseDown(e) {
   if (!startedTurn) {
      mouseDown = true;
      startedTurn = true;
      //e.preventDefault();
   } else {
      console.log('You already played');
   }
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
   /* user has gone too far off the shape */
   if (color.a === 0) {
      results.textContent = `You failed by breaking the shape`;
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
   //console.log(`Pixels Shape: ${pixelsShape}`);
   //console.log(`Pixels Trace: ${pixelsTrace}`);
   let pixelDifference = pixelsTrace / pixelsShape;
   if (pixelDifference > 0.75 && pixelDifference < 1.25) {
      //console.log(`${pixelDifference} You passed`);
      results.textContent = `You passed with ${Math.round(pixelDifference * 100)}%`;
   } else {
      //console.log(`${pixelDifference} You failed`);
      results.textContent = `You failed with ${Math.round(pixelDifference * 100)}%`;
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