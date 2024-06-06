const start = document.getElementById('start');
const cards = document.querySelectorAll('.card');
const timeController = document.getElementById('time-list');
const modal = document.getElementById('modal');
const board = document.getElementById('board');
const timeEl = document.getElementById('time');
const score = document.getElementById('score');

let selectedTime = null
let time = null
let idSetInterval = null

function handlerStartBtn (e) {
    e.preventDefault()
    cards[0].classList.add('up')
}
start.addEventListener('click', handlerStartBtn)

function handlerTimeBtn (e) {
    if (e.target.classList.contains('time-list__item')) {
        cards[1].classList.add('up')
        console.log('clickTime');
        selectedTime = parseInt(e.target.dataset.time)
        time = selectedTime
        startGame()
        // console.log(parseInt(e.target.dataset.time));
    }
}
timeController.addEventListener('click', handlerTimeBtn)

function startGame() {
    setTime(time)
    idSetInterval = setInterval(decTime, 1000)
    console.log(idSetInterval);
}

function finishGame() {
    console.log('GameOver');
    clearInterval(idSetInterval)
}


function decTime(e) {
    if (time === 0) {
        console.log('game over');
        finishGame()
    } else {
        let current = --time // time - 1
        // current = current < 10 ? `0${current}` : current
        if(current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
    // setInterval(() => {
    //     setTime(--time)
    // }, 1000)
}

function setTime(timeGame) {
    timeEl.innerHTML = `00:${timeGame}`
}

