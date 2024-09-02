// JavaScript for Bogo Sort
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

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const isSorted = (array) => {
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
            return false;
        }
    }
    return true;
}

const setStatus = (status) => {
    const statusElem = document.getElementById('status');
    statusElem.innerHTML = 'Shuffling...';
    statusElem.className = status;
}

const bogoSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';

    while (!isSorted(array)) {
        shuffleArray(array);
        insertArrayToHtml(array);
        setStatus('swapping');
        await sleep(1000);
    }

    insertArrayToHtml(array);
    document.getElementById('status').innerHTML = '';
}

document.getElementById('submit-array').addEventListener('click', bogoSort);
document.getElementById('bogo-sort').addEventListener('click', () => {
    document.querySelectorAll('.sort-box').forEach(box => box.classList.remove('active'));
    document.getElementById('bogo-sort').classList.add('active');
    document.getElementById('submit-array').addEventListener('click', bogoSort);
});
