const audio = document.getElementById("bg-audio");
document.body.addEventListener("click", () => {
  audio.play().catch(err => console.log("Audio play blocked:", err));
}, { once: true });
