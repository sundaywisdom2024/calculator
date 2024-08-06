
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
     
    // function 2
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    

    // function 3
    delete() {
       this.currentOperand = this.currentOperand.slice(0, -1);

    }

    // function 4
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    // function 5
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
       }

       this.operation = operation;
       this.previousOperand = this.currentOperand
       this.currentOperand = '';
   }

    // function 6
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return; 
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }

    // function 7
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0});
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
        
    }
}

 // DOM Selections
const numberButtons = document.querySelectorAll('[data-number]'); // Select all number buttons
const operationButtons = document.querySelectorAll('[data-operation]'); // Select all operation buttons
const equalsButton = document.querySelector('[data-equals]'); // Select the equals button
const deleteButton = document.querySelector('[data-delete]'); // Select the delete button
const allClearButton = document.querySelector('[data-all-clear]'); // Select the all-clear button
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'); // Select the element displaying previous operand
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'); // Select the element displaying current operand

// Calculator instance creation
const calculator = new Calculator(previousOperandTextElement, 
  currentOperandTextElement); // Initialize a new calculator instance

// Event listeners for number buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText); // Append clicked number to current operand
      calculator.updateDisplay(); // Update display
  });
});

// Event listeners for operation buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText); // Choose operation based on clicked button
      calculator.updateDisplay();
  });
});

// Event listener for equals button
equalsButton.addEventListener('click', button => {
  calculator.compute(); // Compute result
  calculator.updateDisplay(); // Update display
});

// Event listener for all-clear button
allClearButton.addEventListener('click', button => {
  calculator.clear(); // Clear calculator
  calculator.updateDisplay(); // Update display
});


// Event listener for delete button
deleteButton.addEventListener('click', button => {
  calculator.delete(); // Delete last character from current operand
  calculator.updateDisplay(); // updateDisplay
});

