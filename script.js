// --- START -- Clicking makes a noise
let clickCount = 0;
document.addEventListener('click', function(e) {
    clickCount++;

    if (clickCount % 5 === 0) {
        let sound = new Audio("jixaw-metal-pipe-falling-sound.mp3");
        sound.play().catch(err => console.error("Audio play error:", err));
    }
}, true); // "true" captures before other listeners
// --- END -- Clicking makes a noise

// --- START -- Everytime you click a link it asks "are you sure?"

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (event) {
        const yeahsure = confirm("Are you sure you want to leave this page?");
        if (!yeahsure) {
            event.preventDefault(); // Stop navigation
        }
    });
});
// --- END -- Everytime you click a link it asks "are you sure?"

function darkMode() {
    // Initial toggle
    document.body.classList.toggle("dark-mode");
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.toggle("dark-mode");
    });

    // Helper to toggle dark mode
    function toggleDark() {
        document.body.classList.toggle("dark-mode");
        document.querySelectorAll("section").forEach(sec => {
            sec.classList.toggle("dark-mode");
        });
    }

    // After 3 seconds, start toggling back and forth 4 more times with 0.2s pause
    setTimeout(() => {
        let count = 0;
        function repeatToggle() {
            if (count < 7) { // 7 toggles (back and forth)
                toggleDark();
                count++;
                setTimeout(repeatToggle, 100);
            }
        }
        repeatToggle();
    }, 3000);
    // After 4 seconds, toggle dark mode again
    setTimeout(() => {
        toggleDark();
    }, 4000);

}

document.getElementById("darkModeButton").addEventListener("click", darkMode);