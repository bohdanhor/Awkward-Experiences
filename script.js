// --- START -- Clicking makes a noise
let clickCount = 0;
document.addEventListener('click', function(e) {
    clickCount++;

    if (clickCount % 5 === 0) {                                                     
        // let sound = new Audio("media/jixaw-metal-pipe-falling-sound.mp3");
        // sound.play().catch(err => console.error("Audio play error:", err));
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

// --- START -- Dark mode toggle with animation //
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
// --- END -- Dark mode toggle with animation //

// --- START -- Alert box for epilepsy and other warnings - CHANGE THIS BACK LATER.
const alertContent = `
If you have epilepsy, LEAVE THIS SITE IMMEDIATELY! THIS IS NOT A JOKE!

If you are using a screen reader, please be aware that this site won't be fully accessible.
If you are using a mobile device, please be aware that this site may not display correctly.
If you are using a slow internet connection, please be patient as this site may take a while to load.
If you are using a public computer, please be aware that this site may not be secure.
If you are using a work computer, please be aware that this site may not be appropriate for your workplace.
If you are using a school computer, please be aware that this site may not be appropriate for your school.
If you are using a computer in a library, please be aware that this site may not be appropriate for your library.
If you are using a computer in a public place, please be aware that this site may not be appropriate for that public place.
If you are using a computer in a private place, please be aware that this site may not be appropriate for that private place.
If you are using a computer in a place where you are not allowed to use a computer, please be aware that this site may not be appropriate for that place.
If you are using a computer in a place where you are not allowed to use the internet, please be aware that this site may not be appropriate for that place.
If you are using a computer in a place where you are not allowed to use this site, please be aware that this site may not be appropriate for that place.

We stand with Ukraine!
`;

let alertCount = 0;
function showAlertThreeTimes() {
    alertCount++;
    if (alertCount < 3) {
        // alert(alertContent);
        showAlertThreeTimes();
    }
}
showAlertThreeTimes();
// --- END -- Alert box for epilepsy and other warnings

// --- START -- Jobs script
const jobs = [
    {
        id: 1,
        title: "Church Clown",
        company: "Honk Honk Ltd",
        location: "Manchester Cathedral",
        salary: "Negotiable",
        desc: "Honk honk",
        ideal: "A clown",
        tags: ["Part-time", "Entry Level", "Fun"]
    },
    {
        id: 2,
        title: "Middle Management",
        company: "You don’t care",
        location: "Greater Manchester",
        salary: "Negotiable",
        desc: "Turn up, look busy",
        ideal: "Straight white male, mid 40s, balding slightly but in denial, has questionable opinions",
        tags: ["Full-time", "Office", "Management"]
    },
    {
        id: 3,
        title: "Nova Representative",
        company: "Nova Skincare",
        location: "Greater Manchester",
        salary: "Negotiable",
        desc: "This role will require a spontaneous and outgoing personality with excellent communication skills and a firm knowledge of our company as well as understanding of our product to promote premium brand Nova Skincare.",
        ideal: "Outgoing personality, excellent communication skills and hygiene, 5 years previous experience in sales minimum, a valid UK driving licence.",
        tags: ["Full-time", "Sales", "Driving Licence"]
    },
    {
        id: 4,
        title: "Cat Sitter",
        company: "Purrfect Home",
        location: "Greater Manchester",
        salary: "Negotiable",
        desc: "This job requires an ENTHUSIATIC applicant with a LOVE for kitties in all shapes and sizes. You will have the privilege of overseeing the safety of cuddly kittens in their homes (no further than the points of entry), keeping them fed and ensuring their environment is clean and safe.",
        ideal: "5 years minimum experience working with pets, a valid UK driving licence, LOVES DOGS",
        tags: ["Part-time", "Pets", "Driving Licence"]
    },
    {
        id: 5,
        title: "Dog Walker",
        company: "Waggie Walkies",
        location: "Greater Manchester",
        salary: "Negotiable",
        desc: "This job requires an ENTHUSIATIC applicant with a LOVE for pups in all shapes and sizes. You will have the honour of escorting cuddly canines around their local areas (no more than 3 miles from home), to parks, a-pup-ments as well as other designated locations defined within their action plan.",
        ideal: "5 years minimum experience working with pets, a valid UK driving licence, LOVES DOGS",
        tags: ["Part-time", "Pets", "Outdoor"]
    }
];

function groupCartItems(cart) {
    const grouped = {};
    cart.forEach(job => {
        if (grouped[job.id]) {
            grouped[job.id].quantity += 1;
        } else {
            grouped[job.id] = { ...job, quantity: 1 };
        }
    });
    return Object.values(grouped);
}

function jobCardHtml(job, showApply = false, jobIdx = null, showQuantity = false) {
    const tagsHtml = job.tags ? job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('') : '';
    return `
        <div class="job-card" data-id="${job.id}">
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">${job.company}</div>
            <div class="job-location">${job.location}</div>
            <div class="job-salary">Salary: <span>${job.salary}</span></div>
            <p class="job-desc">${job.desc}</p>
            <div class="job-ideal">Ideal Candidate: ${job.ideal}</div>
            <div class="job-tags">${tagsHtml}</div>
            ${showApply ? `<button class="apply-btn" data-job="${jobIdx}">Apply</button>` : ''}
            ${showQuantity ? `
                <div class="cart-quantity-controls">
                    <button class="quantity-btn minus-btn" data-id="${job.id}">-</button>
                    <span class="cart-quantity">Quantity: ${job.quantity}</span>
                    <button class="quantity-btn plus-btn" data-id="${job.id}">+</button>
                </div>
            ` : ''}
        </div>
    `;
}

function renderJobs(jobs) {
    if ($('#jobs-list').length) {
        $('#jobs-list').empty();
        jobs.forEach(function(job, idx) {
            $('#jobs-list').append(jobCardHtml(job, true, idx));
        });

        // Apply button handler
        $('.apply-btn').off('click').on('click', function() {
            const jobIdx = $(this).data('job');
            addToCart(jobs[jobIdx]);
        });
    }
}
// End --- Jobs script

// --- START -- Cart rendering and logic
function renderCart(cart) {
    if ($('#jobs-cart').length) {
        $('#jobs-cart').empty();
        const groupedJobs = groupCartItems(cart);
        if (groupedJobs.length === 0) {
            $('#jobs-cart').append('<p>Your cart is empty.</p>');
        } else {
            groupedJobs.forEach(function(job) {
                $('#jobs-cart').append(jobCardHtml(job, false, null, true));
            });

            // Quantity button handlers
            $('.plus-btn').off('click').on('click', function() {
                const id = Number($(this).data('id'));
                const job = jobs.find(j => j.id === id);
                cart.push(job);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart(cart);
                updateCartCount();
            });

            $('.minus-btn').off('click').on('click', function() {
                const id = Number($(this).data('id'));
                const idx = cart.findIndex(j => j.id === id);
                if (idx !== -1) {
                    cart.splice(idx, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart(cart);
                    updateCartCount();
                }
            });
        }
    }
}

// --- Cart logic ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(job) {
    cart.push(job);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount() {
    const count = cart.length;
    $('#cart-count').text(`Cart(${count})`);
}
updateCartCount();

// Render jobs or cart depending on page
$(document).ready(function() {
    renderJobs(jobs);
    renderCart(cart);
    updateCartCount();
});

$('#fontRange').on('input', function() {
    // Range: 1-100, map to 12px - 32px
    const val = $(this).val();
    const px = 12 + (val - 1) * (32 - 12) / (100 - 1);
    $('html').css('font-size', px + 'px');
});

$('#cursorRange').on('input', function() {
    const val = $(this).val();
    // Map value to a set of cursor styles
    let cursorType = 'default';
    if (val < 20) cursorType = 'pointer';
    else if (val < 40) cursorType = 'crosshair';
    else if (val < 60) cursorType = 'move';
    else if (val < 80) cursorType = 'text';
    else cursorType = 'wait';
    $('body').css('cursor', cursorType);
});
// --- END -- Cart rendering and logic