const appRoot = document.getElementById('app-root');
appRoot.innerHTML += `<h1> Countries search</h1>`;

let radioButtons = document.createElement('div');
radioButtons.id = 'fieldset';
let applicationForm = document.createElement('form');
applicationForm.innerHTML = `<div>Please choose the type of search:</div>`;
let divRegion = document.createElement('div');
let radioRegion = document.createElement('input');
radioRegion.type = 'radio';
radioRegion.value = 'By Region';
radioRegion.name = 'fieldset';
radioRegion.id = 'region';
let labelRegion = document.createElement('label')
labelRegion.id = 'labelRegion';
labelRegion.htmlFor = 'region';
let descriptionRegion = document.createTextNode('By Region');
labelRegion.appendChild(descriptionRegion);
divRegion.appendChild(radioRegion);
divRegion.appendChild(labelRegion);
radioButtons.appendChild(divRegion);

let radioLanguage = document.createElement('input');
radioLanguage.type = 'radio';
radioLanguage.id = 'language';
radioLanguage.value = 'By Language';
radioLanguage.name = 'fieldset';
let divLanguage = document.createElement('div');
let labelLanguage = document.createElement('label')
labelLanguage.htmlFor = 'language';
let descriptionLanguage = document.createTextNode('By Language');
labelLanguage.appendChild(descriptionLanguage);
divLanguage.appendChild(radioLanguage);
divLanguage.appendChild(labelLanguage);
radioButtons.appendChild(divLanguage);
applicationForm.appendChild(radioButtons);
appRoot.appendChild(applicationForm);

let tableList = null;

let divSearcgQuery = document.createElement('div');
let spanSearchQuery = document.createElement('span');
spanSearchQuery.innerHTML = 'Please choose search query:';
let list = document.createElement('select');
list.id = 'list';
list.disabled = true;
let listOption = document.createElement('option');
listOption.innerHTML = 'Select value';
list.appendChild(listOption);
divSearcgQuery.appendChild(spanSearchQuery);
divSearcgQuery.appendChild(list);
appRoot.appendChild(divSearcgQuery);

let regionListAray = externalService.getRegionsList();
let languagesListAray = externalService.getLanguagesList();

document.addEventListener('input', (e) => {
    if (e.target.id === 'region') {
        if (document.getElementById('table')) {
            appRoot.removeChild(document.getElementById('table'));
        }
        clearSelect();
        if (document.getElementById('textNoItems')) {
            appRoot.removeChild(document.getElementById('textNoItems'));
        }
        let text = document.createElement('p');
        text.id = 'textNoItems';
        text.innerHTML = 'No items, please choose search query';
        appRoot.appendChild(text);
        for (let i = 0; i < regionListAray.length; i++) {
            let option = document.createElement('option');
            option.value = regionListAray[i];
            option.text = regionListAray[i];
            list.appendChild(option);
        }
    } else if (e.target.id === 'language') {
        if (document.getElementById('table')) {
            appRoot.removeChild(document.getElementById('table'));
        }
        clearSelect();
        if (document.getElementById('textNoItems')) {
            appRoot.removeChild(document.getElementById('textNoItems'));
        }
        let text = document.createElement('p');
        text.id = 'textNoItems';
        text.innerHTML = 'No items, please choose search query';
        appRoot.appendChild(text);
        for (let i = 0; i < languagesListAray.length; i++) {
            let option = document.createElement('option');
            option.value = languagesListAray[i];
            option.text = languagesListAray[i];
            list.appendChild(option);
        }
    } else {
        if (document.getElementById('textNoItems')) {
            appRoot.removeChild(document.getElementById('textNoItems'));
        }
        if (document.getElementById('region').checked) {
            tableList = externalService.getCountryListByRegion(e.target.value);
        } else {
            tableList = externalService.getCountryListByLanguage(e.target.value);
        }
        createTable();
    }
})

function clearSelect() {
    let list = document.getElementById('list');
    list.innerText = null;
    list.disabled = false;
    let listOption = document.createElement('option');
    listOption.innerHTML = 'Select value';
    list.appendChild(listOption);
}

function createTable() {
    if (document.getElementById('table')) {
        appRoot.removeChild(document.getElementById('table'));
    }
    let table = document.createElement('table');
    let tableHead = ['Country name', 'Capital', 'World region', 'Languages', 'Area', 'Flag'];
    table.id = 'table';
    for (i = 0; i < tableHead.length; i++) {
        let row = document.createElement('th');
        row.innerHTML = tableHead[i];
        if (tableHead[i] === 'Country name') {
            let arrow = document.createElement('span');
            arrow.innerHTML = '<span id="arr-region"><i class="arrow up"></i><i class="arrow down both"></i><span>';
            arrow.onclick = sortByRegion;
            row.appendChild(arrow);
        } else if (tableHead[i] === 'Area') {
            let arrow = document.createElement('span');
            arrow.innerHTML = '<span id="arr-region"><i class="arrow up"></i><i class="arrow down both"></i><span>';
            arrow.onclick = sortByArea;
            row.appendChild(arrow);
        }
        table.appendChild(row);

    }
    for (i = 0; i < tableList.length; i++) {
        let rowTr = document.createElement('tr');
        let rowTd = document.createElement('td');
        rowTd.innerHTML = tableList[i].name;
        rowTr.appendChild(rowTd);
        rowTd = document.createElement('td');
        rowTd.innerHTML = tableList[i].capital;
        rowTr.appendChild(rowTd);
        rowTd = document.createElement('td');
        rowTd.innerHTML = tableList[i].region;
        rowTr.appendChild(rowTd);
        rowTd = document.createElement('td');
        rowTd.innerHTML = Object.values(tableList[i].languages).join(', ');
        rowTr.appendChild(rowTd);
        rowTd = document.createElement('td');
        rowTd.innerHTML = tableList[i].area;
        rowTr.appendChild(rowTd);
        rowTd = document.createElement('td');
        rowTd.innerHTML = '<img src = "' + tableList[i].flagURL + '">';
        rowTr.appendChild(rowTd);
        table.appendChild(rowTr);
    }
    appRoot.appendChild(table);
}

let descendingRegion = true;
let descendingArea = true;

function sortByRegion() {
    for (let i = 0; i < tableList.length - 1; i++) {
        for (let j = i + 1; j < tableList.length; j++) {
            if (descendingRegion) {
                if (tableList[j].name < tableList[i].name) {
                    let temp = tableList[i];
                    tableList[i] = tableList[j];
                    tableList[j] = temp;
                }
            } else {
                if (tableList[j].name > tableList[i].name) {
                    let temp = tableList[i];
                    tableList[i] = tableList[j];
                    tableList[j] = temp;
                }
            }
        }
    }
    descendingRegion = !descendingRegion;
    createTable();
}

function sortByArea() {
    for (let i = 0; i < tableList.length - 1; i++) {
        for (let j = i + 1; j < tableList.length; j++) {
            if (descendingArea) {
                if (tableList[j].area < tableList[i].area) {
                    let temp = tableList[i];
                    tableList[i] = tableList[j];
                    tableList[j] = temp;
                }
            } else {
                if (tableList[j].area > tableList[i].area) {
                    let temp = tableList[i];
                    tableList[i] = tableList[j];
                    tableList[j] = temp;
                }
            }
        }
    }
    descendingArea = !descendingArea;
    createTable();
}