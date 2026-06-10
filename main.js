
const nav = document.querySelector("nav");
const ul = document.querySelector("nav ul");
const bars = document.querySelector(".see");
const xmark = document.querySelector(".mark");
const overlay = document.querySelector(".overlay");

function openMenu() {
    nav.classList.add("open");
    ul.classList.add("active");
    document.body.classList.add("open");
}

function closeMenu() {
    nav.classList.remove("open");
    ul.classList.remove("active");
    document.body.classList.remove("open");
}

bars.addEventListener("click", openMenu);
xmark.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);


const image = document.querySelector(".img img");
const text = document.querySelector(".taxt");
const sign = document.querySelector(".signature");
const about = document.querySelector(".about");

window.addEventListener("load", () => {

    // الصورة
    setTimeout(() => {
        image.classList.add("show");
    }, 500);

    // الاسم
    setTimeout(() => {
        text.classList.add("show");
    }, 1300);

    // التوقيع
    setTimeout(() => {
        sign.classList.add("show");
    }, 2200);

    // الوصف
    setTimeout(() => {
        about.classList.add("show");
    }, 3200);

});







const path = document.getElementById("linePath");
const section = document.querySelector(".services");

if(path && section){

    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    let current = 0;
    let target = 0;

    function ease(t){
        return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animate(){

        current += (target - current) * 0.005;

        const eased = ease(current);

        path.style.strokeDashoffset =
        length - (length * eased);

        requestAnimationFrame(animate);
    }

    animate();

    const observer = new IntersectionObserver(
        (entries)=>{

            entries.forEach(entry=>{

                target = entry.isIntersecting ? 1 : 0;

            });

        },
        { threshold: 0.3 }
    );

    observer.observe(section);
}






const track = document.getElementById("track");
const reviews = document.querySelectorAll(".review");
const dotsContainer = document.getElementById("dots");

let index = 0;

// dots
reviews.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");

    dot.addEventListener("click", () => goTo(i));

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateDots(){
    dots.forEach(d => d.classList.remove("active"));
    if(dots[index]) dots[index].classList.add("active");
}

// 🔥 أهم دالة
function goTo(i){

    index = i;

    const card = reviews[i];

    const cardRect = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const screenCenter = window.innerWidth / 2;

    // نحط الكارت في النص
    const moveX = -(cardRect - screenCenter + (cardWidth / 2));

    track.style.transform = `translateX(${moveX}px)`;

    updateDots();
}

// auto slide
setInterval(() => {

    index = (index + 1) % reviews.length;
    goTo(index);

}, 3500);

updateDots();
goTo(0);





