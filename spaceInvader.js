'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('avatarCanvas');
    const ctx = canvas.getContext('2d');

    const squareSize = 50;

    ctx.fillStyle = '#7FFF00';


    ctx.fillRect(220, 30, squareSize, squareSize)
    ctx.fillRect(30, 30, squareSize, squareSize)
    ctx.fillRect(80, 80, squareSize, squareSize)
    ctx.fillRect(130, 80, squareSize, squareSize)
    ctx.fillRect(170, 80, squareSize, squareSize)
    ctx.fillRect(30, 130, squareSize, squareSize)
    ctx.fillRect(80, 130, squareSize, squareSize)
    ctx.fillRect(130, 130, squareSize, squareSize)
    ctx.fillRect(180, 130, squareSize, squareSize)
    ctx.fillRect(220, 130, squareSize, squareSize)
    ctx.fillRect(30, 180, squareSize, squareSize)
    ctx.fillRect(80, 180, squareSize, squareSize)
    ctx.fillRect(130, 180, squareSize, squareSize)
    ctx.fillRect(180, 180, squareSize, squareSize)
    ctx.fillRect(220, 180, squareSize, squareSize)
    ctx.fillRect(30, 230, squareSize, squareSize)
    ctx.fillRect(220, 230, squareSize, squareSize)

});