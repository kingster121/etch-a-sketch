/*
createGrid(userSelection) creates grid
    -gridTemplateColumns=userSelection, same for Rows
    -LOOP document.create('div') and append child to container

hoverOver(e) listens to when mouse hover over grid
    -changes box to darker shade of color with rgba()
    -getAlpha() to get opacity and make it darker

resetGrid(e) listens to button "reset-sketchbook" CLICK
    -clear grid
    -requestGridSize() prompts user for gridSize return number
    -calls createGrid(gridSize) and input user's gridSize

showGridLine(e) listens to button "display-gridlines" CLICK
    -on/off class="show-gridline"
*/
let defaultRows = 16;
let container = document.querySelector('.grid-container');
createGrid();

function createGrid(userSelection = defaultRows) {
    let gridSize = userSelection ** 2;
    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${userSelection},1fr)`;
    container.style.gridTemplateRows = `repeat(${userSelection},1fr)`;

    for (let i = 0; i < gridSize; i++) {
        container.appendChild(document.createElement('div'));
    }
}

container.addEventListener("mouseover", hoverOver);

function hoverOver(event) {
    event.target.style.backgroundColor = `rgba(0,0,0,${getAlpha(event.target)})`
}

function getAlpha(element) {
    let alphaTag = Number(window.getComputedStyle(element).backgroundColor.match(/[.?\d]+/g)[3]);
    if (alphaTag <= 1) {
        alphaTag += 0.1;
    }
    return alphaTag;
}

resetButton = document.getElementById("reset-sketchbook");
resetButton.addEventListener("click", resetGrid);

function resetGrid(event) {
    let newGridSize = requestGridSize();
    createGrid(newGridSize);
}

function requestGridSize() {
    {
        let userSelection = prompt("Please choose your new grid rows!");
        if (Number(userSelection) > 100){
            return;
        }
        else {
            return Number(userSelection);
        }
    }
}

showGridButton = document.getElementById("display-gridlines");
showGridButton.addEventListener("click", showGridline);

function showGridline(event) {
    let gridChildren = document.querySelector('.grid-container').children;
    if (gridChildren[0].classList.contains("add-gridlines")) {
        for (const child of gridChildren) {
            child.classList.remove("add-gridlines");
            showGridButton.textContent = "Show Gridlines";
        }
    }
    else {
        for (const child of gridChildren) {
            child.classList.add("add-gridlines");
            showGridButton.textContent = "Remove Gridlines";
        }
    }
}