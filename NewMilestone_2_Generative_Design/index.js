"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

// ------ RandomBetween function to re-use in the code to get a random number between two numbers ------
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

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
    const size = randomBetween(0.5, 2);
    const opacity = randomBetween(0.3, 1);
    drawStar(x, y, size, opacity);
  }
}

function drawLandscape() {
  drawSky();
  drawGrid(50);
  generateStars(300)
}

drawLandscape();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
