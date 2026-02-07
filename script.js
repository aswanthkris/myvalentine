const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const questionContainer = document.getElementById("question-container");
const successContainer = document.getElementById("success-container");
const body = document.body;

const messages = [
  "Orappano?",
  "Vani...??",
  "Are you positive?",
  "Vani avarkal...ente alle?",
  "Ente ponnu vani...",
  "Onnude onnu aloich nokkiye ne.. :)",
  "If you say no, I will be really sad...",
  "I will be very very very sad...",
  "Ok fine, I will stop asking...",
  "Ayyadaaa , say yes please! ❤️",
];

let messageIndex = 0;

function handleNoClick() {
  noBtn.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = `${currentSize * 1.5}px`;
}

noBtn.addEventListener("click", handleNoClick);

// Handle "Yes" click
yesBtn.addEventListener("click", () => {
  questionContainer.classList.add("hidden");
  successContainer.classList.remove("hidden");

  // Confetti explosion
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff4d6d", "#ff8fa3", "#fff"],
  });

  // Continuous confetti
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    );
  }, 250);
});

// Create floating hearts background
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 2 + "s";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";

  body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);
