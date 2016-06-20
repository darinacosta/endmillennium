define([], soundtrackSvc);

function soundtrackSvc(){

  var soundtrackSvc = {};

  soundtrackSvc.tracks = {
    click1: {
      name: "click1",
      volume: 0.3,
    },
    click2: {
      name: "click2",
      volume: 0.3,
    },
    click3: {
      name: "click3",
      volume: 0.3,
    },
    unclick1: {
      name: "unclick1",
      volume: 0.5,
    },
    getitem: {
      name: "getitem",
      volume: 0.2,
    },
    gulfnight: {
      name: "gulfnight",
      volume: 1,
      loop: true,
      background: true
    },
    intro: {
      name: "intro",
      volume: 0.6,
      played: 0,
      loop: false
    },
    crackle: {
      name: "crackle",
      volume: 0.2,
      loop: true
    },
    save: {
      name: "save",
      volume: 0.5,
      loop: false
    }
  };

  return soundtrackSvc;

};
