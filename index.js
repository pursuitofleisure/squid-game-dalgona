/* Prepare canvas */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let mouseDown = false;
let prevX = '';
let prevY = '';

function setupCanvas() {
   canvas.height = 500;
   canvas.width = 500;
   ctx.lineWidth = 20;
   ctx.lineCap = 'round';
   ctx.strokeStyle = 'rgb(0, 0, 50)';
}

function drawTriangle() {

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
   //e.preventDefault();
}

/* Begins path and moves context and paints line */
function paint(x, y) {
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

canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
setupCanvas();