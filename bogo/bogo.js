let n = 3; // Initial array size
const array = [];
const container = document.getElementById('container');
const arraySizeSlider = document.getElementById('array-size-slider');
const sortButton = document.getElementById('sort-button');
const randomizeButton = document.getElementById('randomize-button');

let isSorting = false;
let animationSpeed = 500;
let maxIterations = 10000;
arraySizeSlider.addEventListener('input', function () {
    if (!isSorting) {
        n = parseInt(this.value, 10);
        init();
    }
});

randomizeButton.addEventListener('click', function () {
    randomize();
});

sortButton.addEventListener('click', function () {
    sort();
});

function init() {
    array.length = 0;
    for (let i = n; i > 0; i--) {
        array.push(i / n);
    }
    showBars();
}

function sort() {
    if (!isSorting) {
        disableControls();
        isSorting = true;
        bogoSort(0);
    }
}

function bogoSort(iteration) {
    if (isSorted()) {
        enableControls();
        isSorting = false;
        return;
    }

    if (iteration >= maxIterations) {
        console.log("Reached maximum iterations. Array might not be sortable.");
        enableControls();
        isSorting = false;
        return;
    }

    randomize();
    setTimeout(function () {
        bogoSort(iteration + 1);
    }, animationSpeed);
}

function randomize() {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    showBars();
}

function isSorted() {
    for (let i = 1; i < array.length; i++) {
        if (array[i] < array[i - 1]) {
            return false;
        }
    }
    return true;
}

function showBars() {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        container.appendChild(bar);
    }
}

function disableControls() {
    arraySizeSlider.disabled = true;
    sortButton.disabled = true;
    randomizeButton.disabled = true;
}

function enableControls() {
    arraySizeSlider.disabled = false;
    sortButton.disabled = false;
    randomizeButton.disabled = false;
}

// Initialize on page load
init();
