let n = 40; 
const array = [];
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

let isSorting = false;

function init() {
    array.length = 0;
    for (let i = n; i > 0; i--) {
        array.push(i / n);
    }
    showBars();
}

function quickSort(array, left, right, animations) {
    if (left < right) {
        const partitionIndex = partition(array, left, right, animations);
        quickSort(array, left, partitionIndex - 1, animations);
        quickSort(array, partitionIndex + 1, right, animations);
    }
}

function partition(array, left, right, animations) {
    const pivot = array[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (array[j] < pivot) {
            i++;
            animations.push([i, j, 'swap']);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    animations.push([i + 1, right, 'swap']);
    const temp = array[i + 1];
    array[i + 1] = array[right];
    array[right] = temp;

    return i + 1;
}

function animate(animations) {
    let step = 0;
    const interval = setInterval(() => {
        if (step < animations.length) {
            const [index1, index2, action] = animations[step];
            if (action === 'swap') {
                [array[index1], array[index2]] = [array[index2], array[index1]];
                showBars([index1, index2]);
            }
            step++;
        } else {
            showBars();
            enableControls();
            isSorting = false;
            clearInterval(interval);
        }
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

function sort() {
    if (!isSorting) {
        isSorting = true;
        disableControls();
        const animations = [];
        quickSort([...array], 0, array.length - 1, animations);
        animate(animations);
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
