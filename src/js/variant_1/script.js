// piece object
const piece = (function () {

	const init = function (el, widthArea, heightArea, temp_c) {
		this.el = el;
		this.startX = el.style.left;
		this.startY = el.style.top;
		this.widthArea = widthArea;
		this.heightArea = heightArea;

		this.setColor = (color) => {
			this.el.style.background = color
			this.el.style.border = `1px solid ${color}`
		}

		if (temp_c <= 10) {
			this.setColor("blue");
		}
		if (temp_c > 10 && temp_c <= 20) {
			this.setColor("green");
		}
		if (temp_c > 20 && temp_c <= 30) {
			this.setColor("yellow");
		}
		if (temp_c > 30) {
			this.setColor("red");
		}
	};


	const moveDelta = function (dx, dy) {
		const pos = this.el.getBoundingClientRect();

		let left = pos.left; 
		let top = pos.top;

		let moveX = pos.left + dx;
		let moveY = pos.top + dy;

		let stepX = Math.sign(dx);
		let stepY = Math.sign(dy);

		let minX = minY = 0;
		let maxX = this.widthArea - pos.width;
		let maxY = this.heightArea - pos.height;

		let timer = setInterval(() => {
			left += stepX;
			top += stepY;

			if ((moveX === left) && (moveY === top)){
				clearInterval(timer);
				return;
			} 
			if ((left >= minX) && (left <= maxX)) {
				this.el.style.left = left + 'px';
			}
			if ((top >= minY) && (top <= maxY)){
				this.el.style.top = top + 'px';
			}
		}, 1);
	}

	return {
		init,
		moveDelta
	};
})();

function handleClick() {
	piece.moveDelta(parseInt(this.dataset.dx), parseInt(this.dataset.dy))
}

function handleClickReset() {
	this.el.style.left = this.startX;
	this.el.style.top = this.startY;
}

function handleClickRandom() {
	const pos = this.el.getBoundingClientRect();
	let left = Math.floor(Math.random() * (this.widthArea - pos.width));
	let top = Math.floor(Math.random() * (this.heightArea - pos.height));
	this.el.style.left = left + 'px';
	this.el.style.top = top + 'px';
}

function handleMouseEnter(e) {
	e.target.style.background = "white"
}

function handleMouseOut(e) {
	e.target.style.background = e.target.style.borderColor
}

function init() {
	move("btn-up", 0 , -100);
	move("btn-right", 100, 0);
	move("btn-down", 0, 100);
	move("btn-left", -100, 0);
	reset("btn-reset");
	randomPosition("btn-random");
	chageBgColorForPiece("piece");
}

function move(selector, x, y){
	const $btn = document.getElementById(selector);
	$btn.dataset.dx = x;
	$btn.dataset.dy = y;
	$btn.addEventListener("click", handleClick);
}

function reset(selector) {
	const $btn = document.getElementById(selector);
	$btn.addEventListener("click", handleClickReset.bind(piece));
}

function randomPosition(selector){
	const $btn = document.getElementById(selector);
	$btn.addEventListener("click", handleClickRandom.bind(piece));
}

function chageBgColorForPiece(selector) {
	const $piece = document.getElementById(selector);
	$piece.addEventListener("mouseenter", handleMouseEnter);
	$piece.addEventListener("mouseout", handleMouseOut);
}

function widthArea() {
	return window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;
}

function heightArea() {
	return window.innerHeight
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;
}

window.addEventListener("DOMContentLoaded", async event => {
	let response = await fetch('http://api.apixu.com/v1/current.json?key=dda6e762ae4f41efb7e173552192204&q=tel%20aviv');

	if (response.ok) {
		let json = await response.json();
		let temp_c = json.current.temp_c;

		piece.init(document.getElementById("piece"), widthArea(), heightArea(), temp_c);
		init();

	} else {
		alert("HTTP-Error: " + response.status);
	}
});