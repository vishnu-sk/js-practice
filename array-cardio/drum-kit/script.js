function removeTransition(e) {
  if (e.propertyName != "transform") {
    return;
  } else {
    this.classList.remove("playing");
  }
}

function playAudio(e) {
  const audio = document.querySelector(`audio[data-key="${e.code}"]`);
  const keyElems = this.document.querySelector(`.key[data-key="${e.code}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  keyElems.classList.add("playing");
}

keyItems = document.querySelectorAll(".key");
keyItems.forEach(key => {
  key.addEventListener("transitionend", removeTransition);
});

window.addEventListener("keydown", playAudio);
