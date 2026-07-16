PLAYERS_JSON_PATH = "https://raw.githubusercontent.com/TristanGomez32/Portfolio/refs/heads/dev/albums.json"

ALBUMS = "albums"

function generateAlbumHTML(metadata,show_big_cover=true) {
  
  folderPath = metadata["folder"],
  albumName = metadata["albumName"];
  genre = metadata["genre"];
  tracks = metadata["tracks"];
  genres = metadata["genres"];
  track_durations = metadata["track_durations"];
  top_color = metadata["top_color"];
  bottom_color = metadata["bottom_color"];
  bottom_text = metadata["bottom_text"];
  top_text = metadata["top_text"];

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
      <li class="track" data-src="${trackUrl}" data-playing="false" data-tracknb="${index + 1}">
        <span class="track-number" data-playing="false">${index + 1}</span>
        <div class="track-info">
          <span class="track-title">${title}</span>
          <span class="track-artist" style="color:${bottom_text}">${genres[index]}</span>
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
          <div class="album-header" style="background-color:${top_color}">
            <div class="album-header-top">
              <img src="${coverUrl}" alt="Album cover" class="album-cover">
              <div class="album-info">
                <h2>${albumName}</h2>
                <p style="color:${top_text}">${genre}</p>
              </div>
              <button class="play-btn" data-color="${top_color}"></button>
            </div>
            <div class="timecode"> 00:00 : 00:00 </div>
            <div class="seekbar-container" style="background-color:${bottom_color}">
              <div class="seekbar"></div>
              <div class="seekbar-handle"></div>
            </div>
          </div>
          <div class="album-body" style="background-color:${bottom_color}">
            <ul class="track-list" style="scrollbar-color:${top_color} ${bottom_color}">
              ${trackItemsHTML}
            </ul>
          </div>
          <audio class="album-audio"></audio>
        </div>
      </div>
    </div>`;

    return html;
}

function convert_to_str_with_zero_padding(value){
  if (value<10){
    value_str = "0"+value.toString();
  }else{
    value_str = value.toString();
  }
  return value_str;
}

function convert_timecode_to_string(time_seconds){
    min = Math.floor(time_seconds / 60);
    min_str = convert_to_str_with_zero_padding(min);
    sec_str = convert_to_str_with_zero_padding(time_seconds%60);
    return min_str + ":" + sec_str;
}

function make_play_symbol(color,draw_circle=true,set_size=true){

  if(set_size){
    html = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  }else{
    html = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  }
  
  if(draw_circle){
    html += `<circle cx="24" cy="24" r="24" fill="white"/>`;
  }

  html += `<path d="M 17.16 14.84 C 17.16 14.0447 17.8047 13.4 18.6 13.4 C 18.9663 13.4 19.321 13.5092 19.6125 13.7093 L 33.0675 23.0693 C 33.869 23.6283 33.869 24.7717 33.0675 25.3307 L 19.6125 34.6907 C 19.321 34.8908 18.9663 35 18.6 35 C 17.8047 35 17.16 34.3553 17.16 33.56 V 14.84 Z" fill="${color}"/>`;
  html += `</svg>`;
  
  return html;
}

function make_pause_symbol(color,draw_circle=true,set_size=true){
  
  if(set_size){
    html = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  }else{
    html = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">`;
  }

  if(draw_circle){
    html += `<circle cx="24" cy="24" r="24" fill="white"/>`;
  }

  html += `<rect x="16.8" y="14.4" width="4.8" height="19.2" rx="1" fill="${color}"/>`
  html += `<rect x="26.4" y="14.4" width="4.8" height="19.2" rx="1" fill="${color}"/>`
  html += `</svg>`

  return html;

}

function trackId(src){
  src_split = src.split("/")
  track_id = src_split.slice(-2)[0]  + "/" + src_split.slice(-1)[0] 
  return track_id
}

function is_same_track(src1,src2){
  return trackId(src1) == trackId(src2);
}

function playTrack(track) {

    const src = track.getAttribute("data-src");

    album = track.parentElement.parentElement.parentElement;
    audio = album.querySelectorAll(".album-audio")[0];

    if (!is_same_track(audio.src,src)){
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
    tracks.forEach((t) => t.querySelectorAll(".track-number")[0].dataset.playing = false);

    track.classList.add("active-track");
    track.querySelectorAll(".track-number")[0].dataset.playing = true;
}

function updateTimecode(audio,timecode){
  durationStr = convert_timecode_to_string(audio.dataset.duration);
  currentTimeStr = convert_timecode_to_string(parseInt(audio.currentTime));
  timecode.innerHTML = currentTimeStr + " : " + durationStr;
}

function updateSeekBar(progressPercent,seekBar,seekBarHandle){

  seekBarContainer = seekBar.parentElement;

  audio = seekBarContainer.parentElement.parentElement.querySelectorAll(".album-audio")[0];

  if(audio.src==""){
    return;
  }

  seekBar.style.width = `${progressPercent}%`;
  seekBarHandle.style.left = `${progressPercent}%`;

  timecode = audio.parentElement.querySelectorAll(".timecode")[0];

  updateTimecode(audio,timecode);

}

function playNextTrack(album){

  audio = album.parentElement.parentElement.querySelectorAll(".album-audio")[0];

  tracks = album.querySelectorAll(".track");

  let i=0;
  while(i<tracks.length){
    track = tracks[i];
          
    if (is_same_track(track.getAttribute("data-src"),decodeURIComponent(audio.src))){
      break
    }
    
    i++;

  }

  //Reset to first track once album is fully played
  if ((i+1)==tracks.length){
    //If there's only one track, the next track to be played is already selected
    //Hence we don't need a second click
    if (tracks.length>1){
      tracks[0].click();
      tracks[0].click();
    }else{
      audio.currentTime = 0;
      tracks[0].click();
    }
  }else{
    tracks[(i+1)%tracks.length].click();
  }

}

function updateAudio(e,seekBarContainer){
  if (seekBarContainer.getAttribute("class")=="seekbar"){
    seekBarContainer = seekBarContainer.parentElement;
  }

  album = seekBarContainer.parentElement.parentElement
  audio = album.querySelectorAll(".album-audio")[0];

  if (audio.src==""){
    return;
  }

  if(e.type.includes(`touch`)) {
    const { touches, changedTouches } = e.originalEvent ?? e;
    const touch = touches[0] ?? changedTouches[0];
    x = touch.pageX;
  } else {
        x = e.clientX;
  }

  var proportion = (x - seekBarContainer.getBoundingClientRect().left)/seekBarContainer.clientWidth;
  proportion = Math.max(proportion,0);
  proportion = Math.min(proportion,1);
  
  if (proportion == 1){
    playNextTrack(album);
  }else{
    const newTime = proportion * audio.dataset.duration;
    audio.currentTime = newTime;
  }


}

function findSeekBarInUpdateModeAndUpdateIt(e){

  seekBarContainers = document.querySelectorAll(".seekbar-container");

  found_updating_seekBar = false;
  for (seekBarContainer of seekBarContainers){
    if (Array.from(seekBarContainer.classList).includes("updating")){
      found_updating_seekBar=true;
      break;
    }
  }

  if (!found_updating_seekBar){
    return null;
  }

  seekBar = seekBarContainer.querySelectorAll(".seekbar")[0];
  seekBarHandle = seekBarContainer.querySelectorAll(".seekbar-handle")[0];

  if(e.type.includes(`touch`)) {
    const { touches, changedTouches } = e.originalEvent ?? e;
    const touch = touches[0] ?? changedTouches[0];
    x = touch.pageX;
  } else {
        x = e.clientX;
  }

  var proportion = (x - seekBarContainer.getBoundingClientRect().left)/seekBarContainer.clientWidth;
  proportion = Math.max(proportion,0);
  proportion = Math.min(proportion,1);

  updateSeekBar(100*proportion,seekBar,seekBarHandle);

}

function setSeekBarToNotUpdatingMode(e) {
    for (otherSeekBarContainer of document.querySelectorAll(".seekbar-container")){
    
      if (Array.from(otherSeekBarContainer.classList).includes("updating")){
        updateAudio(e,otherSeekBarContainer);
      }
      
      otherSeekBarContainer.classList.remove("updating");

    }
};

async function buildPlayers(json_path) {
  const metadatas_str = await fetch(json_path);
  const metadatas = await metadatas_str.json();
  return metadatas;
}

buildPlayers(PLAYERS_JSON_PATH).then(metadatas => {

  var albumHTML;

  for (album of metadatas["albums"]){
    albumHTML = generateAlbumHTML(album);
    document.querySelectorAll(".albums")[0].innerHTML += albumHTML;
  }

  const content_types = Object.keys(metadatas)

  for (content_type of content_types){

      if(content_type == ALBUMS){
        continue;
      }

      contents = Object.keys(metadatas[content_type]);

      for (content of contents){
        albumHTML = generateAlbumHTML(metadatas[content_type][content],show_big_cover=false); 
        document.getElementById(content+"_player").innerHTML += albumHTML;

      }

  }

  const albums = document.querySelectorAll(".album-player");

  for (album of albums){

    audio = album.querySelectorAll(".album-audio")[0];
    albumHeader = album.querySelectorAll(".album-header")[0];
    playBtn = albumHeader.querySelectorAll(".play-btn")[0];
    seekBarHandle = album.querySelectorAll(".seekbar-handle")[0]; 
    seekBarContainer = album.querySelectorAll(".seekbar-container")[0]; 
    tracks = album.querySelectorAll(".track-list li");

    playBtn.innerHTML = make_play_symbol(playBtn.dataset.color);
    playBtn.addEventListener('click', (e) => {

      playBtn = e["target"];
      tracks = playBtn.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll(".track-list li");

      found_source = false;
      for (track of tracks){

        if (is_same_track(track.getAttribute("data-src"),audio.src)){

          found_source = true;
          break
        }
      }

      if (!found_source){
        track = tracks[0];
      }

      track.click();

    });

    tracks.forEach(track => {
      track.addEventListener('click', () => {
        const isPlaying = track.dataset.playing === "true";

        tracks.forEach(t => t.dataset.playing = "false");
        tracks.forEach(t => t.querySelectorAll(".track-number")[0].innerHTML = t.dataset.tracknb);

        track.dataset.playing = isPlaying ? "false" : "true";
        track.querySelectorAll(".track-number")[0].playing = track.dataset.playing;

        album = track.parentElement.parentElement.parentElement;
        playBtn = album.querySelectorAll(".play-btn")[0];
        audio = album.querySelectorAll(".album-audio")[0];

        trackNb = track.querySelectorAll(".track-number")[0];

        if (isPlaying){
            audio.pause();
            playBtn.innerHTML = make_play_symbol(playBtn.dataset.color);
            trackNb.innerHTML = make_play_symbol("white",draw_circle=false,set_size=false);
        } else {
            playTrack(track);
            playBtn_list = document.querySelectorAll(".play-btn");
            for (other_playBtn of playBtn_list){
              other_playBtn.innerHTML = make_play_symbol(other_playBtn.dataset.color);
            }
            demo_btn_list = document.querySelectorAll(".demo_audio_btn");
            for (demo_audio_btn of demo_btn_list){

              rect = demo_audio_btn.querySelectorAll("rect")[0];
              if (rect){
                color = rect.getAttribute("fill");
                demo_audio_btn.innerHTML = make_play_symbol(color);
              }
              
              demo_audio_btn.dataset.playing = false;

            }

            playBtn.innerHTML = make_pause_symbol(playBtn.dataset.color);
            trackNb.innerHTML = make_pause_symbol("white",draw_circle=false,set_size=false);
        }

      });
    });

    audio.addEventListener('timeupdate', (e) => {

      audio = e["target"];

      seekbarContainer = audio.parentElement.querySelectorAll(".seekbar-container")[0];

      if (Array.from(seekBarContainer.classList).includes("updating")){
        return;
      }

      seekBar = seekbarContainer.querySelectorAll(".seekbar")[0];
      seekBarHandle = seekbarContainer.querySelectorAll(".seekbar-handle")[0];

      const progressPercent = (audio.currentTime / audio.dataset.duration) * 100;
  
      updateSeekBar(progressPercent,seekBar,seekBarHandle,audio);

      album = audio.parentElement;

      if (progressPercent>=99.9){
        playNextTrack(album);
      }
      
    });

    function setSeekBarToUpdateMode(e){
      seekBarContainer = e["target"];

      if (seekBarContainer.getAttribute("class")=="seekbar"){
        seekBarContainer = seekBarContainer.parentElement;
      }

      for (otherSeekBarContainer of document.querySelectorAll(".seekbar-container")){
        otherSeekBarContainer.classList.remove("updating");
      }

      seekBarContainer.classList.add("updating");

    }

    seekBarContainer.addEventListener('mousedown', (e) => {
      setSeekBarToUpdateMode(e);
      findSeekBarInUpdateModeAndUpdateIt(e);
    });
    seekBarContainer.addEventListener('touchstart', (e) => {
      setSeekBarToUpdateMode(e);  
      findSeekBarInUpdateModeAndUpdateIt(e);
    });

    seekBarContainer.addEventListener("click", (e)=>{
      setSeekBarToUpdateMode(e);  
      findSeekBarInUpdateModeAndUpdateIt(e);
      setSeekBarToNotUpdatingMode(e);
    });

    
  }

  var mouseDown = false;
  window.onmousedown = function() {mouseDown=true;};
  window.onmouseup = function(e){
    mouseDown=false;
    setSeekBarToNotUpdatingMode(e);
  }
  window.ontouchend = function(e) {
    setSeekBarToNotUpdatingMode(e);
  }

  document.addEventListener("mousemove", (e) => {
    
    if (!mouseDown){ 
      return null;
    };

    findSeekBarInUpdateModeAndUpdateIt(e);

  });

  document.addEventListener("touchmove", (e) => {
    findSeekBarInUpdateModeAndUpdateIt(e);
  });


  for (album of albums){

    tracks = album.querySelectorAll(".track-list li");
    tracks[0].click();
    tracks[0].click();

    timecode = album.querySelectorAll(".timecode")[0];
    audio = album.querySelectorAll("audio")[0];

    updateTimecode(audio,timecode);

  }

});