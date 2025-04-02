function typeEffect(element, text, speed) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

document.addEventListener("DOMContentLoaded", function () {
  function startTypingEffectFinalMessage() {
    const finalMessageP = document.querySelector("#finalMessage p");
    if (finalMessageP) {
      const text = finalMessageP.innerHTML;
      finalMessageP.innerHTML = "";
      typeEffect(finalMessageP, text, 30);
    }
  }

  function startTypingEffectMainContent() {
    const mainContentP = document.querySelector("#mainContent p");
    if (mainContentP) {
      const text = mainContentP.innerHTML;
      mainContentP.innerHTML = "";
      typeEffect(mainContentP, text, 20);
    }
  }

  const startButton = document.querySelector("#startScreen button");
  const finalMessageButton = document.querySelector("#finalMessage button");

  if (startButton) {
    startButton.addEventListener("click", function () {
      setTimeout(startTypingEffectFinalMessage, 1000);
    });
  }

  if (finalMessageButton) {
    finalMessageButton.addEventListener("click", function () {
      setTimeout(startTypingEffectMainContent, 1000);
    });
  }
});
