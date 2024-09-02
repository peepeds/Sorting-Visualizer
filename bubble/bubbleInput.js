// JavaScript for Bubble Sort
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

const bubbleSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;
    for (let i = n - 1; i > 0; i--)
        for (let j = 0; j < i; j++) {
            insertArrayToHtml(array);
            highlightElements(j, j + 1, 'compared');
            setStatus('comparing');
            await sleep(1000);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                insertArrayToHtml(array);
                highlightElements(j, j + 1, 'swapped');
                setStatus('swapping');
                await sleep(1000);
            }
        }
    insertArrayToHtml(array);
    document.getElementById('status').innerHTML = '';
}

document.getElementById('submit-array').addEventListener('click', bubbleSort);
document.getElementById('bubble-sort').addEventListener('click', () => {
    document.querySelectorAll('.sort-box').forEach(box => box.classList.remove('active'));
    document.getElementById('bubble-sort').classList.add('active');
    document.getElementById('submit-array').addEventListener('click', bubbleSort);
});
