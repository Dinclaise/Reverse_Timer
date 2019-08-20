// // import { start } from "repl";

// let target_time =  new Date().getTime() + (1000*3600*86400);
// let hours, minutes, seconds, milliseconds;

// let countdown = document.getElementById('tiles');
// // let startBtn = document.getElementById('start');

// // startBtn.addEventListener('click', getCountdown);

// getCountdown();

// setInterval(() => {
//     getCountdown();
// }, 1000);

// function getCountdown() {
//     let current_time = new Date().getTime();
//     let seconds_left = (target_time - current_time) / 1000;

//     hours = addZero(parseInt(seconds_left / 3600));
//     seconds_left = seconds_left % 3600;

//     minutes = addZero(parseInt(seconds_left / 60));
//     seconds = addZero(parseInt(seconds_left % 60));

//     countdown.textContent = hours + ": " + minutes + ": " + seconds; 

// }

// function addZero(n){
//     return n < 10 ? '0' : n;
// }
// console.log(countdown);
let id = 1;
const min = document.getElementById('minutesID');
const sec = document.getElementById('secondsID');

const startBtn = document.getElementById('start');
// const deleteBtn = document.getElementById('delete');

const inputs = document.querySelectorAll('input');

inputs.forEach(elem => {
    startBtn.disabled = true;
    elem.addEventListener('keyup', () => {
        Number(elem.value > 0) ? startBtn.disabled = false : startBtn.disabled = true ;
    });
});


function UnblockButton() {
    if (min.value || sec.value === Number)
        startBtn.disabled = false;
}

const makeTimer = secondsAcc => {
    let clockHour, clockMin, clockSec;
 // start shell timer
    defineClock();

    const timer = document.createElement('div');
    timer.className = 'timer-frame';
    timer.id = id;

    const clock = document.createElement('p');
    clock.textContent = clockHour + ': ' + clockMin + ': ' + clockSec;
    timer.appendChild(clock);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    timer.appendChild(deleteBtn);

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop';
    timer.appendChild(stopBtn);

    console.log(timer);

    document.body.insertBefore(timer, document.body.firstElementChild);
  // end shell timer 


    setInterval(() => {
        if (secondsAcc === 0) return clearInterval();
        secondsAcc--;

        defineClock();
        clock.textContent = clockHour + ': ' + clockMin + ': ' + clockSec;
    }, 1000);

  // start calculates formulas  
    function defineClock() {
        clockHour = addZero(parseInt(secondsAcc / 3600));
        clockMin = addZero(parseInt((secondsAcc - (clockHour * 3600)) / 60));
        clockSec = addZero(secondsAcc % 60);
    }
 // end calculates formulas
 
    function addZero(n) {
        return n < 10 ? '0' + n : n;
    }

    if (min.value && sec.value === '') startBtn.disabled = true;
    id++;

};

startBtn.addEventListener('click', () => {
    
    const secondsAcc = Number(min.value) * 60 + Number(sec.value);

    makeTimer(secondsAcc);

    inputs.forEach((elem) => {
        elem.value = '';
    });
    startBtn.disabled = true;
});


