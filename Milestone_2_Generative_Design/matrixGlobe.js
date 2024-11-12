"use strict";
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    noLoop();
}

function draw() {
    // background(0);
    let matrixPalette = ['#00ff41', '#39ff14', '#03fcba', '#66ff66'];
    drawStars(400, matrixPalette); 
    drawGlowingParticles(100, matrixPalette);
    drawMatrixGlobe(width / 2, height / 2, min(width, height) * 0.4); 
}

function drawMatrixGlobe(centerX, centerY, radius) {
    let numLines = 21;
    // Matrix color palette
    let colorPalettes = [
        ['#00ff41', '#39ff14', '#03fcba', '#66ff66'], // Matrix green
        ['#9400d3', '#8a2be2', '#9370db', '#da70d6'], // Purple shades
        ['#00f7ff', '#1e90ff', '#4682b4', '#5f9ea0'], // Electric blue
        ['#808080', '#a9a9a9', '#696969', '#d3d3d3'], // Grey shades
        ['#FFFFFF', '#F6F6F6', '#ECECEC', '#E1E1E1']  // white

    ];
    let colorPalette = random(colorPalettes);

    // Draw latitude lines
    for (let i = 0; i <= numLines; i++) {
        let angle = map(i, 0, numLines, -HALF_PI, HALF_PI);
        let y = sin(angle) * radius;
        stroke(random(colorPalette));
        noFill();
        ellipse(centerX, centerY, radius * 2, y * 2);
    }

    // Draw longitude lines
    for (let j = 0; j <= numLines; j++) {
        let angle = map(j, 0, numLines, 0, TWO_PI);
        let x = cos(angle) * radius;
        stroke(random(colorPalette));
        noFill();
        ellipse(centerX, centerY, x * 2, radius * 2);
    }
}

// Function to draw stars in the background with Matrix-style colors
function drawStars(numStars, colorPalette) {
    for (let i = 0; i < numStars; i++) {
        let x = random(width);
        let y = random(height);
        let size = random(1, 3);
        fill(random(colorPalette));
        noStroke();
        ellipse(x, y, size, size);
    }
}

// Function to draw glowing particles with Matrix-style colors
function drawGlowingParticles(numParticles, colorPalette) {
    for (let i = 0; i < numParticles; i++) {
        let x = random(width);
        let y = random(height);
        let size = random(5, 10);
        fill(random(colorPalette));
        noStroke();
        ellipse(x, y, size, size);
    }
}

// Adjust canvas on window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}