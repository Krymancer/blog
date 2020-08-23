const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let r = 140;
let factor = 0;
const total = 100;

context.strokeStyle = 'white';
context.fillStyle = 'white';

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function getVector(index, total) {
    const angle = map(index % total, 0, total, 0, 2 * Math.PI);
    const v = {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
    }

    return v;
}


function update() {
    context.clearRect(0, 0, 300, 300);
    context.beginPath();
    context.arc(150, 150, r, 0, 2 * Math.PI);
    context.stroke();
    context.translate(150, 150);

    factor += 0.01;

    for (let i = 0; i < total; i++) {
        const a = getVector(i, total);
        const b = getVector(i * factor, total);

        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
        context.moveTo(0, 0);
    }

    context.translate(-150, -150);
    requestAnimationFrame(update);
}

update();