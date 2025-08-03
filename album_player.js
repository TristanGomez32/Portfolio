BTN_COLOR= "#2c2c2c"

function make_play_symbol(color){
  return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="white" />
            <path d="M20 16L32 24L20 32V16Z" fill="${color}"/>
            </svg> 
          `
}

function make_pause_symbol(color){
  return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Cercle de fond -->
            <circle cx="24" cy="24" r="22" fill="white"></circle>
            <!-- Barres du "pause" -->
            <path d="M19 16H22V32H19V16Z" fill="${color}"></path>
            <path d="M26 16H29V32H26V16Z" fill="${color}"></path>
          </svg>
          `
}

function playTrack(track) {
    const src = track.getAttribute("data-src");
    
    album = track.parentElement.parentElement;
    audio = album.querySelectorAll(".album-audio")[0];

    if (audio.src != src){
      audio.src = src;
      duration_str_split = track.querySelectorAll(".track-duration")[0].innerHTML.split(":");
      audio.dataset.duration = 60*parseInt(duration_str_split[0])+parseInt(duration_str_split[1]);
    }
    audio.play();
    playBtn.innerHTML = make_pause_symbol(BTN_COLOR);
    tracks.forEach((t) => t.classList.remove("active-track"));
    tracks.forEach((t) => t.querySelectorAll(".track-number")[0].classList.remove("active-track"));
    tracks.forEach((t) => t.querySelectorAll(".track-number")[0].dataset.playing = false);

    track.classList.add("active-track");
    track.querySelectorAll(".track-number")[0].classList.add("active-track");
    track.querySelectorAll(".track-number")[0].dataset.playing = true;
}

const albums = document.querySelectorAll(".album-player");

for (album of albums){

  audio = album.querySelectorAll(".album-audio")[0];
  albumHeader = album.querySelectorAll(".album-header")[0];
  playBtn = albumHeader.querySelectorAll(".play-btn")[0];
  seekBar = album.querySelectorAll(".seekbar")[0];
  seekBarHandle = album.querySelectorAll(".seekbar-handle")[0]; 
  seekBarContainer = album.querySelectorAll(".seekbar-container")[0]; 
  tracks = album.querySelectorAll(".track-list li");

  playBtn.innerHTML = make_play_symbol(BTN_COLOR);
  playBtn.addEventListener('click', (e) => {

    playBtn = e["target"];
    tracks = playBtn.parentElement.parentElement.parentElement.parentElement.querySelectorAll(".track-list li");

    for (track of tracks){
      if (track.getAttribute("data-src") == audio.src){
        break
      }
    }

    track.click();

  });

  tracks.forEach(track => {
    track.addEventListener('click', () => {
      const isPlaying = track.dataset.playing === "true";

      tracks.forEach(t => t.dataset.playing = "false");

      track.dataset.playing = isPlaying ? "false" : "true";
      track.querySelectorAll(".track-number")[0].playing = track.dataset.playing;

      album = track.parentElement.parentElement;
      playBtn = album.querySelectorAll(".album-header")[0].querySelectorAll(".play-btn")[0];
      audio = album.querySelectorAll(".album-audio")[0];

      if (isPlaying){
          audio.pause();
          playBtn.innerHTML = make_play_symbol(BTN_COLOR);
      } else {
          playTrack(track);
          playBtn.innerHTML = make_pause_symbol(BTN_COLOR);
      }

    });
  });

  audio.addEventListener('timeupdate', (e) => {

    const progressPercent = (audio.currentTime / audio.dataset.duration) * 100;

    audio = e["target"];

    seekbarContainer = audio.parentElement.querySelectorAll(".seekbar-container")[0];
    seekBar = seekbarContainer.querySelectorAll(".seekbar")[0];
    seekBarHandle = seekbarContainer.querySelectorAll(".seekbar-handle")[0];

    seekBar.style.width = `${progressPercent}%`;
    seekBarHandle.style.left = `${progressPercent}%`;

  });

  seekBarContainer.addEventListener('click', (e) => {
    seekBarContainer = e["target"];

    if (seekBarContainer.getAttribute("class")=="seekbar"){
      seekBarContainer = seekBarContainer.parentElement;
    }

    const containerWidth = seekBarContainer.clientWidth;
    const offsetX = e.offsetX;
    audio = seekBarContainer.parentElement.querySelectorAll(".album-audio")[0];
    const newTime = (offsetX / containerWidth) * audio.dataset.duration;
    audio.currentTime = newTime;
  });

}
