const partition = (array, low, high, key) => {
    const pivot = array[high][key];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (array[j][key] > pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
};

const quickSort = (array, low, high, key) => {
    if (low < high) {
        const pi = partition(array, low, high, key);
        quickSort(array, low, pi - 1, key);
        quickSort(array, pi + 1, high, key);
    }
};

export const sortByKey = (array, key) => {
    quickSort(array, 0, array.length - 1, key);
    return array;
};
