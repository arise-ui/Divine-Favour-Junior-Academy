// Mobile nav toggle
const toggle = document.getElementById("navToggle");
const nav = document.getElementById("mainNav");

if (toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// Mobile sub-menu toggles
document.querySelectorAll(".navbar-nav > li > a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      const sub = this.nextElementSibling;
      if (sub && sub.classList.contains("sub-menu")) {
        e.preventDefault();
        sub.classList.toggle("mobile-open");
      }
    }
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const id = this.getAttribute("href");

    if (id.length > 1) {
      const el = document.querySelector(id);

      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        if (window.innerWidth <= 768) {
          nav.classList.remove("open");
        }
      }
    }
  });
});

// WhatsApp CTA button
const waBtn = document.querySelector(".contact-cta-btn");
if (waBtn) {
  waBtn.addEventListener("click", () => {
    window.open("https://wa.me/254720750081", "_blank");
  });
}

document.querySelectorAll(".event-video video").forEach((vid) => {
  const placeholder = vid.parentElement.querySelector(".vid-placeholder");

  vid.addEventListener("loadeddata", () => {
    console.log("Video loaded:", vid.currentSrc);
    if (placeholder) placeholder.style.display = "none";
  });

  vid.addEventListener("error", () => {
    console.error("Video failed:", vid.currentSrc);
    if (placeholder) placeholder.style.display = "flex";
  });
});
