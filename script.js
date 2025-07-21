

const audioTracks = [
  {
    id: "again_call_to_adv",
    label: "Call to adventure",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/again call to adventure.mp3"
  },
  {
    id: "again_victory",
    label: "Orchestral victory",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/again victory.mp3"
  },
  {
    id: "colossus",
    label: "Spiraling violin",
    src: "https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/demos/colossus.mp3"
  },
  {
    id: "hardtech",
    label: "Hardtech",
    src: "./demos/hardtech.mp3"
  },
  {
    id: "sax",
    label: "Akward saxophone",
    src: "./demos/summer tape sax.mp3"
  },
  {
    id: "romewillburn",
    label: "Hard rock",
    src: "./demos/rome will burn.mp3"
  },
  {
    id: "lelitcue2",
    label: "Ambient synths",
    src: "./demos/lelit cue 2.mp3"
  },
  {
    id: "whatyoudidfolk",
    label: "Mysterious folk",
    src: "./demos/what you did folk.mp3"
  },
  {
    id: "trailerlush",
    label: "Lush strings",
    src: "./demos/trailer_lush.mp3"
  }  
];

function onClick (demo_audio_id,ctrl_id) {

    demo_audio = document.getElementById(demo_audio_id);
    ctrl = document.getElementById(ctrl_id);

    var pause = ctrl.innerHTML === '⏸';
    ctrl.innerHTML = pause ? '▶' : '⏸';

    console.log("OMG UN CLICK",demo_audio,ctrl)

    var method = pause ? 'pause' : 'play';
    demo_audio[method]();

    return false;
};


const container = document.getElementById("demos");

  audioTracks.forEach(({ id, label, src }) => {
    const li = document.createElement("li");
    li.className = "demo";
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