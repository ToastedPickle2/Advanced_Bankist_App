"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// querySelector & querySelectorAll
document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);

//getElementById
document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button"); //
console.log(allButtons);

//getElementsByClassName
console.log(document.getElementsByClassName("btn"));

// Creating and inserting elements
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent =
//   "We use cookies for improved functionality and analytics.";
message.innerHTML = `<div class="cookie">We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button></div>`;

// header.prepend(message);
header.append(message);

// Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// Styles
message.style.width = "100%";

console.log(getComputedStyle(message).color);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute("designer"));
console.log(logo.getAttribute("src"));

logo.alt = "Beautiful minimalist logo";

const link = document.querySelector(".twitter-link");
console.log(link.href);
console.log(link.getAttribute("href"));

// Data attributes
console.log(logo.dataset.versionNumber);

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", scrollX, scrollY);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  section1.scrollIntoView({ behavior: "smooth" });
});

const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  //   alert("addEventListener: Great! You are reading the heading");

  h1.removeEventListener("mouseenter", alertH1);
};

h1.addEventListener("mouseenter", alertH1);

// h1.addEventListener("mouseenter", function (e) {
//   alert("addEventListener: Great! You are reading the heading");
// });

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

logo.style.backgroundColor = randomColor();

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     this.style.backgroundColor = randomColor(); // When this is clicked, the background color of the parent also changes.

//     e.stopPropagation(); // This stops the background color of the parent element from changing.
//   });
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();

//   e.stopPropagation();
// });

// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
// });

////////////////////////////////////////////////////////////
// Page Navigation
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();

//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  //   console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Going downwards: child
h1.querySelectorAll(".highlight");
console.log(h1.childNodes); // outputs all of the elements that are in the h1 element
console.log(h1.children); // outputs ONLY the child elements
console.log(h1.firstElementChild); // outputs ONLY the FIRST child element

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

// h1.closest(".header").style.background = "var(--gradient-secondary"; // applies style to h1's closest parent element that has the class .header
// h1.closest("h1").style.background = "var(--gradient-primary";

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = "scale(0.5)";
  }
});

// Tabbed component

// tabs.forEach((t) => t.classList.remove("operations__tab--active"));

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return; // If anything other than what's specified for clicked, is clicked immediately return and don't execute anything. So nothing will happen if you click outside the buttons.

  // Remove active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));

  // Active tab
  clicked.classList.add("operations__tab--active");

  // Remove active classes
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate content area
  const id = +clicked.getAttribute("data-tab");
  document
    .querySelector(`.operations__content--${id}`)
    .classList.add("operations__content--active");
});

// Menu fade animation

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    console.log(siblings);

    siblings.forEach((el) => {
      el.style.opacity = 1;
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = 0.5;
  }
};

// Passing an argument into handler
nav.addEventListener("mouseover", handleHover.bind(0.5)); // Simplified version of what's below, using bind now essentially binds the this keyword to 0.5
// nav.addEventListener("mouseover", function (e) {
//   handleHover(e, 0.5);
// });

nav.addEventListener("mouseout", handleHover.bind(1));
// nav.addEventListener("mouseout", function (e) {
//   handleHover(e, 1);
// });

// Sticky Navigation
// const initialCoords = section1.getBoundingClientRect().top;

// window.addEventListener("scroll", function (e) {
//   if (window.scrollY > initialCoords) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// Intersection Observer API - The Intersection Observer API allows you to configure a callback that is called when either of these circumstances occur:
//A target element intersects either the device's viewport or a specified element. That specified element is called the root element or root for the purposes of the Intersection Observer API.
const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null, // the root is the viewport because it is set to null
  threshold: [0, 0.2], // use an array to set multiple thresholds
  //   threshold: 0.1, // A threshold of 0.1 means that when 10% of the target is visible within the element specified by the root option, the callback is invoked.
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

// Sticky Nav
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const entry = entries[0];
  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.
});
headerObserver.observe(header);

// Reveal Sections
const revealSection = function (entries, observer) {
  const entry = entries[0];
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  //   section.classList.add("section--hidden");
});

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // Remove blur filter only AFTER the new img has loaded
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const slider = document.querySelector(".slider");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length - 1;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
// createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
};
// activateDot(0);

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
// goToSlide(0);

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

// Prev slide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

//
const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();

// Event Handlers
btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});
