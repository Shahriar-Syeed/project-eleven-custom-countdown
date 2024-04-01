const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('CountdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl =document.getElementById('countdown');
const countdownElTitle =document.getElementById('countdown-title');
const countdownBtn =document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo =  document.getElementById('complete-info');
const completeBtn =  document.getElementById('complete-button');

let countdownTitle ="";
let countdownDate="";

// let countdownValue = Date;
let countdownValue = new Date();

let countdownActive;

let saveCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//  Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
// console.log(today);
dateEl.setAttribute('min', today);

// Function
// populate Countdown / Complete UI
function updateDOM(){
  countdownActive = setInterval (()=>{
    
    const now = new Date().getTime();
    console.log('now : ', now);
    const distance = countdownValue - now;
  
    console.log('distance : ', distance);
  
    const days =Math.floor(distance / day) ;
    const hours = Math.floor((distance % day) / hour) ;
    const minutes = Math.floor((distance % hour) / minute) ;
    const seconds = Math.floor((distance % minute) / second) ;
    console.log(days, hours, minutes, seconds);

    // hide Input
    inputContainer.hidden = true;

    // If the countdown has ended show complete
    if(distance < 0){
      // hide countdown element
      countdownEl.hidden = true ;
      // stop countdown
      clearInterval(countdownActive);
      // show complete container
      completeEl.hidden = false;
      completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    } else {
      // else, show the countdown in progress
      // populate Countdown
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      // hide complete element
      completeEl.hidden = true;

      // Show Countdown
      countdownEl.hidden = false;
    }
  
  }, second);
  
};
// Take Values from Form Input
function updateCountdown(e){
  e.preventDefault();
  console.log(e);
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log(countdownTitle, countdownDate);
  
  saveCountdown = {
    title: countdownTitle,
    date: countdownDate,
  }
  console.log("saveCountdown =", saveCountdown);
  localStorage.setItem('countdown', JSON.stringify(saveCountdown));
  // Check For valid date
  if (countdownDate === ''){
    alert('Plese select a date for the countdown');

  }else{

    // Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown value : ', countdownValue);
    updateDOM();
  }
};

// Reset All Values
function reset() {
  // Hide Countdown, Hide Complete, show Input
  countdownEl.hidden=true;
  completeEl.hidden=true;
  inputContainer.hidden = false;
  // Stop the Countdown
  clearTimeout(countdownActive);
  // reset Values
  countdownTitle ='';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  //  Get countdown from localStorage if available
  if(localStorage.getItem('countdown')){
    inputContainer.hidden= true;
    saveCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitle = saveCountdown.title;
    countdownDate = saveCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();

  }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// on load check localStorage
restorePreviousCountdown();