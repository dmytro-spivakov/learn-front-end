const DOG_URL = "https://dog.ceo/api/breeds/image/random";
const container = document.querySelector(".dog-picture-container");

function init() {
	let dogBtn = document.getElementById("btn-fetch-pic");
	dogBtn.addEventListener("click", fetchNewDoggo);
}

// fetch()
// function fetchNewDoggo() {
// 	const promise = fetch(DOG_URL);
// 	promise
// 		.then(function(response) {
// 			const processingPromise = response.text();
// 			return processingPromise;
// 		}).
// 		then(function(processedResponse) {
// 			const dogObj = JSON.parse(processedResponse);
// 			console.log(dogObj);
// 			const img = document.createElement("img");
// 			img.src = dogObj.message;
// 			img.alt = "Doggo";
//
// 			container.appendChild(img);
// 		}).catch(function(error) {
// 			alert(`Error - ${error}`);
// 		});
// }

// async await
async function fetchNewDoggo() {
	const promise = await fetch(DOG_URL);
	const processedResponse = await promise.json();
	const img = document.createElement("img");
	img.src = processedResponse.message;
	img.alt = "Doggo";
	container.appendChild(img);
}

init();
