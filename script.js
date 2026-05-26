let name = document.getElementById("song-name");
let play = document.getElementById("play");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let progress = document.getElementById("progress");
let current = document.getElementById("current");
let final = document.getElementById("final");
let slide = document.querySelector(".progress-container");
let banner = document.getElementById("Banner");

let songs = [
    { name: "Khuda Bhi", path: "music/Khuda Bhi.mp3" , image:"image/Khuda Bhi.webp"},
    { name: "Tu Zaroori", path: "music/Tu Zaroori.mp3", image:"image/Tu Zaroori.webp" },
    { name: "Bairan", path: "music/Bairan.mp3", image:"image/Bairan.webp" },
    { name: "dhurandhar", path: "music/dhurandhar.mp3", image:"image/dhurandhar.webp" },
    { name: "Sheesha", path: "music/Sheesha.mp3", image:"image/Sheesha.webp" },
    { name: "Kinna Chir", path: "music/Kinna Chir.mp3", image:"image/Kinna Chir.webp" }
];

let index = 0;
let audio = new Audio();

//play & pause
let playing = false;
play.addEventListener("click", function () {
    name.textContent = songs[index].name;

    if (playing) {
        play.innerHTML = '<i class="fa-solid fa-play"></i>';
        audio.pause();
    }
    else {
        play.innerHTML = '<i class="fa-solid fa-pause"></i>';
        audio.play();
    }
    playing = !playing;
});


//loadSong from array of object
function loadSong() {
    audio.pause();
    audio.src = songs[index].path;
    name.textContent = songs[index].name;
    banner.src = songs[index].image;
}
loadSong();

//auto next song
audio.addEventListener("ended", function() {
    index++;
    if(index >= songs.length) index=0;

    loadSong();
    audio.play();
});

//next song
next.addEventListener("click", function () {
    index++;
    if (index >= songs.length) index = 0;
    loadSong();
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playing = true;
    audio.play();
});

//previous song
prev.addEventListener("click", function () {
    index--;
    if (index < 0) index = songs.length - 1;
    loadSong();
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playing = true;
    audio.play();
});

//progress bar
audio.addEventListener("timeupdate", function() {
    let progressValue = (audio.currentTime/audio.duration)*100;

    //current Time in minutes and seconds
    let currMin = Math.floor(audio.currentTime/60);
    let currSec = Math.floor(audio.currentTime%60);
    if(currSec <= 9) currSec = "0" + currSec;
    current.innerText = `${currMin}:${currSec}`;

    progress.style.width = progressValue + "%";
});

audio.addEventListener("loadedmetadata" , function() {
    progress.style.width = "0%";

    //Final Time in minutes and seconds
    let finalMin = Math.floor(audio.duration/60);
    let finalSec = Math.floor(audio.duration%60);
    if(finalSec <= 9) finalSec = "0" + finalSec;
    final.innerText = `${finalMin}:${finalSec}`;
});


slide.addEventListener("click", function(val) {
    let value = val.offsetX;
    let  progressValue = (value/slide.clientWidth)*100;
    progress.style.width = progressValue + "%";
    audio.currentTime = (progressValue/100)*audio.duration;
});

