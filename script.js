//const demo_audio_list = document.querySelectorAll('.demo_audio')

//function set_button_click_method (demo_audio){


 //   ctrl_id = demo_audio.id.replace("audio","btn");
 //   
 //   console.log("demoaudio",demo_audio,ctrl);

function onClick (demo_audio_id,ctrl_id) {

    demo_audio = document.getElementById(demo_audio_id);
    ctrl = document.getElementById(ctrl_id);

    var pause = ctrl.innerHTML === '⏸';
    ctrl.innerHTML = pause ? '▶' : '⏸';

    console.log("OMG UN CLICK",demo_audio,ctrl)

    // Update the Audio
    var method = pause ? 'pause' : 'play';
    demo_audio[method]();

    // Prevent Default Action
    return false;
};

//demo_audio_list.forEach(set_button_click_method);



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