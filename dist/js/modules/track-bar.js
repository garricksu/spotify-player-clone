const TrackBar = (() => {
  const state = {
    currentTrackTime: 0,
    fullTrackTime: 0,
    progressWidth: 0
  }

  const trackBarEl = document.querySelector(".track-bar");
  const trackBarFillEl = document.querySelector(".track-bar-fill");

  const init = () => {
    render();
  }

  const render = () => {
    trackBarFillEl.style.width = `${state.progressWidth}%`;
  }

  const getPercent = (current, full) => {
    return current/full * 100;
  }

  const setState = obj => {
    state.currentTrackTime = obj.currentTime;
    state.fullTrackTime = obj.duration;
    state.progressWidth = getPercent(state.currentTrackTime, state.fullTrackTime);
    render();
  }


  return {
    init,
    setState
  }
})();

export default TrackBar;