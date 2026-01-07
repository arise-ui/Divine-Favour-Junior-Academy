let slides = document.querySelectorAll(".collage-slide");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 4000);
const container = document.querySelector(".events-container");
const btnLeft = document.querySelector(".carousel-btn.left");
const btnRight = document.querySelector(".carousel-btn.right");

btnLeft.addEventListener("click", () => {
  container.scrollBy({ left: -300, behavior: "smooth" });
});

btnRight.addEventListener("click", () => {
  container.scrollBy({ left: 300, behavior: "smooth" });
});
