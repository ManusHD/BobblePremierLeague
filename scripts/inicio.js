var slideInterval = 9000;
function autoSlides() {
    plusSlides(1);
}
var slideIndex = 1;
showSlides(slideIndex);
setInterval(autoSlides, slideInterval);




function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

var container = document.querySelector('.slideshow-container');
var startX, startY, dist, threshold = 150, allowedTime = 500, elapsedTime, startTime;

container.addEventListener('touchstart', function(e){
    var touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
});

container.addEventListener('touchmove', function(e){
    e.preventDefault();
});

container.addEventListener('touchend', function(e){
    var touchObj = e.changedTouches[0];
    dist = touchObj.pageX - startX;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime <= allowedTime && Math.abs(dist) >= threshold) {
        if (dist > 0) {
            plusSlides(-1);
        } else {
            plusSlides(1);
        }
    }
    e.preventDefault();
});

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

