let name = document.getElementById("song-name");
let play = document.getElementById("play");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let progress = document.getElementById("progress");
let current = document.getElementById("current");
let final = document.getElementById("final");
let slide = document.querySelector(".progress-container");
let banner = document.getElementById("Banner");
let shuffle = document.getElementById("shuffle");
let repeat = document.getElementById("repeat");

let songs = [
    { name: "Khuda Bhi", path: "music/Khuda Bhi.mp3", image: "image/Khuda Bhi.webp" },
    { name: "Tu Zaroori", path: "music/Tu Zaroori.mp3", image: "image/Tu Zaroori.webp" },
    { name: "Bairan", path: "music/Bairan.mp3", image: "image/Bairan.webp" },
    { name: "dhurandhar", path: "music/dhurandhar.mp3", image: "image/dhurandhar.webp" },
    { name: "Sheesha", path: "music/Sheesha.mp3", image: "image/Sheesha.webp" },
    { name: "Kinna Chir", path: "music/Kinna Chir.mp3", image: "image/Kinna Chir.webp" }
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
audio.addEventListener("timeupdate", function () {
    let progressValue = (audio.currentTime / audio.duration) * 100;

    //current Time in minutes and seconds
    let currMin = Math.floor(audio.currentTime / 60);
    let currSec = Math.floor(audio.currentTime % 60);
    if (currSec <= 9) currSec = "0" + currSec;
    current.innerText = `${currMin}:${currSec}`;

    progress.style.width = progressValue + "%";
});

audio.addEventListener("loadedmetadata", function () {
    progress.style.width = "0%";

    //Final Time in minutes and seconds
    let finalMin = Math.floor(audio.duration / 60);
    let finalSec = Math.floor(audio.duration % 60);
    if (finalSec <= 9) finalSec = "0" + finalSec;
    final.innerText = `${finalMin}:${finalSec}`;
});


slide.addEventListener("click", function (val) {
    const rect = slide.getBoundingClientRect();
    let value = val.clientX - rect.left;
    let progressValue = (value / slide.clientWidth) * 100;
    progress.style.width = progressValue + "%";
    audio.currentTime = (progressValue / 100) * audio.duration;
});


//*******Shuffle logic********//
let shuffleMode = 0;
shuffle.addEventListener("click", function () {
    if (shuffleMode === 0) {
        shuffle.innerHTML = `<i class="fa-solid fa-shuffle" style="color: #22c55e;"></i>`;
    }
    else {
        shuffle.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;
    }
    shuffleMode === 0 ? shuffleMode = 1 : shuffleMode = 0;
});

//*******Repeat logic********//
let repeatMode = 0;
repeat.addEventListener("click", function () {
    repeatMode++;

    if (repeatMode > 2) repeatMode = 0;

    if (repeatMode === 0) {
        repeat.innerHTML = `<span class="material-symbols-outlined" style="font-weight: 499;">repeat</span>`;
    }
    else if (repeatMode === 1) {
        repeat.innerHTML = `<span class="material-symbols-outlined" style="color: #22c55e;">repeat</span>`;
    }
    else {
        repeat.innerHTML = `<span class="material-symbols-outlined" style="color: #22c55e;">repeat_one</span>`;
    }
});

//********Active Shuffle & Repeat*********/
audio.addEventListener("ended", function () {
    if (shuffleMode === 1 && repeatMode != 2) {
        let randomIndex;
        //*** hr brr random song ayee ***//
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === index);
        index = randomIndex;
        loadSong();
        audio.play();
    }

    else if (shuffleMode === 0 && repeatMode === 0) {
        if (index < songs.length - 1) {
            index++;
            loadSong();
            audio.play();
        }
        else {
            play.innerHTML = `<i class="fa-solid fa-play"></i>`;
            playing = false;
        }
    }
    else if (repeatMode === 1) {
        index++;
        if (index >= songs.length) index = 0;
        loadSong();
        audio.play();
    }
    else {
        audio.currentTime = 0;
        audio.play();
    }
});



