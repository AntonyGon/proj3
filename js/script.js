const gameInput = document.querySelector(".game-head-input");
const gameCards = document.querySelector(".game-body-cards");
const buttonStart = document.querySelector(".game-head-button");
const result = document.querySelector(".game-body-result");
const timerGame = document.querySelector(".game-body-timer");
const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};
let inputvalue;
let counterCouples;
let arrPushed = [];
const checkFunc = (el) => {
  arrPushed.push(el);
  el.firstChild.classList.add("active");
  if (arrPushed.length == 2) {
    if (
      arrPushed[0].firstChild.textContent == arrPushed[1].firstChild.textContent &&
      arrPushed[0].id != arrPushed[1].id
    ) {
      arrPushed[0].style.backgroundColor = arrPushed[1].style.backgroundColor =
        "green";
      arrPushed[0].removeAttribute("onclick");
      arrPushed[1].removeAttribute("onclick");
      arrPushed = [];
      counterCouples += 2;
      resultFunc(counterCouples);
    } else {
      arrPushed[0].style.backgroundColor = arrPushed[1].style.backgroundColor =
        "red";
      let arrPushedClone = arrPushed.slice(0);
      setTimeout(() => {
        arrPushedClone[0].style.backgroundColor =
          arrPushedClone[1].style.backgroundColor = "#6a6a6a";
          arrPushedClone[0].firstChild.classList.remove("active");
          arrPushedClone[1].firstChild.classList.remove("active");
      }, 300);
      arrPushed = [];
    }
  }
};
const resultFunc = (el) => {
  if (inputvalue ** 2 == el) {
    result.style.backgroundColor = "green";
    buttonStart.textContent = "Start Again";
    timerCheck = false;
    timerGame.textContent = `WOW`;
    result.textContent = "YOU WIN";
    buttonStart.classList.remove("active");
  }
};
const startFunc = () => {
  counterCouples = 0;
  buttonStart.classList.add("active");
  timerCheck = true;
  timerGame.textContent = "Timer: 60 sec";
  result.textContent = "Result:";
  timerFunc(59);
  result.style.backgroundColor = "#c5cbcf";
  gameCards.innerHTML = "";
  inputvalue =
    gameInput.value <= 10 && gameInput.value >= 2 && gameInput.value % 2 == 0
      ? gameInput.value
      : 4;
  let arrMixed = [];
  for (let i = 0; i < inputvalue * inputvalue; i = i + 2) {
    arrMixed[i] = arrMixed[i + 1] = i;
  }
  arrMixed = shuffle(arrMixed);
  let counterCards = 0;
  for (let i = 1; i <= inputvalue; i++) {
    let cardColumn = document.createElement("div");
    cardColumn.classList.add("cards-column");
    gameCards.append(cardColumn);
    for (let j = 1; j <= inputvalue; j++) {
      let card = document.createElement("div");
      card.classList.add("cards-column-element");
      card.setAttribute("id", `i${counterCards}`);
      card.setAttribute("onclick", `checkFunc(i${counterCards})`);
      cardColumn.append(card);
      let p = document.createElement("div");
      p.classList.add("cards-column-element-p");
      card.append(p);
      p.textContent = arrMixed[counterCards];
      counterCards++;
    }
  }
};
let timerCheck = true;
const timerFunc = (sec) => {
  setTimeout(() => {
    timerGame.textContent = `Timer: ${sec} sec`;
    if (sec != 0) {
      if (timerCheck) timerFunc(--sec);
      else {
        timerGame.textContent = `WOW`;
      }
    } else {
      timerGame.textContent = `Time is up!`;
      gameCards.innerHTML = "";
      result.style.backgroundColor = "red";
      result.textContent = "YOU LOST";
      buttonStart.classList.remove("active");
      arrPushed = [];
    }
  }, 1000);
};
