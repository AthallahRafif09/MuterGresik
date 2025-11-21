// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  // Get current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Get all nav links
  const navLinks = document.querySelectorAll(".nav-menu a");

  // Set active class
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Smooth scroll untuk anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Mood selection handler
        document.addEventListener("DOMContentLoaded", function () {
          const moodCards = document.querySelectorAll(".mood-card");

          moodCards.forEach((card) => {
            card.addEventListener("click", function () {
              const selectedMood = this.getAttribute("data-mood");

              // Remove active class from all cards
              moodCards.forEach((c) => c.classList.remove("active"));

              // Add active class to selected card
              this.classList.add("active");

              // Save mood to localStorage
              localStorage.setItem("userMood", selectedMood);

              // Redirect to wisata page after short delay
              setTimeout(() => {
                window.location.href = "wisata.html";
              }, 300);
            });
          });

          // Highlight saved mood if exists
          const savedMood = localStorage.getItem("userMood");
          if (savedMood) {
            const savedCard = document.querySelector(
              `.mood-card[data-mood="${savedMood}"]`
            );
            if (savedCard) {
              savedCard.classList.add("active");
            }
          }
        });
      }
    });
  });
});
