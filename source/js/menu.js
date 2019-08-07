const open_button = document.querySelector(".page-header__toggle");
const main_navigation = document.querySelector(".main-navigation");

main_navigation.classList.toggle("main-navigation--closed");
open_button.classList.toggle("page-header__toggle--closed");

open_button.addEventListener("click", function(evt) {
  evt.preventDefault();
  main_navigation.classList.toggle("main-navigation--closed");
  open_button.classList.toggle("page-header__toggle--closed");
});
