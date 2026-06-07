const year = document.querySelector("#year");
const copyEmailButton = document.querySelector("#copyEmail");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (year) {
  year.textContent = new Date().getFullYear();
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = "已複製";
      setTimeout(() => {
        copyEmailButton.textContent = "複製 Email";
      }, 1500);
    } catch {
      copyEmailButton.textContent = email;
    }
  });
}

const markActiveSection = () => {
  const current = sections
    .map((section) => ({
      id: section.id,
      top: Math.abs(section.getBoundingClientRect().top)
    }))
    .sort((a, b) => a.top - b.top)[0];

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current?.id}`);
  });
};

markActiveSection();
window.addEventListener("scroll", markActiveSection, { passive: true });
