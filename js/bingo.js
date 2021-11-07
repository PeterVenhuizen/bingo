// hide bingo animation
$('.last-ball .drawn-balls').hide();
$('.bouncing-balls > .ball:last-of-type()')
.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',
function() {
    $('.bouncing-balls').fadeOut('slow', function() {
        $('.last-ball').css('display', 'grid');
        $('.drawn-balls').css('display', 'grid');
    });
});

// https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
}

// elements
const $lastBall = $('.last-ball');
const $drawnBalls = $('.drawn-balls');
const $bigBallDiv = $('.big-ball-container');

// update switch state
$(document).on('click', '.switch', function(e) {
    if ($(e.target).is('input')) {
        $(this).attr('state', ($(this).attr('state') === 'on') ? 'off' : 'on');
    }
});

// settings & modal
const $settings = $('.settings');
const $modal = $('#modal-wrapper');

// open settings and pause
$settings.click((e) => {
    e.preventDefault();
    $modal.css('visibility', 'visible');

    // pause if running
    clearTimeout(bingoTimer);
    bingoTimer = undefined;

});

// close modal and start again
$('.fa-times').click(() => {
    $modal.css('visibility', 'hidden');
    start();
});

// update interval
const $intervalRange = $('input[name="interval-size"]');
$intervalRange.change(() => {
    $('.current-interval').text($intervalRange.val());
});

// load speech synthesis
const $voiceSelect = $('#voices');
const synth = window.speechSynthesis;
let voices = [];

const populateVoices = () => {
    voices = synth.getVoices();
    for (let [i, v] of voices.entries()) {
        const $option = $('<option/>', { 'value': i, text: v.name });
        if (v.name === "Google Nederlands") {
            $option.attr('selected', 'selected');
        }
        $voiceSelect.append($option);
    }
}
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

// buttons
const $btnStart = $('.start');
const $btnNext = $('.next');
const $btnPlay = $('.play');
const $btnPause = $('.pause');

// initialize
let autoplay, interval, readOutLoud, voiceNumber;
let numbers = [...Array(75).keys()];
let letters = ['b', 'i', 'n', 'g', 'o'];

let $bigBall = $('<div/>', { 'class': 'ball big' })
    .append($('<div/>', { 'class': 'inner-circle' })
        .append([
            $('<div/>', { 'class': 'letter' }),
            $('<div/>', { 'class': 'number' })
        ])
    );

// fill with "invisible" balls
numbers.forEach(() => $drawnBalls.append($('<div/>', { 'class': 'ball small invisible' })));

// start the game
shuffleArray(numbers);

const getSettings = () => {
    autoplay = $('#autoplay').attr('state') === 'on';
    interval = $('.current-interval').text() * 1000;
    readOutLoud = $('#readOutLoud').attr('state') === 'on';
    voiceNumber = parseInt($('#voices').val());
}

let bingoTimer;
const bingo = () => {

    // get settings
    getSettings();
    bingoTimer = setTimeout(next, interval);
}

// play function
const start = () => {

    // reset stuff
    $btnStart.hide();
    $('.control').hide();

    // get settings
    getSettings();    

    // start loop
    if (autoplay) {
        play();
    }

    // draw the first ball and display next button
    else {
        next();
        $btnNext.show();
    }

}

const play = () => {
    $btnPlay.hide();
    $btnPause.show();
    next();
    setTimeout(() => { bingo }, interval);
}

const pause = () => {
    $btnPause.hide();
    $btnPlay.show();
    clearTimeout(bingoTimer);
}

// draw next ball
const next = () => {

    if (numbers.length) {

        let n = numbers.pop();
        let lIdx = Math.floor(n / 15);

        $bigBall.fadeOut('0', function() {

            // speak, if wanted
            if (readOutLoud) {
                let sayNumber = new SpeechSynthesisUtterance(n + 1);
                sayNumber.voice = voices[voiceNumber];
                window.speechSynthesis.speak(sayNumber);
            }

            // show big ball
            $bigBall
                .removeClass(letters)
                .addClass(letters[lIdx])
                .find('.letter').text(letters[lIdx].toUpperCase());
            $bigBall.find('.number').text(n + 1);
            $bigBall.fadeIn('250').show();
            
            $bigBallDiv.empty().append($bigBall);

            // add the small balls
            // get nth ball
            let nthBall = $(`.ball.small:nth-of-type(${n+1})`);
            nthBall.removeClass('invisible').addClass(letters[lIdx]);

            // "fill" the ball
            nthBall
                .append($('<div/>', { 'class': 'inner-circle' })
                    .append($('<div/>', { 'class': 'number', text: n + 1 }))
                );
            nthBall.hide().fadeIn('250');

        });

        // and again!
        if (autoplay) bingo();

        // disable button if there are no more numbers left
        if (numbers.length === 0) {
            $btnNext.attr('disabled', true);
        }
    
    } else {
        clearTimeout(bingoTimer);
        $('.control').hide();
    }

}

// bind function
$btnStart.click(() => start());
$btnPause.click(() => pause());
$btnPlay.click(() => play());
$btnNext.click(() => next());

// press spacebar to start/pause/play/next
const pressToPlay = (e) => {
    if (e.isComposing || e.keyCode == 32) {
        e.preventDefault();
        getSettings();

        if (numbers.length) {

            // start the game
            if ($btnStart.css('display') !== 'none') {
                start();
            }

            // autoplay game is running
            else if (typeof bingoTimer !== 'undefined') {
                ($btnPlay.css('display') === 'none') ? pause() : play();
            }
            
            // draw next ball
            else {
                next();
            }
        }

    }
}

document.addEventListener('keydown', pressToPlay);