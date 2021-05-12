
// carousel

let text = document.getElementById('text');
let bird1 = document.getElementById('bird1');
let bird2 = document.getElementById('bird2');
let forest = document.getElementById('forest');
let rocks = document.getElementById('rocks');
let water = document.getElementById('water');
let header = document.getElementById('header');
let count = 0;

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    if(value > count) header.style.top = -56 + 'px';
    else if(value < count) header.style.top = 0 + 'px';

    count = value;

    if(value >= 450) {
        value -= 450;
        text.style.top = 50 + value * - 0.2 + '%';
        bird1.style.top = value * - 0.5 + 'px';
        bird1.style.left = value * 1 + 'px';
        bird2.style.top = value * - 0.5 + 'px';
        bird2.style.left = value * - 1 + 'px';
        rocks.style.top = value * - 0.12 + 'px';
        value += 450;
    }
})


//               group aniiiiiiiiiiiiiiiiiiiiiiiiiiii
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

class Particle {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color; 
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#000';
        ctx.fill();
    }

    update() {
        if(this.x > canvas.width || this.x < 0) {
            this.directionX = - this.directionX;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = - this.directionY
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < mouse.radius + this.size) {
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
    }
}

function init() {
    particlesArray = [];

    let numberOfParticles = (canvas.height * canvas.width) / 9000;

    for(let i = 0; i < numberOfParticles; i++){
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * (innerWidth - size * 2) - (size * 2) + size * 2);
        let y = (Math.random() * (innerHeight - size * 2) - (size * 2) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#000';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for(let a = 0; a < particlesArray.length; a++){
        for(let b = a; b < particlesArray.length; b++){
            let distance = ( (particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x) ) +
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if(distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(0, 0, 0, '+ opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke()
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.width / 80) * (canvas.height / 80));
    init();
})

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
})

init();
animate();

//                         group
// const pos = document.getElementById('search-blur');
// pos.addEventListener('mousemove', e => {
//     pos.style.setProperty('--x', e.clientX - 50 + 'px');
//     pos.style.setProperty('--y', e.clientY - 50 + 'px');
// })

// const vid = document.getElementById('clip1');

// function playVideo() {
//     vid.play();
// }
// playVideo();

function test() {
    document.getElementById('abc').click();
}
test();

const clip = document.getElementsByClassName('clip');

for(let i = 0; i < clip.length; i++){
    clip[i].addEventListener('mouseenter', e => {
        clip[i].play();
    })
    clip[i].addEventListener('mouseout', e => {
        clip[i].pause();
    })
}

//                          text
const textInner = document.getElementById('textInner');
textInner.innerHTML = textInner.textContent.replace(/\S/g, "<span>$&</span>");

const elements = document.querySelectorAll('span');
for(let i = 0; i < elements.length; i++){
    elements[i].style.animationDelay = i * 0.07 + 's';
}

// const calInner = document.getElementById('calInner');

// calInner.innerHTML = calInner.textContent.replace(/\S/g, "<span>$&</span>");

// const elements1 = document.querySelectorAll('span');
// for(let i = 0; i < elements1.length; i++){
//     elements1[i].style.animationDelay = i * 0.07 + 's';
// }

// wave

let wave1 = document.getElementById('wave1');
let wave2 = document.getElementById('wave2');
let wave3 = document.getElementById('wave3');
let wave4 = document.getElementById('wave4');

window.addEventListener('scroll', e => {
    let value = window.scrollY;

    wave1.style.backgroundPositionX = 400 + value * 4 + 'px';
    wave2.style.backgroundPositionX = 300 + value * -4 + 'px';
    wave3.style.backgroundPositionX = 200 + value * 2 + 'px';
    wave4.style.backgroundPositionX = 100 + value * -2 + 'px';

})

// star

function stars() {
    let count = 500;
    let scene = document.getElementById('circle-group');

    let i = 0;

    while(i < count){
        let star = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);
        let y = Math.floor(Math.random() * window.innerHeight);
        let duration = Math.random() * 10;
        let size = Math.random() * 2;

        star.style.left = x + 'px';
        star.style.top = y + 'px';
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        star.style.animationDuration = 5 + duration + 's';
        star.style.animationDelay = duration + 's';

        scene.appendChild(star);
        i++
    }

}
stars();

// function bubbles(){
//     const water = document.getElementById('water');
//     const createSpan = document.createElement('span');
//     var size = Math.random() * 20;

//     createSpan.style.width = size + 'px';
//     createSpan.style.height = size + 'px';
//     createSpan.style.left = Math.random() * innerWidth + 'px';
//     water.appendChild(createSpan);

//     // setTimeout(() => {
//     //     createSpan.remove();
//     // }, 4000)

// }

// setInterval(bubbles, 50);


const countdown = () => {
    const countDate = new Date('January 1, 2022 00:00:00').getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(gap / day);
    const textHour = Math.floor((gap % day) / hour);
    const textMinute = Math.floor((gap % hour) / minute);
    const textSecond = Math.floor((gap % minute) / second);

    document.querySelector('.day').innerText = textDay;
    document.querySelector('.hour').innerText = textHour;
    document.querySelector('.minute').innerText = textMinute;
    document.querySelector('.second').innerText = textSecond;
}
setInterval(countdown, 1000);
// countdown();