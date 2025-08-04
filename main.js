let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");
let menuBtn = document.getElementById("menu-btn");
let menu = document.getElementById("menu");

searchBtn.onclick = function () {
  searchInput.classList.toggle("visible");

  if (searchInput.classList.contains("visible")) {
    searchInput.focus();
  }
};

menuBtn.onclick = function () {
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
  }
};
