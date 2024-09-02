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
    if (i >= 0 && i < array.length) {
        array[i].classList.add(additionalClass);
    }
    if (j >= 0 && j < array.length) {
        array[j].classList.add(additionalClass);
    }
}

const removeHighlight = () => {
    const array = document.getElementById('array').children;
    Array.from(array).forEach(elem => {
        elem.classList.remove('compared', 'swapped');
    });
}

const setStatus = (status) => {
    const statusElem = document.getElementById('status');
    statusElem.innerHTML = status === 'comparing' ? 'Comparing...' : 'Swapping...';
    statusElem.className = status;
}

const insertionSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let current = array[i];
        let j = i - 1;

        insertArrayToHtml(array);
        highlightElements(i, j, 'compared');
        setStatus('comparing');
        await sleep(1000);

        while (j >= 0 && array[j] > current) {
            insertArrayToHtml(array);
            highlightElements(j + 1, j, 'swapped');
            setStatus('swapping');
            await sleep(500);
            array[j + 1] = array[j];
            array[j] = current;

            insertArrayToHtml(array);
            await sleep(500);

            j--;
            removeHighlight();
            highlightElements(j + 1, j, 'swapped');
            await sleep(1000);
        }

        array[j + 1] = current;
        insertArrayToHtml(array);
        await sleep(500);
    }

    setStatus('');
    document.getElementById('status').innerHTML = '';
}

document.getElementById('submit-array').addEventListener('click', insertionSort);
document.getElementById('insertion-sort').addEventListener('click', () => {
    document.querySelectorAll('.sort-box').forEach(box => box.classList.remove('active'));
    document.getElementById('insertion-sort').classList.add('active');
    document.getElementById('submit-array').addEventListener('click', insertionSort);
});