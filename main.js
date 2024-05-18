$(document).ready(function() {
    var flame = $("#flame");
    var txt = $("h1");

    function blowCandle() {
        flame.removeClass("burn").addClass("puff");
        $(".smoke").each(function () {
            $(this).addClass("puff-bubble");
        });
        $("#glow").remove();
        txt.hide().html("i wish you happy birthday").delay(750).fadeIn(300);
        $("#candle").animate(
            {
                opacity: ".5"
            },
            100
        );
    }

    // Function to start speech recognition
    function startRecognition() {
        var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = function(event) {
            var lastResult = event.results[event.resultIndex];
            if (lastResult.isFinal && lastResult[0].transcript.toLowerCase().includes("blow")) {
                blowCandle();
            }
        };

        recognition.start();

        // Restart recognition after it ends
        recognition.onend = function() {
            recognition.start();
        };
    }

    // Start recognition when the document is ready
    startRecognition();
});
