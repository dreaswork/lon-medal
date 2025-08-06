// main.js

console.log("JS is running!");

// DOM Elements
const loginButton = document.getElementById('login-button');
const nameInput = document.getElementById('name-input');
const loginScreen = document.getElementById('login-screen');
const congratsScreen = document.getElementById('congrats-screen');
const viewButton = document.getElementById('view-button');
const medalScreen = document.getElementById('medal-screen');
const medalImg = document.getElementById('medal-img');
const nextButton = document.getElementById('next-button');

const medals = [
  'assets/replymedal.png',
  'assets/defuser.png'
];

let currentMedalIndex = 0;

loginButton.addEventListener('click', () => {
  const name = nameInput.value.trim().toLowerCase();
  if (name === 'lon') {
    loginScreen.classList.add('hidden');
    congratsScreen.classList.remove('hidden');
    runConfetti(10000);
    console.log("Login successful");
  } else {
    alert('Wrong name. Try again!');
  }
});

viewButton.addEventListener('click', () => {
  congratsScreen.classList.add('hidden');
  medalScreen.classList.remove('hidden');
  showMedal(currentMedalIndex);
  runConfetti(2000, () => {
    nextButton.classList.remove('hidden');
  });
});

nextButton.addEventListener('click', () => {
  if (currentMedalIndex + 1 < medals.length) {
    transitionMedal(currentMedalIndex, currentMedalIndex + 1);
    currentMedalIndex++;
  } else {
    transitionMedal(currentMedalIndex, currentMedalIndex - 1);
    currentMedalIndex--;
  }
});

function showMedal(index) {
  medalImg.src = medals[index];
  medalImg.classList.add('shrink-grow');

  setTimeout(() => {
    runConfetti(10000);
  }, 100);

  setTimeout(() => medalImg.classList.remove('shrink-grow'), 1000);
}

function transitionMedal(fromIndex, toIndex) {
  medalImg.classList.add('move-out');
  setTimeout(() => {
    medalImg.src = medals[toIndex];
    medalImg.classList.remove('move-out');
    medalImg.classList.add('move-in');
    runConfetti(10000);
    setTimeout(() => {
      medalImg.classList.remove('move-in');
    }, 500);
  }, 500);
}

function runConfetti(duration = 2000, callback) {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 100 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    radius: Math.random() * 6 + 4,
    color: `hsl(${Math.random() * 360}, 100%, 60%)`,
    speed: Math.random() * 3 + 2
  }));

  let startTime = Date.now();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of pieces) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }

  function update() {
    for (let p of pieces) {
      p.y += p.speed;
      if (p.y > canvas.height) p.y = -10;
    }
  }

  function loop() {
    draw();
    update();
    if (Date.now() - startTime < duration) {
      requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (typeof callback === 'function') callback();
    }
  }

  loop();
}
