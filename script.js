const add = (a, b) => {
    return a + b;
  };
const substract = (a, b) => {
  return a - b;
};
const multiply = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  return a / b;
};
  
const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
};

const output = document.querySelector(".calculatorOutput");
let firstDisplayedValue = 0;
let secondDisplayedValue = 0;
let operation = "";
let result = 0;
let clearAfterEnter = false;
const display = value => {
  if (
    output.textContent == "Error" ||
    (clearAfterEnter &&
      !["*", "/", "-", "+"].includes(
        output.textContent[output.textContent.length - 1]
      ))
  ) {
    output.textContent = 0;
    result = 0;
    clearAfterEnter = false;
  }
  if (output.textContent == 0) {
    if (value == ".") {
      output.textContent = output.textContent + value;
    }
    output.textContent = value;
  } else output.textContent += value;
};
const assignValues = value => {
  if (operation) {
    if (secondDisplayedValue == 0) {
      if (value == ".") {
        secondDisplayedValue += value;
      }
      secondDisplayedValue = value;
    } else secondDisplayedValue += value;
  } else {
    if (firstDisplayedValue == 0) {
      if (value == ".") {
        firstDisplayedValue += value;
      }
      firstDisplayedValue = value;
    } else firstDisplayedValue += value;
  }
};
const numbers = document.querySelectorAll(".number");
numbers.forEach(num => {
  num.addEventListener("click", () => {
    display(num.value);
    assignValues(num.value);
  });
});

const operations = [...document.querySelectorAll(".calculatorKeyOperator")];
operations.forEach(btn => {
  btn.addEventListener("click", () => {
    if (result) firstDisplayedValue = result;
    if (secondDisplayedValue && operation) {
      result =
        operate(
          operation,
          parseFloat(firstDisplayedValue),
          parseFloat(secondDisplayedValue)
        ).toFixed(4) * 1;
      if (result == Infinity || result == NaN) {
        output.textContent = "Error";
      } else {
        output.textContent = result;
      }
      firstDisplayedValue = 0;
      secondDisplayedValue = 0;
      operation = "";
    }
    if (
      !["*", "/", "-", "+"].includes(
        output.textContent[output.textContent.length - 1]
      )
    ) {
      operation = btn.value;
      output.textContent != "Error"
        ? (output.textContent = output.textContent + operation)
        : null;
    }
  });
});
const enter = document.querySelector(".calculatorKeyEnter");
enter.addEventListener("click", () => {
  result ? (firstDisplayedValue = result) : null;
  if (secondDisplayedValue && operation) {
    result =
      operate(
        operation,
        parseFloat(firstDisplayedValue),
        parseFloat(secondDisplayedValue)
      ).toFixed(4) * 1;
    console.log("result", result);
    if (result == (Infinity || NaN)) {
      output.textContent = "Error";
    } else {
      output.textContent = result;
      clearAfterEnter = true;
    }
    firstDisplayedValue = 0;
    secondDisplayedValue = 0;
    operation = "";
  }
});
const DisplayResult = (op, firstOperand, secondOperand) => {
  result = operate(op, parseFloat(firstOperand), parseFloat(secondOperand));
  result == (Infinity || NaN)
    ? (output.textContent = "Error")
    : (output.textContent = result);
  firstDisplayedValue = 0;
  secondDisplayedValue = 0;
  operation = "";
};
const backspace = document.querySelector(".calculatorKeyBackspace");
backspace.addEventListener("click", () => {
  if (clearAfterEnter || output.textContent == "Error") {
    output.textContent = 0;
    result = 0;
    return;
  }
  let text = output.textContent;
  output.textContent = text.slice(0, text.length - 1);
  if (!output.textContent) {
    output.textContent = 0;
  }
  operation
    ? (secondDisplayedValue = secondDisplayedValue.slice(0,secondDisplayedValue.length - 1))
    : (firstDisplayedValue = firstDisplayedValue.slice(0, firstDisplayedValue.length - 1));
});
const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  output.textContent = 0;
  firstDisplayedValue = 0;
  secondDisplayedValue = 0;
  operation = "";
  result = 0;
});