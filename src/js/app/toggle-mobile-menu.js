document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("[data-menu-btn]");
  const menu = document.querySelector("[data-menu-tmpl]");
  menuBtn.addEventListener("click", (e) => {

  });
  document.addEventListener("click", (e) => {
    if (menuBtn.contains(e.target)) {
      e.preventDefault();
      menu.classList.toggle("active");
      menuBtn.classList.toggle("active");
    } else if (!menuBtn.contains(e.target) && !menu.contains(e.target) || e.target.hasAttribute("href")) {
      menu.classList.remove("active");
      menuBtn.classList.remove("active");
    }
  });
});