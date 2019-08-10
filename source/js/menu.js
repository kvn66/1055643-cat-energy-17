//Mobile menu
var open_button = document.querySelector(".page-header__toggle");
var main_navigation = document.querySelector(".main-navigation");

if (open_button.classList.contains("page-header__toggle--no-js")) {
  open_button.classList.remove("page-header__toggle--no-js");
};

open_button.classList.toggle("page-header__toggle--closed");
main_navigation.classList.toggle("main-navigation--closed");

open_button.addEventListener("click", function(evt) {
  evt.preventDefault();
  main_navigation.classList.toggle("main-navigation--closed");
  open_button.classList.toggle("page-header__toggle--closed");
});
