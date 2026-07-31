// Creating a loop for image that will slide one after another and continuously
const slideImages = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg'
];
 
let slideIndex = 0;
 
function startSlideshow() {
    const img = document.getElementById('slide_img');
    if (!img || slideImages.length < 2) return; // nothing to rotate
 
    setInterval(() => {
        slideIndex = (slideIndex + 1) % slideImages.length;
 
        // fade out, swap source, fade back in
        img.classList.add('fading');
        setTimeout(() => {
            img.src = slideImages[slideIndex];
            img.classList.remove('fading');
        }, 400); // matches the CSS transition time below
 
    }, 3000);
}
startSlideshow();

function showLogin() {
    document.getElementById('signup').classList.remove('active');
    document.getElementById('login').classList.add('active');
}

function showSignup() {
    document.getElementById('login').classList.remove('active');
    document.getElementById('signup').classList.add('active');
}


// Show/hide password text.
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}


// Handle the "Create account" click
function submitSignup() {
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('Please agree to the Terms and Conditions to continue.');
        return;
    }
    alert('Your application is sent and once the manager approves you will be notified through your given email, and you can log into your account.');
}

// Handle login form submit (prevents page reload)
document.addEventListener('DOMContentLoaded', () => {
    // Show the signup form by default
    document.getElementById('signup').classList.add('active');

    const loginForm = document.getElementById('login');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Put your real login logic / API call here
        alert('Login submitted!');
    });
});