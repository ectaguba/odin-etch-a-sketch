let gridSize = 100;
genDivs(gridSize);
function genDivs(size) {
    
    const grid = document.querySelector("#grid-container"); // parent grid

    // create , style, and add gridSize^2 items in parent grid container
    // add event listeners to each square
    for (let i = 0; i < Math.pow(size, 2); i++) { 
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
    }

    const squares = document.querySelectorAll('.square');
    squares.forEach((div) => {
        div.addEventListener('mousedown', () => {
            drawSquare(div);
        });
    });

    // set dimensions of columns and squares
    grid.style.gridTemplateColumns = `repeat(${size}, auto)`;
    grid.style.gridTemplateRows = `repeat(${size}, auto)`;

    /* Stack Overflow Solution - https://stackoverflow.com/questions/11083345/creating-a-dynamic-grid-of-divs-with-javascript
    for (let i = 0; i < gridSize; i++) { // child of grid, parent of squares
        const div = document.createElement('div');

        for (let j = 0; j < gridSize; i++) { // child of row
            const square = document.createElement('div');
            square.classList.add("square");
            square.textContent = (i * j);
            div.appendChild(square);
        }
        grid.appendChild(div);
    }
    */
}

function drawSquare(square) {
    if (square.style.backgroundColor == "white") {
        square.style.backgroundColor = "black";
    } else {
        square.style.backgroundColor = "white";
    }
}

/* Shit setDimensions
function setDimensions(size) {
    let auto = 'auto'; // first column/row
    for (let i = 0; i < size - 1; i++) { // rest of columns/rows = all column/rows - 1
        auto += ' auto';
    }
    return auto;
}
*/