
// console.log(countdown);
let id = 1;
const min = document.getElementById('minutesID');
const sec = document.getElementById('secondsID');
const text = document.getElementById('requestID');

const progress = document.querySelector('.progress-bar');

const startBtn = document.getElementById('start');
// const deleteBtn = document.getElementById('delete');

const inputs = document.querySelectorAll('input');

inputs.forEach(elem => {
    startBtn.disabled = true;
    elem.addEventListener('keyup', () => {
        if (!isNaN(min.value * 1) && !isNaN(sec.value * 1)) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
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

    const description = document.createElement('input');
    description.className = 'timer-name';
    description.value = text.value;
    timer.insertBefore(description, timer.firstElementChild);


 // buttons
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    timer.appendChild(deleteBtn);

    const stopBtn = document.createElement('button');
    stopBtn.textContent = 'Stop';
    timer.appendChild(stopBtn);

    console.log(timer);

    document.body.insertBefore(timer, document.body.firstElementChild);

    // dbclick rename

    // description.addEventListener('dblclick' , () => {
    //     description.value = description.value;
        // const div = document.createElement('div');
        // div.className = 'rename-panel';
        // const inputChange = document.createElement('input');
        // const btn = document.createElement('button');

        
        // div.appendChild(inputChange);
        // div.appendChild(btn);
        // btn.textContent = 'Change';

        // document.body.appendChild(div);

        // btn.addEventListener('click', () => {
        //     description.textContent = inputChange.value;
        //     div.remove();
        // });
    // });

    // удалить таймер 
    deleteBtn.addEventListener('click', () =>{
        timer.remove();
    });

    stopBtn.addEventListener('click', () => {
        stopBtn.textContent = stopBtn.textContent === 'Start' ? 'Stop' : 'Start';
        if(stopBtn.textContent === 'Start') {
            clearInterval(countdown);
        } else {
            countdown = resumeTimer();
        }
    });
  // end shell timer 


    let countdown = resumeTimer();
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

    id++;

 // resume timer function
    function resumeTimer() {
        progressBar(secondsAcc);
        return setInterval(() => {
            if (secondsAcc === 0) return clearInterval();
            secondsAcc--;
    
            defineClock();
            
            clock.textContent = clockHour + ': ' + clockMin + ': ' + clockSec;
        }, 1000);
    
    }
 // end resume timer function


 function progressBar(secondsAcc) {
    let percent = 0;
    let secVal = secondsAcc / 100;
    let a = setInterval(() => {
        percent += secVal;
        progress.style.width = percent + '%';
       if (Math.round(Number(progress.style.width.replace('%', '')))=== 100) {
           clearInterval(a);
           progress.style.width = '100%';
       }
        // progress.textContent = progress.style.width;
    }, secondsAcc);
 }
 
};

startBtn.addEventListener('click', () => {
    
    const secondsAcc = Number(min.value) * 60 + Number(sec.value);

    makeTimer(secondsAcc);

    inputs.forEach((elem) => {
        elem.value = '';
    });
    startBtn.disabled = true;
});


