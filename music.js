document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");
  const musicPlayer = document.getElementById("musicPlayer");
  const startScreen = document.getElementById("startScreen");
  const playPauseBtn = document.getElementById("play-pause");

  //Transisi menyembunyikan dan memunculkan music player
  document.getElementById("musicMenu").addEventListener("click", function () {
    let player = document.getElementById("musicPlayer");

    if (player.classList.contains("hidden")) {
      player.classList.remove("hidden");
      player.classList.add("show");
    } else {
      player.classList.remove("show");
      setTimeout(() => player.classList.add("hidden"), 500); // Beri jeda sebelum hidden agar transisi terlihat
    }
  });

  // Saat tombol Play ditekan
  playPauseBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';

      setTimeout(() => {
        startScreen.classList.remove("hidden");
        startScreen.classList.add("visible");
      }, 2000);
    } else {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  });
});

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const loopBtn = document.createElement("button"); // Looping
const volumeIcon = document.getElementById("volume-icon"); // Icon Speaker
const volumeSlider = document.getElementById("volume"); // Adjust volume
document.querySelector(".controls").appendChild(loopBtn);

const songs = [
  {
    title: "Somebody's Pleasure",
    artist: "Aziz Hedra",
    file: "music/somebodypleasure.mp3",
  },
  {
    title: "I Like Me Better",
    artist: "Lauv",
    file: "music/ilikemebetter.mp3",
  },
  { title: "Blue", artist: "Yung kai", file: "music/blue.mp3" },
  { title: "Those Eyes", artist: "New West", file: "music/thoseeyes.mp3" },
  {
    title: "Next Door",
    artist: "Amelia Moore ft.ASTN",
    file: "music/nextdoor.mp3",
  },
  { title: "Soft Spot", artist: "Keshi", file: "music/softspot.mp3" },
  { title: "Double Take", artist: "Dhruv", file: "music/doubletake.mp3" },
  { title: "La La Lost You", artist: "Niki", file: "music/lalalostyou.mp3" },
];

let currentSongIndex = 0;
let isLoopOne = false;
let isLoopAll = false;
let lastVolume = 1;
audio.volume = 1;

function loadSong(index) {
  audio.src = songs[index].file;
  document.getElementById("song-title").textContent = songs[index].title;
  document.getElementById("artist").textContent = songs[index].artist;

  audio.load();
}

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("canplay", () => {
  totalDurationEl.textContent = formatTime(audio.duration);
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
});

loopBtn.textContent = "🔁";
loopBtn.addEventListener("click", () => {
  if (!isLoopOne && !isLoopAll) {
    isLoopOne = true;
    loopBtn.textContent = "🔂"; // Loop Satu Lagu
  } else if (isLoopOne) {
    isLoopOne = false;
    isLoopAll = true;
    loopBtn.textContent = "🔁"; // Loop Semua Lagu
  } else {
    isLoopOne = false;
    isLoopAll = false;
    loopBtn.textContent = "➡️"; // Tidak Looping
  }
});

audio.addEventListener("loadeddata", () => {
  if (audio.duration) {
    totalDurationEl.textContent = formatTime(audio.duration);
  }
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", () => {
  if (isLoopOne) {
    audio.currentTime = 0;
    audio.play();
  } else if (isLoopAll) {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
  } else {
    if (currentSongIndex < songs.length - 1) {
      currentSongIndex++;
      loadSong(currentSongIndex);
      audio.play();
    }
  }
});

volumeIcon.addEventListener("click", () => {
  if (audio.volume > 0) {
    lastVolume = audio.volume; // Simpan volume sebelum mute
    audio.volume = 0;
    volumeSlider.value = 0;
    volumeIcon.className = "fas fa-volume-mute";
  } else {
    audio.volume = lastVolume; // Kembalikan volume terakhir
    volumeSlider.value = lastVolume;
    if (lastVolume > 0.5) {
      volumeIcon.className = "fas fa-volume-up";
    } else {
      volumeIcon.className = "fas fa-volume-down";
    }
  }
});

volumeSlider.addEventListener("input", () => {
  let volume = volumeSlider.value;
  audio.volume = volume;

  if (volume == 0) {
    volumeIcon.className = "fas fa-volume-mute";
  } else if (volume > 0 && volume <= 0.5) {
    volumeIcon.className = "fas fa-volume-down";
  } else {
    volumeIcon.className = "fas fa-volume-up";
  }
});

loadSong(currentSongIndex);
