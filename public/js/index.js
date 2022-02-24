const audio = document.getElementById('player');
const btnPlayPause = document.getElementById('playPause');
const btnPrevSong = document.getElementById('previous');
const btnNextSong = document.getElementById('next');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const progressBarContainer = document.getElementById('progressBarContainer');
const progressbar = document.getElementById('progress');
const songTitle = document.getElementById('songTitle');
const singerName = document.getElementById('singerName');

//keep track on user click play or pause
let playPauseToggle = false;

//song list

const songLists = [
  {
    title: '为爱痴狂',
    singer: '钟镇涛 & 冯提莫 ',
  },
  {
    title: '別傻了',
    singer: '周華健 Wakin Chau & 任賢齊 Richie Jen',
  },
  {
    title: '其实不想走',
    singer: '周華健 & 蒋一侨',
  },
  {
    title: 'My Love',
    singer: 'Westlife',
  },
  {
    title: 'បាត់គោចួបស្នេហ៍',
    singer: 'ម៉ម ពេជ្ជរិទ្ធ',
  },
];
//song index
let songIndex = 0;

//initial updat esong
loadSong(songLists[songIndex]);

//update Song to audio tag
function loadSong(song) {
  audio.src = `songs/${song.title}.mp3`;
  songTitle.innerHTML = song.title;
  singerName.innerHTML = song.singer;
}

//toggle to play or pause on user click
function togglePlayPause() {
  playPauseToggle = !playPauseToggle;
  //btnPlay.src = playPauseToggle ? 'img/play.svg' : 'img/pause.svg';
  if (playPauseToggle) {
    // btnPlay.src = 'img/pause.svg';
    audio.play();
  } else {
    // btnPlay.src = 'img/play.svg';
    audio.pause();
  }
}

//previous song
function previousSong() {
  songIndex--;
  if (songIndex < 0) {
    //point to the final song
    songIndex = songLists.length - 1;
  }
  loadSong(songLists[songIndex]);
  if (playPauseToggle) {
    audio.play();
  }
}
//next song
function nextSong() {
  songIndex++;
  if (songIndex > songLists.length - 1) {
    //point to the first song
    songIndex = 0;
  }
  loadSong(songLists[songIndex]);
  if (playPauseToggle) {
    audio.play();
  }
}
//convert second to minute and second with column seperate
function convert(value) {
  return (
    Math.floor(value / 60) +
    ':' +
    (value % 60 < 10 ? '0' + Math.floor(value % 60) : Math.ceil(value % 60))
  );
}

//function calcuate percentage
function calculatePercentage(currentValue, maximuxValue) {
  return Math.floor((currentValue / maximuxValue) * 100);
}

// Set progress bar
function setProgress(e) {
  //get total width of progressbar
  const width = this.clientWidth;
  //distand of mouse to start of progressbar
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Event Listener
btnPlayPause.addEventListener('click', togglePlayPause);
btnNextSong.addEventListener('click', nextSong);
btnPrevSong.addEventListener('click', previousSong);

//load the song length on start
audio.addEventListener('loadedmetadata', () => {
  currentTime.innerHTML = convert(audio.currentTime);
  duration.innerHTML = convert(audio.duration);
  console.log(audio.duration * 2);
});

//Update Song Progress on play
audio.addEventListener('timeupdate', () => {
  currentTime.innerHTML = convert(audio.currentTime);
  duration.innerHTML = convert(audio.duration);
  progressbar.style.width = `${calculatePercentage(
    audio.currentTime,
    audio.duration
  )}%`;
});

//Click On ProgressBar
progressBarContainer.addEventListener('click', setProgress);

// Song ends play next song
audio.addEventListener('ended', nextSong);

//check if audio is pause
audio.addEventListener('pause', () => (playPause.innerHTML = 'play_arrow'));
//check if audio is pause
audio.addEventListener('play', () => (playPause.innerHTML = 'pause'));
