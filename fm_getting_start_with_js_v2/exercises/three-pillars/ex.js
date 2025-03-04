class Bookshelf {
	constructor() {
		this.favoriteBooks = [];
	}

	addFavoriteBook(bookName) {
		if (!bookName.includes("Great")) {
			this.favoriteBooks.push(bookName);
		}
	}

	printFavoriteBooks() {
		console.log(`Favorite Books: ${String(this.favoriteBooks.length)}`);
		for (let bookName of this.favoriteBooks) {
			console.log(bookName);
		}
	}
}



function loadBooks(bookshelf) {
	fakeAjax(BOOK_API, function onBooks(bookNames) {
		for (let book of bookNames) {
			bookshelf.addFavoriteBook(book);
		}
		bookshelf.printFavoriteBooks();
	});
}

var BOOK_API = "https://some.url/api";

let myBooks = new Bookshelf();
loadBooks(myBooks);


// ***********************

// NOTE: don't modify this function at all
function fakeAjax(url, cb) {
	setTimeout(function fakeLoadingDelay() {
		cb([
			"A Song of Ice and Fire",
			"The Great Gatsby",
			"Crime & Punishment",
			"Great Expectations",
			"You Don't Know JS"
		]);
	}, 500);
}
