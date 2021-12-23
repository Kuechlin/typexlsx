import {Cell, Row, Sheet} from '../types';

/*
    innerText -> cell.value
    css text-align -> cell.align
    css vertical-align -> cell.alignVertical
    ...
*/

export default function htmlTableToSheet(table: HTMLTableElement) {
    const sheet: Sheet = {
        name: table.title,
        rows: [],
    };
    generateSheet({}, sheet.rows, table);
    return sheet;
}

// get styles
const hex = (v: string) => {
    const r = parseInt(v).toString(16);
    return r.length === 1 ? '0' + r : r;
};
const convertToHex = (val: string | null | undefined) => {
    if (!val) return undefined;
    else if (val.startsWith('#')) return val;
    else if (val.startsWith(('rgba'))) {
        const [r, g, b, a] = val
            .replace('rgba(', '')
            .replace(')', '')
            .split(',')
            .map(x => x.trim());

        if (a === '0') return undefined;
        return '#' + hex(r) + hex(g) + hex(b);
    } else if (val.startsWith('rgb')) {
        const [r, g, b] = val
            .replace('rgb(', '')
            .replace(')', '')
            .split(',')
            .map(x => x.trim());

        return '#' + hex(r) + hex(g) + hex(b);
    } else return undefined;
};
const when = <T>(v: T) => (v ? v : undefined);
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

const getStylesFromElement = (element: Element): Partial<Cell> => {
    const css = window.getComputedStyle(element, null);
    const cssValues = {
        textAlign: alignMap[css.getPropertyValue('text-align')],
        verticalAlign: verticalAlignMap[css.getPropertyValue('vertical-align')],
        color: convertToHex(css.getPropertyValue('color')),
        fontFamily: css.getPropertyValue('font-family').replace(/"/g, ''),
        fontSize: parseInt(css.getPropertyValue('font-size')),
        backgroundColor: convertToHex(css.getPropertyValue('background-color')),
        whiteSpace: css.getPropertyValue('white-space')
    };
    return {
        align: when(cssValues.textAlign),
        alignVertical: when(cssValues.verticalAlign),
        font: {
            color: cssValues.color,
            family: when(cssValues.fontFamily),
            size: when(cssValues.fontSize),
        },
        fill: cssValues.backgroundColor,
        wrap: cssValues.whiteSpace !== 'nowrap'
    };
};
const merge = (base: any, next: any) => {
    const result: any = {...base};
    for (const key in next) {
        if (next[key]) {
            if (typeof next[key] === 'object') {
                result[key] = merge(base[key], next[key]);
            } else {
                result[key] = next[key];
            }
        }
    }
    return result;
};

// generate worksheet
const generateSheet = (
    defaultStyles: Partial<Cell>,
    rows: Row[],
    element: Element
) => {
    const sheetStyles = merge(
        defaultStyles,
        getStylesFromElement(element)
    );
    for (const child of element.children) {
        switch (child.tagName) {
            case 'THEAD':
            case 'TBODY':
            case 'TFOOT':
                generateSheet(sheetStyles, rows, child);
                break;
            case 'TR':
                rows.push(generateRow(defaultStyles, child));
                break;
        }
    }
};

const generateRow = (defaultStyles: Partial<Cell>, element: Element): Row => {
    const rowStyles = merge(
        defaultStyles,
        getStylesFromElement(element)
    );
    return [...element.children]
        .filter((x) => x instanceof HTMLTableCellElement)
        .map((x) => generateCell(rowStyles, x as HTMLTableCellElement));
};

const generateCell = (
    defaultStyles: Partial<Cell>,
    element: HTMLTableCellElement
): Cell => {
    const cellStyles = merge(
        defaultStyles,
        getStylesFromElement(element)
    );
    const rect = element.getBoundingClientRect();
    return {
        ...cellStyles,
        value: element.innerText,
        font: {
            ...cellStyles.font,
            style: element.tagName === 'TH' ? 'bold' : undefined,
        },
        width: rect.width,
        rowSpan: element.rowSpan,
        span: element.colSpan,
    };
};
