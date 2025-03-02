const WORD_FETCH_URL = "https://words.dev-apis.com/word-of-the-day"
const WORD_VALIDATE_URL = "https://words.dev-apis.com/validate-word"

let wordOfTheDay;

let currentRowIdx = 0;
let currentCellIdx = 0;

let rows = document.querySelectorAll('.game-row');

async function handleKeystroke(event) {
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

		const commitRes = await commitRow();
		if (currentCellIdx > 4 && commitRes) {
			const cells = rowByIdx(currentRowIdx).querySelectorAll(".game-cell.correct-cell");
			if (cells.length >= 5) {
				alert("You won!");
			}

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

async function commitRow() {
	const currentRowCells = rowByIdx(currentRowIdx).querySelectorAll(".game-cell");
	let currentWord = "";
	currentRowCells
		.forEach((cell) => { currentWord += cell.innerHTML });

	if (!await validateWord(currentWord)) {
		flashErrorOnCurrentRow();
		return false;
	}

	let wodChars = wordOfTheDay.split("");
	let charCounter = wodChars.reduce((obj, char) => {
		if (obj[char] == undefined) {
			obj[char] = 0;
		}
		obj[char] += 1;

		return obj;
	}, {});
	currentRowCells.forEach((cell, currIdx) => {
		cell.classList.add("committed-cell");

		const currChar = cell.innerHTML.toUpperCase();
		const idx = wodChars.indexOf(currChar);
		if (idx < 0) {
			cell.classList.add("wrong-cell");
		} else if (idx === currIdx) {
			cell.classList.add("correct-cell");
			charCounter[currChar] -= 1;
		} else {
			charCounter[currChar] -= 1;
			if (charCounter[currChar] < 0) {
				cell.classList.add("wrong-cell");
			} else {
				cell.classList.add("mismatched-cell");
			}
		}
	});
	return true;
}

async function validateWord(word) {
	try {
		const response = await fetch(WORD_VALIDATE_URL, { method: "POST", body: JSON.stringify({ word: word }) });

		if (!response.ok) {
			alert(`validate word unexpected response - ${response}`);
		}

		const data = await response.json();
		if (typeof data.validWord !== "boolean") {
			alert(`validate word unexpected payload - ${data}`);
		}

		return data.validWord;
	} catch (error) {
		alert(`validate word error - ${error}`);
		throw error;
	}
}

async function fetchWordOfTheDay() {
	try {
		const response = await fetch(WORD_FETCH_URL, { method: "GET" });

		if (!response.ok) {
			alert(`Word fetch API request failed with - ${response}`);
		}

		const data = await response.json();
		if (typeof data.word !== "string" || data.word.length != 5) {
			alert(`Unexpected word value, response - ${data}`);
		}
		return data.word;
	} catch (error) {
		alert(`Word fetch failed with - ${error}`);
		throw error;
	}

}

function init() {
	fetchWordOfTheDay()
		.then(data => {
			wordOfTheDay = data.toUpperCase();
		});
	document.addEventListener("keyup", handleKeystroke);
}

init();
