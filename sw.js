var T = (function () { 
    'use strict';

    var timeElapsed  = 0, 
        timeStarted = 0,
        splitCount = 0,
        update;

    return {
        timeStarted: timeStarted,
        timeElapsed: timeElapsed,
        splitCount: splitCount,
        update: update
    };
}());


// Start timer or continue from paused time
function startTimer() {
	T.timeStarted = new Date().getTime() - T.timeElapsed; 
	update = setInterval(postTime, 10);
	document.getElementById("start").disabled = true;
	document.getElementById("stop").disabled = false;
	document.getElementById("split").disabled = false;
	return update;
}


//Freeze the timer at time when button pressed
function stopTimer(){
	clearInterval(update);
	T.timeElapsed = new Date().getTime() - T.timeStarted;
	document.getElementById("start").disabled = false;
	document.getElementById("stop").disabled = true;
	document.getElementById("split").disabled = true;
}


//Record split without stopping timer
function split(){
	T.splitCount++;
	document.getElementById("splits").innerHTML += "</br>Split " + T.splitCount + ": " + render(T.timeElapsed);

}


//Reset the timer to zero and clear splits
function reset(){
	clearInterval(update);
	T.timeStarted = 0;
	T.timeElapsed = 0;

	document.getElementById("timer").innerHTML = "00:00:00";
	
	document.getElementById("start").disabled = false;
	document.getElementById("stop").disabled = true;
	document.getElementById("split").disabled = true;	

	document.getElementById("splits").innerHTML = "Splits"
}

//helper function
function addLeadingZero (n) {
    if(n <= 9) {
    	return '0'+ n; 
    	} else {
        return '' + n; 
    }
} 

//Post time in mm/ss/cc
function render(){
	T.timeElapsed = new Date().getTime() - T.timeStarted;

	var toRender = T.timeElapsed;

    var mins = Math.floor(toRender/60000);
    toRender -= mins * 60000;
    var secs = Math.floor(toRender/1000);
    toRender -= secs * 1000;
    var cent = Math.round(toRender/10);

	var renderedTime = addLeadingZero(mins) + ":" + addLeadingZero(secs) + ":" + addLeadingZero(cent); 
	return renderedTime;
}

function postTime(time) {
	document.getElementById("timer").innerHTML = render(time);

}