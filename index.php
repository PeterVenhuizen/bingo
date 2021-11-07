<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BINGO!</title>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossorigin="anonymous">
    <link rel="stylesheet" href="css/toggleSwitch.css">
    <link rel="stylesheet" href="css/style.css">
    <script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous">
    </script>
    <script defer src="js/bingo.js"></script>
</head>
<body>
    <div id="app">
        <nav><?php include 'components/nav.html'; ?></nav>
        <main>

            <section class="bouncing-balls">
                <div class="ball b">
                    <div class="inner-circle">
                        <div class="letter"></div>
                        <div class="number">B</div>
                    </div>
                </div>
                <div class="ball i">
                    <div class="inner-circle">
                        <div class="letter"></div>
                        <div class="number">I</div>
                    </div>
                </div>
                <div class="ball n">
                    <div class="inner-circle">
                        <div class="letter"></div>
                        <div class="number">N</div>
                    </div>
                </div>
                <div class="ball g">
                    <div class="inner-circle">
                        <div class="letter"></div>
                        <div class="number">G</div>
                    </div>
                </div>
                <div class="ball o bouncing">
                    <div class="inner-circle">
                        <div class="letter"></div>
                        <div class="number">O</div>
                    </div>
                </div>
            </section>

            <section class="last-ball">

                <div class="big-ball-container"></div>

                <div class="start">
                    <i class="fas fa-play"></i>
                    <span>Start</span>
                </div>

                <button class="control play"><i class="fas fa-play"></i></button>
                <button class="control pause"><i class="fas fa-pause"></i></button>
                <button class="control next">Next <i class="fas fa-step-forward"></i></button>

            </section>

            <section class="drawn-balls"></section>

        </main>
    </div>

    <div id="modal-wrapper">
        <div class="modal">
            <i class="fas fa-times modal-close"></i>
            <form>

                <h2>Bingo instellingen</h2>

                <p>Als autoplay is ingeschakeld worden de ballen automatisch
                    getrokken op het ingestelde interval.</p>
                <div class="toggle flex-row">
                    <span>Autoplay</span>
                    <label class="switch" id="autoplay" state="on">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                    </label>
                </div>

                <p>Stel hier het autoplay interval in.</p>
                <div class="range flex-row">
                    <label for="interval-size">
                        <span class="current-interval">5</span>s
                    </label>
                    <input type="range" name="interval-size" min="0.5" max="10" step="0.5" value="5">
                </div>

                <hr>

                <p>Gebruik spraaksynthese om de getrokken nummers voor te lezen</p>
                <div class="toggle flex-row">
                    <span>Spraaksynthese</span>
                    <label class="switch" id="readOutLoud" state="off">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </div>

                <p>Kies een stem</p>
                <select id="voices"></select>

            </form>
        </div>
    </div>

</body>
</html>