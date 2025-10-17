document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");
  const checkbox = document.getElementById("updates");
  const emailError = document.querySelector(".email-error");
  const checkboxError = document.querySelector(".checkbox-error");
  const alertBox = document.getElementById("successAlert");

  const feliratkozottEmailek = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;
    emailError.textContent = "";
    checkboxError.textContent = "";

    const emailValue = emailInput.value.trim();

    if (
      emailValue === "" ||
      !emailValue.includes("@") ||
      (!emailValue.endsWith(".hu") && !emailValue.endsWith(".com"))
    ) {
      emailInput.classList.add("is-invalid");
      emailError.textContent = "Kérjük, érvényes e-mail címet adj meg!";
      valid = false;
    } else if (feliratkozottEmailek.includes(emailValue.toLowerCase())) {
      emailInput.classList.add("is-invalid");
      emailError.textContent = "Ezzel az e-mail címmel már regisztráltál!";
      valid = false;
    } else {
      emailInput.classList.remove("is-invalid");
    }

    if (!checkbox.checked) {
      checkboxError.textContent = "A feliratkozáshoz el kell fogadnod a feltételeket!";
      valid = false;
    } else {
      checkboxError.textContent = "";
    }

    if (valid) {
      feliratkozottEmailek.push(emailValue.toLowerCase());

      emailInput.value = "";
      checkbox.checked = false;

      alertBox.style.display = "block";
      setTimeout(() => alertBox.classList.add("show"), 10);

      setTimeout(() => {
        alertBox.classList.remove("show");
        setTimeout(() => {
          alertBox.style.display = "none";
        }, 600);
      }, 5000);
    }
  });
});