const display = document.querySelector(".display");
let operand1;
let operand2;
let operation;

function handleButtonClick(event) {
	if (!event.target.matches('button')) {
		return false;
	}

	let btnText = event.target.innerText;
	switch (btnText) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			appendToDisplay(btnText);
			break;
		case "C":
			clearDisplay();
			break;
		case "←":
			removeLastDigitFromDisplay();
			break;
		case "÷":
			setOperant1ToCurrentDisplay();
			setOperation("/");
			clearDisplay();
			break;
		case "x":
			setOperant1ToCurrentDisplay();
			setOperation("*");
			clearDisplay();
			break;
		case "-":
			setOperant1ToCurrentDisplay();
			setOperation("-");
			clearDisplay();
			break;
		case "+":
			setOperant1ToCurrentDisplay();
			setOperation("+");
			clearDisplay();
			break;
		case "=":
			setOperant2ToCurrentDisplay();
			display.innerHTML = applyCurrentOperation();
			clearState();
			break;
		default:
			alert(`Unknown button - ${btnText}`);
	}
}

function appendToDisplay(value) {
	if (display.innerHTML === "0") {
		display.innerHTML = "";
	}
	display.innerHTML += value;
}

function clearDisplay() {
	display.innerHTML = "0";
}

function removeLastDigitFromDisplay() {
	if (display.innerText.length <= 1) {
		return true;
	}

	display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
}

function setOperant1ToCurrentDisplay() {
	operand1 = Number.parseInt(display.innerHTML);
}

function setOperant2ToCurrentDisplay() {
	operand2 = Number.parseInt(display.innerHTML);
}

function setOperation(value) {
	operation = value;
}

function applyCurrentOperation() {
	switch (operation) {
		case "/":
			return operand1 / operand2;
		case "*":
			return operand1 * operand2;
		case "+":
			return operand1 + operand2;
		case "-":
			return operand1 - operand2;
		default:
			oldColor = display.style.background;
			display.style.background = 'blue';
			setTimeout(() => {
				display.style.background = oldColor;
			}, 100);
			setOperant1ToCurrentDisplay();
			return operand1;
	};
}

function clearState() {
	operand1 = undefined;
	operand2 = undefined;
	operation = undefined;
}

document
	.querySelector('.keyboard')
	.addEventListener("click", handleButtonClick);
