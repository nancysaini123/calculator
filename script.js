let display = document.getElementById("display");
// Function to append values to the display
function appendToDisplay(value) {
    let lastChar = display.value.slice(-1);
    // Prevent multiple consecutive operators
    if (isOperator(lastChar) && isOperator(value)) return;
    // Handle percentage conversion
    if (value === "%") {
        let expression = display.value;
        let match = expression.match(/(\d+(?:\.\d+)?)$/);// Match last number in expression
        if (match) {
            let number = parseFloat(match[0]);
            display.value = expression.replace(/(\d+(?:\.\d+)?)$/, (number / 100).toString());// Convert to fraction
        }
    } else {
        display.value += value;// Append normal input
    }
}
// Function to clear the display
function clearDisplay() {
    display.value = "";
}
// Function to evaluate and calculate the result
function calculateResult() {
    try {
        display.value = eval(display.value);// Evaluate expression
    } catch {
        display.value = "Error";// Handle invalid expressions
    }
}
// Function to check if a character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}
// Event listener for keyboard inputs
// Supports numbers, operators, Enter (calculate), Backspace (delete), and Escape (clear)
document.addEventListener("keydown", function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendToDisplay(event.key);
    } else if (['+', '-', '*', '/'].includes(event.key)) {
        appendToDisplay(event.key);
    } else if (event.key === "%") {
        appendToDisplay('%');
    } else if (event.key === "Enter") {
        calculateResult();
    } else if (event.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});