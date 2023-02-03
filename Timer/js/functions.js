//Variables to get elements from index.html
const elMinutes = document.getElementById('minutes');
const elSeconds = document.getElementById('seconds');
const elMSeconds = document.getElementById('m_seconds');
//Variables to get elements from timer.html
const elTHours = document.getElementById('t_hours');
const elTMinutes = document.getElementById('t_minutes');
const elTSeconds = document.getElementById('t_seconds');
const elTMHours = document.getElementById('tm_hours');
const elTMMinutes = document.getElementById('tm_minutes');
const elTMSeconds = document.getElementById('tm_seconds');
const elTMBox = document.getElementById('id_timer_box');
const elAlarm = document.getElementById('sound');
//Variables to get elements global
const elBtnStart = document.getElementById('btn_start');
const elBtnReset = document.getElementById('btn_reset');

//Set inicial values from variables
let minutes = 0;
let seconds = 0;
let m_seconds = 0;

//Variables to control the setInterval function 
let intervalId;
let isRuning = false;

//Variable to get title of the page
var my_page;

//Set inicial reset buttron disabled
elBtnReset.disabled = true;

//Function to validate when leaving the timer panel visible
function validateDisplay() {
	if(elTMHours.innerHTML > 0 || elTMMinutes.innerHTML > 0 || elTMSeconds.innerHTML > 0){
		elTMBox.style.display = 'flex';
	} else {
		elTMBox.style.display = 'none';
	};
}

window.onload = function() {
	//When loading the page, set the title of the page in the variable
	my_page = document.title;
	//If it is the Timer page, execute the input event whenever you update the input fields for the timer
	if(my_page == 'Timer') {
		timerZero();
		//Updates the counter with the value entered in the input and calls the validateDisplay and validateTimer functions
		let input_hours = elTHours.addEventListener("input", function(event) {
			elTMHours.innerHTML = event.target.value < 10 ? `0${event.target.value}` : event.target.value;
			if(elTMHours.innerHTML == 0) {
				elTMHours.innerHTML = `0${elTMHours.innerHTML}`;
			};	
			validateDisplay();		
			validateTimer();
		});
		let input_minutes = elTMinutes.addEventListener("input", function(event) {
			elTMMinutes.innerHTML = event.target.value < 10 ? `0${event.target.value}` : event.target.value;
			if(elTMMinutes.innerHTML == 0) {
				elTMMinutes.innerHTML = `0${elTMMinutes.innerHTML}`;
			};
			validateDisplay();	
			validateTimer();
		});

		let input_seconds = elTSeconds.addEventListener("input", function(event) {
			elTMSeconds.innerHTML = event.target.value < 10 ? `0${event.target.value}` : event.target.value;
			if(elTMSeconds.innerHTML == 0) {
				elTMSeconds.innerHTML = `0${elTMSeconds.innerHTML}`;
			};
			validateDisplay();	
			validateTimer();
		});
	};

};

/* Function for start timers */
//Get the button and execute the click event and calls the function
elBtnStart.addEventListener('click', toggleInterval);
elBtnReset.addEventListener('click', resetInterval);
elBtnReset.addEventListener('mouseover', function(){
	elBtnReset.style.opacity = '1';
});
elBtnReset.addEventListener('mouseout', function(){
	elBtnReset.style.opacity = '0.7';
});
elBtnStart.addEventListener('mouseover', function(){
	elBtnStart.style.opacity = '1';
});
elBtnStart.addEventListener('mouseout', function(){
	elBtnStart.style.opacity = '0.7';
});


//Set value from reset button disable = true
function btnResetDisable() {
	elBtnReset.style.cursor = 'auto';
	elBtnReset.style.opacity = '0.7';
	elBtnReset.style.backgroundColor = '#464646';
	elBtnReset.style.color = '#6e6e6e';
	elBtnReset.disabled = true;
};
//Set value from start button disable = true
function btnStartDisable() {
	elBtnStart.style.cursor = 'auto';
	elBtnStart.style.opacity = '0.7';
	elBtnStart.innerHTML = 'Start';
	elBtnStart.style.backgroundColor = '#464646';
	elBtnStart.style.color = '#6e6e6e';
	elBtnStart.disabled = true;
};
//Set value from reset button disable = false
function btnResetActive() {
	elBtnReset.style.backgroundColor = "#127f00";
	elBtnReset.style.color = '#f0f0f0';
	elBtnReset.style.cursor = 'pointer';
	elBtnReset.disabled = false;	
};
//Set value from start button disable = false
function btnStartActive() {
	elBtnStart.innerHTML = 'Start';
	elBtnStart.style.color = '#f0f0f0';
	elBtnStart.style.cursor = 'pointer';
	elBtnStart.disabled = false;
	elBtnStart.style.backgroundColor = "#005cc5";
};
//Set value from pause button disable = false
function btnPauseActive() {
	elBtnStart.innerHTML = 'Pause';
	elBtnStart.disabled = false;	
	elBtnStart.style.cursor = 'pointer';
	elBtnStart.style.color = '#f0f0f0';
	elBtnStart.style.backgroundColor = "#a70c01";
};

//Reset button function
//Resets the button settings and resets the time
function resetInterval(){
	//Reset all pages
	btnResetDisable();
	//Reset index.html page
	if(my_page == 'Stopwatch'){		
		minutes = 0;
		seconds = 0;
		m_seconds = 0;
		elMinutes.innerHTML = '00';
		elSeconds.innerHTML = '00';
		elMSeconds.innerHTML = '00';
		intervalClear();
	} //Reset index.html page
	else if (my_page == 'Timer') {
		intervalClear();

		btnStartDisable();
		elTMHours.innerHTML = '00';
		elTMMinutes.innerHTML = '00';
		elTMSeconds.innerHTML = '00';
		resetTimer();
		validateDisplay();		
		

	};
};

//If you click the button, it starts the setInterval action with the addSeconds function every 1 second
//Clicking the button again pauses the setInterval action with the clearInterval action
function toggleInterval() {
	//Reset the value of the buttons
	timerZero();

	if(elBtnReset.disabled == true) {
		btnResetActive();
	};
	//Start button control for index.html page
	if(my_page == 'Stopwatch'){
		if(isRuning) {
			intervalClear();
		} else {
			intervalId = setInterval(addSeconds, 10);
			btnPauseActive();
			isRuning = true;
		};
	};
	//Start button control for timer.html page
	if(my_page == 'Timer'){
		if(isRuning) {
			intervalClear();
			elTHours.setAttribute('readonly', true);
			elTMinutes.setAttribute('readonly', true);
			elTSeconds.setAttribute('readonly', true);
		} else {
			intervalId = setInterval(removeSeconds, 1000);
			btnPauseActive();
			elTHours.setAttribute('readonly', true);
			elTMinutes.setAttribute('readonly', true);
			elTSeconds.setAttribute('readonly', true);
			isRuning = true;
		};
	};
};

//Pause button function
//Pause the time and adjust the button to start
function intervalClear() {
	clearInterval(intervalId);
	btnStartActive();
	isRuning = false;
};

//function to disable the buttons and reset the values if it is from the timer.html page
function timerZero(){
	clearInterval(intervalId);
	btnStartDisable();
	btnResetDisable();
	if(my_page == 'Timer'){
		resetTimer();
	};	
};

//Resets the values of the timer.html page
function resetTimer(){
	elTHours.value = '';
	elTMinutes.value = '';
	elTSeconds.value = '';
	elTHours.removeAttribute('readonly');
	elTMinutes.removeAttribute('readonly');
	elTSeconds.removeAttribute('readonly');
};

//Function for adjusting the buttons according to the timer values
function validateTimer() {
	if(elTMHours.innerHTML == 0 && elTMMinutes.innerHTML == 0  && elTMSeconds.innerHTML == 0 ){
		timerZero();
	} else {
		btnStartActive();
	};
}

//Adds 1 to the seconds variable and 1 to the minute variable when seconds = 60
//Inserts the values of the variable in the html. If less than 10, add a 0 in front
//index.html
function addSeconds() {
	m_seconds++;
	if(m_seconds === 100){
		seconds++;
		m_seconds = 0;
		if (seconds === 60) {
			minutes++;
			seconds = 0;
		};
	};
	elMinutes.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
	elSeconds.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
	elMSeconds.innerHTML = m_seconds < 10 ? `0${m_seconds}` : m_seconds;
};

//Function for timer.htlm page
function removeSeconds(){
	//Limits the timer if the user enters a value greater than the time
	elTMSeconds.innerHTML > 59 ? elTMSeconds.innerHTML = 59 : elTMSeconds.innerHTML;
	elTMMinutes.innerHTML > 59 ? elTMMinutes.innerHTML = 59 : elTMMinutes.innerHTML;
	elTMHours.innerHTML > 99 ? elTMHours.innerHTML = 99 : elTMHours.innerHTML;
	//Conditions for the timer to decrease in order of seconds, minutes and hours
	if(elTMSeconds.innerHTML > 0){
		elTMSeconds.innerHTML-- ;
		if(elTMSeconds.innerHTML < 10){
			elTMSeconds.innerHTML = `0${elTMSeconds.innerHTML}`;
		}; 
	} else {
		if(elTMMinutes.innerHTML > 0) {
			elTMSeconds.innerHTML = 59
			elTMMinutes.innerHTML--;
			if(elTMMinutes.innerHTML < 10){
				elTMMinutes.innerHTML = `0${elTMMinutes.innerHTML}`;
			}; 
		} else {
			if(elTMHours.innerHTML > 0){
				elTMMinutes.innerHTML = 59;
				elTMSeconds.innerHTML = 59
				elTMHours.innerHTML--;
				if(elTMHours.innerHTML < 10){
					elTMHours.innerHTML = `0${elTMHours.innerHTML}`;
				}; 
			} else {
				elTMHours.innerHTML = '00';
				elTMMinutes.innerHTML = '00';
				elTMSeconds.innerHTML = '00';				
				;
				if(isRuning) {
					timerZero();
					isRuning = false;
					validateDisplay();
				};
				elAlarm.play();
			};
		};
	}; 
};