const ritualResults = {
  balloons: 'Birthday sky unlocked. Balloons ne officially vibe set kar di 🎈',
  wish: 'Wish safely saved. Universe ko secret instruction bhej diya gaya ✨',
  confetti: 'Confetti deployed successfully. Celebration intensity increased 🎊',
  blessing: 'Blessing: tumhara saal pyara, safe, soft aur shiny rahe 🌙'
};

const teaserLines = [
  'Arre arre, No button ko confidence hi nahi aa raha 😌',
  'System thinks the answer is already Yes 💘',
  'No bhaag gaya. Maybe he knows the truth 🙈',
  'Cursor aaya aur No ne surrender kar diya ✨',
  'Itna bhi kya attitude, bachcha 😏',
  'Final answer suspiciously pink lag raha hai 💖',
  'No button says: main risk nahi le raha.',
  'Dil side se bol raha hai — yes hi hai.'
];

const typeLines = [
  'Tumhari smile = instant festival mode ✨',
  'Aaj ka day fully yours 💗',
  'Birthday queen energy detected 👑',
  'Warning: excessive cuteness ahead 😌'
];

const flame = document.getElementById('flame');
const wishText = document.getElementById('wishText');
const loveBox = document.getElementById('love-box');
const loveYes = document.getElementById('love-yes');
const loveNo = document.getElementById('love-no');
const loveFeedback = document.getElementById('love-feedback');
const petals = document.getElementById('petals');
const sparkles = document.getElementById('sparkles');
const typewriter = document.getElementById('typewriter');

let noCount = 0;
const maxEscapes = 20;

function spawnPetals(count = 18) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (6 + Math.random() * 5) + 's';
    el.style.animationDelay = (Math.random() * 1.5) + 's';
    el.style.opacity = 0.45 + Math.random() * 0.55;
    petals.appendChild(el);
    setTimeout(() => el.remove(), 11000);
  }
}

function spawnSparkles(count = 24) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = Math.random() * 100 + 'vh';
    el.style.animationDelay = (Math.random() * 1.6) + 's';
    sparkles.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

function celebrateBurst(count = 28) {
  spawnPetals(count);
  spawnSparkles(Math.max(12, Math.floor(count * 0.8)));
}

// Ritual buttons
document.querySelectorAll('.ritual-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const card = btn.closest('.ritual-card');
    card.classList.add('active');
    const result = card.querySelector('.ritual-result');
    result.textContent = ritualResults[
      action === 'balloons' ? 'balloons' :
      action === 'wish' ? 'wish' :
      action === 'confetti' ? 'confetti' : 'blessing'
    ];

    if (action === 'balloons') spawnPetals(26);
    if (action === 'wish') {
      flame.classList.add('out');
      wishText.textContent = 'Wish locked in. Universe ne sun liya ✨';
      spawnSparkles(30);
    }
    if (action === 'confetti') celebrateBurst(34);
    if (action === 'blessing') spawnSparkles(18);
  });
});

// Cake buttons
document.getElementById('blowCandleBtn').addEventListener('click', () => {
  flame.classList.add('out');
  wishText.textContent = 'Awww... candle blow complete. Tumhari wish safely hidden hai 💫';
  celebrateBurst(36);
});

document.getElementById('relightBtn').addEventListener('click', () => {
  flame.classList.remove('out');
  wishText.textContent = 'Candle relit. Ek aur cute wish allowed hai 🕯️';
});

// Love protocol teasing
function moveNoButton() {
  const box = loveBox.getBoundingClientRect();
  const btnW = 130;
  const x = Math.max(0, Math.random() * (box.width - btnW - 24));
  const y = Math.max(10, Math.random() * 110);
  loveNo.style.position = 'absolute';
  loveNo.style.left = x + 'px';
  loveNo.style.top = y + 'px';
  loveNo.style.transform = `translate(${Math.random() * 8 - 4}px, ${Math.random() * 6 - 3}px)`;
}

['mouseenter', 'touchstart', 'click'].forEach(evt => {
  loveNo.addEventListener(evt, (e) => {
    if (noCount < maxEscapes) {
      e.preventDefault();
      noCount++;
      moveNoButton();
      loveFeedback.textContent =
        teaserLines[Math.floor(Math.random() * teaserLines.length)] +
        ` (${noCount}/${maxEscapes})`;
      spawnSparkles(8);
    } else {
      e.preventDefault();
      loveFeedback.textContent = '20 tries ho gaye. System override: answer accepted as YES 💖';
      loveYes.click();
    }
  }, { passive: false });
});

loveYes.addEventListener('click', () => {
  loveFeedback.textContent = 'I knew it 😌💖 Happy Birthday meri bachcha!';
  loveNo.style.display = 'none';
  loveYes.textContent = 'Yes, obviously 💘';
  celebrateBurst(44);
  loveBox.style.boxShadow =
    '0 0 0 1px rgba(255,255,255,.14), 0 0 60px rgba(255,92,168,.24)';
});

// Finale button
document.getElementById('finalConfetti')
  .addEventListener('click', () => celebrateBurst(52));

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Typewriter lines
let lineIndex = 0;
setInterval(() => {
  lineIndex = (lineIndex + 1) % typeLines.length;
  typewriter.textContent = typeLines[lineIndex];
}, 2600);

// Initial ambient effects
spawnPetals(20);
setTimeout(() => spawnSparkles(18), 700);
