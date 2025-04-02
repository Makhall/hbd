let gombalanCount = 0;
let questionIndex = 0;
let currentIndex = 0;

function startExperience() {
  Swal.fire({
    title: "💖 Sayang, kamu lebih suka apa?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Peluk 🥰",
    denyButtonText: "Cium 😘",
    cancelButtonText: "Dua-duanya! 😆",
    confirmButtonColor: "#ff7eb3",
    denyButtonColor: "#ff758c",
  }).then((result) => {
    let message = "";

    if (result.isConfirmed) {
      message = "Awww, sini aku peluk! 🤗";
      imageUrl = "https://media.giphy.com/media/VHyMvWhvKvJNo2pVQ6/giphy.gif";
    } else if (result.isDenied) {
      message = "Hihi, aku juga mau cium! mmwuaachhh😘";
      imageUrl = "https://media.giphy.com/media/W1hd3uXRIbddu/giphy.gif";
    } else {
      message = "Yaudah sini, dua-duanya ya! mmwuachhh🤗😘";
      imageUrl = "https://media.giphy.com/media/c7G6drkobIQXRJwX5v/giphy.gif";
    }

    // Tampilkan pesan kedua setelah user memilih
    Swal.fire({
      title: message,
      background: "#fff0f3",
      color: "#ff4d6d",
      confirmButtonColor: "#ff758c",
      confirmButtonText: "➜➜➜",
      imageUrl: imageUrl, // Tambahkan gambar jika ada
      imageWidth: 200,
      imageHeight: 200,
    }).then(() => {
      // Baru setelah SweetAlert kedua ditutup, pindah ke finalMessage
      document.getElementById("startScreen").classList.add("hidden");
      setTimeout(() => {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("finalMessage").classList.remove("hidden");
      }, 1000);
    });
  });
}

function startmain() {
  document.getElementById("finalMessage").classList.add("hidden");
  setTimeout(() => {
    document.getElementById("finalMessage").style.display = "none";
    document.getElementById("mainContent").classList.remove("hidden");
  }, 1000);
}

const images = document.querySelectorAll(".left-panel img");

function openPreview(index) {
  currentIndex = index;
  const previewOverlay = document.querySelector(".preview-overlay");
  const previewImg = document.getElementById("preview-img");
  previewImg.src = images[currentIndex].src;
  previewOverlay.classList.add("active");
}

function closePreview() {
  const previewOverlay = document.querySelector(".preview-overlay");
  const previewImg = document.getElementById("preview-img");
  previewImg.style.transform = "scale(0.5)";
  setTimeout(() => {
    previewOverlay.classList.remove("active");
  }, 300);
}

function prevImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("preview-img").src = images[currentIndex].src;
}

function nextImage(event) {
  event.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("preview-img").src = images[currentIndex].src;
}

document.addEventListener("keydown", function (event) {
  if (document.querySelector(".preview-overlay").classList.contains("active")) {
    if (event.key === "ArrowLeft") {
      prevImage(event);
    } else if (event.key === "ArrowRight") {
      nextImage(event);
    } else if (event.key === "Escape") {
      closePreview();
    }
  }
});

document
  .getElementById("preview-img")
  .addEventListener("wheel", function (event) {
    event.preventDefault();
    let currentScale = this.style.transform.match(/scale\(([^)]+)\)/);
    let scale = currentScale ? parseFloat(currentScale[1]) : 1;

    scale += event.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale), 3);
    this.style.transform = `scale(${scale})`;
  });

function tampilkanGombalan() {
  const gombalanList = [
    "Orang kurus itu setia, makan aja ga pernah nambah apalagi pasangan... haha😆💖",
    "Sayang, sekarang aku ga butuh peta lagi, karena senyummu sudah nunjukin jalan ke hatiku...🗺️😍",
    "Kalau kuliah perlu skripsi, kalau kita butuh resepsi... uhuyyyyy📖✨",
    "Burung irian burung cendrawasih. Daripada kamu sendirian, mending kita memadu kasih... asekkkk🕊️🥰",
    "Kalau kamu Barcelona, aku Real Madrid. Kalau kita saling suka, yuk kita married... cieeilahhh💍👩‍❤️‍💋‍👨",
    "Kamu tau bedanya perabotan sama kamu? Kalau perabotan itu furniture, kalau kamu itu my future... xixi🔮🫵",
  ];

  let gombalanEl = document.getElementById("gombalan");
  let tombol = document.getElementById("gombalBtn");
  gombalanEl.innerText = gombalanList[gombalanCount % gombalanList.length];
  gombalanEl.classList.add("visible");

  // Ubah teks tombol setelah ditekan pertama kali
  if (gombalanCount === 0) {
    tombol.innerText = "😅tekan terus😅";
  } else if (gombalanCount === 5) {
    tombol.innerText = "👇udah abis yuk lanjut👇";
  }

  gombalanCount++;

  jalankanConfetti();

  if (gombalanCount >= gombalanList.length) {
    document.getElementById("nextQuestionBtn").classList.remove("hidden");
  }
}

/* Efek confetti saat tombol terakhir ditekan */
function jalankanConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function kePertanyaan() {
  document.getElementById("mainContent").classList.add("hidden");
  setTimeout(() => {
    document.getElementById("mainContent").style.display = "none";
    document.getElementById("questionScreen").classList.add("visible");
    tampilkanPertanyaan();
  }, 1000);
}

const questions = [
  {
    q: "Kalau aku jadi zombie, kamu bakal lari atau biarin aku gigit? 🧟‍♀️💀",
    o1: "Lari 🏃🏻‍♀️",
    o2: "Biarin digigit 🧟‍♀️",
    msg1: "iih kok kamu ga setiaa sihh?? 😠💔",
    msg2: "aaaa so sweet...kita jadi zombie couple!🧟‍♂️🧟‍♀️",
    gif1: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeng4eHdtdGF5aHh0NWwzbnk1emp4cHI4MWlnMjlyZGhmYThvMTQ5NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/yIMbgB6AmsahkY3jHH/giphy.gif",
    gif2: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXY2MWp1Yjdocm13ZGc5eDl1c2lwczdieDBmOWx2dWM3c3hsZmFhaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N5RJXC61foVShDC4Fw/giphy.gif",
  },
  {
    q: "Kalau aku jadi nyamuk, kamu bakal usir aku atau kamu biarin? 🦟",
    o1: "Biarin 😷",
    o2: "Usir 😤",
    msg1: "aaa.. nanti aku bakal bisikin ke kamu 'aku boleh hisap kamu ga?' 🥵",
    msg2: "yauda.. nanti aku cari cewe lainn ajaa yang mau kuhisap 😏",
    gif1: "https://media.giphy.com/media/1YutDH5oW387ziOaHw/giphy.gif?cid=ecf05e47dt42tjjiywtl6h27l0ofmw97ct101t213ikbxeb1&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    gif2: "https://media.giphy.com/media/osLWTRRtDXe29iYmcL/giphy.gif?cid=ecf05e47bf58hzsq6widv7jxmgteccnk8328y4o7wkru2oqo&ep=v1_gifs_related&rid=giphy.gif&ct=g",
  },
  {
    q: "Kalau kita harus bertukar tubuh sehari, apa yang bakal kamu lakuin pertama? 🔄😆",
    o1: "Pikiran negatif 🔞",
    o2: "Pikiran positif 💕",
    msg1: "astaghfirullah dosaa.. inget belum muhrim 🤪",
    msg2: "emangnnya kamu bisa berpikir positif kalo tukeran tubuh?? kalo aku sih engga yaa 🤨",
    gif1: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjN4ZWtoMHk4dWl3NHpmZmVxa2VrYnlpeDdvcnVncjU5MWxoaWMzaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jivGITd768psP80B2i/giphy.gif",
    gif2: "https://media.giphy.com/media/eM8mZeC8NhEqBExN9C/giphy.gif?cid=ecf05e47qar4wb6cwzglqbet5xw2ewrxy5s2tad4ne762o6g&ep=v1_gifs_related&rid=giphy.gif&ct=g",
  },
  {
    q: "Kalau kamu punya mesin waktu, kamu lebih pilih ke masa lalu buat ketemu aku lebih cepat atau ke masa depan buat liat kita nanti?? ⏳💑",
    o1: "Masa lalu ⌛",
    o2: "Masa depan 🔮",
    msg1: "aku jugaa... biar lebih lama bareng kamu dari awal 😍",
    msg2: "sosoan ngeramal... umur ga ada yang tauu 💀",
    gif1: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGsxd3hkcXM2ZnJ3cjJmdTV0NWo0anFjeHZjMHB0NXh0aWYzaWF2aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bDDGrlodMHjmfJpVEx/giphy.gif",
    gif2: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2p3M25sb3dzdTlrZ2c0azUwN2Z3c3gyc3IzOXA2NWFjeWEzYmM2MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1iv69y6QxMS2SUmPvC/giphy.gif",
  },
];

function tampilkanPertanyaan() {
  if (questionIndex < questions.length) {
    const selectedQuestion = questions[questionIndex];
    document.getElementById("question").innerText = selectedQuestion.q;
    document.getElementById("option1").innerText = selectedQuestion.o1;
    document.getElementById("option2").innerText = selectedQuestion.o2;
  } else {
    // Semua pertanyaan selesai, tampilkan tombol ulangi atau lanjut
    tampilkanOpsiAkhir();
  }
}

function pilihJawaban(option) {
  const selectedQuestion = questions[questionIndex];
  const message = option === 1 ? selectedQuestion.msg1 : selectedQuestion.msg2;
  const gifUrl = option === 1 ? selectedQuestion.gif1 : selectedQuestion.gif2;

  Swal.fire({
    title: message,
    confirmButtonText: "➜➜➜",
    background: "#fff0f3",
    color: "#ff4d6d",
    confirmButtonColor: "#ff4d6d",
    imageUrl: gifUrl,
    imageWidth: 200,
    imageHeight: 200,
    customClass: {
      popup: "swal-popup-custom",
      confirmButton: "swal-button-custom",
    },
  }).then(() => {
    questionIndex++; // Pindah ke pertanyaan berikutnya
    setTimeout(tampilkanPertanyaan, 1200);
  });
}

function tampilkanOpsiAkhir() {
  // Sembunyikan pertanyaan dan opsi jawaban
  document.getElementById("question").innerText = ""; // Kosongkan teks
  document.getElementById("question").style.display = "none"; // Sembunyikan elemen
  document.getElementById("option1").style.display = "none";
  document.getElementById("option2").style.display = "none";
  document.getElementById("questionScreen").innerText = "";

  // Cek apakah finalOptions sudah ada, kalau belum, buat
  let finalOptions = document.getElementById("finalOptions");
  if (!finalOptions) {
    finalOptions = document.createElement("div");
    finalOptions.id = "finalOptions";
    finalOptions.style.marginTop = "20px";

    // Tombol Ulangi
    const ulangiBtn = document.createElement("button");
    ulangiBtn.className = "button";
    ulangiBtn.innerText = "🔄 Ulangi dari Awal";
    ulangiBtn.onclick = ulangiPertanyaan;

    // Tombol Lanjut
    const lanjutBtn = document.createElement("button");
    lanjutBtn.className = "button";
    lanjutBtn.innerText = "💖 Lanjut ke Pesan Terakhir";
    lanjutBtn.onclick = lanjutThankYou;

    finalOptions.appendChild(ulangiBtn);
    finalOptions.appendChild(lanjutBtn);
    document.getElementById("questionScreen").appendChild(finalOptions);
  }
}

function ulangiPertanyaan() {
  questionIndex = 0;

  // Reset elemen HTML ke keadaan awal
  const questionScreen = document.getElementById("questionScreen");
  questionScreen.innerHTML = `
    <h1>💘 Yuk seru-seruan aku ada beberapa pertanyaan 💘</h1>
    <p id="question"></p>
    <button class="button" id="option1" onclick="pilihJawaban(1)"></button>
    <button class="button" id="option2" onclick="pilihJawaban(2)"></button> 
    <button class="button hidden" id="nextQuestionBtn"></button>
  `;

  // Tampilkan pertanyaan pertama kembali
  tampilkanPertanyaan();
}

function lanjutThankYou() {
  document.getElementById("questionScreen").classList.add("hidden");
  setTimeout(() => {
    document.getElementById("questionScreen").style.display = "none";
    document.getElementById("thankYouScreen").classList.add("visible");
  }, 1000);
}
