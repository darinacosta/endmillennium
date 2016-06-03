define([], audioSvc);

function audioSvc(){

  var audioSvc = {};

  audioSvc.tracks = {
    click1: {
      name: "click1",
      volume: 0.2,
    },
    click2: {
      name: "click2",
      volume: 0.2,
    },
    click3: {
      name: "click3",
      volume: 0.2,
    },
    unclick1: {
      name: "unclick1",
      volume: 0.4,
    },
    getitem: {
      name: "getitem",
      volume: 0.2,
    },
    gulfnight: {
      name: "gulfnight",
      volume: 0.9,
      loop: true,
      background: true
    },
    intro: {
      name: "intro",
      volume: 0.4,
      played: 0,
      loop: false
    },
    crackle: {
      name: "crackle",
      volume: 0.2,
      loop: true
    }
  };

  return audioSvc;

};
