$(document).ready(function() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      const audioContext = new AudioContext();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      microphone.connect(scriptNode);
      scriptNode.connect(audioContext.destination);

      let isBlowing = false;

      scriptNode.onaudioprocess = function(e) {
        const inputBuffer = e.inputBuffer.getChannelData(0);
        const maxLevel = Math.abs(applyMax(inputBuffer));

        // Adjust this threshold based on your microphone sensitivity and desired blow strength
        if (maxLevel > 0.1) {
          isBlowing = true;
        }

        if (isBlowing) {
          $("#flame").removeClass("burn").addClass("puff");
          $(".smoke").each(function() {
            $(this).addClass("puff-bubble");
          });
          $("#glow").remove();
          $("#txt").hide().html("i wish you happy birthday").delay(750).fadeIn(300);
          $("#candle").animate({ opacity: ".5" }, 100);
          isBlowing = false; // Reset after blowing out
        }
      };
    })
    .catch(function(err) {
      console.error("Error accessing microphone:", err);
    });
});

function applyMax(buffer) {
  let max = buffer[0];
  for (let i = 1; i < buffer.length; i++) {
    if (buffer[i] > max) {
      max = buffer[i];
    }
  }
  return max;
}
