BTN_COLOR= "#2c2c2c"

/* GENERATE ALBUM */

function generateAlbumHTML(metadata,show_big_cover=true) {
  
  folderPath = metadata["folder"],
  albumName = metadata["albumName"];
  genre = metadata["genre"];
  tracks = metadata["tracks"];
  genres = metadata["genres"];
  track_durations = metadata["track_durations"];
  color1 = metadata["color1"];
  color2 = metadata["color2"];

  console.log("COLOR",color1,color2);

  const coverUrl = `${folderPath}cover.jpg`;

  const trackItemsHTML = tracks.map((track, index) => {
    const fileName = track.split('/').pop();
    const baseName = fileName.replace('.mp3', '').replace(/_/g, ' ');
    var title;
    if ("titles" in metadata){
      title = metadata["titles"][index];
    }else{
      title = baseName.split(' ')
                      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ');
    }

    const trackUrl = `${folderPath}${track}`;

    return `
      <li class="track" data-src="${trackUrl}" data-playing="false">
        <span class="track-number">${index + 1}</span>
        <div class="track-info">
          <span class="track-title">${title}</span>
          <span class="track-artist">${genres[index]}</span>
        </div>
        <span class="track-duration">${track_durations[index]}</span>
      </li>`;
  }).join('\n');

  html = `<div class="album_section">`

  if (show_big_cover){
    html+= `<div class="album_subsection">
              <img src="${coverUrl}" alt="Album cover" class="big-album-cover" style="object-fit: cover;">
            </div>
            `
  }

  html += `
      <div class="album_subsection">
        <div class="album-player">
          <div class="album-header" style="background-color:${color1}">
            <div class="album-header-top">
              <img src="${coverUrl}" alt="Album cover" class="album-cover">
              <div class="album-info">
                <h2>${albumName}</h2>
                <p>${genre}</p>
              </div>
              <button class="play-btn"></button>
            </div>
            <div class="seekbar-container">
              <div class="seekbar"></div>
              <div class="seekbar-handle"></div>
            </div>
          </div>
          <div class="album-body" style="background-color:${color2}">
            <ul class="track-list">
              ${trackItemsHTML}
            </ul>
          </div>
          <audio class="album-audio"></audio>
        </div>
      </div>
    </div>`;

    return html;
}

metadatas = {"albums":[{"folder":"https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/albums/rome_will_burn/",
                  "albumName": "Rome will burn",
                  "genre": "Hard rock / Folk / Orchestral",
                  "tracks":["rome_will_burn.mp3","again.mp3","what_you_did.mp3"],
                  "genres":["Hard rock","Orchestral","Folk / Orchestral"],
                  "track_durations":["02:31","02:55","03:11"]
            },
            {"folder":"https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/albums/weird_signal/",
                  "albumName": "Weird Signal",
                  "genre": "Electronic",
                  "tracks":["intruder_on_board.mp3","weird_signal.mp3"],
                  "genres":["Electronic trailer","Synthwave"],
                  "track_durations":["01:27","01:02"]
            },
            {"folder":"https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/albums/classical_work/",
                  "albumName": "Classical work",
                  "genre": "Baroque / Classical / Post-romantic",
                  "tracks":["fugue_for_organ.mp3","theme_and_variations.mp3","song_for_violin_and_piano.mp3"],
                  "genres":["Baroque","Classical","Post-romantic"],
                  "track_durations":["03:30","06:38","01:53"]
            },],
            "short_movies":{
              "lelit":{"folder":"https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/albums/lelit/",
                  "albumName": "Le lit de la rivière",
                  "genre": "Ambient synths",
                  "tracks":["tu_vas_guerir.mp3","crematorium.mp3","dispersion.mp3","souvenirs.mp3","le_lit.mp3"],
                  "titles":["Tu vas guérir","Crématorium","Dispersion","Souvenirs","Le lit"],
                  "genres":["Ambient synths","Ambient synths","Ambient synths","Ambient synths","Ambient synths"],
                  "track_durations":["01:26","00:56","02:50","02:06","01:17"]
            }, "summer_tape":{"folder":"https://media.githubusercontent.com/media/TristanGomez32/Portfolio/refs/heads/main/albums/summer_tape/",
                  "albumName": "Summer tape",
                  "genre": "Folk / Hardtech / Blues",
                  "tracks":["we're_the_only_ones_here_!.mp3","akward_flirt.mp3","why_did_you_bring_all_of_these.mp3","banjo_what.mp3","your_mom_is_gonna_worry.mp3"],
                  "genres":["Hardtech","Folk / Blues","Folk","Folk","Folk"],
                  "track_durations":["00:45","00:41","00:24","00:46","00:54"]
            }
          }};

var albumHTML;

for (metadata of metadatas["albums"]){
  albumHTML = generateAlbumHTML(metadata);
  document.querySelectorAll(".albums")[0].innerHTML += albumHTML;

}

albumHTML = generateAlbumHTML(metadatas["short_movies"]["lelit"],show_big_cover=false); 
document.getElementById("lelit_player").innerHTML += albumHTML;

console.log(metadatas["short_movies"]);

albumHTML = generateAlbumHTML(metadatas["short_movies"]["summer_tape"],show_big_cover=false); 
document.getElementById("summer_tape_player").innerHTML += albumHTML;



/* GENERATE ALBUM END */













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

function playTrack(track) {
    console.log("playtrack",track);
    const src = track.getAttribute("data-src");
    console.log("SRC IS",src);
    album = track.parentElement.parentElement.parentElement;
    audio = album.querySelectorAll(".album-audio")[0];

    if (audio.src != src){
      audio.src = src;
      duration_str_split = track.querySelectorAll(".track-duration")[0].innerHTML.split(":");
      audio.dataset.duration = 60*parseInt(duration_str_split[0])+parseInt(duration_str_split[1]);
    }

    audio_list = document.querySelectorAll("audio");
    for (other_audio of audio_list){
      other_audio.pause();
    }

    audio.play();

    tracks = track.parentElement.querySelectorAll(".track-list li");
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
  seekBarHandle = album.querySelectorAll(".seekbar-handle")[0]; 
  seekBarContainer = album.querySelectorAll(".seekbar-container")[0]; 
  tracks = album.querySelectorAll(".track-list li");

  playBtn.innerHTML = make_play_symbol(BTN_COLOR);
  playBtn.addEventListener('click', (e) => {

    playBtn = e["target"];
    tracks = playBtn.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(".track-list li");

    found_source = false;
    for (track of tracks){
      console.log(track.getAttribute("data-src"),audio.src);
      if (track.getAttribute("data-src") == audio.src){
        found_source = true;
        break
      }
    }

    if (~found_source){
      track = tracks[0];
    }

    track.click();

  });

  tracks.forEach(track => {
    track.addEventListener('click', () => {
      const isPlaying = track.dataset.playing === "true";

      tracks.forEach(t => t.dataset.playing = "false");

      track.dataset.playing = isPlaying ? "false" : "true";
      track.querySelectorAll(".track-number")[0].playing = track.dataset.playing;

      album = track.parentElement.parentElement.parentElement;
      playBtn = album.querySelectorAll(".play-btn")[0];
      audio = album.querySelectorAll(".album-audio")[0];

      if (isPlaying){
          audio.pause();
          playBtn.innerHTML = make_play_symbol(BTN_COLOR);
      } else {
          playTrack(track);
          playBtn_list = document.querySelectorAll(".play-btn");
          for (other_playBtn of playBtn_list){
            other_playBtn.innerHTML = make_play_symbol(BTN_COLOR);
          }
          demo_btn_list = document.querySelectorAll(".demo_audio_btn");
          for (demo_audio_btn of demo_btn_list){

            rect = demo_audio_btn.querySelectorAll("rect")[0];
            if (rect){
              color = rect.getAttribute("fill");
              demo_audio_btn.innerHTML = make_play_symbol(color);
            }else{
              console.log(demo_audio_btn,"RECT IS UNDEFINED");
            }
            
          }

          playBtn.innerHTML = make_pause_symbol(BTN_COLOR);
      }

    });
  });

  audio.addEventListener('timeupdate', (e) => {

    audio = e["target"];

    const progressPercent = (audio.currentTime / audio.dataset.duration) * 100;

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
    audio = seekBarContainer.parentElement.parentElement.querySelectorAll(".album-audio")[0];
    const newTime = (offsetX / containerWidth) * audio.dataset.duration;
    audio.currentTime = newTime;
  });

}




