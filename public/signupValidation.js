const form = document.getElementsByTagName('form')[0];
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const error = document.querySelector('.error');
const underage = document.getElementById('under18'); 
const adult = document.getElementById('over18'); 
const time = document.getElementById('time'); 

const usernameErr = document.getElementById('username-err');
const passwordErr = document.getElementById('password-err');
const confirmErr = document.getElementById('confirm-password-err');
const ageErr = document.getElementById('age-err');
const timeErr = document.getElementById('time-err');  


const checkUsername = () => {
  if (username.validity.valueMissing) {
    displayErr(usernameErr, 'Please enter a username');
  } else {
    displayErr(usernameErr, '');
    return true;
  }
};

const checkPw = () => {
  if (password.validity.patternMismatch) {
    displayErr(
      passwordErr,
      'Password must contain at least eight characters, including one letter and one number',
    );
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, 'Please enter a password');
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
  } else {
    displayErr(confirmErr, '');
    return true;
  }
};

/**
 * Check if the user is over 18 
 */
const checkAge = () => {
  if (!underage.checked && !adult.checked){
    displayErr(ageErr, 'Please select one option'); 
  }
  else if (underage.checked){
    displayErr(ageErr, 'Sorry you need to be 18 or over to use the app'); 
  }
  else if (adult.checked){
    displayErr(ageErr, ''); 
    return true; 
  }
  else{
    displayErr(ageErr, ''); 
    return true; 
  }
}

/**
 * Check that the user has selected a wake up time
 */
const checkTime = () => {
  if (time.validity.valueMissing){
    displayErr(timeErr, 'Please choose an option'); 
  }
  else return true; 
}


function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

username.addEventListener('focusout', checkUsername);
password.addEventListener('focusout', checkPw);
confirmPassword.addEventListener('focusout', checkConfirmPw);
underage.addEventListener('click', checkAge); 
adult.addEventListener('click', checkAge); 


form.addEventListener('submit', (event) => {
  if (!checkUsername()) {
    event.preventDefault();
  }
  if (!checkPw()) {
    event.preventDefault();
  }
  if (!checkConfirmPw()) {
    event.preventDefault();
  }
  if (!checkAge()){
    event.preventDefault();
  }
  if (!checkTime()){
      event.preventDefault(); 
  }
});
