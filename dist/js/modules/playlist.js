import { songsList } from '../data/songs.js';
import PlayInfo from './play-info.js';
import TrackBar from './track-bar.js';

const Playlist = (() => {
  // state
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url)

  //cache the DOM
  const playlistEl = document.querySelector(".playlist");
// 
  const init = () => {
    render();
    listeners();
    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    });
  }

  const flip = () => {
    togglePlayPause();
    render();
  }

  const changeAudioSrc = () => {
    currentSong.src = songs[currentlyPlayingIndex].url;
  }

  const togglePlayPause = () => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  }

  const mainPlay = clickedIndex => {
    if (currentlyPlayingIndex === clickedIndex) {
      togglePlayPause();
    }
    else {
      currentlyPlayingIndex = clickedIndex;
      changeAudioSrc();
      togglePlayPause();
    }

    PlayInfo.setState({
      songsLength: songs.length,
      isPlaying: !currentSong.paused
    });
  }

  const playNext = () => {
    if (songs[currentlyPlayingIndex +1]) {
      currentlyPlayingIndex++;
      changeAudioSrc();
      togglePlayPause();
      render();
    }
  }

  const listeners = () => {
    // 1. get index of li tag
    // 2. change currentPlayingIndex to index of li tag
    // 3. play or pause
    // 4. if not same song, change source of song
    playlistEl.addEventListener("click", event => {
      if (event.target && event.target.matches(".fa")) {
        const listElem = event.target.parentNode.parentNode;
        const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
        mainPlay(listElemIndex);
        render();
      }
    })

    currentSong.addEventListener("timeupdate", () => {
      TrackBar.setState(currentSong);
    })

    currentSong.addEventListener("ended", () => {
      playNext();
    });
  }

  const toggleIcon = itemIndex => {
    if (currentlyPlayingIndex === itemIndex) {
      return currentSong.paused ? 'fa-play' : 'fa-pause';
    }
    else {
      return 'fa-play';
    }
  }

  const render = () => {
    let markup = "";
    songs.forEach((songObj, index) => {
      markup += `
        <li class="playlist-song ${index === currentlyPlayingIndex ? 'active' : ''}">
          <div class="play-pause">
            <i class="fa ${(toggleIcon(index))} pp-icon"></i>
          </div>
          <div class="playlist-song-details">
            <span class="playlist-song-name">${songObj.title}</span>
            <br />
            <span class="playlist-song-artist">${songObj.artist}</span>
          </div>
          <div class="playlist-song-duration">
            ${songObj.duration}
          </div>
        </li>
      `;
    });

    playlistEl.innerHTML = markup;
  }

  return {
    init,
    flip
  }
})();

export default Playlist;