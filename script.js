document.addEventListener('DOMContentLoaded', () => {

    const carousel = document.querySelector('.carousel');

    // ORIGINAL slides
    let slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const originalSlides = [...slides];

    /* =========================
       CLONE SLIDES (BOTH SIDES)
    ========================== */

    // clone to END
    originalSlides.forEach(slide => {
        const clone = slide.cloneNode(true);
        carousel.appendChild(clone);
    });

    // clone to START
    originalSlides.slice().reverse().forEach(slide => {
        const clone = slide.cloneNode(true);
        carousel.insertBefore(clone, carousel.firstChild);
    });

    // reselect ALL slides after cloning
    slides = Array.from(document.querySelectorAll('.carousel-slide'));

    // start in the middle (real slides)
    let currentIndex = originalSlides.length;

    /* =========================
       CENTER LOGIC
    ========================== */

    function updateCenter() {
        slides.forEach(s => s.classList.remove('center'));
        if (slides[currentIndex]) slides[currentIndex].classList.add('center');
    }

    function calculateOffset() {
        const smallW = 220;
        const gap = 24;
        const largeW = 380;

        const containerWidth = carousel.parentElement.offsetWidth;
        const target = (containerWidth / 2) - (largeW / 2);
        const prevWidth = currentIndex * (smallW + gap);

        return target - prevWidth;
    }

    function slideTo(index) {
        currentIndex = index;
        updateCenter();
        carousel.style.transform = `translateX(${calculateOffset()}px)`;
    }

    /* =========================
       INFINITE RIGHT SCROLL
    ========================== */

    function nextSlide() {
        currentIndex++;
        slideTo(currentIndex);

        // when reaching far right clone zone → snap back to real slides
        if (currentIndex >= slides.length - originalSlides.length) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentIndex = originalSlides.length;
                carousel.style.transform = `translateX(${calculateOffset()}px)`;

                setTimeout(() => {
                    carousel.style.transition = 'transform 1s ease';
                }, 50);
            }, 1000); // matches transition duration
        }
    }

    /* =========================
       COUNTDOWN
    ========================== */

    function updateCountdown() {
        const weddingDate = new Date("2027-05-22T14:00:00-05:00").getTime();
        const now = new Date().getTime();
        const diff = weddingDate - now;

        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
        document.getElementById("minutes").innerText = Math.floor((diff / (1000 * 60)) % 60);
        document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* =========================
       INIT
    ========================== */

    updateCenter();
    slideTo(currentIndex);

    setInterval(nextSlide, 6000);

    window.addEventListener('resize', () => {
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${calculateOffset()}px)`;

        setTimeout(() => {
            carousel.style.transition = 'transform 1s ease';
        }, 50);
    });

});