

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
    bckgr_image: "./img/crops/enceinte_crop1.png"
  },
  {
    id: "lelitcue2",
    label: "Ambient synths",
    src: "./demos/lelit cue 2.mp3",
    bckgr_image: "./img/crops/hjalmar-wahlin-08_blurred_crop1.png",
  },
  {
    id: "trailerlush",
    label: "Lush strings",
    src: "./demos/trailer lush.mp3",
    bckgr_image: "./img/crops/enceinte_crop2.png"
  } ,
  {
    id: "romewillburn",
    label: "Hard rock",
    src: "./demos/rome will burn.mp3",
    bckgr_image: "./img/crops/affiche-skid-768x0-c-default_blurred_crop1.png",
    background_size: "250px",
  },
  {
    id: "whatyoudidfolk",
    label: "Folk guitar",
    src: "./demos/what you did folk.mp3",
    bckgr_image: "./img/crops/John_Singer_Sargent_-_Gabriel_Fauré_crop1_blur.png",
    background_size: "220px",
  },
  {
    id: "hardtech",
    label: "Hardtech",
    src: "./demos/hardtech.mp3",
    bckgr_image: "./img/crops/skid_crop1.png"
  },
  {
    id: "sax",
    label: "Akward saxophone",
    src: "./demos/summer tape sax.mp3",
    bckgr_image: "./img/crops/lelit_mo_crop1.png",
  },
];

function onClick (demo_audio_id,ctrl_id) {

    demo_audio = document.getElementById(demo_audio_id);
    ctrl = document.getElementById(ctrl_id);

    var pause = ctrl.innerHTML === '⏸';
    ctrl.innerHTML = pause ? '▶' : '⏸';

    var method = pause ? 'pause' : 'play';
    demo_audio[method]();

    if (~pause){
      demo_audio_list = document.getElementsByClassName("demo_audio");

      for (const demo_audio of demo_audio_list) {
        if (demo_audio.id != demo_audio_id){
          ctrl = document.getElementById(demo_audio.id.replace("_audio","_btn"))
          if (ctrl.innerHTML == '⏸'){
            demo_audio["pause"]();
            ctrl.innerHTML = "▶";
          }
        }
      };
    }

    return false;
};


const container = document.getElementById("demos");

  audioTracks.forEach((info) => {

    console.log(info);

    var id = info.id;
    var label = info.label;
    var src = info.src;
    var bckgr_image = info.bckgr_image;

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
      <button class="demo_audio_btn" id="${id}_btn" onclick="onClick('${id}_audio','${id}_btn')">▶</button>
      `;
    container.appendChild(li);
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