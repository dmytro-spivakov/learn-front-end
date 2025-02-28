const display = document.querySelector(".display");

let operandsStack = [];
let operationsStack = [];
let flushDisplayOnInput = false;

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
			clear();
			break;
		case "←":
			removeLastDigitFromDisplay();
			break;
		case "÷":
			handleOperation("/");
			break;
		case "x":
			handleOperation("*");
			break;
		case "-":
			handleOperation("-");
			break;
		case "+":
			handleOperation("+");
			break;
		case "=":
			handleOperation("=");
			break;
		default:
			alert(`Unknown button - ${btnText}`);
	}
}

function handleOperation(operation) {
	operandsStack.push(Number.parseInt(display.innerHTML));
	// there's nothing to calc with =, it only gets us here
	if (operation != "=") {
		operationsStack.push(operation);
	}
	evalOperations();

	if (operandsStack.length < 1) {
		resetDisplay();
	} else {
		display.innerHTML = operandsStack[0];
		flushDisplayOnInput = true;
	}
	console.log(operandsStack);
	console.log(operationsStack);
}

function evalOperations() {
	while (operandsStack.length > 1) {
		let op1 = operandsStack.shift();
		let op2 = operandsStack.shift();
		let op = operationsStack.shift()

		let result;
		switch (op) {
			case "+":
				result = op1 + op2;
				break;
			case "-":
				result = op1 - op2;
				break;
			case "*":
				result = op1 * op2;
				break;
			case "/":
				result = op1 / op2;
				break;
			default:
				alert(`unknown op ${op}`);
		}
		operandsStack.unshift(result);
	}
}

function clear() {
	operandsStack = [];
	operationsStack = [];
	resetDisplay();
}

function resetDisplay() {
	display.innerHTML = "0";
}

function appendToDisplay(digit) {
	if (display.innerHTML === "0") {
		display.innerHTML = "";
	}

	if (flushDisplayOnInput) {
		display.innerHTML = "";
		flushDisplayOnInput = false;
	}

	display.innerHTML += digit;
}

function removeLastDigitFromDisplay() {
	if (display.innerHTML.length <= 1) {
		display.innerHTML = "0";
		return;
	}

	display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
}

function flashDisplay() {
	oldColor = display.style.background;
	display.style.background = 'blue';
	setTimeout(() => {
		display.style.background = oldColor;
	}, 100);
}


function init() {
	document
		.querySelector('.keyboard')
		.addEventListener("click", handleButtonClick);
}

init();
