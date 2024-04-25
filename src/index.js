import "./sass/style.scss";
import { playAudio, playNext, playPrev } from "./js/player.mjs";
import Play from "./img/play.png";
import Pause from "./img/pause.png";
import Next from "./img/next.png";
import Prev from "./img/back.png";

const playerButton = document.querySelector('.player__button--option');
const playerNextButton = document.querySelector('.player__button--next');
const playerNextPrev = document.querySelector('.player__button--prev');

playerButton.addEventListener('click', playAudio);
playerNextButton.addEventListener('click', playNext);
playerNextPrev.addEventListener('click', playPrev);