
function requestFullscreen(element) {
  element.fullscreen = element.mozRequestFullScreen ||
    element.webkitRequestFullScreen;

  element.fullscreen();
}

