const sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const parseArrayInput = (inputStr) => {
    const tokens = inputStr.trim().split(/\s+/);
    const array = tokens.map(elem => parseFloat(elem));
    if (array.length !== tokens.length || array.some(elem => isNaN(elem)))
        return null;
    return array;
}

const insertArrayToHtml = (array) => {
    const arrayContainer = document.getElementById('array');
    arrayContainer.innerHTML = '';
    array.forEach(elem => {
        const arrayElement = document.createElement('div');
        arrayElement.className = 'array-element';
        arrayElement.textContent = elem;
        arrayContainer.appendChild(arrayElement);
    });
}

const highlightElements = (i, j, additionalClass) => {
    const array = document.getElementById('array').children;
    array[i].classList.add(additionalClass);
    array[j].classList.add(additionalClass);
}

const setStatus = (status) => {
    const statusElem = document.getElementById('status');
    statusElem.innerHTML = status === 'comparing' ? 'Comparing...' : 'Swapping...';
    statusElem.className = status;
}

const heapify = async (array, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest])
        largest = left;

    if (right < n && array[right] > array[largest])
        largest = right;

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        insertArrayToHtml(array);
        highlightElements(i, largest, 'swapped');
        setStatus('swapping');
        await sleep(1000);

        await heapify(array, n, largest);
    }
}

const heapSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        await heapify(array, n, i);

    // Extract elements one by one from the heap
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        insertArrayToHtml(array);
        highlightElements(0, i, 'swapped');
        setStatus('swapping');
        await sleep(1000);

        await heapify(array, i, 0);
    }

    insertArrayToHtml(array);
    document.getElementById('status').innerHTML = '';
}

document.getElementById('submit-array').addEventListener('click', heapSort);
document.getElementById('heap-sort').addEventListener('click', () => {
    document.querySelectorAll('.sort-box').forEach(box => box.classList.remove('active'));
    document.getElementById('heap-sort').classList.add('active');
    document.getElementById('submit-array').addEventListener('click', heapSort);
});
