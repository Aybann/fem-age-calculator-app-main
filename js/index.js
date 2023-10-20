const yearInput = document.getElementById('year-input')
const monthInput = document.getElementById('month-input')
const dayInput = document.getElementById('day-input')
const calculateButton = document.getElementById('calculate')

const inputs = document.querySelectorAll('.input-container')

const dayErrorMessage = document.querySelector('.error-message-day')
const monthErrorMessage = document.querySelector('.error-message-month')
const yearErrorMessage = document.querySelector('.error-message-year')

const yearDisplay = document.querySelector(".years-output")
const monthDisplay = document.querySelector(".months-output")
const dayDisplay = document.querySelector(".days-output")

calculateButton.addEventListener('click', () => {
  var personBirthday = getValue()
  isValidated(personBirthday) && getAge(personBirthday)
})

function isValidated(birthday) {
  let isYearValid = true;
  let isMonthValid = true;
  let isDayValid = true;

  if (birthday.year === '' ) {
    yearErrorMessage.style.opacity = '1'
    yearErrorMessage.textContent = "This field is required"
    isYearValid = false
  } else if(birthday.year > new Date().getFullYear()) {
    yearErrorMessage.style.opacity = '1'
    yearErrorMessage.textContent = "Must be in the past"
    isYearValid = false
  } else {  
    isYearValid = true
    yearErrorMessage.style.opacity = '0'
  }

  if(birthday.month === '') {
    monthErrorMessage.style.opacity = '1'
    monthErrorMessage.textContent = "This field is required"
    isMonthValid = false
  } else if(birthday.month > 12) {
    monthErrorMessage.style.opacity = '1'
    monthErrorMessage.textContent = "Must be a valid month"
    isMonthValid = false
  } else { 
    isMonthValid = true
    monthErrorMessage.style.opacity = '0'
  }

  if(birthday.day === '') {
    dayErrorMessage.style.opacity = '1'
    dayErrorMessage.textContent = "This field is required"
    isDayValid = false
  } else if(birthday.day > 31) {
    dayErrorMessage.style.opacity = '1'
    dayErrorMessage.textContent = "Must be a valid day"
    isDayValid = false
  } else {  
    isDayValid = true
    dayErrorMessage.style.opacity = '0'
  }

  if((isYearValid && isMonthValid) && isDayValid) {
    inputs.forEach(input => {
      input.querySelector("input").classList.remove("error")
      input.querySelector("label").style.color = 'var(--smokey-grey)'
    })
  }
  else {
    inputs.forEach(input => {
      input.querySelector("input").classList.add("error")
      input.querySelector("label").style.color = 'var(--light-red)'
    })
  }

  return (isYearValid && isMonthValid) && isDayValid
}

function getValue() {
  const personData = {
    "day" : dayInput.value,
    "month": monthInput.value,
    "year": yearInput.value
  };
  return personData;
}

function getAge(birthday) {
  const today = new Date();
  var currentYear = today.getFullYear();
  var currentMonth = today.getMonth() + 1;
  var currentDay = today.getDate();
  var years;
  var months;
  var days;

  if(currentDay < birthday.day) {
    currentMonth -= 1
    days = (currentDay + 31) - birthday.day
  }
  else {
    days = currentDay- birthday.day
  }
  if(currentMonth < birthday.month) {
    currentYear -= 1;
    months = (currentMonth + 12) - birthday.month
  }
  else {
    months = (today.getMonth() + 1) - birthday.month
  }
  years = currentYear - birthday.year;

  yearDisplay.textContent = years
  monthDisplay.textContent = months.toString().length < 2 ?  `0${months.toString()}`   : months
  dayDisplay.textContent = days.toString().length < 2 ? `0${days.toString()}` : days
}