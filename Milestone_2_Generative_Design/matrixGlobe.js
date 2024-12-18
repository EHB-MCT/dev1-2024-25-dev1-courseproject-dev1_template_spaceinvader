// "use strict";
// function setup() {
//     let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
//     canvas.parent('sketch-holder');
//     noLoop();
// }

// function draw() {
//     // background(0);
//     let matrixPalette = ['#00ff41', '#39ff14', '#03fcba', '#66ff66'];
//     drawStars(400, matrixPalette); 
//     drawGlowingParticles(50, matrixPalette);
//     drawMatrixGlobe(width / 2, height / 2, min(width, height) * 0.4);
//     drawSpaceships(); 
// }

// function drawMatrixGlobe(centerX, centerY, radius) {
//     let numLines = 21;
//     // Matrix color palette
//     let colorPalettes = [
//         ['#00ff41', '#39ff14', '#03fcba', '#66ff66'], // Matrix green
//         ['#9400d3', '#8a2be2', '#9370db', '#da70d6'], // Purple shades
//         ['#00f7ff', '#1e90ff', '#4682b4', '#5f9ea0'], // Electric blue
//         ['#808080', '#a9a9a9', '#696969', '#d3d3d3'], // Grey shades
//         ['#FFFFFF', '#F6F6F6', '#ECECEC', '#E1E1E1']  // white
//     ];
//     let colorPalette = random(colorPalettes);

//     // Draw latitude lines
//     for (let i = 0; i <= numLines; i++) {
//         let angle = map(i, 0, numLines, -HALF_PI, HALF_PI);
//         let y = sin(angle) * radius;
//         stroke(random(colorPalette));
//         noFill();
//         sphere(200, 24, 16);
//     }

//     // Draw longitude lines
//     for (let j = 0; j <= numLines; j++) {
//         let angle = map(j, 0, numLines, 0, TWO_PI);
//         let x = cos(angle) * radius;
//         stroke(random(colorPalette));
//         noFill();
//         ellipse(centerX, centerY, x * 2, radius * 2);
//     }
// }


// function drawStars(numStars, colorPalette) {
//     for (let i = 0; i < numStars; i++) {
//         let x = random(width);
//         let y = random(height);
//         let size = random(1, 3);
//         fill(random(colorPalette));
//         noStroke();
//         ellipse(x, y, size, size);
//     }
// }


// function drawGlowingParticles(numParticles, colorPalette) {
//     for (let i = 0; i < numParticles; i++) {
//         let x = random(width);
//         let y = random(height);
//         let size = random(5, 10);
//         fill(random(colorPalette));
//         noStroke();
//         ellipse(x, y, size, size);
//     }
// }

// function drawSpaceships() {

//     let numSpaceships = (random(10));

//     for (let i = 0; i < numSpaceships; i++) {
//         let x = random(width);
//         let y = random(height * 0.2, height * 0.8);
//         let shipWidth = random(60, 90);
//         let shipHeight = shipWidth * 0.4;
//         let colorPalette = ['#ffffff', '#a9a9a9', '#000000'];

//         fill(random(colorPalette));
//         stroke(200);
//         strokeWeight(2);
//         beginShape();
//         // Nose of the spaceship (sharp and aerodynamic)
//         vertex(x, y);
//         vertex(x + shipWidth * 0.2, y - shipHeight * 0.5);
//         // Front fuselage
//         vertex(x + shipWidth * 0.5, y - shipHeight * 0.4);
//         // Left wing (upper)
//         vertex(x + shipWidth * 0.7, y - shipHeight);
//         vertex(x + shipWidth * 0.9, y - shipHeight);
//         vertex(x + shipWidth * 0.75, y - shipHeight * 0.4);
//         // Rear fuselage (top)
//         vertex(x + shipWidth * 1.0, y - shipHeight * 0.3);
//         // Back thruster section
//         vertex(x + shipWidth * 1.3, y);
//         vertex(x + shipWidth * 1.0, y + shipHeight * 0.3);
//         // Right wing (lower)
//         vertex(x + shipWidth * 0.75, y + shipHeight * 0.4);
//         vertex(x + shipWidth * 0.9, y + shipHeight);
//         vertex(x + shipWidth * 0.7, y + shipHeight);
//         // Front fuselage (bottom)
//         vertex(x + shipWidth * 0.5, y + shipHeight * 0.4);
//         vertex(x + shipWidth * 0.2, y + shipHeight * 0.5);
//         endShape(CLOSE);

//         // Glowing effect for thrusters
//         fill('#00ff41');
//         noStroke();
//         ellipse(x + shipWidth * 1.15, y - shipHeight * 0.2, shipWidth * 0.1, shipHeight * 0.3);
//         ellipse(x + shipWidth * 1.15, y + shipHeight * 0.2, shipWidth * 0.1, shipHeight * 0.3);

//         // Cockpit section with glass effect
//         fill(0, 255, 255, 150); // Semi-transparent cyan for the cockpit
//         ellipse(x + shipWidth * 0.4, y, shipWidth * 0.2, shipHeight * 0.5);

//         // Fins with a glowing effect
//         fill(random(colorPalette));
//         noStroke();
//         triangle(x + shipWidth * 0.65, y - shipHeight * 0.8, x + shipWidth * 0.8, y - shipHeight * 0.5, x + shipWidth * 0.55, y - shipHeight * 0.5);
//         triangle(x + shipWidth * 0.65, y + shipHeight * 0.8, x + shipWidth * 0.8, y + shipHeight * 0.5, x + shipWidth * 0.55, y + shipHeight * 0.5);
//     }
// }



// ---------------------------------------------------------------------------
// Update - 3D globe using WEBGL

// "use strict";

// let canvas2D, canvas3D;

// function setup() {
//     // Create two separate canvases
//     canvas2D = createCanvas(windowWidth, windowHeight);
//     canvas2D.parent('sketch-holder');
//     noLoop();
    
//     // Create a 3D canvas using WEBGL for the matrix globe
//     canvas3D = createGraphics(windowWidth, windowHeight, WEBGL);
// }

// function draw() {
//     // Draw 2D elements
//     draw2DElements();
//     // Draw 3D globe in a separate graphics buffer and overlay it
//     draw3DGlobe();
//     image(canvas3D, 0, 0); // Overlay the 3D canvas on the 2D canvas
// }

// function draw2DElements() {
//     let matrixPalette = ['#00ff41', '#39ff14', '#03fcba', '#66ff66'];
//     drawStars(400, matrixPalette); 
//     drawGlowingParticles(50, matrixPalette);
//     drawSpaceships(10); 
// }

// // Function to draw a 3D matrix globe as a wireframe sphere on the separate WEBGL canvas
// function draw3DGlobe() {
//     canvas3D.clear();
//     canvas3D.push();
    
//     // Center the globe
//     canvas3D.translate(0, 0, 0);
    
//     // Controlled randomness for the sphere size
//     let scaleFactor = random(0.8, 1.2);  // Random scale factor between 0.8 and 1.2
//     let radius = min(1000, 1000) * 0.2 * scaleFactor; // Adjusted radius

//     // Choose a random color palette for the globe
//     let colorPalettes = [
//         ['#00ff41', '#39ff14', '#03fcba', '#66ff66'], // Matrix green
//         ['#9400d3', '#8a2be2', '#9370db', '#da70d6'], // Purple shades
//         ['#00f7ff', '#1e90ff', '#4682b4', '#5f9ea0'], // Electric blue
//         ['#808080', '#a9a9a9', '#696969', '#d3d3d3'], // Grey shades
//         ['#FFFFFF', '#F6F6F6', '#ECECEC', '#E1E1E1']  // White
//     ];
//     let colorPalette = random(colorPalettes);

//     // Set the stroke for the wireframe globe
//     canvas3D.noFill(); // Ensures the globe is not filled
//     canvas3D.stroke(random(colorPalette));
//     canvas3D.strokeWeight(0.7);

//     // Rotate the globe slowly for a dynamic effect
//     canvas3D.rotateY(frameCount * 0.01);
//     canvas3D.rotateX(frameCount * 0.01);

//     // Draw the sphere as a wireframe
//     canvas3D.sphere(radius, 21, 13);
    
//     canvas3D.pop();
// }

// function drawStars(numStars, colorPalette) {
//     for (let i = 0; i < numStars; i++) {
//         let x = random(width);
//         let y = random(height);
//         let size = random(1, 3);
//         fill(random(colorPalette));
//         noStroke();
//         ellipse(x, y, size, size);
//     }
// }

// function drawGlowingParticles(numParticles, colorPalette) {
//     for (let i = 0; i < numParticles; i++) {
//         let x = random(width);
//         let y = random(height);
//         let size = random(5, 10);
//         fill(random(colorPalette));
//         noStroke();
//         ellipse(x, y, size, size);
//     }
// }

// function drawSpaceships(baseSpaceships) {
//     let numSpaceships = baseSpaceships + Math.floor(random(-5, 5));
//     for (let i = 0; i < numSpaceships; i++) {
//         let x = random(width);
//         let y = random(height * 0.2, height * 0.8);
//         let shipWidth = random(60, 90);
//         let shipHeight = shipWidth * 0.4;
//         let colorPalette = ['#ffffff', '#a9a9a9', '#000000'];

//         fill(random(colorPalette));
//         stroke(200);
//         strokeWeight(2);
//         beginShape();
//         vertex(x, y);
//         vertex(x + shipWidth * 0.2, y - shipHeight * 0.5);
//         vertex(x + shipWidth * 0.5, y - shipHeight * 0.4);
//         vertex(x + shipWidth * 0.7, y - shipHeight);
//         vertex(x + shipWidth * 0.9, y - shipHeight);
//         vertex(x + shipWidth * 0.75, y - shipHeight * 0.4);
//         vertex(x + shipWidth * 1.0, y - shipHeight * 0.3);
//         vertex(x + shipWidth * 1.3, y);
//         vertex(x + shipWidth * 1.0, y + shipHeight * 0.3);
//         vertex(x + shipWidth * 0.75, y + shipHeight * 0.4);
//         vertex(x + shipWidth * 0.9, y + shipHeight);
//         vertex(x + shipWidth * 0.7, y + shipHeight);
//         vertex(x + shipWidth * 0.5, y + shipHeight * 0.4);
//         vertex(x + shipWidth * 0.2, y + shipHeight * 0.5);
//         endShape(CLOSE);

//         fill('#00ff41');
//         noStroke();
//         ellipse(x + shipWidth * 1.15, y - shipHeight * 0.2, shipWidth * 0.1, shipHeight * 0.3);
//         ellipse(x + shipWidth * 1.15, y + shipHeight * 0.2, shipWidth * 0.1, shipHeight * 0.3);

//         fill(0, 255, 255, 150);
//         ellipse(x + shipWidth * 0.4, y, shipWidth * 0.2, shipHeight * 0.5);

//         fill(random(colorPalette));
//         noStroke();
//         triangle(x + shipWidth * 0.65, y - shipHeight * 0.8, x + shipWidth * 0.8, y - shipHeight * 0.5, x + shipWidth * 0.55, y - shipHeight * 0.5);
//         triangle(x + shipWidth * 0.65, y + shipHeight * 0.8, x + shipWidth * 0.8, y + shipHeight * 0.5, x + shipWidth * 0.55, y + shipHeight * 0.5);
//     }
// }

// --------------------------------------------------------------------------------


// with globe, debris in 3D using WEBGL
"use strict";

let canvas2D, canvas3D;

function setup() {
    // Two separate canvases to fix the effect on the other 2D elements
    canvas2D = createCanvas(windowWidth, windowHeight);
    canvas2D.parent('sketch-holder');
    noLoop();
    
    // 3D canvas using WEBGL for the globe and spatial debris
    canvas3D = createGraphics(windowWidth, windowHeight, WEBGL);
}

function draw() {

    draw2DElements();
    draw3DGlobe();
    image(canvas3D, 0, 0); // Overlay the 3D canvas on the 2D canvas
}

function draw2DElements() {
    let matrixPalette = ['#00ff41', '#39ff14', '#03fcba', '#66ff66'];
    drawStars(400, matrixPalette); 
    drawGlowingParticles(50, matrixPalette);
    drawSpaceships(10);
}


function draw3DGlobe() {
    canvas3D.clear();
    canvas3D.push();
    
    canvas3D.translate(0, 0, 0);
    
    // Controlled randomness for the sphere size
    let scaleFactor = random(0.8, 1.8);
    let radius = min(width, height) * 0.2 * scaleFactor;

    let colorPalettes = [
        ['#00ff41', '#39ff14', '#03fcba', '#66ff66'], // Matrix green
        ['#9400d3', '#8a2be2', '#9370db', '#da70d6'], // Purple shades
        ['#00f7ff', '#1e90ff', '#4682b4', '#5f9ea0'], // Electric blue
        ['#808080', '#a9a9a9', '#696969', '#d3d3d3'], // Grey shades
        ['#FFFFFF', '#F6F6F6', '#ECECEC', '#E1E1E1']  // White
    ];
    let colorPalette = random(colorPalettes);

    canvas3D.noFill();
    canvas3D.stroke(random(colorPalette));
    canvas3D.strokeWeight(0.7);

    canvas3D.rotateY(frameCount * 20);
    canvas3D.rotateX(frameCount * 20);

    canvas3D.sphere(radius, 21, 13);
    
    drawDebrisAndSatellites(radius, colorPalette);

    canvas3D.pop();
}


function drawDebrisAndSatellites(radius, colorPalette) {
    let numDebris = random(15);
    let debrisDistance = radius * 2;
    let satelliteDistance = radius * 2.5;

    for (let i = 0; i < numDebris; i++) {
        canvas3D.push();
        
        let angleX = random(TWO_PI);
        let angleY = random(TWO_PI);

        let x = debrisDistance * sin(angleX) * cos(angleY);
        let y = debrisDistance * sin(angleX) * sin(angleY);
        let z = debrisDistance * cos(angleX);

        canvas3D.translate(x, y, z);

        canvas3D.rotateX(frameCount * 0.02 + i);
        canvas3D.rotateY(frameCount * 0.02 + i);

        canvas3D.stroke(random(colorPalette));
        canvas3D.noFill();
        canvas3D.box(random(10, 15));

        canvas3D.pop();
    }

    // Draw satellites as larger, distinct boxes
    let numSatellites = 5; // Number of satellites
    for (let j = 0; j < numSatellites; j++) {
        canvas3D.push();
        
        // Randomize the position around the globe for satellites
        let angleX = random(TWO_PI);
        let angleY = random(TWO_PI);

        // Calculate x, y, z coordinates for the satellite
        let x = satelliteDistance * sin(angleX) * cos(angleY);
        let y = satelliteDistance * sin(angleX) * sin(angleY);
        let z = satelliteDistance * cos(angleX);

        // Move satellite box to position
        canvas3D.translate(x, y, z);

        // Rotate the satellite box for a dynamic effect
        canvas3D.rotateX(frameCount * 0.015 + j * 0.5);
        canvas3D.rotateY(frameCount * 0.015 + j * 0.5);

        // Draw the satellite box with larger size and color
        canvas3D.stroke(random(colorPalette));
        canvas3D.noFill();
        canvas3D.box(random(20, 30)); // Larger box size for satellites

        canvas3D.pop();
    }
}

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

function drawSpaceships(baseSpaceships) {
    let numSpaceships = baseSpaceships + Math.floor(random(-5, 5));
    for (let i = 0; i < numSpaceships; i++) {
        let x = random(width);
        let y = random(height * 0.2, height * 0.8);
        let shipWidth = random(60, 90);
        let shipHeight = shipWidth * 0.4;
        let colorPalette = ['#ffffff', '#a9a9a9', '#000000'];

        fill(random(colorPalette));
        stroke(200);
        strokeWeight(2);
        beginShape();
        vertex(x, y);
        vertex(x + shipWidth * 0.2, y - shipHeight * 0.5);
        vertex(x + shipWidth * 0.5, y - shipHeight * 0.4);
        vertex(x + shipWidth * 0.7, y - shipHeight);
        vertex(x + shipWidth * 0.9, y - shipHeight);
        vertex(x + shipWidth * 0.75, y - shipHeight * 0.4);
        vertex(x + shipWidth * 1.0, y - shipHeight * 0.3);
        vertex(x + shipWidth * 1.3, y);
        vertex(x + shipWidth * 1.0, y + shipHeight * 0.3);
        vertex(x + shipWidth * 0.75, y + shipHeight * 0.4);
        vertex(x + shipWidth * 0.9, y + shipHeight);
        vertex(x + shipWidth * 0.7, y + shipHeight);
        vertex(x + shipWidth * 0.5, y + shipHeight * 0.4);
        vertex(x + shipWidth * 0.2, y + shipHeight * 0.5);
        endShape(CLOSE);

        fill('#00ff41');
        noStroke();
        ellipse(x + shipWidth * 1.15, y - shipHeight * 0.2, shipWidth * 0.1, shipHeight * 0.3);
        ellipse(x + shipWidth * 1.15, y + shipHeight * 0.2, shipWidth * 0.1, shipHeight * 0.3);

        fill(0, 255, 255, 150);
        ellipse(x + shipWidth * 0.4, y, shipWidth * 0.2, shipHeight * 0.5);

        fill(random(colorPalette));
        noStroke();
        triangle(x + shipWidth * 0.65, y - shipHeight * 0.8, x + shipWidth * 0.8, y - shipHeight * 0.5, x + shipWidth * 0.55, y - shipHeight * 0.5);
        triangle(x + shipWidth * 0.65, y + shipHeight * 0.8, x + shipWidth * 0.8, y + shipHeight * 0.5, x + shipWidth * 0.55, y + shipHeight * 0.5);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}