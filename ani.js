const counters = document.querySelectorAll(".counter");
const stats = document.querySelector(".stats");
const cards = document.querySelectorAll(".card");

let started = false;

if (stats) {   // 👈 أهم سطر

    const observer = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting && !started) {

            started = true;

            counters.forEach(counter => {

                const target = +counter.dataset.target;
                let current = 0;
                const increment = target / 60;

                function update() {

                    current += increment;

                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(update);
                    } else {
                        counter.textContent = "+" + target.toLocaleString();
                    }
                }

                update();
            });
        }

    }, {
        threshold: 0.4
    });

    observer.observe(stats);
}






document.querySelectorAll(".toggle-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const card = btn.closest(".news-card");

        card.classList.toggle("open");

        btn.textContent = card.classList.contains("open")
            ? "إخفاء التفاصيل"
            : "قراءة المزيد";

    });

});













document.querySelectorAll(".price-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        const card = btn.closest(".package-card");

        card.classList.toggle("open");

        btn.textContent = card.classList.contains("open")
            ? "إخفاء السعر"
            : "اعرف السعر";

    });

});










const elements = document.querySelectorAll(".hidden-scroll");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }else{
            entry.target.classList.remove("show");
        }

    });

},{
    threshold: 0.15
});

elements.forEach(el=>{
    observer.observe(el);
});
cards.forEach((card,index)=>{
    card.style.transitionDelay = `${index * 0.15}s`;
});






const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const btn = item.querySelector(".faq-question");

    btn.addEventListener("click", () => {

        faqItems.forEach(other => {

            if(other !== item){
                other.classList.remove("active");
            }

        });

        item.classList.toggle("active");

    });

});







function typeEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

function startTypingWhenVisible(el, callback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(el); // مهم عشان مايعيدش الكتابة
            }
        });
    }, {
        threshold: 0.5 // يبدأ لما 50% من العنصر يظهر
    });

    observer.observe(el);
}

document.addEventListener("DOMContentLoaded", () => {
    const nameEl = document.getElementById("doctorName");
    const aboutEl = document.getElementById("aboutText");

    startTypingWhenVisible(nameEl, () => {
        typeEffect(nameEl, "عبدالسلام محمد", 80);
    });

    startTypingWhenVisible(aboutEl, () => {
    typeEffect(
        aboutEl,
        `مركز الدكتور عبد السلام لتجميل وزراعة الأسنان يقدم أحدث حلول طب الأسنان التجميلية والعلاجية، مثل زراعة الأسنان، تصميم الابتسامة، التقويم، والتركيبات. يعتمد المركز على تقنيات حديثة لتحقيق نتائج دقيقة وجمالية مع توفير تجربة علاجية مريحة لكل مريض.`,
        20
    );
})});









const modal = document.getElementById("serviceModal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

const services = {
    implant: "زراعة الأسنان هي إجراء طبي لتعويض الأسنان المفقودة باستخدام جذور صناعية تُثبت داخل عظم الفك، وتُعد من أكثر الحلول ثباتًا وفعالية لاستعادة الشكل والوظيفة الطبيعية للأسنان مع نتائج طويلة المدى ومظهر جمالي قريب جدًا من الأسنان الطبيعية.",

    hollywood: "ابتسامة هوليوود هي تقنية تجميلية تهدف إلى تحسين شكل الأسنان من حيث اللون والترتيب والتناسق باستخدام عدسات أو فينيرز متطورة، للحصول على ابتسامة جذابة ومثالية تعكس مظهرًا صحيًا وأكثر ثقة بالنفس.",

    ortho: "تقويم الأسنان يعمل على تصحيح ازدحام الأسنان أو اعوجاجها وتحسين الإطباق بين الفكين، مما يساعد على تحسين الشكل الجمالي ووظيفة المضغ ويمنح ابتسامة أكثر تناسقًا وصحة على المدى الطويل.",

    whitening: "تبييض الأسنان هو إجراء تجميلي يهدف إلى إزالة التصبغات والبقع الناتجة عن الطعام أو التدخين أو العادات اليومية، باستخدام تقنيات آمنة تعيد للأسنان لونها الطبيعي بشكل أكثر إشراقًا وجاذبية.",

    root: "علاج الجذور (العصب) هو إجراء دقيق يتم فيه إزالة الالتهاب أو التلف داخل السن وتنظيف القنوات الجذرية ثم حشوها بطريقة طبية تحافظ على السن الطبيعي وتمنع فقدانه لأطول فترة ممكنة.",

    gum: "تجميل اللثة يهدف إلى تحسين شكل خط اللثة لتحقيق توازن جمالي بين الأسنان واللثة، مما يعزز من جمال الابتسامة ويعطي مظهرًا أكثر تناسقًا وصحة للفم."
};



function openModal(type){
    modalText.innerText = services[type];
    modal.classList.remove("hidden");
}

closeModal.onclick = () => {
    modal.classList.add("hidden");
}

window.onclick = (e) => {
    if(e.target == modal){
        modal.classList.add("hidden");
    }
}








document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll("nav ul li a, .ul li a");

    let currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "" || currentPage === "/") {
        currentPage = "index.html";
    }

    links.forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

});




const toggle = document.getElementById("themeToggle");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.documentElement.setAttribute("data-theme", "medical");
    localStorage.setItem("theme", "medical");
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
  }
});

window.addEventListener("load", () => {
  const saved = localStorage.getItem("theme");

  if (saved === "medical") {
    document.documentElement.setAttribute("data-theme", "medical");
    toggle.checked = true;
  }
});