define([], audioSvc);

function audioSvc(){

  var audioSvc = {};

  audioSvc.tracks = {
    gulfnight: {
      name: "gulfnight",
      audio: document.getElementById("gulfnight"),
      volume: 0.9,
      loop: true
    },
    intro: {
      name: "intro",
      audio: document.getElementById("intro"),
      volume: 0.4,
      played: 0,
      loop: false
    },
    crackle: {
      name: "crackle",
      audio: document.getElementById("crackle"),
      volume: 0.1,
      loop: true
    }
  };

  return audioSvc;

};
