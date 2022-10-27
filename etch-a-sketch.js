// NOTE: Always use rgba() attribute for color.
const DEFAULT_COLOR = 'rgba(51, 51, 51, 1)';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 16;
const DEFAULT_OPACITY = 1;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const grid = document.querySelector("#grid-container"); // parent grid
const whiteSquare = 'rgba(255, 255, 255, 1)'

const colorPicker = document.querySelector('#colorPicker');
const colorBtn = document.querySelector('#colorBtn');
const rainbowBtn = document.querySelector('#rainbowBtn');
const eraserBtn = document.querySelector('#eraserBtn');
const lightenBtn = document.querySelector('#lightenBtn');
const shadeBtn = document.querySelector('#shadeBtn');
const borderBtn = document.querySelector('#borderBtn');
const clearBtn = document.querySelector('#clearBtn');
const sliderLock = document.querySelector('#sliderLock');
const sizeSlider = document.querySelector('#sizeSlider');
const sizeLabel = document.querySelector('#sizeLabel');

colorPicker.addEventListener('change', changeColor);
colorBtn.onclick = () => setCurrentMode("color");
rainbowBtn.onclick = () => setCurrentMode("rainbow");
eraserBtn.onclick = () => setCurrentMode("eraser");
lightenBtn.onclick = () => setCurrentMode("lighten");
shadeBtn.onclick = () => setCurrentMode("shade");
borderBtn.onclick = () => toggleBorders();
clearBtn.onclick = () => clearGrid();
sizeSlider.addEventListener('change', setGridSize); // IMPORTANT: The check passes the opposite state (ex. uncheck -> check passes checked = true)
sliderLock.addEventListener('input', lockSlider);

// change color picker hex to rgba
function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, 1)`;
}

// SETTER
function changeColor(newColor) {
    currentColor = hexToRGB(newColor.target.value);
}

// SETTER - changes how square divs are colored
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
    let text = "Are you SURE you want to clear your sketch?";
    if (confirm(text)) { // one last confirm before passing true
        // loop through all squares
        const squares = document.querySelectorAll(".square"); 
        squares.forEach((div) => {
            div.style.backgroundColor = whiteSquare;
        })
    }
}

// SETTER
function setGridSize(event = DEFAULT_SIZE) {
    sizeLabel.textContent = `${event.target.value} x ${event.target.value}`;
    genDivs(event.target.value);
}

function lockSlider(event) {
    // NOTE: Unchecking a checked box will pass false
    // In other words, the check event will pass the opposite state of the checkbox
    if (!event.target.checked) {
        let text = "WARNING: Moving the slider will erase your sketch. Continue?";
        if (confirm(text)) {
            sizeSlider.disabled = false; 
            sliderLock.checked = false; // uncheck
        } else {
            sizeSlider.disabled = true;
            sliderLock.checked = true; // stay checked
        } 
    } else if (event.target.checked) {
        sizeSlider.disabled = true;
        sliderLock.checked = true;
    }
}

// Grid function
function genDivs(size = DEFAULT_SIZE) {

    if (borderBtn.classList.contains("toggle-on")) borderBtn.classList.toggle("toggle-on");

    // Delete existing grid (remove square children)
    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }

    // set dimensions of columns and squares
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    grid.style.backgroundColor = whiteSquare; // backdrop

    // create , style, and add gridSize^2 items in parent grid container
    for (let i = 0; i < Math.pow(size, 2); i++) { 
        const square = document.createElement('div');
        square.style.backgroundColor = whiteSquare;
        square.classList.add('square');

        // pass event target (reference to the element to which event was dispatched)
        square.addEventListener('mousedown', draw);
        square.addEventListener('mouseover', draw);
        grid.appendChild(square);
    }
}

/* regex - at least 1-3 digits followed by a comma

/\d{1,3}/g

/ - boundaries
\d - digit
{1,3} - sequence of one to three digits
g - global?
*/

function toggleBorders() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((div) => div.classList.toggle("square-borders")) 
    grid.classList.toggle("grid-container-borders");
    borderBtn.classList.toggle("toggle-on");
}

function lightenOrShade(squareColor) { // Pass rgba(r, g, b, a) value
    if (squareColor == null || squareColor == 0) return;
    const re = /\d{1,3}/g; // obtain values
    let rgbArray = squareColor.match(re); // create array of values
    let r = parseInt(rgbArray[0]);
    let g = parseInt(rgbArray[1]);
    let b = parseInt(rgbArray[2]);
    if (currentMode == "lighten") {
        r += 16; 
        g += 16; 
        b += 16;
        if (r > 255) r = 255;
        if (g > 255) g = 255;
        if (b > 255) b = 255;
        return `rgba(${r}, ${g}, ${b}, 1)`;
    } else if (currentMode == "shade") {
        r -= 16; 
        g -= 16;
        b -= 16;
        if (r < 0) r = 0;
        if (g < 0) g = 0;
        if (b < 0) b = 0;
        return `rgba(${r}, ${g}, ${b}, 1)`;
    }
} 

// pass square element from genDivs()
function draw(e) {
    // e.target returns element that event was activated upon (div square)
    let square = e.target;
    if (e.type === "mouseover" && !mouseDown) return;

    // Check modes
    if (currentMode == "color") {
        square.style.backgroundColor = currentColor;
    } else if (currentMode == "eraser") {
        square.style.backgroundColor = whiteSquare;
    } else if (currentMode == "rainbow") {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        square.style.background = `rgba(${red}, ${green}, ${blue}, 1)`;
    } else if (currentMode == "lighten") {
        square.style.backgroundColor = lightenOrShade(square.style.backgroundColor);
    } else if (currentMode == "shade") {  
        square.style.backgroundColor = lightenOrShade(square.style.backgroundColor);
    }
}

genDivs(16);