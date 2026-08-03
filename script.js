
// Add the loop to slide the image one after another.
const slideImages = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg'
];
 
let slideIndex = 0;
 
function startSlideshow() {
    const img = document.getElementById('slide_img');
    if (!img || slideImages.length < 2) return;
 
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


// Password hide and see
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

function onlyLetters(input) {
    input.value = input.value.replace(/[^a-zA-Z\s]/g, "");
}

document.getElementById("firstname").addEventListener("input", function () {
    onlyLetters(this);
});

document.getElementById("lastname").addEventListener("input", function () {
    onlyLetters(this);
});


// Alert for empty place
function submitSignup() {

    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const companyname = document.getElementById("companyname");
    const email = document.getElementById("email");
    const signup_password = document.getElementById("signup_password");


    // remove old errors first
    firstname.classList.remove("input-error");
    lastname.classList.remove("input-error");
    companyname.classList.remove("input-error");
    email.classList.remove("input-error");
    signup_password.classList.remove("input-error");


    // check empty fields
    if (firstname.value.trim() === "") {
        firstname.classList.add("input-error");
    }

    if (lastname.value.trim() === "") {
        lastname.classList.add("input-error");
    }

    if (companyname.value.trim() === "") {
        companyname.classList.add("input-error");
    }

    if (email.value.trim() === "") {
        email.classList.add("input-error");
    }

    if (signup_password.value.trim() === "") {
        signup_password.classList.add("input-error");
    }

}