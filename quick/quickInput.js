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

const insertArrayToHtml = (array, pivotIndex, comparedIndex, swappedIndex) => {
    const arrayContainer = document.getElementById('array');
    arrayContainer.innerHTML = ''; // Clear existing content
    array.forEach((elem, index) => {
        const arrayElement = document.createElement('div');
        arrayElement.className = 'array-element';

        // Add classes based on index for highlighting
        if (index === pivotIndex) {
            arrayElement.classList.add('pivot');
        } else if (index === comparedIndex) {
            arrayElement.classList.add('compared');
        } else if (index === swappedIndex || index === pivotIndex) {
            arrayElement.classList.add('swapped');
        }

        arrayElement.textContent = elem;
        arrayContainer.appendChild(arrayElement);
    });
}

const highlightElements = (i, j, additionalClass) => {
    const array = document.getElementById('array').children;
    array[i].classList.add(additionalClass);
    array[j].classList.add(additionalClass);
}

const removeHighlight = () => {
    const array = document.getElementById('array').children;
    Array.from(array).forEach(elem => {
        elem.classList.remove('compared', 'swapped', 'pivot');
    });
}

const setStatus = (status) => {
    const statusElem = document.getElementById('status');
    statusElem.innerHTML = status === 'comparing' ? 'Comparing...' : 'Swapping...';
    statusElem.className = status;
}

const quickSort = async (array, low, high) => {
    if (low < high) {
        const partitionIndex = await partition(array, low, high);
        await quickSort(array, low, partitionIndex - 1);
        await quickSort(array, partitionIndex + 1, high);
    }
}

const partition = async (array, low, high) => {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        insertArrayToHtml(array, high, j, i);
        highlightElements(j, high, 'compared');
        setStatus('comparing');
        await sleep(1000);

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            insertArrayToHtml(array, high, i, j);
            highlightElements(i, j, 'swapped');
            setStatus('swapping');
            await sleep(1000);
        }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    insertArrayToHtml(array, high, i + 1);
    highlightElements(i + 1, high, 'swapped');
    setStatus('swapping');
    await sleep(1000);

    return i + 1;
}

const startQuickSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;

    await quickSort(array, 0, n - 1);

    insertArrayToHtml(array, -1, -1, -1); // -1 to indicate no highlighting
    document.getElementById('status').innerHTML = '';
}

document.getElementById('submit-array').addEventListener('click', startQuickSort);
document.getElementById('quick-sort').addEventListener('click', () => {
    document.querySelectorAll('.sort-box').forEach(box => box.classList.remove('active'));
    document.getElementById('quick-sort').classList.add('active');
    document.getElementById('submit-array').removeEventListener('click', startSelectionSort);
    document.getElementById('submit-array').addEventListener('click', startQuickSort);
});
