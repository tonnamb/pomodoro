var tomato = (function() {

    var breakLength = 5; // minutes
    var sessionLength = 25; // minutes
    var timer = 1500; // seconds

    // cache DOM
    var $break = $('#break');
    var $breakPlus = $('#break-plus');
    var $breakMinus = $('#break-minus');
    var $session = $('#session');
    var $sessionPlus = $('#session-plus');
    var $sessionMinus = $('#session-minus');
    var $timer = $('#timer');

    // bind events
    $breakPlus.on('click', incrementBreak);
    $breakMinus.on('click', decrementBreak);
    $sessionPlus.on('click', incrementSession);
    $sessionMinus.on('click', decrementSession);

    _render();

    function _render() {
        $break.html(breakLength);
        $session.html(sessionLength);

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

})();