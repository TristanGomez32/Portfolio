

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
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/again victory.mp3",
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
    label: "Dystopian trailer",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/im not sure we're safe.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/hjalmar-wahlin-08_blurred_crop2.png",
    backgroundSize: "220px",
    color: "rgba(149, 59, 182, 1)",
  },
  {
    id: "hardtech",
    label: "Hardtech",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/hardtech.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/skid_crop1.png",
    color: "rgb(155,159,165)",
  },
  {
    id: "sax",
    label: "Awkward saxophone",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/summer tape sax.mp3",
    bckgr_image: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/img/crops/lelit_mo_crop1.png",
    color: "rgb(27,83,0)",
  },
];

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
      play_demo(ctrl,demo_audio);
      
      demo_audio_list = document.getElementsByClassName("demo_audio");

      for (const demo_audio of demo_audio_list) {
        if (demo_audio.id != demo_audio_id){
          ctrl = document.getElementById(demo_audio.id.replace("_audio","_btn"))
          if (is_playing_func(ctrl)){
            pause_demo(ctrl,demo_audio);
          }
        }
      };
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

  audio.addEventListener('ended', () => {
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
