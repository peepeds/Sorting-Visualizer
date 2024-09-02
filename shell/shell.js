let n = 40; // Initial array size
const array = [];
let isSorting = false;
const container = document.getElementById('container');
const arraySizeSlider = document.getElementById('array-size-slider');
const sortButton = document.getElementById('sort-button');
const randomizeButton = document.getElementById('randomize-button');

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
        isSorting = true;
        disableControls();
        const swaps = shellSort([...array]);
        animate(swaps);
    }
}

function animate(swaps) {
    if (swaps.length == 0) {
        showBars();
        enableControls();
        isSorting = false;
        return;
    }
    const [i, j] = swaps.shift(0);
    [array[i], array[j]] = [array[j], array[i]];
    showBars([i, j]);

    setTimeout(function () {
        animate(swaps);
    }, calculateSpeed());
}

function shellSort(array) {
    const swaps = [];
    const len = array.length;
    for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < len; i++) {
            const current = array[i];
            let j = i;
            while (j >= gap && array[j - gap] > current) {
                swaps.push([j, j - gap]);
                array[j] = array[j - gap];
                j -= gap;
            }
            array[j] = current;
        }
    }
    return swaps;
}

function showBars(indices) {
    container.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";
        bar.classList.add("bar");
        if (indices && indices.includes(i)) {
            bar.classList.add(i % 2 === 0 ? "bar-red" : "bar-green");
        }
        container.appendChild(bar);
    }
}

function calculateSpeed() {
    return Math.max(10, Math.ceil(1500 / n));
}

function randomize() {
    if (!isSorting) {
        array.length = 0;
        for (let i = 0; i < n; i++) {
            array.push(Math.random());
        }
        showBars();
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
