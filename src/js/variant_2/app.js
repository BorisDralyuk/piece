const init = () => {
	const btnUp = document.getElementById("btn-up");
	const btnLeft = document.getElementById("btn-left");
	const btnRight = document.getElementById("btn-right");
	const btnDown = document.getElementById("btn-down");
	const btnReset = document.getElementById("btn-reset");
	const btnRandom = document.getElementById("btn-random");

	btnUp.addEventListener('click', () => {
		pieceObj.move('top', -100);
	})

	btnDown.addEventListener('click', () => {
		pieceObj.move('top', 100);
	})

	btnLeft.addEventListener('click', () => {
		pieceObj.move('left', -100);
	})

	btnRight.addEventListener('click', () => {
		pieceObj.move('left', 100);
	})

	btnReset.addEventListener('click', () => {
		pieceObj.reset();
	})

	btnRandom.addEventListener('click', () => {
		pieceObj.random();
	})
}

window.addEventListener("DOMContentLoaded", async event => {
	let response = await fetch('http://api.apixu.com/v1/current.json?key=dda6e762ae4f41efb7e173552192204&q=tel%20aviv');

	if (response.ok) {
		let json = await response.json();
		let temp_c = json.current.temp_c;

		pieceObj.init(temp_c);
		init();

	} else {
		alert("HTTP-Error: " + response.status);
	}
});
