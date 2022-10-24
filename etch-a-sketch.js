const DEFAULT_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const colorBtn = document.querySelector('#colorBtn')
const rainbowBtn = document.querySelector('#rainbowBtn')
const eraserBtn = document.querySelector('#eraserBtn')
const clearBtn = document.querySelector('#clearBtn')
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => clearGrid()

function setCurrentMode(newMode) {
    currentMode = newMode;
}

function clearGrid() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((div) => {
        div.style.backgroundColor = "white";
    })
}

function randomColor() {
    let red = Math.floor(Math.random * 256);
    let green = Math.floor(Math.random * 256);
    let blue = Math.floor(Math.random * 256);
    return `rgb(${red}, ${green}, ${blue})`
}

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
    // e.target returns element that event was activated upon (div square)
    if (e.type === "mouseover" && !mouseDown) return;
    if (currentMode == "color") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode == "eraser") {
        e.target.style.backgroundColor = "white";
    } else if (currentMode == "rainbow") {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
}