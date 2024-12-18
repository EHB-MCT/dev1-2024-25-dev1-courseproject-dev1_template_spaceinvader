"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;
let mouse = { x: width / 2, y: height / 2 }; // Track mouse position

// ------ RandomBetween function to re-use in the code to get a random number between two numbers ------
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// ----------- Gradient Color Palette ----------
const gradientPalette = ["#87CEFA", "#4682B4", "#D3D3D3", "#A9A9A9", "#FFFFFF", "#6A5ACD", "#483D8B", "#000000", "#1B1F3B"];

// -------- Sky Gradient ----------
function drawSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#000428");
  gradient.addColorStop(1, "#004e92");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

// ------ White grid on sky gradient --------
function drawGrid(spacing) {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 2;
  for (let x = 0; x < width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

// -------- Stars --------
function drawStar(x, y, size, opacity) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.fill();
}

function generateStars(count) {
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * (height * 0.6);
    const size = randomBetween(0.5, 2) + (mouse.y / height) * 1.5; // Adjust size based on mouse position
    const opacity = randomBetween(0.3, 1);
    drawStar(x, y, size, opacity);
  }
}

 // --------- Gradient --------
 function createGradient(x0, y0, x1, y1) {
    const color1 = gradientPalette[Math.floor(Math.random() * gradientPalette.length)];
    const color2 = gradientPalette[Math.floor(Math.random() * gradientPalette.length)];
    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// ------ Hills/waves with Gradient Colors ------

// The hill starts at a specified vertical position (baseY) and uses the amplitude to control the height of the wave.
// The shape of the hill is created using the sine function.
// readed sources to code this part an get the logic:
// https://stackoverflow.com/questions/64063114/how-can-i-make-my-sine-wave-in-javascript-work-properly

function drawHill(baseY, amplitude) {
  const gradient = createGradient(0, baseY - amplitude, width, baseY);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(0, baseY);
  for (let x = 0; x <= width; x += 10) {
    const y = baseY - Math.sin(x * 0.01 + Math.random()) * amplitude;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  ctx.fill();
}

// ------ Moon with randomized position, scale, and gradient ------
function drawMoon() {
    const radius = randomBetween(50, 100); // Randomized size
    const x = randomBetween(width * 0.1, width * 0.9); // Anywhere horizontally
    const y = randomBetween(0, height * 0.5); // Upper quadrant (top 50%)

    const moonGradient = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius);
    const color1 = gradientPalette[Math.floor(Math.random() * gradientPalette.length)];
    const color2 = gradientPalette[Math.floor(Math.random() * gradientPalette.length)];
    moonGradient.addColorStop(0, color1);
    moonGradient.addColorStop(1, color2);

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = moonGradient;
    ctx.fill();
}

function drawLandscape() {
  drawSky();
  drawGrid(50);
  generateStars(300);
  drawHill(height * 0.7, 50);
  drawHill(height * 0.8, 70);
  drawHill(height * 0.9, 90);
  drawMoon();
}

function animateLandscape() {
  ctx.clearRect(0, 0, width, height);
  drawLandscape();
  requestAnimationFrame(animateLandscape);
}

drawLandscape();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawLandscape();
});

// ------ Mouse Interaction ------
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  animateLandscape();
});
