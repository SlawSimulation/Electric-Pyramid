const audio = document.getElementById("bg-audio");

// Start audio and trigger entry only once
document.body.addEventListener("click", startSplash, { once: true });
document.body.addEventListener("keydown", startSplash, { once: true });

function startSplash() {
  audio.volume = 1;
  audio.play().catch(err => console.log("Audio play blocked:", err));

  // Fade out after 10 seconds
  setTimeout(() => fadeOutAudio(audio), 10000);

  // Transition after fade out ends
  setTimeout(() => {
    const splash = document.querySelector('.splash-screen');
    splash.style.animation = "fadeOut 1s forwards";
    setTimeout(() => {
      window.location.href = "index.html"; // <-- Change to your real homepage
    }, 1000);
  }, 11000); // Wait for fade out before changing page
}

function fadeOutAudio(audioEl) {
  let fadeInterval = setInterval(() => {
    if (audioEl.volume > 0.05) {
      audioEl.volume -= 0.05;
    } else {
      audioEl.volume = 0;
      audioEl.pause(); // Optional: pause when done
      clearInterval(fadeInterval);
    }
  }, 200); // Volume fades every 200ms
}
