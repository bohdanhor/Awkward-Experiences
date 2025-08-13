// --- START -- Clicking makes a noise
let clickCount = 0;
document.addEventListener('click', function(e) {
    clickCount++;

    if (clickCount % 3 === 0) {
        console.log('Third click detected');
        let sound = new Audio("jixaw-metal-pipe-falling-sound.mp3");
        sound.play().catch(err => console.error("Audio play error:", err));
    }
}, true); // "true" captures before other listeners
// --- END -- Clicking makes a noise