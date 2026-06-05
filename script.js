// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }
});

// ===== MOBILE NAV TOGGLE =====
const toggle = document.getElementById("navToggle");
const nav = document.getElementById("mainNav");

if (toggle) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    // Animate hamburger
    const spans = toggle.querySelectorAll("span");
    toggle.classList.toggle("active");
    if (toggle.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 6px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });
}

// ===== MOBILE SUB-MENU TOGGLES =====
document.querySelectorAll(".navbar-nav > li > a").forEach((link) => {
  link.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      const sub = this.nextElementSibling;
      if (sub && sub.classList.contains("sub-menu")) {
        e.preventDefault();
        // Close other open sub-menus
        document.querySelectorAll(".sub-menu.mobile-open").forEach((m) => {
          if (m !== sub) m.classList.remove("mobile-open");
        });
        sub.classList.toggle("mobile-open");
      }
    }
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        if (window.innerWidth <= 768 && nav) {
          nav.classList.remove("open");
          toggle?.classList.remove("active");
          document.querySelectorAll(".navbar-toggle span").forEach((s) => {
            s.style.transform = "";
            s.style.opacity = "";
          });
        }
      }
    }
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

revealEls.forEach((el) => observer.observe(el));

// ===== SCHOOL LIFE TABS =====
function switchTab(btn, panelId) {
  // Deactivate all tabs & panels
  document
    .querySelectorAll(".life-tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".life-panel")
    .forEach((p) => p.classList.remove("active"));
  // Activate clicked
  btn.classList.add("active");
  const panel = document.getElementById(panelId);
  if (panel) {
    panel.classList.add("active");
    // Trigger reveal for newly visible panel items
    panel
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => {
        el.classList.add("visible");
      });
  }
}

// Expose to global scope for inline onclick
window.switchTab = switchTab;

// ===== VIDEO PLAY BUTTON HIDE ON PLAY =====
document.querySelectorAll(".event-video-item").forEach((item) => {
  const video = item.querySelector("video");
  const playBtn = item.querySelector(".vid-play-btn");

  if (video && playBtn) {
    video.addEventListener("play", () => {
      playBtn.style.opacity = "0";
    });
    video.addEventListener("pause", () => {
      playBtn.style.opacity = "1";
    });
    video.addEventListener("ended", () => {
      playBtn.style.opacity = "1";
    });
    video.addEventListener("error", () => {
      // Show a nicer fallback
      item.style.background = "linear-gradient(135deg, #0f2554, #1e3a8a)";
      playBtn.style.display = "none";
    });
  }
});

// Director photos are set directly in the HTML src attributes.
// To add photos: save images to the images/ folder and update
// src="images/director1.jpg" and src="images/director2.jpg" in index.html

// ===== COUNTER ANIMATION (hero stats) =====
function animateCounter(el, target, duration = 1500) {
  const isNum = /^\d+$/.test(target);
  if (!isNum) return; // skip CBC, 100% style values with letters — handle separately

  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, 16);
}

// Trigger counter on hero stats visible
const heroStats = document.querySelectorAll(".hero-stat h3");
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.textContent.trim();
        // Simple numeric
        if (/^\d+$/.test(raw)) animateCounter(el, parseInt(raw));
        heroObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);

heroStats.forEach((s) => heroObserver.observe(s));
