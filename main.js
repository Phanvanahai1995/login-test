const btn = document.querySelector("form-btn");
const form = document.getElementById("form");
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const message = document.getElementById("message");
const subject = document.getElementById("subject");
const formInput = document.querySelectorAll(".form-input");

// Function show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-input error";
  const span = formControl.querySelector("span");
  span.innerText = message;
}

// Function show input success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-input success";
  const span = formControl.querySelector("span");
  span.innerText = "";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else if (input.value.trim() === "") {
    showError(input, `Vui lòng nhập thông tin`);
  } else {
    showError(input, "Vui lòng nhập đúng định dạng email");
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `Vui lòng nhập thông tin`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Vui lòng nhập thông tin`);
  } else if (input.value.length > max) {
    showError(input, `${input.name} nhiều nhất ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Check phone

function isValidPhone(input) {
  const phonePattern = /^\d{10,15}$/;
  if (phonePattern.test(input.value.trim())) {
    showSuccess(input);
  } else if (input.value.trim() === "") {
    showError(input, `Vui lòng nhập thông tin`);
  } else {
    showError(input, "Vui lòng nhập đúng định dạng phone");
  }
}

/////////////////////// Event
// function check all

function eventInputCheck(event, el, arr) {
  if (arr.length < 3) {
    el.addEventListener(event, function () {
      checkRequired(arr);
      checkLength(arr[2], 6, 25);
      checkLength(arr[3], 6, 25);
      checkLength(arr[4], 6, 200);
      checkEmail(arr[0]);
      isValidPhone(arr[1]);
    });
  } else {
    el.addEventListener(event, function () {
      checkRequired(arr);
      checkLength(arr[2], 6, 25);
      checkLength(arr[3], 6, 25);
      checkLength(arr[4], 6, 200);

      checkEmail(arr[0]);
      isValidPhone(arr[1]);
    });
  }
}

function checkAll(inputArr) {
  inputArr.forEach((input) => {
    eventInputCheck("input", input, inputArr);
    eventInputCheck("blur", input, inputArr);
  });
}

checkAll([email, phone, name, message, subject]);

function removeDataForm() {
  email.value = "";
  phone.value = "";
  name.value = "";
  message.value = "";
  subject.value = "";
  formInput.forEach((el) => {
    el.classList.remove("error");
    el.classList.remove("success");
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([email, phone, name, message, subject]);
  checkLength(name, 6, 25);
  checkLength(subject, 6, 25);
  checkLength(message, 6, 200);
  isValidPhone(phone);
  checkEmail(email);

  if (
    Array.from(formInput).every((input) => input.classList.contains("success"))
  ) {
    removeDataForm();
  }
});
