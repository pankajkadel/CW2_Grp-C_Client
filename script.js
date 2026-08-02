
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

