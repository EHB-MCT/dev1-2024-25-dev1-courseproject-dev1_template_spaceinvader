"use strict";
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    noLoop();
}

function draw() {
    background(0);
    drawWireframeGlobe(width / 2, height / 2, min(width, height) * 0.4); // Draw the wireframe globe
}

// Function to draw the wireframe globe
function drawWireframeGlobe(centerX, centerY, radius) {
    let numLines = 15;
    stroke('#00ff00');
    noFill();

    // Draw latitude lines
    for (let i = 0; i <= numLines; i++) {
        let angle = map(i, 0, numLines, -HALF_PI, HALF_PI);
        let y = sin(angle) * radius;
        ellipse(centerX, centerY, radius * 2, y * 2);
    }

    // Draw longitude lines
    for (let j = 0; j <= numLines; j++) {
        let angle = map(j, 0, numLines, 0, TWO_PI);
        let x = cos(angle) * radius;
        ellipse(centerX, centerY, x * 2, radius * 2);
    }
}

// Adjust canvas on window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
