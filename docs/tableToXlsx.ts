import { Cell, Row, Sheet } from '../src/types';
import generateXlsx from '../src/typexlsx';

/*
    innerText -> cell.value
    css text-align -> cell.align
    css vertical-align -> cell.alignVertical
    ...
*/

const convertToHex = (val: string | null | undefined) => {
    if (!val) return undefined;
    else if (val.startsWith('#')) return val;
    else if (val.startsWith('rgb')) {
        var [r, g, b] = val.replace('rgb(', '').replace(')', '').split(',');
        const hex = (v: string) => {
            v = parseInt(v).toString(16);
            return v.length === 1 ? '0' + v : v;
        };
        return '#' + hex(r) + hex(g) + hex(b);
    } else return undefined;
};

const alignMap: Record<string, Cell['align']> = {
    left: 'left',
    right: 'right',
    start: 'left',
    end: 'right',
    center: 'center',
};
const verticalAlignMap: Record<string, Cell['alignVertical']> = {
    top: 'top',
    bottom: 'bottom',
    middle: 'center',
    'text-top': 'top',
    'text-bottom': 'bottom',
};

const generateCell = (element: HTMLTableCellElement, index: number): Cell => {
    const _css = window.getComputedStyle(element, null);
    const values = {
        textAlign: alignMap[_css.getPropertyValue('text-align')],
        verticalAlign:
            verticalAlignMap[_css.getPropertyValue('vertical-align')],
        color: convertToHex(_css.getPropertyValue('color')),
        fontFamily: _css.getPropertyValue('font-family').replace(/"/g, ''),
        fontSize: parseInt(_css.getPropertyValue('font-size')),
        backgroundColor: convertToHex(
            _css.getPropertyValue('background-color')
        ),
    };

    const when = <T>(v: T) => (v ? v : undefined);

    return {
        value: element.innerText,
        align: when(values.textAlign),
        alignVertical: when(values.verticalAlign),
        font: {
            color: values.color,
            family: when(values.fontFamily),
            size: when(values.fontSize),
            style: element.tagName === 'TH' ? 'bold' : undefined,
        },
        fill: values.backgroundColor,
    };
};

const generateRow = (element: HTMLTableRowElement): Row => {
    return [...element.children]
        .filter((x) => x instanceof HTMLTableCellElement)
        .map((x, i) => generateCell(x as HTMLTableCellElement, i));
};

const generateSheet = (rows: Row[], children: HTMLCollection) => {
    for (const child of children) {
        switch (child.tagName) {
            case 'THEAD':
            case 'TBODY':
                generateSheet(rows, child.children);
                break;
            case 'TR':
                rows.push(generateRow(child as HTMLTableRowElement));
                break;
        }
    }
};

export default function tableToXlsx(table: HTMLTableElement) {
    const sheet: Sheet = {
        name: table.title,
        rows: [],
    };
    generateSheet(sheet.rows, table.children);
    return generateXlsx(sheet);
}
