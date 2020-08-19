export function randomColor(alpha = 0.2) {
	let r = Math.floor(Math.random() * 255);
	let g = Math.floor(Math.random() * 255);
	let b = Math.floor(Math.random() * 255);
	return `rgba(${r},${g},${b},${alpha})`;
}
