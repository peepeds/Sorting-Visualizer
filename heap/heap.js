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
    heapSortAndAnimate();
});

function init() {
    array.length = 0;
    for (let i = n; i > 0; i--) {
        array.push(i / n);
    }
    showBars();
}

function heapify(array, n, i, swaps) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        swaps.push([i, largest]);
        const temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;

        heapify(array, n, largest, swaps);
    }
}

function heapSort(array) {
    const n = array.length;
    const swaps = [];

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, swaps);
    }

    for (let i = n - 1; i > 0; i--) {
        swaps.push([0, i]);
        const temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        heapify(array, i, 0, swaps);
    }

    return swaps;
}

function heapSortAndAnimate() {
    if (!isSorting) {
        isSorting = true;
        disableControls();
        const swaps = heapSort([...array]);
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
