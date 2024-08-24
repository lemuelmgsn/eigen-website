document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('.carousel-button');

  buttons.forEach(button => {
      button.addEventListener('click', function () {
          const carousel = document.querySelector(this.dataset.target);
          const direction = this.classList.contains('left') ? -1 : 1;
          scrollCarousel(carousel, direction);
      });
  });

  function scrollCarousel(carousel, direction) {
      const scrollAmount = carousel.clientWidth; // Amount to scroll is the width of the carousel container
      carousel.scrollBy({
          left: direction * scrollAmount,
      });
  }
});


let tlVanLeftNaarScale = gsap.timeline();

// Animatie toepassen op de gehele intro-div
tlVanLeftNaarScale.from('.intro-div', {
    duration: 1,
    y: -300
});

// Schaal de gehele intro-div in 1 seconde naar 1.5
tlVanLeftNaarScale.to('.intro-div', {
    duration: 1,
    scale: 1
});
