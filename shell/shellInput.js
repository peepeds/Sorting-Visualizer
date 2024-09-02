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
    if (status === 'comparing') {
        statusElem.innerHTML = 'Comparing...';
    } else if (status === 'swapping') {
        statusElem.innerHTML = 'Swapping...';
    } else {
        statusElem.innerHTML = ''; // Clear status
    }
    statusElem.className = status;
}

const shellSort = async () => {
    const array = parseArrayInput(document.getElementById('array-input').value);
    if (!array) {
        document.getElementById('input-error').innerHTML = 'Incorrect input!';
        return;
    }
    document.getElementById('input-error').innerHTML = '';
    const n = array.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j = i;
            insertArrayToHtml(array);
            highlightElements(j, j - gap, 'compared');
            setStatus('comparing');
            await sleep(1000);

            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];
                insertArrayToHtml(array);
                highlightElements(j, j - gap, 'swapped');
                setStatus('swapping');
                await sleep(1000);
                j -= gap;
            }

            array[j] = temp;
            insertArrayToHtml(array);
            await sleep(1000);
            removeHighlight();
        }

        gap = Math.floor(gap / 2);
    }

    // Clear compared and swapped classes after 1 second
    await sleep(1000);
    const arrayElements = document.querySelectorAll('.array-element');
    arrayElements.forEach(element => {
        element.classList.remove('compared', 'swapped');
    });

    // Clear status after 1 second
    await sleep(1000);
    setStatus('');
}

document.getElementById('submit-array').addEventListener('click', shellSort);
document.getElementById('shell-sort').addEventListener('click', () => {
    document.querySelectorAll('.sort-box').forEach(box => box.classList.remove('active'));
    document.getElementById('shell-sort').classList.add('active');
    document.getElementById('submit-array').addEventListener('click', shellSort);
});
