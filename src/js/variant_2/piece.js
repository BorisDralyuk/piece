const pieceObj = (function () {

	const init = (temp_c) => {
		this.piece = document.getElementById("piece");
		this.startX = piece.style.left;
		this.startY = piece.style.top;
		setColorPiece(temp_c);
		color();
	}

	const reset = () => {
		piece.style.left = startX;
		piece.style.top = startY;
	}

	const random = () => {
		const pos = piece.getBoundingClientRect();
		let left = Math.floor(Math.random() * (area('left') - pos.width));
		let top = Math.floor(Math.random() * (area('top') - pos.height));
		piece.style.left = `${left}px`;
		piece.style.top = `${top}px`;
	}

	const move = (direction, distance) => {
		let directionStep = Math.sign(distance);
		let dist = Math.abs(distance);

		let interval = setInterval(() => {

			if (dist === 0) {
				clearInterval(interval);
				return;
			}

			const pos = piece.getBoundingClientRect();
			let position = pos[direction] + directionStep;

			if ((position > 0) && (position <= area(direction) - pos.width)) {
				piece.style[direction] = `${position}px`;
			} 
			--dist;
		}, 1);


	}

	// private methods

	const setColor = (color) => {
		piece.style.background = color;
		piece.style.border = `1px solid ${color}`;
	}

	const setColorPiece = (temp_c) => {
		if (temp_c <= 10) {
			setColor("blue");
		}
		if (temp_c > 10 && temp_c <= 20) {
			setColor("green");
		}
		if (temp_c > 20 && temp_c <= 30) {
			setColor("yellow");
		}
		if (temp_c > 30) {
			setColor("red");
		}
	}

	const area = (direction) => {
		if (direction === 'top') {
			return window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight;
		}
		if (direction === 'left') {
			return window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;
		}
	}

	const color = () => {
		piece.addEventListener("mouseenter", handleMouseEnter);
		piece.addEventListener("mouseout", handleMouseOut);
	}

	const handleMouseEnter = (e) => {
		e.target.style.background = "white";
	}

	const handleMouseOut = (e) => {
		e.target.style.background = e.target.style.borderColor;
	}

	return {
		init,
		move,
		reset,
		random,
		color
	}

})();