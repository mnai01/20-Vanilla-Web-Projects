const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  // return parent element which in this case is a "div class="form-control""
  const formControl = input.parentElement;
  console.log(formControl.className);
  formControl.className = 'form-control error';

  // querySelector can find element by using many different attributes
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show input success
function showSuccess(input, message) {
  // return parent element which in this case is a "div class="form-control""
  const formControl = input.parentElement;
  console.log(formControl.className);
  formControl.className = 'form-control success';
}

// Check email is valid
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Check password properties
function isValidPassword(password, password2) {
  if (password.value != password2.value) {
    error = {
      boolean: false,
      msg: 'Passwords not match',
    };
    return error;
  }
  if (password.value.length < 6) {
    error = {
      boolean: false,
      msg: 'Passwords not correct length',
    };
    return error;
  }
  if (password.value != password2.value && password.value.length < 6) {
    error = {
      boolean: false,
      msg: 'Passwords not match and not min length',
    };
    console.log(password.value + ' ' + password2.value);

    return error;
  }
  error = {
    boolean: true,
    msg: 'Correct',
  };
  return error;
}

// Check required
function checkRequired(input) {}

// Event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (username.value === '') {
    showError(username, 'Username is required');
  } else {
    showSuccess(username);
  }
  if (email.value === '') {
    showError(email, 'email is required');
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Email is not valid');
  } else {
    showSuccess(email);
  }
  if (password.value === '') {
    showError(password, 'password is required');
  } else if (!isValidPassword(password, password2).boolean) {
    console.log(!isValidPassword(password, password2).boolean);
    showError(password, isValidPassword(password, password2).msg);
  } else {
    showSuccess(password);
  }
  if (password2.value === '') {
    showError(password2, 'password2 is required');
  } else if (!isValidPassword(password, password2).boolean) {
    console.log(!isValidPassword(password, password2).boolean);
    showError(password2, isValidPassword(password, password2).msg);
  } else {
    showSuccess(password2);
  }
});
