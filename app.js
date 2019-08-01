const secDisplay = document.querySelector('.clockSeconds');
const minDisplay = document.querySelector('.clockMinutes');
const workUp = document.querySelector('.workUp');
const workDown = document.querySelector('.workDown');
const workDisplay = document.querySelector('.workValue')
const breakUp = document.querySelector('.breakUp');
const breakDown = document.querySelector('.breakDown');
const breakDisplay = document.querySelector('.breakValue')
const timerTitle = document.querySelector('.timer-title');
const playOrResume = document.querySelector('.start');
const resetBTN = document.querySelector('.reset');

breakUp.addEventListener('click', () => setBreak('add'));
breakDown.addEventListener('click', () => setBreak('subtract'));
workUp.addEventListener('click', () => setWork('add'));
workDown.addEventListener('click', () => setWork('subtract'));
playOrResume.addEventListener('click', onOffBtn);
resetBTN.addEventListener('click', resetTimer);

let alarm = new Audio('Sounds/Alarm.mp3')
let totalTime = 1500;
let workTime = 25;
let breakTime = 5;
let timerOn = false;
let working = true;

function setBreak(string) {
    if (timerOn) return; 
    
    if (string === 'add') {
        breakTime += 1;
    } else if (string === 'subtract') {
        breakTime -= 1;
    }    

    if (breakTime < 1) breakTime = 1;
    
    breakDisplay.innerHTML = breakTime;    
}

function setWork(string) {
    if (timerOn) return;

    if (string === 'add') {
        workTime += 1;
    } else if (string === 'subtract') {
        workTime -= 1;
    }   

    if (workTime < 1) workTime = 1;

    workDisplay.innerHTML = workTime;
    totalTime = (workTime * 60);
    setTime(totalTime);
}

function setTime(num) {
    setWhichTimer();    
    minDisplay.innerHTML = Math.floor(num / 60);
    secDisplay.innerHTML = getDisplay(num);    
}


function getDisplay(num) {
    let secs = (num % 60)
    if ( secs < 10) {
        return '0' + secs;
    } else {
        return secs;
    }
}

function onOffBtn() {
    setTitle();
    if(timerOn) {
        timerOn = false;
        playOrResume.setAttribute('value', 'Play')
    } else {
        timerOn = true;
        setTimeout(counter, 1000);
        playOrResume.setAttribute('value', 'Pause')
    }   
}

function counter() {
    if(!timerOn) return;
    setTitle();
    -- totalTime;
    setTimeout(counter, 1000);
    setTime(totalTime);
}

function setWhichTimer() {
    if ((working && totalTime > 0) || (!working && totalTime > 0)) {
        return;
    } else if (working && totalTime == 0) {        
        alarm.play();
        totalTime = breakTime * 60;
        working = false;
        setBackground()
    } else {
        audio.play();
        resetTimer();
    }
}

function resetTimer() {
    timerOn = false;
    working = true;
    totalTime = workTime * 60;
    playOrResume.setAttribute('value', 'Play');
    timerTitle.innerHTML = 'Session Timer';
    setBackground();
    setTime(totalTime);
}

function setTitle() {
    if(working) {
        timerTitle.innerHTML = 'Work Timer';
    } else {
        timerTitle.innerHTML = 'Break Timer';
    }
}

function setBackground() {
    if (working) {
        document.body.style.backgroundImage = 'url(Pictures/table_background.jpg)';
    } else {
        document.body.style.backgroundImage = 'url(Pictures/beach_background.jpeg)';
    }
}

function playAlarm() {
    alarm.p
}
