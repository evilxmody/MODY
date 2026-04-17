const screens = Array.from(document.querySelectorAll(".card"));
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
let currentScreen = 0;
let musicStarted = false;

document.querySelectorAll(".photo-card img").forEach((image) => {
  image.addEventListener("click", () => openImageModal(image.src, image.alt));
});

document.addEventListener(
  "click",
  () => {
    if (!musicStarted) {
      startMusic();
    }
  },
  { once: true }
);

function showScreen(index) {
  if (index < 0 || index >= screens.length) {
    return;
  }

  screens[currentScreen].classList.remove("active");
  currentScreen = index;
  screens[currentScreen].classList.add("active");
}

function nextScreen() {
  showScreen(currentScreen + 1);
}

function prevScreen() {
  showScreen(currentScreen - 1);
}

function checkPromise() {
  const promiseCheck = document.getElementById("promiseCheck");
  const warning = document.getElementById("promiseWarning");

  if (!promiseCheck.checked) {
    warning.textContent = "Check the promise first, then we'll continue ❤️";
    return;
  }

  warning.textContent = "";
  nextScreen();
}

function openImageModal(src, alt) {
  modalImage.src = src;
  modalImage.alt = alt;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeImageModal() {
  modal.classList.remove("open");
  modalImage.src = "";
  document.body.style.overflow = "";
}

function startMusic() {
  if (!bgMusic) {
    return;
  }

  bgMusic.volume = 0.35;
  bgMusic
    .play()
    .then(() => {
      musicStarted = true;
      updateMusicButton(true);
    })
    .catch(() => {
      updateMusicButton(false);
    });
}

function toggleMusic() {
  if (!bgMusic) {
    return;
  }

  if (bgMusic.paused) {
    bgMusic
      .play()
      .then(() => {
        musicStarted = true;
        updateMusicButton(true);
      })
      .catch(() => {
        updateMusicButton(false);
      });
    return;
  }

  bgMusic.pause();
  updateMusicButton(false);
}

function updateMusicButton(isPlaying) {
  if (!musicToggle) {
    return;
  }

  musicToggle.textContent = isPlaying ? "♪ إيقاف الموسيقى" : "♪ تشغيل الموسيقى";
}
