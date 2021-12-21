import generateXlsx from '../src/typexlsx';
import { saveAs } from 'file-saver';
import { Sheet } from '../src/types';
import tableToXlsx from './tableToXlsx';

const app = document.getElementById('app');
if (!app) throw new Error('app not found');

var title = app.appendChild(document.createElement('h1'));
title.innerText = 'Hallo Welt';

var btn = app.appendChild(document.createElement('button'));
btn.innerText = 'Download XLSX';
var log = app.appendChild(document.createElement('p'));

const TEST_FILE: Sheet = {
    name: 'TestFile',
    rows: [
        [{ value: 'A' }, { value: 'B' }, { value: 'C' }],
        [{ value: 1 }, { value: 2 }, { value: 3 }],
        //        [{ value: 'test', span: 3, rowSpan: 2 }, {}, {}],
        //        [{}, {}, {}],
    ],
};

btn.onclick = function generate() {
    log.innerText = 'generating...';
    generateXlsx(TEST_FILE)
        .then((blob) => {
            log.innerText = 'saving...';
            saveAs(blob, 'Workbook.xlsx');
            log.innerText = 'done';
        })
        .catch((err) => (log.innerText = String(err)));
};

var btn2 = app.appendChild(document.createElement('button'));
btn2.innerText = 'Export HTML Table';

btn2.onclick = function () {
    log.innerText = 'generating...';
    tableToXlsx(document.getElementById('table') as HTMLTableElement)
        .then((blob) => {
            log.innerText = 'saving...';
            saveAs(blob, 'Workbook.xlsx');
            log.innerText = 'done';
        })
        .catch((err) => (log.innerText = String(err)));
};
