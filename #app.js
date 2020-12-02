//  Тоглоом дууссан эсэхийг хадгалах төлөвийн хувьсагч 
var isNewGame;

//  Тоглогчийн ээлжийг хадгалах хувьсагч , нэгдүгээр тоглогчийг 0 ,хоёрдугаар тоглогчийг 1 гэж тэмдэглэе. 
// Тоглоомыг бүх газарт ашиглагдах глобаль хувьсагчдыг энд  хадгалъя
var activePlayer;

// 2 Тоглогчийн цуглуулсан оноонууд 
var scores;

// Тоглогийн ээлжиндээ цуглуулж байгаа оноог хадгалах
var roundScore;

// Шооны зургийг үзүүлэх элемтентийн DOM оос хайж олоод энд хадгалья
var diceDom = document.querySelector(".dice");

// тоглоомын эхлүүлнэ 
initGame();

//  тоглоомыг эхнээс нь эхлүүлэхэд бэлтгэнэ 
function initGame() {
  //  Тоглоом эхэллээ гэдэг төлөвт оруулна 
  isNewGame = true;

  // Тоглогчийн ээлжийг хадгалах хувьсагч ,нэгдүгээр тоглогчийг 0 , хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
  activePlayer = 0;

  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч 
  roundScore = 0;

  // програм эхлүүлхэд бэлдэх 
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // / Тоглогчдын нэрийг буцааж гаргах  
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  diceDom.style.display = "none";
}

// Шоог Шидэх евэнт листенэр
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isNewGame) {
    // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй 1-6 энэ хувсагчид санамсаргүйгээр үүсгэж өгнө 
    var diceNumber = Math.floor(Math.random() * 6) + 1;

    // Шооны зургыг веб  дээр гаргаж ирнэ . 
    diceDom.style.display = "block";
 //  санамсаргүй буусан тоонд харгалзах шооны зургийг вэб  дээр гаргаж  ирнэ 

 diceDom.src = "dice-" + diceNumber + ".png";

    // Буусан тоо нь 1 ээс ялгаатай бол идэвхтэй тоглогийн ээлжийн оноог нэмэгдүүлнэ
    if (diceNumber !== 1) {
      // 1- ээс ялгаатай тоо буулаа . Буусан тоог тоглогчид нэмж өгнө  
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
      alert( activePlayer);
    } else {
      // 1 нэг буусан тохиолдолд тоглогчийн ээлжийг солино 
       // Хэрэв идэвхтэй 
             switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна .New Game Товчийг шинээр эхэлнэ үү");
  }
});
// HOLD  Товчны евэнт листенер 
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isNewGame) {
    //  Уг тоглогчийн цуглуулсан ээлжний оноог глобаль оноон дээр нь  нэмж өгнө 
    scores[activePlayer] = scores[activePlayer] + roundScore;

    // Дэлгэцэн дээр оноог нь өөрчилнө
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Уг тоглогч хожсон эсэхийг ( оноо  нь 100 -с их эсэх ) шалгах 
    if (scores[activePlayer] >= 10) {
      // Тоглоомыг дууссан төлөвт оруулна 
      isNewGame = false;

      //  Ялагч гэсэн текстийн нэрнийх нь оронд гаргана 
      document.getElementById("name-" + activePlayer).textContent = "WINNER!!!";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      //  Тоглогчийн ээлжийг солих 
      switchToNextPlayer();
    }
  } else {
    alert("Тоглоом дууссан байна .New Game Товчийг шинээр эхэлнэ үү");
  }
});

// Энэ функц нь тоглох ээлжийг дараачийн тоглогч руу шилжүүлдэг 
function switchToNextPlayer() {
  // Энэ тоглогчийн ээлжиндээ  цуглуулсан оноог 0 болгоно 
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = 0;

  /// Хэрэв идэвхтэй тоглогч нь 0 байвал идэвхтэй тоглогчийн  1 болго.
  // Үгүй бол идэвхтэй тоглогчийг 0 болго 
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Улаан цэгийг шилжүүлэх 
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //  Шоог  түр алга  болгоно 
  diceDom.style.display = "none";
}

// New Game  Тоглоом эхлүүлэх товчний эвент листенер 
document.querySelector(".btn-new").addEventListener("click", initGame);