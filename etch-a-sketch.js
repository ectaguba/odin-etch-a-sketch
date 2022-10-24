const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const grid = document.querySelector("#grid-container"); // parent grid
let gridSize = 16;

genDivs(gridSize);

function genDivs(size) {

    // set dimensions of columns and squares
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    // create , style, and add gridSize^2 items in parent grid container
    // add event listeners to each square
    for (let i = 0; i < Math.pow(size, 2); i++) { 
        const square = document.createElement('div');
        square.classList.add('square');

        // pass event target (reference to the element to which event was dispatched)
        square.addEventListener('mousedown', changeColor);
        square.addEventListener('mouseover', changeColor);
        grid.appendChild(square);
    }


}

function changeColor(e) {
    console.log(e.target); // e.target returns element where event was activated
    if (e.type === "mouseover" && !mouseDown) return;
    if (e.target.style.backgroundColor == "white") {
        e.target.style.backgroundColor = "black";
    } else {
        e.target.style.backgroundColor = "white";
    }
}