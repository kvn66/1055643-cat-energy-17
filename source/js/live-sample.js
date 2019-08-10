// Live sample
var image_before = document.querySelector(".live-sample__image-before-wrapper");
var button_before = document.querySelector(".live-sample__slider-control-button--before");
var button_after = document.querySelector(".live-sample__slider-control-button--after");

button_before.addEventListener("click", function(evt) {
  evt.preventDefault();
  image_before.classList.add("live-sample__image-before-wrapper--before");
  if (image_before.classList.contains("live-sample__image-before-wrapper--after")) {
    image_before.classList.remove("live-sample__image-before-wrapper--after");
  }
});

button_after.addEventListener("click", function(evt) {
  evt.preventDefault();
  image_before.classList.add("live-sample__image-before-wrapper--after");
  if (image_before.classList.contains("live-sample__image-before-wrapper--before")) {
    image_before.classList.remove("live-sample__image-before-wrapper--before");
  }
});
