const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
    {
        name: 'Arabic-1',
        displayName: 'Mech Rah Khallik Tfell',
        artist: 'Chantal Bitar'
    },
    {
        name: 'Arabic-2',
        displayName: '3adda El kalam',
        artist: 'Shalabia'
    },
    {
        name: 'Arabic-3',
        displayName: 'Bel Hajr El Sohi',
        artist: 'Chantal Bitar'
    },
    {
        name: 'Arabic-4',
        displayName: 'ADDA ELKALAM',
        artist: 'Saad Lmjarred'
    }
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    music.play();
    playBtn.classList.replace( 'fa-play' , 'fa-pause' );
    playBtn.setAttribute('title' , 'Pause');
    isPlaying = true;
}

// Pause
function pauseSong() {
    music.pause();
    playBtn.classList.replace( 'fa-pause' , 'fa-play' );
    playBtn.setAttribute('title' , 'Play');
    isPlaying = false;
}

// Play or Pause Event Listener
playBtn.addEventListener( 'click' , () => (isPlaying ? pauseSong() : playSong() ));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration , currentTime } = e.srcElement;
        // Update Progress Bar Width
        const progressPercent = ( currentTime / duration ) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10 ) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration ELement to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10 ) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressbar(e) {
    console.log(e);
    const width = this.clientWidth;
    console.log('width' , width);
    const clickX = e.offsetX;
    console.log(clickX);
    const { duration } = music;
    console.log(clickX / width);
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener( 'click' , prevSong );
nextBtn.addEventListener( 'click' , nextSong );
music.addEventListener( 'ended' , nextSong );
music.addEventListener( 'timeupdate' , updateProgressBar );
progressContainer.addEventListener( 'click' , setProgressbar);