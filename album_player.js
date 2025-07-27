
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("mainPlayBtn");
const tracks = document.querySelectorAll(".track-list li");

function playTrack(track) {
    const src = track.getAttribute("data-src");
    audio.src = src;
    audio.play();
    playBtn.textContent = "⏸";
    // Highlight track
    tracks.forEach((t) => t.classList.remove("active"));
    track.classList.add("active");

}

tracks.forEach(track => {
  track.addEventListener('click', () => {
    const isPlaying = track.dataset.playing === "true";

    tracks.forEach(t => t.dataset.playing = "false");

    track.dataset.playing = isPlaying ? "false" : "true";

    if (isPlaying){
        audio.pause();
        playBtn.textContent = "▶";
    } else {
        playTrack(track);
        playBtn.textContent = "⏸";
    }

  });
});