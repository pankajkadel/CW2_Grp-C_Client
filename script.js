// Nav background on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const navBurger = document.getElementById('navBurger');
const navMobile = document.getElementById('navMobile');
navBurger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
});
// close mobile menu after tapping a link
navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMobile.classList.remove('open'));
});


//  Animated stat counters (triggered when scrolled into view) 
const statNums = document.querySelectorAll('.stat_num');

function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value.toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
}
