let nav_itm = document.querySelector(".nav-item");
let burger = document.querySelector(".burger");
let navLinks = document.querySelectorAll(".nav-list");

burger.addEventListener("click", () => {
    nav_itm.classList.toggle("active");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        nav_itm.classList.remove("active");
    });
});

// ===== Close nav on click outside =====
document.addEventListener("click", (e) => {
    if (!nav_itm.contains(e.target) && !burger.contains(e.target)) {
        nav_itm.classList.remove("active");
    }
});

// ===== Theme Toggle =====
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");

if (localStorage.getItem("theme") === "dark") {
    document.body.parentElement.setAttribute("data-theme", "dark");
    themeIcon.className = "fas fa-moon";
} else {
    document.body.parentElement.removeAttribute("data-theme");
    themeIcon.className = "fas fa-sun";
}

themeToggle.addEventListener("click", () => {
    const html = document.body.parentElement;
    if (html.getAttribute("data-theme") === "dark") {
        html.removeAttribute("data-theme");
        themeIcon.className = "fas fa-sun";
        localStorage.setItem("theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
        themeIcon.className = "fas fa-moon";
        localStorage.setItem("theme", "dark");
    }
});

// ===== Active Nav Highlight on Scroll =====
const sections = document.querySelectorAll("section[id], div[id], footer[id]");

function highlightNav() {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active-link");
        }
    });
}

window.addEventListener("scroll", highlightNav);

// ===== Back to Top Button =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    const fadeIns = document.querySelectorAll(
        ".my-info, .services > div, .skill, .timeline-card, .project-card"
    );
    fadeIns.forEach(el => {
        el.classList.add("fade-in");
        observer.observe(el);
    });

    const slideLefts = document.querySelectorAll(".my-info .about-details");
    slideLefts.forEach(el => {
        el.classList.add("slide-left");
        observer.observe(el);
    });

    const slideRights = document.querySelectorAll(".my-info .about-me");
    slideRights.forEach(el => {
        el.classList.add("slide-right");
        observer.observe(el);
    });

    const scaleIns = document.querySelectorAll(".my-service .service-title, .testimonials-title");
    scaleIns.forEach(el => {
        el.classList.add("scale-in");
        observer.observe(el);
    });

    document.querySelectorAll(".fade-in, .slide-left, .slide-right, .scale-in").forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add("visible");
        }
    });

    // ===== Skill Bars =====
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute("data-progress");
                bar.style.width = progress + "%";
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".skill-progress").forEach(bar => {
        skillObserver.observe(bar);
    });

    // ===== Web3Forms Contact Form =====
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.querySelector(".form-status");

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector(".submit");
        const originalText = btn.innerHTML;
        btn.innerHTML = "sending...";
        btn.disabled = true;
        formStatus.className = "form-status";
        formStatus.textContent = "";

        const formData = new FormData(contactForm);
        formData.append("access_key", "f39b026b-c3c2-4961-89c7-dac3baa3bdc5");

try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                formStatus.className = "form-status success";
                formStatus.textContent = "Message sent successfully!";
                contactForm.reset();
            } else {
                formStatus.className = "form-status error";
                formStatus.textContent = data.message || "Something went wrong.";
            }
        } catch {
            formStatus.className = "form-status error";
            formStatus.textContent = "Network error. Please try again.";
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
});

// ===== Timeline Dot Animation =====
const timelineDot = document.getElementById("timelineDot");

function animateTimelineDot() {
    if (!timelineDot) return;
    const container = timelineDot.parentElement;
    const containerRect = container.getBoundingClientRect();
    const h = containerRect.height;
    const topOffset = containerRect.top;
    const winH = window.innerHeight;

    let progress = Math.max(0, Math.min(1, -topOffset / (h - winH)));
    if (topOffset >= 0) progress = 0;
    if (topOffset + h <= winH) progress = 1;

    const padding = 20;
    const dotH = 16;
    const travel = h - padding * 2 - dotH;
    timelineDot.style.top = padding + progress * travel + "px";
}

window.addEventListener("scroll", animateTimelineDot);

// ===== 3D Tilt Effect (all cards) =====
const tiltCards = document.querySelectorAll(".service-card, .timeline-card-body, .project-card");

tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--tilt-y", x * 14 + "deg");
        card.style.setProperty("--tilt-x", -y * 14 + "deg");
    });
    card.addEventListener("mouseleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
    });
});