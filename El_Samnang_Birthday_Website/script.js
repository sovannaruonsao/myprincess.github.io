const $ = (selector) => document.querySelector(selector);
const intro = $("#intro");
const experience = $("#experience");
const music = $("#bgMusic");
const musicToggle = $("#musicToggle");
let musicPlaying = false;
let toastTimer;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

async function startMusic() {
  try {
    await music.play();
    musicPlaying = true;
    musicToggle.innerHTML = "♫ <span>Music On</span>";
  } catch (error) {
    musicPlaying = false;
    musicToggle.innerHTML = "♫ <span>Tap for Music</span>";
    showToast("Add music.mp3 to this folder, then tap Music ♡");
  }
}

$("#openGift").addEventListener("click", async () => {
  intro.classList.add("fade-away");
  await startMusic();
  setTimeout(() => {
    intro.classList.add("hidden");
    experience.classList.remove("hidden");
    document.body.classList.add("opened");
    window.scrollTo({ top: 0, behavior: "instant" });
    makePetals();
  }, 450);
});

musicToggle.addEventListener("click", async () => {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    musicToggle.innerHTML = "♫ <span>Music Off</span>";
  } else {
    await startMusic();
  }
});

// Birthday: November 17, 2026, Cambodia time (UTC+7).
const birthday = new Date("2026-11-17T00:00:00+07:00").getTime();
function updateCountdown() {
  const now = Date.now();
  let distance = birthday - now;
  if (distance <= 0) {
    $("#days").textContent = "00";
    $("#hours").textContent = "00";
    $("#minutes").textContent = "00";
    $("#seconds").textContent = "00";
    $("#countdownMessage").textContent = "Today is your day, my princess! Happy Birthday! ♡";
    return;
  }
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  $("#days").textContent = String(days).padStart(2, "0");
  $("#hours").textContent = String(hours).padStart(2, "0");
  $("#minutes").textContent = String(minutes).padStart(2, "0");
  $("#seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Floating rose petals
function makePetals() {
  const layer = $("#petalLayer");
  const symbols = ["✿", "♡", "❀", "✧"];
  setInterval(() => {
    if (document.hidden) return;
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
    petal.style.animationDuration = (7 + Math.random() * 7) + "s";
    petal.style.fontSize = (12 + Math.random() * 13) + "px";
    layer.appendChild(petal);
    setTimeout(() => petal.remove(), 15000);
  }, 650);
}

// Wish interaction + small confetti burst
$("#wishButton").addEventListener("click", () => {
  $("#wishResult").textContent = "May all your dreams bloom beautifully. បងសូមឱ្យអូនមានក្ដីសុខជានិច្ច​ មានតែស្មាមញញឹម ជួបតែរឿងល្អៗ ​និងមានសុខភាពល្អ ជោគជ័យគ្រប់ភារកិច្ចណា៎♡";
  showToast("Your wish is sent to the universe ✨");
  for (let i = 0; i < 34; i++) {
    const bit = document.createElement("span");
    bit.className = "petal";
    bit.textContent = ["♡", "✦", "✿", "✨"][Math.floor(Math.random() * 4)];
    bit.style.left = (35 + Math.random() * 30) + "vw";
    bit.style.setProperty("--drift", (Math.random() * 300 - 150) + "px");
    bit.style.animationDuration = (2 + Math.random() * 2) + "s";
    bit.style.color = "#d76f9a";
    $("#petalLayer").appendChild(bit);
    setTimeout(() => bit.remove(), 4500);
  }
});

$("#backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smoothly reveal the intro transition.
const style = document.createElement("style");
style.textContent = ".intro-screen{transition:opacity .45s ease,transform .45s ease}.intro-screen.fade-away{opacity:0;transform:scale(.97);pointer-events:none}";
document.head.appendChild(style);
