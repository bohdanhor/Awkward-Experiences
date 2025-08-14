// --- START -- Clicking makes a noise
let clickCount = 0;
document.addEventListener('click', function(e) {
    clickCount++;

    if (clickCount % 5 === 0) {                                                     
        let sound = new Audio("media/windows-error-sound-effect-35894.mp3");
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

// --- START -- Dark mode toggle with animation //

let _darkBusy = false;

function darkMode() {
  if (_darkBusy) return;
  _darkBusy = true;
  document.body.classList.toggle("dark-mode");

  function toggleDark() {
    //swap the dark mode with root variables
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color');
    const secondaryColor = rootStyles.getPropertyValue('--secondary-color');
    
    document.documentElement.style.setProperty('--primary-color', rootStyles.getPropertyValue('--dark-primary-color'));
    document.documentElement.style.setProperty('--secondary-color', rootStyles.getPropertyValue('--dark-secondary-color'));
    
    document.documentElement.style.setProperty('--dark-primary-color', primaryColor);
    document.documentElement.style.setProperty('--dark-secondary-color', secondaryColor);
  }


  setTimeout(() => {
    let count = 0;
    (function repeatToggle() {
      if (count < 7) {
        toggleDark();
        count++;
        setTimeout(repeatToggle, 100);
      }
    })();
  }, 3000);

  setTimeout(() => {
    toggleDark();
    _darkBusy = false;
  }, 4000);
}

document.getElementById("darkModeButton").addEventListener("click", darkMode);
// --- END -- Dark mode toggle with animation //


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
// --- START -- Alert box for jokes
function closeAlert() {
    const alertBoxes = document.getElementsByClassName("alert");
    
    console.log(alertBoxes);
    Array.from(alertBoxes).forEach(alertBox => {
        alertBox.classList.toggle("hidden");
    });
}
$('#closeAlertButton').on("click", function() {
    console.log("Alert closed");
    closeAlert(); 
})
// --- END -- Alert box for jokes

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
            $('#jobs-cart').append("<p>You need a Job. Didn't you.</p>");
        } else {
            groupedJobs.forEach(function(job) {
                $('#jobs-cart').append(jobCardHtml(job, false, null, true));
            });

            // Quantity button handlers
            $('.minus-btn').off('click').on('click', function() {
                const id = Number($(this).data('id'));
                const job = jobs.find(j => j.id === id);
                cart.push(job);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart(cart);
                updateCartCount();
            });

            $('.plus-btn').off('click').on('click', function() {
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

// Checkout overlay logic
$('#checkout').on('click', function() {
    $('#checkout-overlay').removeClass('hidden');
});

$('#close-checkout').on('click', function() {
    $('#checkout-overlay').addClass('hidden');
});

$('#birthday').on('input', function() {
    $('#birthday-value').text($(this).val());
});

$('#fun-checkout-form').on('submit', function(e) {
    e.preventDefault();
    alert("Thank you for submitting your legendary details!\n(We won't actually use them, promise.)");
    $('#checkout-overlay').addClass('hidden');
});

// --- START -- Cookie and Tea Offer ---
window.addEventListener('DOMContentLoaded', function() {
    const cookieModal = document.getElementById('cookie-modal');
    const teaModal = document.getElementById('tea-modal');
    const acceptCookies = document.getElementById('accept-cookies');
    const acceptTea = document.getElementById('accept-tea');

    acceptCookies.addEventListener('click', function() {
        cookieModal.style.display = 'none';
        teaModal.style.display = 'flex';
    });

    acceptTea.addEventListener('click', function() {
        teaModal.style.display = 'none';
        alert('Enjoy your tea! 🍵');
    });
});
// --- END -- Cookie and Tea Offer ---