const image=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const music=document.querySelector('audio');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress');
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration');
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');

const songs=[
    {
        name:'burbank - sorry i like you',
        imageName:'1',
        displayName:'Sorry I Like You',
        artist:'Burbank', 
    },
    {
        name:'Kina - u\'re mine (ft. shiloh)',
        imageName:'2',
        displayName:'U\'re mine(ft.Shiloh)',
        artist:'Kina', 
    },
    {
        name:'sagun - I\'ll Keep You Safe (feat. Shiloh)',
        imageName:'3',
        displayName:'I\'ll Keep You Safe(ft.Shiloh)',
        artist:'Sagun', 
    },
    {
        name:'Snøw & Monty Datta - Say Goodbye',
        imageName:'4',
        displayName:'Say Goodbye',
        artist:'Snøw & Monty Datta', 
    }
]

let isPlaying=false;

function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()));

function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`music/${song.name}.mp3`;
    image.src=`img/${song.imageName}.jpg`;
}

let songIndex=0;

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e){
    if(isPlaying){
        const {duration,currentTime}=e.srcElement;
        const progressPercent=(currentTime/duration)*100;
        progress.style.width=`${progressPercent}%`;
        const durationMinutes=Math.floor(duration/60);
        let durationSeconds=Math.floor(duration%60);
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`;
        }  
        if(durationSeconds){
            durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
        }
        
        const currentMinutes=Math.floor(currentTime/60);
        let currentSeconds=Math.floor(currentTime%60);
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`;
        }  
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const{duration}=music;
    music.currentTime=(clickX/width)*duration;
}

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);