const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Portfolio filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projects.forEach(project => {
      const categories = project.dataset.category.split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      project.style.display = shouldShow ? "" : "none";
    });
  });
});

// Project modal
const modal = document.getElementById("projectModal");
const modalClose = document.querySelector(".modal-close");

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = button.dataset.title;
    document.getElementById("modalType").textContent = button.dataset.type;
    document.getElementById("modalTools").textContent = button.dataset.tools;
    document.getElementById("modalChallenge").textContent = button.dataset.challenge;
    document.getElementById("modalApproach").textContent = button.dataset.approach;
    document.getElementById("modalOutcome").textContent = button.dataset.outcome;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal?.classList.contains("open")) {
    closeModal();
  }
});

// Lightweight reveal animation
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}



 // Davaya contact form: redirect after successful submission
const contactForm = document.getElementById("davaya-contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        window.location.href = "/thank-you.html";
      } else {
        alert("Your message could not be sent. Please try again.");
      }
    } catch (error) {
      alert("Unable to send your message. Please check your connection and try again.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
}
