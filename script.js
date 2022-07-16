var player = {
  image: document.querySelector(".player .img"),
  name: document.querySelector(".player .name"),
  prev: document.querySelector(".player .prev"),
  play: document.querySelector(".player .play"),
  next: document.querySelector(".player .next"),
  timeLine: document.querySelector(".player .timeLine"),
  vol: document.querySelector(".player .vol"),
  // volUp: document.querySelector(".player .volUp"),
  // volDown: document.querySelector(".player .volDown"),
  // volLine: document.querySelector(".player .volLine"),
};

//set images
player.prev.style.backgroundImage = 'url("img/previous.png")';
player.play.style.backgroundImage = 'url("img/play-button-arrowhead.png")';
player.next.style.backgroundImage = player.prev.style.backgroundImage;
player.next.style.transform = "scaleX(-1)";
// player.volUp.style.backgroundImage = 'url("img/volume.png")';
// player.volDown.style.backgroundImage = 'url("img/volume-down.png")';
// player.volLine.style.backgroundImage = 'url("img/volume-mute.png")';
// player.volLine.style.backgroundImage = 'url("img/volume.png")';

//audio list
var audio = [
  {
    name: "Intro",
    author: "Alan Walker",
    location: "1 - Intro.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Lost Control",
    author: "Alan Walker",
    location: "2 - Lost Control.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "I Don't Wanna Go",
    author: "Alan Walker",
    location: "3 - I Don't Wanna Go.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Lily",
    author: "Alan Walker",
    location: "4 - Lily.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Lonely",
    author: "Alan Walker",
    location: "5 - Lonely.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Do It All for You",
    author: "Alan Walker",
    location: "6 - Do It All for You.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Different World",
    author: "Alan Walker",
    location: "7 - Different World.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Interlude",
    author: "Alan Walker",
    location: "8 - Interlude.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Sing Me to Sleep",
    author: "Alan Walker",
    location: "9 - Sing Me to Sleep.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "All Falls Down",
    author: "Alan Walker",
    location: "10 - All Falls Down.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Darkside",
    author: "Alan Walker",
    location: "11 - Darkside.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Alone",
    author: "Alan Walker",
    location: "12 - Alone.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Diamond Heart",
    author: "Alan Walker",
    location: "13 - Diamond Heart.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Faded (Interlude)",
    author: "Alan Walker",
    location: "14 - Faded (Interlude).mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
  {
    name: "Faded",
    author: "Alan Walker",
    location: "15 - Faded.mp3",
    img: "Alan-Walker-Different-World.jpg",
  },
];

//vars
var currentSong = 0;
var song = new Audio();

//events
function prev() {
  setTimeout(function () {
    player.image.classList.remove("sh");
    setTimeout(function () {
      player.image.classList.add("sh");
    }, 1000 / 2);
  }, 1000 / 2);

  if (--currentSong < 0) currentSong = audio.length - 1;
  changeSong();
  console.log(currentSong);
};
player.prev.onclick = prev;

function next() {
  setTimeout(function () {
    player.image.classList.remove("sh");
    setTimeout(function () {
      player.image.classList.add("sh");
    }, 1000 / 2);
  }, 1000 / 2);

  if (++currentSong == audio.length) currentSong = 0;
  changeSong();
  console.log(currentSong);
};
player.next.onclick = next;

player.play.onclick = function () {
  if (!song.src) changeSong();
  playSong();
};

window.onload = function () {
  //   playSong();
  player.vol.style.backgroundImage =
    "linear-gradient(0deg, black " +
    parseInt(song.volume * 100) +
    "%, #ffffff00 0%)";
};

function timeLineMove(e) {
  song.currentTime = (song.duration * e.offsetX) / e.target.offsetWidth;
  if (song.currentTime == song.duration) {
    player.play.style.backgroundImage = 'url("img/play-button-arrowhead.png")';
  }
}
document
  .getElementsByClassName("timeLine")[0]
  .addEventListener("click", function (e) {
    timeLineMove(e);
  });

function volLineMove(e) {
  song.volume = (e.target.offsetHeight - e.offsetY) / 100;
  player.vol.style.backgroundImage =
    "linear-gradient(0deg, black " +
    parseInt(song.volume * 100) +
    "%, #ffffff00 0%)";
}
document
  .getElementsByClassName("vol")[0]//volLine
  .addEventListener("click", function (e) {
    volLineMove(e);
  });

function playSong() {
  let timeInterval = setInterval(function () {
    player.timeLine.style.backgroundImage =
      "linear-gradient(90deg, black " +
      parseInt((song.currentTime / song.duration) * 100) +
      "%, #ffffff00 0%)";
    if (song.currentTime == song.duration) {
      player.play.style.backgroundImage =
        'url("img/play-button-arrowhead.png")';
      player.timeLine.style.backgroundImage =
        "linear-gradient(90deg, black 0%, #ffffff00 0%)";
      next();
      playSong();
    }
  }, 1000 / 24);
  if (song.paused) {
    song.play();
    player.play.style.backgroundImage = 'url("img/pause.png")'; //pause
  } else {
    clearInterval(timeInterval);
    song.pause();
    player.play.style.backgroundImage = 'url("img/play-button-arrowhead.png")'; //play
  }
}

function changeSong() {
  let played = song.paused;
  player.name.textContent = audio[currentSong].name;
  song.src = "audio/" + audio[currentSong].location;
  drawAudio("audio/" + audio[currentSong].location);
  if (!!audio[currentSong].img) {
    player.image.style.backgroundImage =
      'url("audio/media/' + audio[currentSong].img + '")';
    player.image.classList.add("sh");
  } else player.image.classList.remove("sh");

  if (played) {
    song.pause();
    player.play.style.backgroundImage = 'url("img/play-button-arrowhead.png")'; //play
  } else {
    song.play();
    player.play.style.backgroundImage = 'url("img/pause.png")'; //pause
  }
}
