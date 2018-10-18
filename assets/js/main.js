// vars declarations

// game opject
var word = document.getElementById("word"),
  wins = document.getElementById("wins"),
  remaining = document.getElementById("remaining"),
  guessed = document.getElementById("guessed"),
  char = [];
var Game = {
  // words
  words: [
    {
      word: "fortnite",
      image: "",
      audio: "shield.wav"
    },
    {
      word: "call of duty",
      image: "",
      audio: "cz.wav"
    },
    {
      word: "resident evil",
      image: "",
      audio: "re.wav"
    },
    {
      word: "battlefield",
      image: "",
      audio: "bf.wav"
    },
    {
      word: "dark souls",
      image: "",
      audio: "ds.wav"
    },
    {
      word: "destiny",
      image: "",
      audio: "ice.wav"
    },
    {
      word: "halo",
      image: "",
      audio: "h3.wav"
    },
    {
      word: "the last of us",
      image: "",
      audio: "tlos.wav"
    }
  ],
  //wins
  wins: 0,
  // remaining guesses
  remaining: 10,
  //guessed
  guessed: [],
  // first rendering function

  firstRender: function() {
    // reseting
    word.innerHTML = "";
    this.guessed = [];
    this.remaining = 10;
    document.getElementById("audio").innerHTML = "";
    //////////////
    var randomnum = Math.floor(Math.random() * this.words.length);
    var randomGame = this.words[randomnum];
    var randomword = randomGame.word;
    var chars = randomword.split("");
    char = chars;
    // render words
    var audio = document.createElement("audio");
    audio.setAttribute("src", "./assets/audio/" + randomGame.audio);
    audio.setAttribute("controls", "true");
    document.getElementById("audio").append(audio);

    chars.forEach(function(w) {
      if (w !== " ") {
        word.innerHTML += "-";
      } else {
        word.innerHTML += "   ";
      }
    });
    // render wins
    wins.innerHTML = this.wins;
    // render remaining
    remaining.innerHTML = this.remaining;
    // guessed
    guessed.innerHTML = this.guessed;
  },
  // fn(update)
  update: function(key) {
    // updating the word
    var str = "";
    char.forEach(function(c) {
      if (Game.guessed.indexOf(c) !== -1) {
        str += c;
      } else if (c !== key && c !== " ") {
        str += "-";
      } else if (c == key && c !== " ") {
        str += c;
      } else if (c == " ") {
        str += "   ";
      }
    });
    word.innerHTML = str;
  },
  // fn(counter) will handle updating player status
  counter: function() {
    // check if win
    if (word.textContent.indexOf("-") == -1) {
      this.wins++;
      this.firstRender();
    }
    // check if passed remaining attempts

    wins.innerHTML = this.wins;
    remaining.innerHTML = this.remaining;
    guessed.innerHTML = this.guessed;
  },
  // fn(play) will handle assets
  play: function() {}
};

// calls
// first render
Game.firstRender();

//update
document.addEventListener("keydown", function(e) {
  // getting pressed key
  var key = e.key;
  // if statments

  // check if key is in the random word
  if (
    char.indexOf(key) != -1 &&
    key !== " " &&
    Game.guessed.indexOf(key) == -1
  ) {
    Game.guessed.push(key);
    Game.update(key);
    Game.counter();
  } else if (char.indexOf(key) == -1 && Game.guessed.indexOf(key) == -1) {
    Game.guessed.push(key);
    Game.remaining -= 1;
    Game.counter();
  }
});
