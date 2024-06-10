const start = document.getElementById('start');
const cards = document.querySelectorAll('.card');
const timeController = document.getElementById('time-list');
const modal = document.getElementById('modal');
const board = document.getElementById('board');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');

let selectedTime = null
let time = null
let idSetInterval = null
let score = 0

function handlerStartBtn (e) {
    e.preventDefault()
    cards[0].classList.add('up')

    // const newDiv = document.createElement('div');
    // newDiv.innerHTML = 'Hello World';
    // start.prepend(newDiv);

    // const myEl = document.createElement('div');
    // const currentTime = new Date().toISOString()
    // myEl.textContent = currentTime
    // cards[0].insertAdjacentElement('beforeend', myEl);

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

function handlerCircleClick(e) {
    console.log('click');
    if (e.target.classList.contains('circle')) {
        score = score + 1 // score++
        e.target.remove()
        createRandomCircle()
    }
}

board.addEventListener('click', handlerCircleClick)

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomIntInclusive(15, 50)
    const {width, height} = board.getBoundingClientRect()
    circle.style.width = circle.style.height = size + 'px'
    circle.style.backgroundColor = getRandomColor()
    const x = getRandomIntInclusive(0, width - size)
    const y = getRandomIntInclusive(0, height - size)
    circle.style.top = y +'px'
    circle.style.left = x +'px'
    board.append(circle)
}

function getRandomColor() {
  return `rgb(${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)},${getRandomIntInclusive(0, 255)})`
}

function startGame() {
    setTime(time)
    idSetInterval = setInterval(decTime, 1000)
    console.log(idSetInterval);
    createRandomCircle()
}

function finishGame() {
    console.log('GameOver');
    scoreEl.innerHTML = score
    modal.classList.add('open')
    clearInterval(idSetInterval)
}


function decTime(e) {
    if (time === 0) {
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

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }

  modal.addEventListener('click', handlerModalClick)

function resetGame() {
    this.classList.remove('open')
    time = selectedTime
    score = 0
    board.innerHTML = ''
}

  function handlerModalClick(e) {
    if (e.target.getAttribute('id') === 'restart') {
        console.log('restart');
        resetGame.call(this)
        startGame()
    }
    if (e.target.getAttribute('id') === 'cancel') {
        resetGame.call(this)
        cards.forEach((card) => {
            card.classList.remove('up')
        })
    }
  }