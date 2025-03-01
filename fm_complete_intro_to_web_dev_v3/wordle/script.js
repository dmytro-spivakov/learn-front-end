let currentRowIdx = 0;
let currentCellIdx = 0;

let rows = document.querySelectorAll('.game-row');

function handleKeystroke(event) {
	console.log(event);
	console.log(`${event.key} is a valid key - ${isValidKey(event.key)}`);

	const key = event.key;
	if (isALetter(key)) {
		if (currentCellIdx > 4) {
			flashErrorOnCurrentRow();
			return false;
		}

		const currentCell = cellByIdx(currentRowIdx, currentCellIdx);
		currentCell.innerHTML = event.key;
		currentCellIdx += 1;
	} else if (key == "Enter") {
		if (isEnd()) {
			alert("You lost!");
		}

		if (currentCellIdx > 4) {
			currentRowIdx += 1;
			currentCellIdx = 0;
		} else {
			flashErrorOnCurrentRow();
		}
	} else if (key == "Backspace") {
		if (currentCellIdx > 0) {
			currentCellIdx -= 1;
			const currentCell = cellByIdx(currentRowIdx, currentCellIdx);
			currentCell.innerHTML = "";
		} else {
			flashErrorOnCurrentRow();
		}
	} else {
		// ignore it
	}
}

function flashErrorOnCurrentRow() {
	const row = rowByIdx(currentRowIdx);
	row.classList.add("error-shake");

	row.addEventListener("animationend", () => {
		row.classList.remove("error-shake");
	});

	//
}

function isValidKey(key) {
	return isALetter(key) || ["Backspace", "Enter"].includes(key);
}

function isALetter(key) {
	const re = /^[a-zA-Z]{1}$/
	return re.test(key);
}

function cellByIdx(rowIdx, cellIdx) {
	const currentCell = rowByIdx(rowIdx).querySelectorAll('.game-cell')[cellIdx];

	if (currentCell == undefined) {
		alert(`Couldn't find cell with row idx ${rowIdx}, cell idx ${cell}`);
	}

	return currentCell;
}

function rowByIdx(rowIdx) {
	const currentRow = rows[rowIdx];

	if (currentRow == undefined) {
		alert(`Couldn't find row with idx ${idx}`);
		return undefined;
	}

	return currentRow;
}

function isEnd() {
	return currentRowIdx >= 5 && currentCellIdx > 4
}

function init() {
	document.addEventListener("keyup", handleKeystroke);
}

init();
