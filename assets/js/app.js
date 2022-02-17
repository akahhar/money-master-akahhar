//Get input Value
function getInputValue(inputId) {
  const input = document.getElementById(inputId);
  // validate input value is a number and not empty string and must be a positive number
  if (input.value === "" || isNaN(input.value) || input.value < 0) {
    errorMessage(inputId, "Please enter a valid number", true);
    return 0;
  } else {
    removeErrorMessage(inputId);
    // return input value if input is valid
    return parseFloat(input.value);
  }
}

function errorMessage(id, message, input = false) {
  // append error message to input and append span element
  if (input) {
    const input = document.getElementById(id);
    // append error message to input and append span element
    input.classList.add("is-invalid");
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("invalid-feedback");
    errorMessage.innerText = "Please enter a valid number";
    // append error message to input if not exist already
    if (!input.parentElement.querySelector(".invalid-feedback")) {
      input.parentElement.appendChild(errorMessage);
    }
  } else {
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("d-block");
    errorMessage.classList.add("text-danger");
    errorMessage.innerText = message;
    // append error message to id if not exist already
    if (!document.getElementById(id).querySelector(".d-block")) {
      document.getElementById(id).appendChild(errorMessage);
    }
  }
}
// remove error message if input is valid
function removeErrorMessage(Id) {
  const input = document.getElementById(Id);
  const errorMessage = input.parentElement.querySelector(".invalid-feedback");
  if (errorMessage) {
    input.classList.remove("is-invalid");
    input.parentElement.removeChild(errorMessage);
  }
}
// sum of expense
function calcuclateExpesne() {
  const expenseFood = getInputValue("inputFood");
  const expenseRent = getInputValue("inputRent");
  const expenseClothes = getInputValue("inputClothes");
  let expenseTotal = 0;
  if (expenseFood !== 0 && expenseRent !== 0 && expenseClothes !== 0) {
    expenseTotal = expenseFood + expenseRent + expenseClothes;
  }
  return expenseTotal;
}

// Calculate all income and expenses
document.getElementById("calculateBtn").addEventListener("click", () => {
  const income = getInputValue("inputIncome");
  const sumOfExpenses = calcuclateExpesne();
  if (income !== 0 && sumOfExpenses !== 0) {
    // check if income is greater than expenses
    if (income > sumOfExpenses) {
      document.getElementById("totalExpenses").innerText = sumOfExpenses;
      document.getElementById("balance").innerText = income - sumOfExpenses;
    } else {
      document.getElementById("totalExpenses").innerText = "00";
      document.getElementById("balance").innerText = "00";
      errorMessage("balance", "Income must be greater than expenses");
    }
  }
});

// calcuclate savings amount and percentage
document.getElementById("saveBtn").addEventListener("click", () => {
  const income = getInputValue("inputIncome");
  const savings = getInputValue("inputSavings");
  const totalExpenses = calcuclateExpesne();
  if (income !== 0 && savings !== 0 && totalExpenses !== 0) {
    // check if income is greater than expenses
    if (income > totalExpenses) {
      document.getElementById("totalExpenses").innerText = totalExpenses;
      document.getElementById("balance").innerText = income - totalExpenses;
      const totalSavings = (savings / 100) * income;
      // make validation saving amount is less than income   
      
      if (totalSavings > income) {
        document.getElementById("savingAmount").innerText = "00";
        document.getElementById("remainingBalance").innerText = "00";

        errorMessage("savingAmount", "saving amount must be less than income");
      } else {
        
        const totalCostWithSave = totalExpenses + totalSavings;
        const remainingBalance = income - totalCostWithSave;
        if(remainingBalance > 0){
          document.getElementById("savingAmount").innerText = totalSavings;
          document.getElementById("remainingBalance").innerText =remainingBalance;
        }else{
          document.getElementById("savingAmount").innerText = "00";
          document.getElementById("remainingBalance").innerText = "00";
          errorMessage("savingAmount", "saving amount must be less than balance amount");
        }
                      
      }
      
    } else {
      document.getElementById("savingAmount").innerText = "00";
      document.getElementById("remainingBalance").innerText = "00";
      errorMessage("balance", "Income must be greater than expenses");
    }
  }
});
