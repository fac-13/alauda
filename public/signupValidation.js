const form = document.getElementsByTagName('form')[0];
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const error = document.querySelector('.error');
const time = document.getElementById('time');

const usernameErr = document.getElementById('username-err');
const passwordErr = document.getElementById('password-err');
const confirmErr = document.getElementById('confirm-password-err');
const timeErr = document.getElementById('time-err');

const checkUsername = () => {
  if (username.validity.valueMissing) {
    displayErr(usernameErr, 'Please enter a username');
    usernameErr.classList.add('error-on');
  } else {
    displayErr(usernameErr, '');
    return true;
  }
};

const checkPw = () => {
  if (password.validity.patternMismatch) {
    displayErr(
      passwordErr,
      'Password must contain at least eight characters, including one letter and one number'
    );
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, 'Please enter a password');
    passwordErr.classList.add('error-on');
  } else {
    displayErr(passwordErr, '');
    return true;
  }
};

const checkConfirmPw = () => {
  if (password.value !== confirmPassword.value) {
    displayErr(confirmErr, 'Passwords do not match');
  } else if (confirmPassword.validity.valueMissing) {
    displayErr(confirmErr, 'Please confirm your password');
    confirmErr.classList.add('error-on');
  } else {
    displayErr(confirmErr, '');
    return true;
  }
};
/**
 * Check that the user has selected a wake up time
 */
const checkTime = () => {
  if (time.validity.valueMissing) {
    displayErr(timeErr, 'Please choose an option');
  } else return true;
};

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

if (window.location.pathname == '/signup') {
  username.addEventListener('focusout', checkUsername);
  password.addEventListener('focusout', checkPw);
  confirmPassword.addEventListener('focusout', checkConfirmPw);

  form.addEventListener('submit', event => {
    if (!checkUsername()) {
      event.preventDefault();
    }
    if (!checkPw()) {
      event.preventDefault();
    }
    if (!checkConfirmPw()) {
      event.preventDefault();
    }
    if (!checkTime()) {
      event.preventDefault();
    }
  });
}
