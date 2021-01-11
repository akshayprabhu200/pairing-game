let keylist = {
  keys: [
    "amorphous",
    "austere",
    "abound",
    "belie",
    "capricious",
    "congenial",
    "conspicuous",
    "cursory",
    "daunting",
    "deify",
    "didactic",
    "disseminate",
    "Feasible",
    "flout",
  ],
};

wordlist = {
  amorphous: [
    "amorphous",
    "shapeless",
    "formless",
    "unformed",
    "structureless",
    "indefinite",
    "vague",
    "Nebulous",
  ],
  austere: [
    "austere",
    "sober",
    "frugal",
    "spartan",
    "ascetic",
    "puritanical",
    "abstemious",
  ],
  abound: [
    "abound",
    "Proliferate",
    "superabound",
    "thrive",
    "flourish",
    "abundant",
    "Copious",
    "lavish",
    "Profuse",
    "Munificent",
    "prolific",
    "Inexhaustible",
    "galore",
  ],
  belie: [
    "belie",
    "Contradict",
    "conceal",
    "Falsify",
    "debunk",
    "Confute",
    "Colour",
  ],
  capricious: [
    "capricious",
    "fickle",
    "mercurial",
    "erratic",
    "fitful",
    "arbitrary",
    "temperamental",
    "whimsical",
    "wayward",
    "quirky",
    "haphazard",
  ],
  congenial: [
    "congenial",
    "pleasant",
    "pleasurable",
    "satisfying",
    "gratifying",
    "adapted",
  ],
  conspicuous: [
    "conspicuous",
    "clear",
    "discernible",
    "flagrant",
    "ostentatious",
    "overt",
    "blatant",
    "inescapable",
  ],
  cursory: [
    "cursory",
    "perfunctory",
    "desultory",
    "superficial",
    "mechanical",
    "automatic",
    "fleeting",
    "slapdash",
  ],
  daunting: [
    "daunting",
    "intimidating",
    "disconcerting",
    "unnerving",
    "demoralizing",
    "forbidding",
    "ominous",
    "taxing",
  ],
  deify: [
    "deify",
    "revere",
    "venerate",
    "reverence",
    "extol",
    "exalt",
    "adore",
    "immortalize",
    "lionize",
    "aggrandize",
  ],
  didactic: [
    "didactic",
    "educative",
    "doctrinal",
    "academic",
    "scholastic",
    "edifying",
    "heuristic",
    "pedantic",
  ],
  disseminate: [
    "disseminate",
    "disperse",
    "diffuse",
    "proclaim",
    "promulgate",
    "dissipate",
    "herald",
    "trumpet",
  ],
  Feasible: [
    "Feasible",
    "practical",
    "achievable",
    "viable",
    "realistic",
    "suitable",
    "expedient",
    "constructive",
    "earthly",
  ],
  flout: [
    "flout",
    "defy",
    "scorn",
    "disdain",
    "contravene",
    "infringe",
    "breach",
    "infract",
  ],
};

// cards array holds all the background cards
let card = document.getElementsByClassName("playcard");
let cards = Array.from(card);

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", selectCard);
}

let pairs = 0;
let pairsMatched = 0;

function selectCard(element) {
  console.log(this);
  if (sessionStorage.getItem("word") == element.target.innerHTML) {
    this.classList.toggle("selected");
    sessionStorage.removeItem("word");
    sessionStorage.removeItem("selected");
  } else if (!sessionStorage.getItem("selected")) {
    this.classList.toggle("selected");
    let value = this.childNodes[1].id;
    let word = this.childNodes[1].innerHTML;
    sessionStorage.setItem("selected", value);
    sessionStorage.setItem("word", word);
  } else if (sessionStorage.getItem("selected") == this.childNodes[1].id) {
    this.classList.toggle("selected");
    let matched = [...document.getElementsByClassName("selected")];
    matched.forEach((e) => {
      e.classList.toggle("selected");
      e.classList.toggle("disabled");
      e.removeEventListener("click", selectCard);
    });
    sessionStorage.removeItem("selected");
    sessionStorage.removeItem("word");
    pairsMatched++;
    if (pairs == pairsMatched) {
      congrats();
    }
  } else {
    let unmatched = [...document.getElementsByClassName("selected")];
    unmatched.forEach((e) => {
      e.classList.toggle("selected");
    });
    sessionStorage.removeItem("selected");
    sessionStorage.removeItem("word");
  }
}

function startGame() {
  sessionStorage.clear();
  //configuration of the options
  let options = pickKeys();
  console.log(options);
  let optionsArray = [];
  let i = 0;

  for (option in options) {
    let pair = [];
    if (option == "pairs") {
      pairs = options[option];
      continue;
    }
    pair.push(option);
    pair.push(options[option]);
    optionsArray.push(pair);
  }
  optionsArray = shuffle(optionsArray);

  optionsArray.forEach((pair) => {
    cards[i].childNodes[1].innerHTML = pair[0];
    cards[i].childNodes[1].setAttribute("id", pair[1]);
    i++;
  });
}

function congrats() {
  message = document.getElementById("message");
  message.innerHTML = "Congrats you found all pairs!";
  for (var i = 0; i < cards.length; i++) {
    cards[i].removeEventListener("click", selectCard);
  }
}

function getRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function addOneWord(array, obj) {
  shuffledArray = shuffle(array);
  obj[array[0]] = array[0];
}

function addTwoWords(array, obj) {
  shuffledArray = shuffle(array);
  obj[array[0]] = array[0];
  obj[array[1]] = array[0];
}

function getKeys(array, num) {
  let list = [];
  shuffledArray = shuffle(array);
  for (let i = 0; i < num; i++) list.push(shuffledArray[i]);
  return list;
}

function reload() {
  Location.reload();
}

function pickKeys() {
  let noOfKeys = getRange(3, 6);
  let options = {};
  let keys = getKeys(keylist.keys, noOfKeys);
  switch (noOfKeys) {
    case 3:
      for (key of keys) addTwoWords(wordlist[key], options);
      options["pairs"] = 3;
      break;

    case 4:
      for (let i = 0; i < 2; i++) addTwoWords(wordlist[keys[i]], options);
      for (let i = 2; i < 4; i++) addOneWord(wordlist[keys[i]], options);
      options["pairs"] = 2;
      break;
    case 5:
      for (let i = 0; i < 1; i++) addTwoWords(wordlist[keys[i]], options);
      for (let i = 1; i < 5; i++) addOneWord(wordlist[keys[i]], options);
      options["pairs"] = 1;
      break;
    default:
      console.log("Error");
      break;
  }
  return options;
}

window.onload = startGame();
