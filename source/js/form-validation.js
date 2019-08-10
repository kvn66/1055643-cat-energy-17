// Form validation
var cat_name = document.querySelector(".about-cat__input-name");
var cat_weight = document.querySelector(".about-cat__input-weight");
var contact_email = document.querySelector(".contact-data__input--email");
var contact_phone = document.querySelector(".contact-data__input--phone");
var form = document.querySelector("form");

form.addEventListener("submit", function (evt) {
  if (!(
    cat_name.value &&
    cat_weight.value &&
    contact_email.value &&
    contact_phone.value &&
    contact_email.validity.valid &&
    contact_phone.validity.valid
  )) {
    evt.preventDefault();
    alert("Необходимо правильно заполнить все поля, помеченные *.");
  }
});
