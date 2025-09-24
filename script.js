

const audioTracks = [
  /*
  {
    id: "again_call_to_adv",
    label: "Call to adventure",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/again call to adventure.mp3"
  },
  {
    id: "colossus",
    label: "Spiraling violin",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/colossus.mp3"
  },
  */
  {
    id: "again_victory",
    label: "Epic orchestra",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/trailer victory.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/enceinte_crop1.png",
    color: "rgb(116,91,52)",
  },
  {
    id: "lelitcue2",
    label: "Ambient synths",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/lelit cue 2.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/hjalmar-wahlin-08_blurred_crop1.png",
    color: "rgb(13,32,85)",
  },
  {
    id: "trailerlush",
    label: "Lush strings",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/trailer lush.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/enceinte_crop2.png",
    color: "rgb(2,57,34)",
  } ,
  {
    id: "romewillburn",
    label: "Hard rock",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/rome will burn.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/affiche-skid-768x0-c-default_blurred_crop1.png",
    background_size: "250px",
    color: "rgb(25,39,48)",
  },
  {
    id: "whatyoudidfolk",
    label: "Folk guitar",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/what you did folk.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/John_Singer_Sargent_-_Gabriel_Fauré_crop1_blur.png",
    background_size: "220px",
    color: "rgb(131,55,22)",
  },
  {
    id: "dystopiantrailer",
    label: "Dystopian electro",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/im not sure we're safe.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/hjalmar-wahlin-08_blurred_crop2.png",
    backgroundSize: "220px",
    color: "rgba(149, 59, 182, 1)",
  },
  {
    id: "hardtech",
    label: "Hardtech",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/hardtech.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/skid_crop1_darker.png",
    color: "#757c81",
  },
  {
    id: "dnb",
    label: "DnB",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/dev/demos/dnb.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/dev/img/crops/romantic_flight_crop.png",
    color: "#5f3d30",
  },

  {
    id: "spy_thriller",
    label: "Spy thriller",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/dev/demos/severance.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/lelit_mo_crop1.png",
    color: "rgb(27,83,0)",
  },
  /*
  {
    id: "sax",
    label: "Awkward saxophone",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/summer tape sax.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/lelit_mo_crop1.png",
    color: "rgb(27,83,0)",
  },
  */
];

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

  audioTracks.forEach((info) => {

    var id = info.id;
    var label = info.label;
    var src = info.src;
    var bckgr_image = info.bckgr_image;
    var color = info.color;

    const li = document.createElement("li");
    li.className = "demo";
    
    li.style.backgroundImage = "url('"+bckgr_image+"')";
    
    if (info.hasOwnProperty("background_size")){
      li.style.backgroundSize = info.background_size;
    }
        
    li.innerHTML = `
      <audio class="demo_audio" id="${id}_audio" preload="none">
        <source src="${src}" type="audio/mpeg" />
      </audio>
      <text class="demo_label">${label}</text>
      <div class="audio-button-wrapper">
        <svg class="progress-ring" width="60" height="60">
          <circle class="progress-ring-circle" id="${id}_progresscircle" stroke="white" stroke-width="4" fill="transparent" r="26" cx="30" cy="30" />
        </svg>
        <button class="demo_audio_btn" id="${id}_btn" onclick="onClick('${id}_audio','${id}_btn','${color}')" data-playing="false" data-color="${color}">
          ${make_play_symbol(color)}
        </button>
      </div>
      `;
    container.appendChild(li);
    
    setupProgressCircle(id+"_audio", document.getElementById(id+"_progresscircle"));

  });

const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));
