var tomato = (function() {

    var breakLength = 1; // minutes
    var sessionLength = 1; // minutes
    var timer = 60; // seconds
    var intervalID;
    var sessionState = true; // true = session, false = break
    var stateText = "Session"; 

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
        breakLength -= 1;
        _render();
    }

    function incrementSession() {
        sessionLength += 1;
        _render();
    }

    function decrementSession() {
        sessionLength -= 1;
        _render();
    }

    function startTimer() {
        intervalID = window.setInterval(decrementTimer, 1000);
    }

    function decrementTimer() {
        timer -= 1;
        _render();
        if (timer === 0) {
            stopTimer();
            sessionState ? startBreak() : finishBreak();
        }
    }

    function stopTimer() {
        window.clearInterval(intervalID);
    }

    function startBreak() {
        sessionState = false;
        stateText = "Break";
        timer = breakLength * 60;
        _render()
    }

    function finishBreak() {
        sessionState = true;
        stateText = "Session";
        timer = sessionLength * 60;
        _render()
    }

})();