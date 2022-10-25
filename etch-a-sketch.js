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

const colorPicker = document.querySelector('#colorPicker');
const colorBtn = document.querySelector('#colorBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const clearBtn = document.querySelector('#clearBtn');
const sizeSlider = document.querySelector('#sizeSlider');
const sizeLabel = document.querySelector('#sizeLabel');
colorPicker.addEventListener('change', changeColor);
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
clearBtn.onclick = () => clearGrid()
sizeSlider.addEventListener('change', setGridSize);

// SETTINGS
function changeColor(newColor) {
    // change to value of color picker
    currentColor = newColor.target.value;
}

function setCurrentMode(newMode) {
    // obtain active and selected buttons
    const current = document.querySelector(".active");
    const selected = document.querySelector(`#${newMode}Btn`);

    // add and remove class
    current.classList.remove("active");
    selected.classList.add('active');

    // reassign variable
    currentMode = newMode;
}

function clearGrid() {
    const squares = document.querySelectorAll(".square"); 
    squares.forEach((div) => {
        div.style.backgroundColor = "white";
    })
}

function setGridSize(event = DEFAULT_SIZE) {
    sizeLabel.textContent = `${event.target.value} x ${event.target.value}`;
    genDivs(event.target.value);
}

// GRID
function genDivs(size = DEFAULT_SIZE) {
    // Delete existing grid (remove square children)
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }
    // set dimensions of columns and squares
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    // create , style, and add gridSize^2 items in parent grid container
    for (let i = 0; i < Math.pow(size, 2); i++) { 
        const square = document.createElement('div');
        square.classList.add('square');

        // pass event target (reference to the element to which event was dispatched)
        square.addEventListener('mousedown', draw);
        square.addEventListener('mouseover', draw);
        grid.appendChild(square);
    }
}

function draw(e) {
    // e.target returns element that event was activated upon (div square)
    if (e.type === "mouseover" && !mouseDown) return;

    // go through modes
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

genDivs(16);