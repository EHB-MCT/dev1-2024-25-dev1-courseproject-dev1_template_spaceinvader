"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;
let mouse = { x: width / 2, y: height / 2 };
let animationFrameId = null;
let timeout = null;
let isAnimating = false;
let time = 0;

// ------ RandomBetween function ------
// function to pick a random number between two numbers.
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

// ------ Star Class ------
class Star {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * (height * 0.6);
    this.baseSize = randomBetween(0.5, 2);
    this.opacity = randomBetween(0.3, 1);
  }

  update() {
    this.size = this.baseSize + (mouse.y / height) * 1.5 + Math.sin(time * 0.5) * 0.5;
    this.opacity = 0.3 + Math.abs(Math.sin(time * 0.5)) * 0.7;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

// ------ Stars Array ------
let numberOfStars = 300;
const stars = [];
for (let i = 0; i < numberOfStars; i++) {
  stars.push(new Star());
}

// ------ Gradient Palette ------
const gradientPalette = ["#87CEFA", "#4682B4", "#D3D3D3", "#A9A9A9", "#FFFFFF", "#6A5ACD", "#483D8B", "#000000", "#1B1F3B"];

// ------ Sky Gradient ------
function drawSky() {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#000428");
  gradient.addColorStop(1, "#004e92");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

// ------ Grid ------
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

// ------ Gradient Hills ------

// The hill starts at a specified vertical position (baseY) and uses the amplitude to control the height of the wave.
// The shape of the hill is created using the sine function.
// readed sources to code this part an get the logic:
// https://stackoverflow.com/questions/64063114/how-can-i-make-my-sine-wave-in-javascript-work-properly

function createGradient(x0, y0, x1, y1) {
  const color1 = gradientPalette[Math.floor(Math.random() * gradientPalette.length)];
  const color2 = gradientPalette[Math.floor(Math.random() * gradientPalette.length)];
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  return gradient;
}

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

// ------ Moon ------
function drawMoon() {
  const radius = randomBetween(50, 100);
  const x = randomBetween(width * 0.1, width * 0.9);
  const y = randomBetween(0, height * 0.5);

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

// ------ Complete Landscape ------
function drawLandscape() {
  drawSky();
  drawGrid(50);
  stars.forEach((star) => {
    star.update();
    star.draw();
  });
  drawHill(height * 0.7, 50);
  drawHill(height * 0.8, 70);
  drawHill(height * 0.9, 90);
  drawMoon();
}

// ------ Animation Control ------
function animateLandscape() {
  time += 0.05; // Increment time for smooth animation
  ctx.clearRect(0, 0, width, height);
  drawLandscape();
  animationFrameId = requestAnimationFrame(animateLandscape);
}

function startAnimation() {
  if (!isAnimating) {
    isAnimating = true;
    animateLandscape();
  }
}

function stopAnimation() {
  if (isAnimating) {
    isAnimating = false;
    cancelAnimationFrame(animationFrameId);
  }
}


window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  clearTimeout(timeout);
  startAnimation();
  timeout = setTimeout(() => {
    stopAnimation();
  }, 100);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawLandscape();
});

drawLandscape();
