
const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("mainPlayBtn");
const tracks = document.querySelectorAll(".track-list li");

let currentTrack = null;

playBtn.addEventListener("click", () => {
console.log(audio.src);
if (audio.src && !audio.paused) {
    audio.pause();
    playBtn.textContent = "▶";
} else {
    if (!audio.src && tracks[0]) {
    playTrack(tracks[0]);
    } else {
    audio.play();
    playBtn.textContent = "⏸";
    }
}
});

tracks.forEach((track) => {
track.addEventListener("click", () => {
    playTrack(track);
});
});

function playTrack(track) {
const src = track.getAttribute("data-src");
audio.src = src;
audio.play();
playBtn.textContent = "⏸";
highlightTrack(track);
}

function highlightTrack(activeTrack) {
tracks.forEach((t) => t.classList.remove("active"));
activeTrack.classList.add("active");
}

