const cat_name = document.querySelector(".about-cat__input-name");
const cat_weight = document.querySelector(".about-cat__input-weight");
const contact_email = document.querySelector(".contact-data__input--email");
const contact_phone = document.querySelector(".contact-data__input--phone");
const form = document.querySelector("form");
const alertDialog = document.querySelector(".alert-dialog");
const alertDialogButton = document.querySelector(".alert-dialog-close");

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
    if (typeof alertDialog.showModal === "function") {
      if (alertDialog.classList.contains("visually-hidden")) {
        alertDialog.classList.remove("visually-hidden");
      }
      alertDialog.showModal();
    } else {
      alert("Необходимо заполнить все поля.");
    }
  }
});

alertDialogButton.addEventListener("click", function() {
  alertDialog.close();
});
