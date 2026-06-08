const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

const flame = document.getElementById("flame");
const smoke = document.getElementById("smoke");
const cakeSlice = document.getElementById("cakeSlice");
const ritualLog = document.getElementById("ritualLog");
const btnLight = document.getElementById("btnLight");
const btnWish = document.getElementById("btnWish");
const btnBlow = document.getElementById("btnBlow");
const btnCut = document.getElementById("btnCut");

const balloonField = document.getElementById("balloonField");
const startBalloons = document.getElementById("startBalloons");
const balloonScore = document.getElementById("balloonScore");
const balloonFeedback = document.getElementById("balloonFeedback");

const memoryGrid = document.getElementById("memoryGrid");
const matchScore = document.getElementById("matchScore");
const memoryFeedback = document.getElementById("memoryFeedback");
const resetMemory = document.getElementById("resetMemory");

const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");

const confettiContainer = document.getElementById("confetti");

let currentTheme = "dark";
let isMusicPlaying = false;

themeToggle?.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", currentTheme);
});

musicToggle?.addEventListener("click", async () => {
  if (!bgMusic) return;

  try {
    if (isMusicPlaying) {
      bgMusic.pause();
      musicToggle.textContent = "Music: Off";
    } else {
      await bgMusic.play();
      musicToggle.textContent = "Music: On";
    }
    isMusicPlaying = !isMusicPlaying;
  } catch (error) {
    musicToggle.textContent = "Music unavailable";
  }
});

function setActiveRitualButton(activeButton) {
  [btnLight, btnWish, btnBlow, btnCut].forEach((btn) => btn?.classList.remove("active"));
  activeButton?.classList.add("active");
}

btnLight?.addEventListener("click", () => {
  flame?.classList.remove("out");
  smoke?.classList.remove("show");
  cakeSlice?.classList.remove("show");
  setActiveRitualButton(btnLight);
  ritualLog.textContent = "Candle glow on hai. Birthday scene ab properly set ho gaya ✨";
});

btnWish?.addEventListener("click", () => {
  setActiveRitualButton(btnWish);
  ritualLog.textContent = "Aankhen band. Dil me ek achhi si wish. Aaj ka din sirf smile ke naam 💭";
});

btnBlow?.addEventListener("click", () => {
  setActiveRitualButton(btnBlow);
  flame?.classList.add("out");
  smoke?.classList.remove("show");
  void smoke?.offsetWidth;
  smoke?.classList.add("show");
  ritualLog.textContent = "Yay — candle blow ho gayi. Wish officially sky me dispatch ho chuki hai 🌬️";
  burstConfetti(26);
});

btnCut?.addEventListener("click", () => {
  setActiveRitualButton(btnCut);
  cakeSlice?.classList.add("show");
  ritualLog.textContent = "Cake cut complete. Birthday ritual successful. Ab party mode continue karo 🎂";
  burstConfetti(40);
});

let balloonCount = 0;
let balloonRunning = false;

const balloonMessages = [
  "Cute alert: birthday girl detected 💖",
  "Ek aur pop = ek aur smile 😄",
  "Aaj blush allowed hai 🌸",
  "Teasing mode active 😌",
  "Birthday energy rising ✨",
  "Sweetness level upgraded 🍰",
  "Bas ab gift wali feel bhi aa rahi hai 🎁"
];

function randomBalloonColor() {
  const colors = [
    "linear-gradient(180deg, #ff6b9f, #ff3d83)",
    "linear-gradient(180deg, #8f7cff, #6d58ff)",
    "linear-gradient(180deg, #ffb347, #ff8c42)",
    "linear-gradient(180deg, #6ee7b7, #22c55e)",
    "linear-gradient(180deg, #ff8fab, #fb7185)"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createBalloon(index) {
  const balloon = document.createElement("button");
  balloon.className = "balloon";
  balloon.type = "button";
  balloon.style.left = `${Math.random() * 82 + 4}%`;
  balloon.style.bottom = `-90px`;
  balloon.style.animationDuration = `${Math.random() * 2 + 4}s`;
  balloon.style.background = randomBalloonColor();
  balloon.innerHTML = "🎈";

  balloon.addEventListener("click", () => {
    if (balloon.dataset.popped === "true") return;
    balloon.dataset.popped = "true";
    balloon.remove();
    balloonCount += 1;
    balloonScore.textContent = balloonCount;
    balloonFeedback.textContent = balloonMessages[Math.min(balloonCount - 1, balloonMessages.length - 1)];

    if (balloonCount >= 7) {
      balloonRunning = false;
      balloonFeedback.textContent = "7/7 complete — birthday smile successfully unlocked 💖";
      burstConfetti(30);
    }
  });

  balloonField.appendChild(balloon);

  setTimeout(() => {
    if (balloon.parentElement) balloon.remove();
  }, 7000 + index * 120);
}

function startBalloonGame() {
  balloonField.innerHTML = "";
  balloonCount = 0;
  balloonRunning = true;
  balloonScore.textContent = "0";
  balloonFeedback.textContent = "Ready? Bas dhyaan rahe — kuch balloons me teasing bhi milegi.";

  for (let i = 0; i < 7; i += 1) {
    setTimeout(() => {
      if (balloonRunning) createBalloon(i);
    }, i * 450);
  }
}

startBalloons?.addEventListener("click", startBalloonGame);

const photoMemories = [
  { img: "assets/photo1.jpg", text: "Core memory detected 💌" },
  { img: "assets/photo2.jpg", text: "Yahan se soft feelings start hoti hain 💫" },
  { img: "assets/photo3.jpg", text: "Is memory ko skip karna impossible hai 🥹" },
  { img: "assets/photo4.jpg", text: "Cutest frame unlocked 🌸" },
  { img: "assets/photo5.jpg", text: "Is pic me pure birthday vibes hain ✨" },
  { img: "assets/photo6.jpg", text: "Ye smile alag hi level ki hai 💖" },
  { img: "assets/photo7.jpg", text: "Ye wali photo repeat pe dekhne layak hai 😌" },
  { img: "assets/photo8.jpg", text: "Is pic me tum extra pyaari lag rahi ho 🌷" }
];

let openedCards = [];
let matchedPairs = 0;
let lockBoard = false;

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildPhotoMemoryGame() {
  memoryGrid.innerHTML = "";
  openedCards = [];
  matchedPairs = 0;
  lockBoard = false;
  matchScore.textContent = "0";
  memoryFeedback.textContent = "Same photo ke 2 cards milte hi ek sweet line unlock hogi.";

  const deck = shuffleArray(
    photoMemories.flatMap((item, index) => [
      { ...item, id: `${index}-a`, pairId: index },
      { ...item, id: `${index}-b`, pairId: index }
    ])
  );

  deck.forEach((item) => {
    const card = document.createElement("button");
    card.className = "memory-card";
    card.type = "button";
    card.dataset.pairId = item.pairId;

    card.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-face memory-front">💖</div>
        <div class="memory-face memory-back">
          <img src="${item.img}" alt="Memory photo ${Number(item.pairId) + 1}">
        </div>
      </div>
    `;

    card.addEventListener("click", () => handleMemoryCardClick(card, item));
    memoryGrid.appendChild(card);
  });
}

function handleMemoryCardClick(card, item) {
  if (lockBoard || card.classList.contains("revealed") || card.classList.contains("matched")) return;

  card.classList.add("revealed");
  openedCards.push({ card, item });

  if (openedCards.length < 2) return;

  lockBoard = true;
  const [first, second] = openedCards;

  if (first.item.pairId === second.item.pairId) {
    first.card.classList.remove("revealed");
    second.card.classList.remove("revealed");
    first.card.classList.add("matched");
    second.card.classList.add("matched");

    matchedPairs += 1;
    matchScore.textContent = matchedPairs;
    memoryFeedback.textContent = item.text;
    openedCards = [];
    lockBoard = false;

    if (matchedPairs === 8) {
      memoryFeedback.textContent = "Sab 8 photo pairs match ho gaye — full memory archive unlocked 💖";
      burstConfetti(36);
    }
  } else {
    memoryFeedback.textContent = "Oops, ye same memory nahi thi. Ek aur try karo 😄";
    setTimeout(() => {
      first.card.classList.remove("revealed");
      second.card.classList.remove("revealed");
      openedCards = [];
      lockBoard = false;
    }, 900);
  }
}

resetMemory?.addEventListener("click", buildPhotoMemoryGame);

const quizData = [
  {
    question: "Sabse pyaara nickname kaunsa hai?",
    options: ["Bulbul", "Bachcha", "Dono", "Secret"],
    answer: "Dono",
    response: "Correct — dono names me alag alag pyaar hai 💖"
  },
  {
    question: "Birthday page ka correct mood kya hai?",
    options: ["Sad first", "Only emotional", "Cute + fun first", "Very serious"],
    answer: "Cute + fun first",
    response: "Yes — pehle smile, baad me soft memories 😌"
  },
  {
    question: "Cake ritual ke baad kya aana chahiye?",
    options: ["Error", "Games", "Goodbye", "Silence"],
    answer: "Games",
    response: "Exactly — celebration flow break nahi hona chahiye 🎉"
  }
];

let currentQuizIndex = 0;

function renderQuiz() {
  const current = quizData[currentQuizIndex];
  if (!current) {
    quizQuestion.textContent = "Quiz complete 💖";
    quizOptions.innerHTML = "";
    quizFeedback.textContent = "Tumne pura relationship decryptor clear kar liya.";
    burstConfetti(24);
    return;
  }

  quizQuestion.textContent = current.question;
  quizOptions.innerHTML = "";
  quizFeedback.textContent = "";

  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.type = "button";
    button.textContent = option;

    button.addEventListener("click", () => {
      if (option === current.answer) {
        quizFeedback.textContent = current.response;
        currentQuizIndex += 1;
        setTimeout(renderQuiz, 700);
      } else {
        quizFeedback.textContent = "Close 😄 ek baar aur socho.";
      }
    });

    quizOptions.appendChild(button);
  });
}

function burstConfetti(count = 24) {
  const colors = ["#ff5f9b", "#8f7cff", "#ffcc68", "#ffffff", "#ff8db5"];

  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${Math.random() * 1.8 + 2.2}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    confettiContainer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 4200);
  }
}

buildPhotoMemoryGame();
renderQuiz();
