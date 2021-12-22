import hljs from 'highlight.js/lib/core';
import tsLang from 'highlight.js/lib/languages/typescript';
import xmlLang from 'highlight.js/lib/languages/xml';
import cssLang from 'highlight.js/lib/languages/css';
hljs.registerLanguage('typescript', tsLang);
hljs.registerLanguage('xml', xmlLang);
hljs.registerLanguage('css', cssLang);
import generateXlsx, { htmlTableToSheet } from '../src/typexlsx';
import { saveAs } from 'file-saver';
import { Sheet } from '../src/types';
import 'highlight.js/styles/atom-one-dark.css';
import './styles.css';

hljs.highlightAll();

var btnDownload = document.getElementById('btn:download') as HTMLButtonElement;

const TEST_FILE: Sheet = {
    name: 'TestFile',
    rows: [
        [
            { value: 'A' },
            { value: 'B' },
            {
                value: 'C',
                font: { family: 'Times New Roman', color: '#00FF00' },
                fill: '#880077',
            },
        ],
        [{ value: 1 }, { value: 2 }, { value: 3 }],
        [{ value: 'test', span: 3, rowSpan: 2 }],
    ],
};

btnDownload.onclick = function generate() {
    console.log('generating...');
    generateXlsx(TEST_FILE)
        .then((blob) => {
            console.log('saving...');
            saveAs(blob, 'Workbook.xlsx');
            console.log('done');
        })
        .catch((err) => console.log(String(err)));
};

var btnExport = document.getElementById('btn:export') as HTMLButtonElement;
btnExport.onclick = function () {
    console.log('generating...');
    generateXlsx(
        htmlTableToSheet(document.getElementById('table') as HTMLTableElement)
    )
        .then((blob) => {
            console.log('saving...');
            saveAs(blob, 'Workbook.xlsx');
            console.log('done');
        })
        .catch((err) => console.log(String(err)));
};
