let gombalanCount = 0;
let questionIndex = 0;

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
    } else if (result.isDenied) {
      message = "Hihi, aku juga mau cium! mmwuaachhh😘";
    } else {
      message = "Yaudah sini, dua-duanya ya! mmwuachhh🤗😘";
    }

    // Tampilkan pesan kedua setelah user memilih
    Swal.fire({
      title: message,
      background: "#fff0f3",
      color: "#ff4d6d",
    }).then(() => {
      // Baru setelah SweetAlert kedua ditutup, pindah ke finalMessage
      document.getElementById("startScreen").classList.add("hidden");
      setTimeout(() => {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("finalMessage").classList.add("visible");
      }, 1000);
    });
  });
}

function startmain() {
  document.getElementById("finalMessage").classList.add("hidden");
  setTimeout(() => {
    document.getElementById("finalMessage").style.display = "none";
    document.getElementById("mainContent").classList.add("visible");
  }, 1000);
}

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
    q: "Kalau aku tiba-tiba berubah jadi hewan, kira-kira aku bakal jadi hewan apa? 🍦🥰",
    o1: "Anjing 🐶",
    o2: "Kucing 🐱",
    msg1: "Wahh, jadi anjing? Berarti aku bakal setia banget nih sama kamu! 🐶💖",
    msg2: "Jadi kucing? Berarti aku bakal manja-manja terus ke kamu! 😻💕",
  },
  {
    q: "Kalau kamu bisa kasih aku kekuatan super, kamu bakal kasih apa? 🥺💖",
    o1: "Bisa membaca isi hati ❤️",
    o2: "Bisa memperlambat waktu ⌛",
    msg1: "Wahh, kalau bisa baca isi hati, aku bakal tau kapan kamu kangen! 🥰",
    msg2: "Kalau bisa memperlambat waktu, aku pengen waktu kita bareng jadi lebih lama! ⏳💞",
  },
  {
    q: "Kalau kamu ngambek, cara paling ampuh buat balikin mood kamu apa?",
    o1: "Kasih makanan 🍛",
    o2: "Kasih perhatian 💕",
    msg1: "Makanan? Wah, kalau gitu aku bakal masakin makanan favoritmu tiap hari! 🍜💖",
    msg2: "Kasih perhatian? Tenang sayang, aku bakal manjain kamu tiap saat! 😘",
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

  Swal.fire({
    title: message,
    confirmButtonText: "➜➜➜",
    background: "#fff0f3",
    color: "#ff4d6d",
    confirmButtonColor: "#ff4d6d",
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
    <h1>💘 Pertanyaan Romantis 💘</h1>
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
