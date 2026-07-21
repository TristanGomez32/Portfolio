function make_play_symbol(color){
  return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="white"/>
            <path d="M 17.16 14.84 C 17.16 14.0447 17.8047 13.4 18.6 13.4 C 18.9663 13.4 19.321 13.5092 19.6125 13.7093 L 33.0675 23.0693 C 33.869 23.6283 33.869 24.7717 33.0675 25.3307 L 19.6125 34.6907 C 19.321 34.8908 18.9663 35 18.6 35 C 17.8047 35 17.16 34.3553 17.16 33.56 V 14.84 Z" fill="${color}"/>
          </svg>
          `
        }

function make_pause_symbol(color){
  return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Cercle de fond -->
            <circle cx="24" cy="24" r="24" fill="white"></circle>
            <!-- Barres du "pause" -->
            <rect x="16.8" y="14.4" width="4.8" height="19.2" rx="1" fill="${color}"/>
            <rect x="26.4" y="14.4" width="4.8" height="19.2" rx="1" fill="${color}"/>
          </svg>
          `
}

function is_playing_func(ctrl){
  return ctrl.dataset.playing=="true";
}

function play_demo(ctrl,demo_audio){
  ctrl.innerHTML = make_pause_symbol(ctrl.dataset.color);
  ctrl.dataset.playing = true;
  demo_audio["play"]();
}

function pause_demo(ctrl,demo_audio){
  ctrl.innerHTML = make_play_symbol(ctrl.dataset.color);
  ctrl.dataset.playing = false;
  demo_audio["pause"]();
}

function onClick (demo_audio_id,ctrl_id) {

    demo_audio = document.getElementById(demo_audio_id);
    ctrl = document.getElementById(ctrl_id);

    if (is_playing_func(ctrl)){
      pause_demo(ctrl,demo_audio);
    }else{
      demo_audio_list = document.getElementsByClassName("demo_audio");
      for (const demo_audio of demo_audio_list) {
          other_ctrl = document.getElementById(demo_audio.id.replace("_audio","_btn"))
          if (is_playing_func(other_ctrl)){
            pause_demo(other_ctrl,demo_audio);
          }
      };

      playBtn_list = document.querySelectorAll(".play-btn");
      for (other_playBtn of playBtn_list){
        other_playBtn.innerHTML = make_play_symbol(other_playBtn.dataset.color);
      }

      tracks = document.querySelectorAll(".track");
      for (track of tracks){
        if (track.dataset.playing=="true"){
          track.dataset.playing = "false";
          track.querySelectorAll(".track-number")[0].innerHTML = make_play_symbol("white",draw_circle=false,set_size=false);
        }
        
      }

      audio_list = document.querySelectorAll(".album-audio");
      for (other_audio of audio_list){
        other_audio.pause();
      }

      play_demo(ctrl,demo_audio);
      

    }


    return false;
};

function setupProgressCircle(audioId, circle) {
  const audio = document.getElementById(audioId);
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }

  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    setProgress(percent);
  });

  audio.addEventListener('ended', (e) => {
    e["target"].parentElement.querySelectorAll(".demo_audio_btn")[0].click();
    setProgress(0);
  });
}

const container = document.getElementById("demos");

fetch("demos.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json();
  })
  .then(audioTracks => {
    const container = document.getElementById("demos");

    audioTracks.forEach((info) => {
      const id = info.id;
      const label = info.label;
      const src = info.src;
      const bckgr_image = info.bckgr_image;
      const color = info.color;

      const li = document.createElement("li");
      li.className = "demo";

      li.style.backgroundImage = `url('${bckgr_image}')`;

      if (info.hasOwnProperty("background_size")) {
        li.style.backgroundSize = info.background_size;
      }

      li.innerHTML = `
        <audio class="demo_audio" id="${id}_audio" preload="none">
          <source src="${src}" type="audio/mpeg" />
        </audio>

        <text class="demo_label">${label}</text>

        <div class="audio-button-wrapper">
          <svg class="progress-ring" width="60" height="60">
            <circle
              class="progress-ring-circle"
              id="${id}_progresscircle"
              stroke="white"
              stroke-width="4"
              fill="transparent"
              r="26"
              cx="30"
              cy="30"
            />
          </svg>

          <button
            class="demo_audio_btn"
            id="${id}_btn"
            onclick="onClick('${id}_audio','${id}_btn')"
            data-playing="false"
            data-color="${color}"
          >
            ${make_play_symbol(color)}
          </button>
        </div>
      `;

      container.appendChild(li);

      setupProgressCircle(
        id + "_audio",
        document.getElementById(id + "_progresscircle")
      );
    });
  })
  .catch(error => {
    console.error("Impossible de charger demos.json :", error);
  });