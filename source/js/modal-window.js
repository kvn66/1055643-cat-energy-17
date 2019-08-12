// Modal window
var popup = document.querySelector(".modal-product-order");
var overlay = document.querySelector(".overlay");
var openMainPopupButtons = document.querySelectorAll(".main-catalog__button");
var openAdditionalPopupButtons = document.querySelectorAll(".additional-catalog__button");
var closePopupButton = popup.querySelector(".modal-product-order__close");

var toggleModal = function () {
  overlay.classList.toggle("overlay--show");
  popup.classList.toggle("modal-product-order--show");
};

for (var i = 0; i < openMainPopupButtons.length; i++) {
  openMainPopupButtons[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    toggleModal();
  });
}

for (var i = 0; i < openAdditionalPopupButtons.length; i++) {
  openAdditionalPopupButtons[i].addEventListener("click", function (evt) {
    evt.preventDefault();
    toggleModal();
  });
}

closePopupButton.addEventListener("click", function () {
  toggleModal();
});

window.addEventListener("keydown", function (evt) {
  if (evt.which === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-product-order--show")) {
      toggleModal();
    }
  }
});
