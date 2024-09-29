import Lenis from "lenis";
import Swiper from "swiper";
import "swiper/css";
// Phone Navbar Toggle

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu-items");

  menuToggle.addEventListener("click", () => {
    // Toggle between max-h-0 and max-h-[500px] for smooth height transition
    if (menu.style.maxHeight === "0px" || menu.style.maxHeight === "") {
      menu.style.maxHeight = "500px"; // Set a large enough height for smooth transition
      setTimeout(() => menu.classList.add("shadow-lg"), 200);
    } else {
      setTimeout(() => menu.classList.remove("shadow-lg"), 200);
      menu.style.maxHeight = "0px"; // Collapse the menu
    }
  });
});

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Navbar scroll animation
const navbar = document.querySelector("#navbar");
function createScrollDirectionTracker() {
  let scrollDirection = "up";
  let lastScrollY = 0;
  const navbar = document.getElementById("navbar");

  function handleScroll() {
    const currentScrollY = window.pageYOffset; // Using native scroll value

    // Determine scroll direction
    if (currentScrollY > lastScrollY) {
      scrollDirection = "down";
    } else {
      scrollDirection = "up";
    }

    // Hide navbar on scroll down and show on scroll up
    if (scrollDirection === "down") {
      navbar.style.transform = "translateY(-150%)"; // Move out of the viewport
      navbar.style.transition = "transform 0.5s ease"; // Smooth transition
    } else {
      navbar.style.transform = "translateY(0)"; // Bring back into viewport
      navbar.style.transition = "transform 0.5s ease";
    }

    lastScrollY = currentScrollY;
  }

  // Listen to scroll events
  window.addEventListener("scroll", handleScroll);

  return {
    getScrollDirection: () => scrollDirection,
    cleanup: () => {
      window.removeEventListener("scroll", handleScroll);
    },
  };
}

createScrollDirectionTracker();

$(document).ready(function () {
  var currentIndex = 0;
  var totalItems = 0;

  $("#items-slider").mouseenter((e) => {
    // entered = true;
    // Pause autoplay when mouse enters
    $("#label-slider").trigger("stop.owl.autoplay");
  });

  $("#items-slider").mouseleave((e) => {
    // entered = false;
    // Resume autoplay when mouse leaves
    $("#label-slider").trigger("play.owl.autoplay");
  });

  // Initialize the first slider (with ID #label-slider)
  $("#label-slider").owlCarousel({
    margin: 0,
    items: 1,
    loop: true,
    autoplay: true,
    dots: false,
    autoplayHoverPause: true, // autoplay will be stop on hover

    onInitialized: function (e) {
      // Store the total number of items in the first carousel
      totalItems = e.item.count;
    },
    onTranslated: function (e) {
      var newIndex = e.item.index % totalItems; // Calculate modulo to handle looping indices

      // Check if the direction is forward or backward
      if (
        (newIndex === 0 && currentIndex === totalItems - 1) ||
        newIndex > currentIndex
      ) {
        // Forward direction
        $("#items-slider").trigger("next.owl.carousel");
      } else if (
        (newIndex === totalItems - 1 && currentIndex === 0) ||
        newIndex < currentIndex
      ) {
        // Backward direction
        $("#items-slider").trigger("prev.owl.carousel");
      }

      // Update the current index
      currentIndex = newIndex;
    },
  });

  // Initialize the second slider (with ID #items-slider)
  $("#items-slider").owlCarousel({
    margin: 0,
    items: 1,
    loop: true, // Enable loop for smooth transitions
    dots: false,
    autoplay: false, // Disable autoplay to allow manual control
    animateOut: "fadeOut", // Custom fadeOut animation
    animateIn: "fadeIn", // Custom fadeIn animation
    touchDrag: false, // Disable dragging on touch devices
    mouseDrag: false, // Disable dragging with the mouse
    onInitialized: function (e) {
      // Synchronize the current index of the second slider with the first one
      currentIndex = e.item.index % totalItems; // Initialize currentIndex based on first slider
    },
    onTranslated: function (e) {
      // Update the current index based on the items slider
      currentIndex = e.item.index % totalItems;
    },
  });

  $("#testimonial-slider").owlCarousel({
    items: 1,
    // nav: true,
    loop: true,
  });

  $("#testimonial-prev").click(() =>
    $("#testimonial-slider .owl-prev")[0].click()
  );

  $("#testimonial-next").click(() =>
    $("#testimonial-slider .owl-next")[0].click()
  );

  $("#year").text(new Date().getFullYear());

  // console.log($("#navbar").height());
  $("#menu-items").css("top", $("#navbar").height() + "px");
});
