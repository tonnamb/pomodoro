var tomato = (function() {

    var breakLength = 1; // minutes
    var sessionLength = 1; // minutes
    var timer = sessionLength * 60; // seconds
    var intervalID;
    var sessionState = true; // true = session, false = break
    var stateText = "Session";
    var runningState = false; // true = timer running 

    // cache DOM
    var $break = $('#break');
    var $breakPlus = $('#break-plus');
    var $breakMinus = $('#break-minus');
    var $session = $('#session');
    var $sessionPlus = $('#session-plus');
    var $sessionMinus = $('#session-minus');
    var $timer = $('#timer');
    var $start = $('#start');
    var $state = $('#state');

    // bind events
    $breakPlus.on('click', incrementBreak);
    $breakMinus.on('click', decrementBreak);
    $sessionPlus.on('click', incrementSession);
    $sessionMinus.on('click', decrementSession);
    $start.on('click', startTimer);

    _render();

    function _render() {
        $break.html(breakLength);
        $session.html(sessionLength);
        $state.html(stateText);

        var minutes = Math.floor(timer / 60);
        var seconds = timer % 60;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $timer.html(minutes + ":" + seconds);
    }

    function incrementBreak() {
        breakLength += 1;
        _render();
    }

    function decrementBreak() {
        if (breakLength === 1) {
            throw 'Error: Minimum break length is 1 minute.';
        } else {
            breakLength -= 1;
            _render();
        }
    }

    function incrementSession() {
        sessionLength += 1;
        _render();
    }

    function decrementSession() {
        if (sessionLength === 1) {
            throw 'Error: Minimum session length is 1 minute.';
        } else {
            sessionLength -= 1;
            _render();
        }
    }

    function startTimer() {
        if (runningState) {
            throw 'Error: Timer is already running!';
        } else {
            runningState = true;
            intervalID = window.setInterval(_decrementTimer, 1000);
        }
    }

    function _decrementTimer() {
        timer -= 1;
        _render();
        if (timer === 0) {
            stopTimer();
            sessionState ? _setupBreak() : _finishBreak();
        }
    }

    function stopTimer() {
        window.clearInterval(intervalID);
        runningState = false;
    }

    function _setupBreak() {
        sessionState = false;
        stateText = "Break";
        timer = breakLength * 60;
        _render()
        alert('Work session completed, time for a break!')
    }

    function _finishBreak() {
        sessionState = true;
        stateText = "Session";
        timer = sessionLength * 60;
        _render()
        alert('Break-time is over, get back to work!')
    }

})();