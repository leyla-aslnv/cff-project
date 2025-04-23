const apiBaseURL = "https://v6.exchangerate-api.com/v6/d0610bbc006dc9667acf4fe9/latest/";

const inputLeft = document.querySelector(".input1");
const inputRight = document.querySelector(".input2");
const leftCurrencyButtons = document.querySelectorAll(".left div");
const rightCurrencyButtons = document.querySelectorAll(".right div");
const conversionInfoLeft = document.querySelector(".p1");
const conversionInfoRight = document.querySelector(".p2");
const errorMessage = document.querySelector(".error");

let leftCurrency = "RUB";
let rightCurrency = "USD";
let conversionRates = {};
let isUserTyping = "input1"; 


function updateBackground(selectedButtons, selectedCurrency) {
  selectedButtons.forEach((button) => {
    if (button.textContent === selectedCurrency) {
      button.style.backgroundColor = "blueviolet";
      button.style.color = "white";
    } else {
      button.style.backgroundColor = "white";
      button.style.color = "gray";
    }
  });
}

function fetchExchangeRates(baseCurrency, callback) {
  fetch(`${apiBaseURL}${baseCurrency}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("API ilə əlaqə qurulmadı.");
      }
      return response.json();
    })
    .then((data) => {
      if (data.result === "success") {
        callback(null, data.conversion_rates);
      } else {
        throw new Error("Valyuta məlumatları uğursuz oldu.");
      }
    })
    .catch((error) => {
      callback(error, null);
    });
}

function rubToTarget(amount, fromCurrency, toCurrency) {
  const rate = conversionRates[toCurrency] / conversionRates[fromCurrency];
  return rate ? (amount * rate).toFixed(5).replace(",", ".") : null;
}


function updateInput1() {
  isUserTyping = "input1";
  let input1Value = inputLeft.value.replace(",", ".");
  if (isNaN(input1Value) || input1Value.includes(" ")) {
    inputRight.value = "";
    return;
  }
  const result = rubToTarget(parseFloat(input1Value), leftCurrency, rightCurrency);
  if (result !== null) {
    inputRight.value = result;
    updateConversionInfo(leftCurrency, rightCurrency);
  }
}

function updateInput2() {
  isUserTyping = "input2";
  let input2Value = inputRight.value.replace(",", ".");
  if (isNaN(input2Value) || input2Value.trim() === "") {
    inputLeft.value = "";
    return;
  }
  const inverseResult = rubToTarget(parseFloat(input2Value), rightCurrency, leftCurrency);
  if (inverseResult !== null) {
    inputLeft.value = inverseResult;
    updateConversionInfo(rightCurrency, leftCurrency);
  }
}

function updateConversionInfo(fromCurrency, toCurrency) {
  const rate = conversionRates[toCurrency] / conversionRates[fromCurrency];
  const inverseRate = 1 / rate;
  conversionInfoLeft.textContent = `1 ${fromCurrency} = ${rate.toFixed(5)} ${toCurrency}`;
  conversionInfoRight.textContent = `1 ${toCurrency} = ${inverseRate.toFixed(5)} ${fromCurrency}`;
}

function selectCurrency(button, isLeft) {
  if (isLeft) {
    leftCurrency = button.textContent;
    updateBackground(leftCurrencyButtons, leftCurrency);
  } else {
    rightCurrency = button.textContent;
    updateBackground(rightCurrencyButtons, rightCurrency);
  }
  fetchExchangeRates(leftCurrency, (error, rates) => {
    if (error) {
      errorMessage.textContent = error.message;
      return;
    }
    conversionRates = rates;
    if (isUserTyping === "input1") {
      updateInput1();
    } else {
      updateInput2();
    }
  });
}

function validateInput(event) {
  const validCharacters = /^[0-9.,]*$/;
  if (!validCharacters.test(event.target.value)) {
    event.target.value = event.target.value.slice(0, -1);
  }
}

inputLeft.addEventListener("input", (event) => {
  validateInput(event);
  updateInput1();
});

inputRight.addEventListener("input", (event) => {
  validateInput(event);
  updateInput2();
});

leftCurrencyButtons.forEach((button) => {
  button.addEventListener("click", () => selectCurrency(button, true));
});

rightCurrencyButtons.forEach((button) => {
  button.addEventListener("click", () => selectCurrency(button, false));
});

window.addEventListener("DOMContentLoaded", function () {
  inputLeft.value = 500;
  updateBackground(leftCurrencyButtons, leftCurrency);
  updateBackground(rightCurrencyButtons, rightCurrency);
  fetchExchangeRates(leftCurrency, (error, rates) => {
    if (error) {
      errorMessage.textContent = error.message;
      return;
    }
    conversionRates = rates;
    updateInput1();
  });
});

 
function handleInputValidation(event) {
    let inputValue = event.target.value;
  
    
    
  

    if (inputValue === "" && event.inputType === "deleteContentBackward") {
      return;
    }
  
   
    if (inputValue === "0" || inputValue === "." || inputValue === ",") {
      inputValue = "0.";
    }
    if (inputValue === "0." && event.inputType === "deleteContentBackward") {
        inputValue = ""; 
      }
   
    const regex = /^[0-9]*([.,]?[0-9]{0,5})$/;
    if (!regex.test(inputValue)) {
      inputValue = inputValue.slice(0, -1); 
    }
  
   
    if (inputValue.length > 15) {
      inputValue = inputValue.slice(0, 15);
    }
    inputValue = inputValue.replace(",", ".");
    event.target.value = inputValue;
  }
  
  inputLeft.addEventListener("input", (event) => {
    handleInputValidation(event); 
    updateInput1(); 
  });
  
  inputRight.addEventListener("input", (event) => {
    handleInputValidation(event); 
    updateInput2(); 
  });

  function updateInput1() {
    isUserTyping = "input1";
  
   
    let input1Value = inputLeft.value.replace(",", ".");

    if (input1Value.trim() === "" || isNaN(input1Value)) {
      inputRight.value = "";
      conversionInfoLeft.textContent = "";
      conversionInfoRight.textContent = "";
      return;
    }   
    const result = rubToTarget(parseFloat(input1Value), leftCurrency, rightCurrency);
  
    
    if (result !== null) {
      inputRight.value = result;
      updateConversionInfo(leftCurrency, rightCurrency);
    }
  }

  
  function updateInput1() {
    isUserTyping = "input1";
  
    let input1Value = inputLeft.value.replace(",", ".");
  
    if (input1Value.trim() === "" || isNaN(input1Value)) {
      inputRight.value = "";
      return;
    }
    const result = rubToTarget(parseFloat(input1Value), leftCurrency, rightCurrency);

    if (result !== null) {
      inputRight.value = result;
      updateConversionInfo(leftCurrency, rightCurrency);
    }
  }
  function updateInput2() {
    isUserTyping = "input2";

    let input2Value = inputRight.value.replace(",", ".");

    if (input2Value.trim() === "" || isNaN(input2Value)) {
      inputLeft.value = "";
      return;
    }

    const inverseResult = rubToTarget(parseFloat(input2Value), rightCurrency, leftCurrency);
    if (inverseResult !== null) {
      inputLeft.value = inverseResult;
      updateConversionInfo(rightCurrency, leftCurrency);
    }
  }


function updateConversionInfo(fromCurrency, toCurrency) {
  const rate = conversionRates[toCurrency] / conversionRates[fromCurrency];
  const inverseRate = 1 / rate;

  
  conversionInfoLeft.textContent = `1 ${fromCurrency} = ${rate.toFixed(5)} ${toCurrency}`;
  conversionInfoRight.textContent = `1 ${toCurrency} = ${inverseRate.toFixed(5)} ${fromCurrency}`;
}

function selectCurrency(button, isLeft) {
  if (isLeft) {
    leftCurrency = button.textContent;
    updateBackground(leftCurrencyButtons, leftCurrency);
  } else {
    rightCurrency = button.textContent;
    updateBackground(rightCurrencyButtons, rightCurrency);
  }


  fetchExchangeRates(leftCurrency, (error, rates) => {
    if (error) {
      errorMessage.textContent = error.message;
      return;
    }
    conversionRates = rates;
    updateConversionInfo(leftCurrency, rightCurrency);  

    if (isUserTyping === "input1") {
      updateInput1();
    } else {
      updateInput2();
    }
  });
}

function updateConversionInfo(fromCurrency, toCurrency) {
  const rate = conversionRates[toCurrency] / conversionRates[fromCurrency];
  const inverseRate = 1 / rate;
  errorMessage.classList.add ("dis-none")

  conversionInfoLeft.textContent = `1 ${fromCurrency} = ${rate.toFixed(5)} ${toCurrency}`;
  conversionInfoRight.textContent = `1 ${toCurrency} = ${inverseRate.toFixed(5)} ${fromCurrency}`;
}

// 

// function internetError () {
//   if (!navigator.onLine) {
//  errorMessage.classList.remove("dis-none")
//   if (rightCurrency == leftCurrency) {
//     if(isUserTyping == "input1") {
//       input2Value = input1Value
//     }
//     else if (isUserTyping == "input2") {
//       input1Value = input2Value
//     }
  
//   }

//   else if (leftCurrency != rightCurrency) {

//   }
//   else {
//     errorMessage.classList.add ("dis-none");
//   }
// }
 

function internetError() {
  while (!navigator.onLine) {
      errorMessage.classList.remove('dis-none');
      if(rightCurrency == leftCurrency){

          if(isUserTyping == "input1"){
          input2Value = input1Value;
          }
          else if(isUserTyping == "input2"){
            input1Value = input2Value;
          }
          break;
      }
      else if(rightCurrency != leftCurrency){
        if(isUserTyping == "input1"){
          input2Value = "";
          }
          else if(isUserTyping == "input2"){
            input1Value = "";
          }
          break;
      }
  }
  while (navigator.onLine) {
      if (errorMessage.classList != "dis-none") {
          errorMessage.classList.add('dis-none')
          updateConversionInfo(leftCurrency,rightCurrency)
      }
      break;
    }
    
}

internetError ();
window.addEventListener("online" , () => {
  updateConversionInfo(rightCurrency, leftCurrency);
})
window.addEventListener("offline" , internetError)
