let now_playing = document.querySelector(".now-playing");
let picture = document.querySelector(".picture");
let song_name = document.querySelector(".song-name");
let artist = document.querySelector(".artist");
let pause = document.querySelector(".pause");
let prev = document.querySelector(".previous");
let next = document.querySelector(".next");
let seek = document.querySelector(".seek");
let vol = document.querySelector(".volume");
let curr_time = document.querySelector(".current-time");
let tot_duration = document.querySelector(".duration");

let song_num = 0;
let isPlaying = false;
let changeTimer;

let curr_song = document.createElement('audio');

let song_list = [
  {
    name: "DO I WANNA KNOW?",
    artist: "Arctic Monkeys",
    image: "img/am.jpg",
    path: "songs/do_i_wanna_know.mp3",
  },
  {
    name: "BASKET CASE",
    artist: "Green Day",
    image: "img/gd.jpg",
    path: "songs/basket_case.mp3",
  },
  {
    name: "CLEOPATRA",
    artist: "The Lumineers",
    image: "img/tl.jpg",
    path: "songs/cleopatra.mp3",
  }
];

function load(song_num) {
  clearInterval(changeTimer);
  resetValues();

  curr_song.src = song_list[song_num].path;
  curr_song.load();

  song_name.textContent = song_list[song_num].name;
  picture.style.backgroundImage = "url(" + song_list[song_num].image + ")";
  artist.textContent = song_list[song_num].artist;

  updateTimer = setInterval(seekUpdate, 1000);

  curr_song.addEventListener("ended", nextSong);
}

function resetValues() {
  curr_time.textContent = "00:00";
  duration = "00:00";
  seek.value = 0;
}

function pauseSong() {
  if (!isPlaying) play();
  else pause_song();
}

function play() {
  curr_song.play();
  isPlaying = true;
  pause.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i';
}

function pause_song() {
  curr_song.pause();
  isPlaying = false;
  pause.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextSong() {
  if (song_num < song_list.length-1) {
    song_num += 1;
  } else {
    song_num = 0;
  }
  load(song_num);
  play();
}

function previousSong() {
  if (song_num > 0) {
    song_num -= 1;
  } else {
    song_num = song_list.length-1;
  }
  load(song_num);
  play();
}

function shuffleSongs() {
  song_num = Math.floor(Math.random() * song_list.length);
  load(song_num);
  play();
}

function seekTo() {
  seekto = curr_song.duration * (seek.value / 100);
  curr_song.currentTime = seekto;
}

function changeVol() {
  curr_song.volume = vol.value / 100;
}

function seekUpdate() {
  let seekPos = 0;

  if (!isNaN(curr_song.duration)) {
    seekPos = curr_song.currentTime * (100 / curr_song.duration);
    seek.value = seekPos;

    let currMin = Math.floor(curr_song.currentTime / 60);
    let currSec = Math.floor(curr_song.currentTime - currMin * 60);
    let durMin = Math.floor(curr_song.duration / 60);
    let durSec = Math.floor(curr_song.duration - durMin * 60);

    if (currSec < 10) { currSec = "0" + currSec; }
    if (durSec < 10) { durSec = "0" + durSec; }
    if (currMin < 10) { currMin = "0" + currMin; }
    if (durMin < 10) { durMin = "0" + durMin; }

    curr_time.textContent = currMin + ":" + currSec;
    tot_duration.textContent = durMin + ":" + durSec;
  }
}

load(song_num);
